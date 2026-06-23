import type { ReactNode } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import type { StyleProp, TextStyle, ViewStyle } from "react-native";
import { theme } from "../lib/theme";
import { ShiftPayLogo } from "./ShiftPayLogo";

type ScreenProps = {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function Screen({ children, contentContainerStyle }: ScreenProps) {
  return (
    <View style={styles.root}>
      <BackgroundEffects />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.content, contentContainerStyle]}
      >
        {children}
      </ScrollView>
    </View>
  );
}

export function BackgroundEffects() {
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={[styles.glow, styles.glowBlue]} />
      <View style={[styles.glow, styles.glowGold]} />
      <View style={styles.lineOne} />
      <View style={styles.lineTwo} />
    </View>
  );
}

export function BrandMark({ size = 48 }: { size?: number }) {
  return (
    <View
      style={[
        styles.brandMark,
        {
          width: size,
          height: size,
          borderRadius: size / 2.6,
        },
      ]}
    >
      <ShiftPayLogo size={size * 0.86} />
    </View>
  );
}

export function GlassCard({
  children,
  style,
}: {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function PrimaryButton({
  title,
  onPress,
  disabled,
  style,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.primaryButton,
        disabled && styles.primaryButtonDisabled,
        style,
      ]}
    >
      <Text style={styles.primaryButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function SecondaryButton({
  title,
  onPress,
  destructive,
}: {
  title: string;
  onPress: () => void;
  destructive?: boolean;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.secondaryButton,
        destructive && styles.secondaryButtonDestructive,
      ]}
    >
      <Text
        style={[
          styles.secondaryButtonText,
          destructive && styles.secondaryButtonTextDestructive,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
    </View>
  );
}

export function NumberField({
  label,
  value,
  onChange,
  placeholder = "0",
  style,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
}) {
  function handleChange(text: string) {
    const cleaned = text
      .replace(",", ".")
      .replace(/[^0-9.]/g, "")
      .replace(/^(\d*\.?\d*).*$/, "$1");

    onChange(cleaned);
  }

  return (
    <View style={[styles.field, style]}>
      <Text style={styles.fieldLabel}>{label}</Text>

      <TextInput
        value={value}
        onChangeText={handleChange}
        keyboardType="decimal-pad"
        placeholder={placeholder}
        placeholderTextColor={theme.colors.muted2}
        style={styles.fieldInput}
      />
    </View>
  );
}

export function ScreenTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.titleWrap}>
      <Text style={styles.screenTitle}>{title}</Text>
      {subtitle ? <Text style={styles.screenSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

export function StatCard({
  label,
  value,
  small,
}: {
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <GlassCard style={small ? styles.statCardSmall : styles.statCard}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, small && styles.statValueSmall]}>
        {value}
      </Text>
    </GlassCard>
  );
}

export const sharedText = StyleSheet.create({
  muted: {
    color: theme.colors.muted,
  },
  body: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  label: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: "600",
  },
  strong: {
    color: theme.colors.text,
    fontWeight: "800",
  },
} satisfies Record<string, TextStyle>);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: 20,
    paddingTop: 62,
    paddingBottom: 120,
  },
  glow: {
    position: "absolute",
    width: 260,
    height: 260,
    borderRadius: 260,
    opacity: 0.14,
  },
  glowBlue: {
    backgroundColor: theme.colors.blue,
    top: -90,
    right: -120,
  },
  glowGold: {
    backgroundColor: theme.colors.gold,
    bottom: -120,
    left: -130,
    opacity: 0.09,
  },
  lineOne: {
    position: "absolute",
    width: 1,
    height: 520,
    backgroundColor: "rgba(255,255,255,0.045)",
    transform: [{ rotate: "34deg" }],
    top: 70,
    right: 70,
  },
  lineTwo: {
    position: "absolute",
    width: 1,
    height: 420,
    backgroundColor: "rgba(255,255,255,0.035)",
    transform: [{ rotate: "-28deg" }],
    bottom: 40,
    left: 80,
  },
  brandMark: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(34,197,94,0.16)",
    borderWidth: 1,
    borderColor: "rgba(34,197,94,0.35)",
    overflow: "hidden",
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.lg,
    padding: 18,
  },
  primaryButton: {
    backgroundColor: theme.colors.green,
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButtonDisabled: {
    opacity: 0.45,
  },
  primaryButtonText: {
    color: theme.colors.greenDark,
    fontSize: 16,
    fontWeight: "900",
  },
  secondaryButton: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonDestructive: {
    backgroundColor: theme.colors.dangerSoft,
    borderColor: "rgba(239,68,68,0.35)",
  },
  secondaryButtonText: {
    color: theme.colors.text,
    fontSize: 15,
    fontWeight: "800",
  },
  secondaryButtonTextDestructive: {
    color: "#FCA5A5",
  },
  emptyState: {
    marginTop: 90,
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "900",
    textAlign: "center",
  },
  emptyBody: {
    color: theme.colors.muted,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
  },
  field: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  fieldLabel: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },
  fieldInput: {
    color: theme.colors.text,
    fontSize: 24,
    fontWeight: "800",
    paddingVertical: 2,
  },
  titleWrap: {
    marginBottom: 18,
  },
  screenTitle: {
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -0.8,
  },
  screenSubtitle: {
    color: theme.colors.muted,
    marginTop: 4,
    fontSize: 15,
  },
  statCard: {
    marginTop: 14,
  },
  statCardSmall: {
    flex: 1,
    minHeight: 112,
  },
  statLabel: {
    color: theme.colors.muted,
    fontSize: 13,
    fontWeight: "700",
  },
  statValue: {
    color: theme.colors.text,
    fontSize: 34,
    fontWeight: "900",
    marginTop: 8,
    letterSpacing: -0.8,
  },
  statValueSmall: {
    fontSize: 26,
  },
});