import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BrandMark,
  GlassCard,
  Screen,
  ScreenTitle,
  SecondaryButton,
  sharedText,
} from "../../components/ShiftPayUI";
import { clearHistory } from "../../lib/storage";
import {
  CURRENCIES,
  CurrencyCode,
  loadCurrency,
  saveCurrency,
} from "../../lib/currency";
import { theme } from "../../lib/theme";

export default function SettingsScreen() {
  const router = useRouter();
  const [currency, setCurrency] = useState<CurrencyCode>("ZAR");

  useEffect(() => {
    loadCurrency().then(setCurrency);
  }, []);

  async function handleSelectCurrency(nextCurrency: CurrencyCode) {
    setCurrency(nextCurrency);
    await saveCurrency(nextCurrency);
  }

  function handleClearHistory() {
    Alert.alert(
      "Clear history?",
      "This will permanently remove all saved shifts from this device.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await clearHistory();
            Alert.alert("History cleared", "Your saved shifts were removed.");
          },
        },
      ]
    );
  }

  return (
    <Screen>
      <ScreenTitle
        title="Settings"
        subtitle="Manage ShiftPay and your locally saved shift data."
      />

      <GlassCard style={styles.brandCard}>
        <BrandMark size={58} />

        <View style={styles.brandTextWrap}>
          <Text style={styles.appName}>ShiftPay</Text>
          <Text style={sharedText.body}>Version 1.0.0</Text>
        </View>
      </GlassCard>

      <GlassCard style={styles.card}>
        <Text style={styles.cardTitle}>Currency</Text>
        <Text style={sharedText.body}>
          Choose the currency symbol ShiftPay should use across the app.
        </Text>

        <View style={styles.currencyList}>
          {CURRENCIES.map((item) => {
            const selected = item.code === currency;

            return (
              <TouchableOpacity
                key={item.code}
                activeOpacity={0.85}
                onPress={() => handleSelectCurrency(item.code)}
                style={[
                  styles.currencyOption,
                  selected && styles.currencyOptionSelected,
                ]}
              >
                <View style={styles.currencyLeft}>
                  <View
                    style={[
                      styles.currencySymbol,
                      selected && styles.currencySymbolSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.currencySymbolText,
                        selected && styles.currencySymbolTextSelected,
                      ]}
                    >
                      {item.symbol}
                    </Text>
                  </View>

                  <View>
                    <Text style={styles.currencyName}>{item.name}</Text>
                    <Text style={styles.currencyCode}>{item.code}</Text>
                  </View>
                </View>

                <Text style={selected ? styles.selectedText : styles.unselectedText}>
                  {selected ? "Selected" : "Select"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </GlassCard>

      <GlassCard style={styles.card}>
        <Text style={styles.cardTitle}>Offline by design</Text>
        <Text style={sharedText.body}>
          Your shift history is saved locally on this device. ShiftPay does not
          require an account to calculate or save shifts.
        </Text>
      </GlassCard>

<SecondaryButton title="Show Welcome Screen" onPress={() => router.push("/")} />

      <View style={styles.dangerZone}>
        <Text style={styles.dangerTitle}>Danger zone</Text>

        <SecondaryButton
          title="Clear Shift History"
          destructive
          onPress={handleClearHistory}
        />
      </View>

      <Text style={styles.footer}>
        ShiftPay is a calculator tool. Always confirm final payroll amounts with
        your employer or payslip.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brandCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 14,
  },
  brandTextWrap: {
    flex: 1,
  },
  appName: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.7,
  },
  card: {
    marginBottom: 14,
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
  },
  currencyList: {
    marginTop: 16,
    gap: 10,
  },
  currencyOption: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.045)",
    borderRadius: 18,
    padding: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  currencyOptionSelected: {
    borderColor: "rgba(34,197,94,0.45)",
    backgroundColor: "rgba(34,197,94,0.12)",
  },
  currencyLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  currencySymbol: {
    width: 42,
    height: 42,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  currencySymbolSelected: {
    backgroundColor: "rgba(34,197,94,0.16)",
    borderColor: "rgba(34,197,94,0.35)",
  },
  currencySymbolText: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "900",
  },
  currencySymbolTextSelected: {
    color: theme.colors.green,
  },
  currencyName: {
    color: theme.colors.text,
    fontSize: 14,
    fontWeight: "800",
  },
  currencyCode: {
    color: theme.colors.muted,
    marginTop: 2,
    fontSize: 12,
    fontWeight: "700",
  },
  selectedText: {
    color: theme.colors.green,
    fontSize: 12,
    fontWeight: "900",
  },
  unselectedText: {
    color: theme.colors.muted2,
    fontSize: 12,
    fontWeight: "800",
  },
  dangerZone: {
    marginTop: 18,
    gap: 10,
  },
  dangerTitle: {
    color: "#FCA5A5",
    fontSize: 13,
    fontWeight: "900",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  footer: {
    color: theme.colors.muted2,
    textAlign: "center",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 24,
  },
});