import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  EmptyState,
  GlassCard,
  Screen,
  ScreenTitle,
  sharedText,
} from "../../components/ShiftPayUI";
import { deleteShift, loadHistory, ShiftResult } from "../../lib/storage";
import { loadCurrency, CurrencyCode } from "../../lib/currency";
import { formatDate, formatHours, formatMoney, theme } from "../../lib/theme";

export default function HistoryScreen() {
  const [history, setHistory] = useState<ShiftResult[]>([]);
  const [currency, setCurrency] = useState<CurrencyCode>("ZAR");

  useFocusEffect(
    useCallback(() => {
      loadHistory().then(setHistory);
      loadCurrency().then(setCurrency);
    }, [])
  );

  async function handleDelete(id: string) {
    Alert.alert("Delete shift?", "This removes the shift from your history.", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          const updated = await deleteShift(id);
          setHistory(updated);
        },
      },
    ]);
  }

  return (
    <Screen>
      <ScreenTitle
        title="History"
        subtitle="Your saved shifts are stored locally on this device."
      />

      {history.length === 0 ? (
        <EmptyState
          title="No shifts yet"
          body="Save a shift from the Calculator tab and it will appear here."
        />
      ) : (
        <View style={styles.list}>
          {history.map((shift) => (
            <GlassCard key={shift.id} style={styles.shiftCard}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.amount}>
                    {formatMoney(shift.totalPay, currency)}
                  </Text>
                  <Text style={styles.date}>{formatDate(shift.date)}</Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleDelete(shift.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.detailRow}>
                <Text style={sharedText.label}>Paid time</Text>
                <Text style={styles.detailValue}>
                  {formatHours(shift.totalHours)}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={sharedText.label}>Rate</Text>
                <Text style={styles.detailValue}>
                  {formatMoney(shift.hourlyRate, currency)} / hour
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={sharedText.label}>Break</Text>
                <Text style={styles.detailValue}>{shift.breakMinutes} min</Text>
              </View>
            </GlassCard>
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 14,
  },
  shiftCard: {
    gap: 12,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  amount: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "900",
    letterSpacing: -0.8,
  },
  date: {
    color: theme.colors.muted,
    marginTop: 4,
    fontWeight: "700",
  },
  deleteButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: theme.colors.dangerSoft,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.28)",
  },
  deleteText: {
    color: "#FCA5A5",
    fontWeight: "800",
    fontSize: 12,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    paddingTop: 10,
  },
  detailValue: {
    color: theme.colors.text,
    fontWeight: "800",
  },
});