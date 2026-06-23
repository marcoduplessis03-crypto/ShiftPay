import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = '@shiftpay_onboarded_v1';

export async function isOnboarded() {
  return (await AsyncStorage.getItem(KEY)) === 'true';
}

export async function setOnboarded() {
  await AsyncStorage.setItem(KEY, 'true');
}