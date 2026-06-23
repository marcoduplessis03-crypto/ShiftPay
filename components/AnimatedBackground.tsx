import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/constants/theme';

export function AnimatedBackground() {
  const t = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(t, { toValue: 1, duration: 5200, useNativeDriver: true }),
        Animated.timing(t, { toValue: 0, duration: 5200, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const orb1 = {
    transform: [
      { translateY: t.interpolate({ inputRange: [0, 1], outputRange: [-18, 28] }) },
      { scale: t.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] }) },
    ],
  };

  const orb2 = {
    transform: [
      { translateX: t.interpolate({ inputRange: [0, 1], outputRange: [22, -22] }) },
      { translateY: t.interpolate({ inputRange: [0, 1], outputRange: [18, -12] }) },
    ],
  };

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <LinearGradient colors={[colors.bg, colors.bg2, colors.bg]} style={StyleSheet.absoluteFill} />
      <View style={styles.grid} />
      <Animated.View style={[styles.orb, styles.orbOne, orb1 as any]} />
      <Animated.View style={[styles.orb, styles.orbTwo, orb2 as any]} />
      <View style={styles.lineOne} />
      <View style={styles.lineTwo} />
      <View style={styles.lineThree} />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(77,225,255,0.055)',
  },
  orb: {
    position: 'absolute',
    width: 230,
    height: 230,
    borderRadius: 999,
    opacity: 0.16,
  },
  orbOne: {
    top: 55,
    left: -110,
    backgroundColor: 'rgba(77,225,255,0.85)',
  },
  orbTwo: {
    bottom: 120,
    right: -120,
    backgroundColor: 'rgba(147,94,255,0.75)',
  },
  lineOne: {
    position: 'absolute',
    top: 145,
    left: -20,
    width: 430,
    height: 1,
    backgroundColor: 'rgba(77,225,255,0.12)',
    transform: [{ rotate: '-18deg' }],
  },
  lineTwo: {
    position: 'absolute',
    top: 335,
    left: -60,
    width: 520,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.07)',
    transform: [{ rotate: '24deg' }],
  },
  lineThree: {
    position: 'absolute',
    bottom: 170,
    left: -40,
    width: 440,
    height: 1,
    backgroundColor: 'rgba(77,225,255,0.08)',
    transform: [{ rotate: '-8deg' }],
  },
});