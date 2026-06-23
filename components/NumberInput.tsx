import React from 'react';
import { Text, TextInput, StyleSheet, View, KeyboardTypeOptions } from 'react-native';
import { colors } from '@/constants/theme';

export function NumberInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'numeric',
}: {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="rgba(255,255,255,0.32)"
        keyboardType={keyboardType}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    minWidth: '47%',
    marginBottom: 12,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    marginBottom: 7,
    fontWeight: '700',
  },
  input: {
    height: 52,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.line,
    paddingHorizontal: 14,
    color: colors.text,
    backgroundColor: 'rgba(255,255,255,0.08)',
    fontSize: 16,
    fontWeight: '700',
  },
});