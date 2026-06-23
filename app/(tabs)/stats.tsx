import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  EmptyState,
  Screen,
  ScreenTitle,
  StatCard,
} from "../../components/ShiftPayUI";
import { loadHistory, ShiftResult } from "../../lib/storage";
import { loadCurrency, CurrencyCode } from "../../lib/currency";
import { formatHours, formatMoney } from "../../lib/theme";

export default function StatsScreen() {
  const [history, setHistory] = useState<ShiftResult[]>([]);
  const [currency, setCurrency] = useState<CurrencyCode>("ZAR");

  useFocusEffect(
    useCallback(() => {
      loadHistory().then(setHistory);
      loadCurrency().then(setCurrency);
    }, [])
  );

  const stats = useMemo(() => {
    const lastSeven = history.slice(0, 7);

    const lifetimePay = history.reduce((sum, item) => sum + item.totalPay, 0);
    const lifetimeHours = history.reduce((sum, item) => sum + item.totalHours, 0);

    const lastSevenPay = lastSeven.reduce((sum, item) => sum + item.totalPay, 0);
    const lastSevenHours = lastSeven.reduce(
      (sum, item) => sum + item.totalHours,
      0
    );

    const bestShift = history.reduce(
      (best, item) => Math.max(best, item.totalPay),
      0
    );

    const averageShift = history.length > 0 ? lifetimePay / history.length : 0;

    return {
      lifetimePay,
      lifetimeHours,
      lastSevenPay,
      lastSevenHours,
      bestShift,
      averageShift,
    };
  }, [history]);

  return (
    <Screen>
      <ScreenTitle
        title="Stats"
        subtitle="A simple view of your recent and lifetime earnings."
      />

      {history.length === 0 ? (
        <EmptyState
          title="No stats yet"
          body="Save your first shift and your earnings stats will appear here."
        />
      ) : (
        <>
          <StatCard
            label="Lifetime earnings"
            value={formatMoney(stats.lifetimePay, currency)}
          />

          <View style={styles.grid}>
            <StatCard
              small
              label="Total hours"
              value={formatHours(stats.lifetimeHours)}
            />

            <StatCard
              small
              label="Best shift"
              value={formatMoney(stats.bestShift, currency)}
            />
          </View>

          <View style={styles.grid}>
            <StatCard
              small
              label="Last 7 shifts"
              value={formatMoney(stats.lastSevenPay, currency)}
            />

            <StatCard
              small
              label="Avg shift"
              value={formatMoney(stats.averageShift, currency)}
            />
          </View>

          <StatCard
            label="Last 7 shift hours"
            value={formatHours(stats.lastSevenHours)}
          />
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
  },
});