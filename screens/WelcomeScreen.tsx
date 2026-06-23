import React, { useState } from 'react';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { PrimaryButton } from '@/components/PrimaryButton';
import { colors } from '@/constants/theme';
import { setOnboarded } from '@/lib/storage/onboarding';

const slides = [
  {
    title: 'ShiftPay',
    subtitle: 'Hourly Pay Calculator',
    body: 'Calculate. Track. Earn.',
  },
  {
    title: 'Smart Calculations',
    subtitle: 'Regular pay, overtime and breaks',
    body: 'Everything you need to stay on top of your shifts.',
  },
  {
    title: 'Your Data. Yours.',
    subtitle: 'Works fully offline',
    body: 'No account. No email. Your shifts stay on your device.',
  },
];

export default function WelcomeScreen() {
  const [page, setPage] = useState(0);
  const slide = slides[page];

  async function finish() {
  await setOnboarded();
  router.replace('/(tabs)');
}

  function next() {
    if (page < slides.length - 1) setPage(page + 1);
    else finish();
  }

  return (
    <View style={styles.root}>
      <AnimatedBackground />
      <SafeAreaView style={styles.safe}>
        <View style={styles.center}>
          <View style={styles.logoOrb}>
            <Text style={styles.clock}>◷</Text>
            <Text style={styles.wallet}>▣</Text>
          </View>

          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.subtitle}>{slide.subtitle}</Text>
          <Text style={styles.body}>{slide.body}</Text>

          <View style={styles.dots}>
            {slides.map((_, i) => (
              <View key={i} style={[styles.dot, i === page && styles.activeDot]} />
            ))}
          </View>
        </View>

        <View style={styles.bottom}>
          <PrimaryButton title={page === slides.length - 1 ? 'Start Calculating' : 'Continue'} onPress={next} />
          <Pressable onPress={finish}>
            <Text style={styles.skip}>Skip</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  safe: { flex: 1, padding: 24 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoOrb: {
    width: 170,
    height: 170,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.cyan,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(77,225,255,0.08)',
    marginBottom: 38,
  },
  clock: { color: colors.cyan, fontSize: 76, fontWeight: '900' },
  wallet: { color: colors.blue, fontSize: 42, marginTop: -18 },
  title: { color: colors.text, fontSize: 46, fontWeight: '900', textAlign: 'center' },
  subtitle: { color: colors.muted, fontSize: 18, marginTop: 10, textAlign: 'center' },
  body: { color: colors.text, fontSize: 22, fontWeight: '800', marginTop: 42, textAlign: 'center' },
  dots: { flexDirection: 'row', gap: 10, marginTop: 34 },
  dot: { width: 10, height: 10, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.25)' },
  activeDot: { backgroundColor: colors.cyan, width: 26 },
  bottom: { gap: 18 },
  skip: { color: colors.muted, textAlign: 'center', fontSize: 16, fontWeight: '700' },
});