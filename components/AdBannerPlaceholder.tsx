import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export function AdBannerPlaceholder() {
  return (
    <View style={styles.box}>
      <Text style={styles.title}>Upgrade to ShiftPay Pro</Text>
      <Text style={styles.sub}>Remove ads • Export reports • Multiple jobs</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    minHeight: 76,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(77,225,255,0.24)',
    backgroundColor: 'rgba(77,225,255,0.07)',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 14,
    padding: 12,
  },
  title: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 15,
  },
  sub: {
    color: colors.muted,
    marginTop: 4,
    fontSize: 12,
  },
});