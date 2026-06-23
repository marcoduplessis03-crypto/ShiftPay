import { useCallback, useMemo, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from "expo-router";
import {
  BrandMark,
  GlassCard,
  NumberField,
  PrimaryButton,
  Screen,
  ScreenTitle,
  sharedText,
} from "../../components/ShiftPayUI";
import {
  calculateShift,
  loadHistory,
  saveShift,
  ShiftResult,
} from "../../lib/storage";
import { loadCurrency, CurrencyCode } from "../../lib/currency";
import { formatHours, formatMoney, theme } from "../../lib/theme";

function toNumber(value: string): number {
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function CalculatorScreen() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [breakMinutes, setBreakMinutes] = useState("");
  const [history, setHistory] = useState<ShiftResult[]>([]);
  const [currency, setCurrency] = useState<CurrencyCode>("ZAR");

  useFocusEffect(
    useCallback(() => {
      loadHistory().then(setHistory);
      loadCurrency().then(setCurrency);
    }, [])
  );

  const preview = useMemo(() => {
    return calculateShift({
      hourlyRate: toNumber(hourlyRate),
      hours: toNumber(hours),
      minutes: toNumber(minutes),
      breakMinutes: toNumber(breakMinutes),
    });
  }, [hourlyRate, hours, minutes, breakMinutes]);

  const canSave = preview.totalPay > 0 && preview.totalMinutes > 0;

  async function handleSave() {
    if (!canSave) {
      Alert.alert("Nothing to save", "Enter your rate and worked time first.");
      return;
    }

    const updated = await saveShift({
      hourlyRate: preview.hourlyRate,
      hours: preview.hours,
      minutes: preview.minutes,
      breakMinutes: preview.breakMinutes,
    });

    setHistory(updated);

    Alert.alert("Shift saved", "Your shift was added to History.");
  }

  function handleReset() {
    setHourlyRate("");
    setHours("");
    setMinutes("");
    setBreakMinutes("");
  }

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <ScreenTitle
            title="Calculator"
            subtitle="Work out exactly what your shift is worth."
          />
        </View>

        <BrandMark size={46} />
      </View>

      <GlassCard style={styles.heroCard}>
        <Text style={styles.heroLabel}>Estimated Pay</Text>
        <Text style={styles.heroAmount}>
          {formatMoney(preview.totalPay, currency)}
        </Text>

        <View style={styles.heroMetaRow}>
          <Text style={styles.heroMeta}>{formatHours(preview.totalHours)}</Text>
          <Text style={styles.heroDot}>•</Text>
          <Text style={styles.heroMeta}>{preview.totalMinutes} min paid</Text>
        </View>
      </GlassCard>

      <GlassCard style={styles.formCard}>
        <NumberField
          label={`Rate per hour (${currency})`}
          value={hourlyRate}
          onChange={setHourlyRate}
          placeholder="0"
        />

        <View style={styles.twoColumn}>
          <NumberField
            label="Hours"
            value={hours}
            onChange={setHours}
            placeholder="0"
            style={styles.columnField}
          />

          <NumberField
            label="Minutes"
            value={minutes}
            onChange={setMinutes}
            placeholder="0"
            style={styles.columnField}
          />
        </View>

        <NumberField
          label="Break minutes"
          value={breakMinutes}
          onChange={setBreakMinutes}
          placeholder="0"
        />

        <View style={styles.summaryBox}>
          <Text style={sharedText.label}>Shift summary</Text>
          <Text style={styles.summaryText}>
            {formatHours(preview.totalHours)} paid at{" "}
            {formatMoney(preview.hourlyRate, currency)} / hour
          </Text>
        </View>
      </GlassCard>

      <PrimaryButton title="Save Shift" onPress={handleSave} disabled={!canSave} />

      <TouchableOpacity activeOpacity={0.8} onPress={handleReset} style={styles.reset}>
        <Text style={styles.resetText}>Reset fields</Text>
      </TouchableOpacity>

      <Text style={styles.savedCount}>
        {history.length === 0
          ? "No shifts saved yet."
          : `${history.length} saved shift${history.length === 1 ? "" : "s"}.`}
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
  },
  heroCard: {
    marginBottom: 14,
    paddingVertical: 22,
  },
  heroLabel: {
    color: theme.colors.muted,
    fontSize: 14,
    fontWeight: "700",
  },
  heroAmount: {
    color: theme.colors.text,
    fontSize: 54,
    fontWeight: "900",
    letterSpacing: -2,
    marginTop: 8,
  },
  heroMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  heroMeta: {
    color: theme.colors.muted,
    fontSize: 14,
    fontWeight: "700",
  },
  heroDot: {
    color: theme.colors.muted2,
  },
  formCard: {
    gap: 12,
    marginBottom: 14,
  },
  twoColumn: {
    flexDirection: "row",
    gap: 12,
  },
  columnField: {
    flex: 1,
  },
  summaryBox: {
    backgroundColor: "rgba(34,197,94,0.1)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.22)",
    borderRadius: 18,
    padding: 14,
  },
  summaryText: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 4,
  },
  reset: {
    alignItems: "center",
    paddingVertical: 16,
  },
  resetText: {
    color: theme.colors.muted,
    fontWeight: "800",
  },
  savedCount: {
    color: theme.colors.muted2,
    textAlign: "center",
    marginTop: 4,
    fontSize: 13,
  },
});