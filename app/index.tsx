import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BrandMark,
  GlassCard,
  PrimaryButton,
  Screen,
  sharedText,
} from "../components/ShiftPayUI";
import { theme } from "../lib/theme";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <BrandMark size={78} />

        <Text style={styles.appName}>ShiftPay</Text>
        <Text style={styles.tagline}>
          Calculate your shift earnings quickly, clearly, and offline.
        </Text>
      </View>

      <GlassCard style={styles.card}>
        <Text style={styles.cardTitle}>Built for hourly workers</Text>

        <View style={styles.featureRow}>
          <Text style={styles.featureIcon}>✓</Text>
          <Text style={sharedText.body}>
            Calculate pay from hours, minutes, and breaks.
          </Text>
        </View>

        <View style={styles.featureRow}>
          <Text style={styles.featureIcon}>✓</Text>
          <Text style={sharedText.body}>
            Save shifts locally on your device.
          </Text>
        </View>

        <View style={styles.featureRow}>
          <Text style={styles.featureIcon}>✓</Text>
          <Text style={sharedText.body}>
            Track recent earnings and best shifts.
          </Text>
        </View>
      </GlassCard>

      <PrimaryButton
        title="Start Calculating"
        onPress={() => router.replace("/calculator")}
        style={styles.primary}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => router.push("/history")}
        style={styles.linkButton}
      >
        <Text style={styles.linkText}>View saved shifts</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: "center",
  },
  hero: {
    alignItems: "center",
    marginBottom: 28,
  },
  appName: {
    color: theme.colors.text,
    fontSize: 46,
    fontWeight: "900",
    letterSpacing: -1.5,
    marginTop: 18,
  },
  tagline: {
    color: theme.colors.muted,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 23,
    marginTop: 8,
    maxWidth: 310,
  },
  card: {
    marginBottom: 18,
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 14,
  },
  featureRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  featureIcon: {
    color: theme.colors.green,
    fontWeight: "900",
    marginTop: 1,
  },
  primary: {
    marginTop: 6,
  },
  linkButton: {
    paddingVertical: 18,
    alignItems: "center",
  },
  linkText: {
    color: theme.colors.muted,
    fontWeight: "700",
  },
});