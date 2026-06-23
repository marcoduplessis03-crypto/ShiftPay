import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { hasSeenWelcome, setWelcomeSeen } from '../lib/storage';
import { ShiftPayLogo } from '../components/ShiftPayLogo';

export default function WelcomeScreen() {
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkWelcomeStatus() {
      const seen = await hasSeenWelcome();

      if (!mounted) return;

      if (seen) {
        router.replace('/(tabs)/calculator');
      } else {
        setChecking(false);
      }
    }

    checkWelcomeStatus();

    return () => {
      mounted = false;
    };
  }, []);

  async function handleStart() {
    await setWelcomeSeen();
    router.replace('/(tabs)/calculator');
  }

  if (checking) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4ade80" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <ShiftPayLogo size={150} style={styles.logo} />

        <Text style={styles.title}>Track your shift. Know your pay.</Text>

        <Text style={styles.subtitle}>
          A simple offline calculator for hourly workers to estimate earnings,
          save shifts, and view history.
        </Text>

        <TouchableOpacity activeOpacity={0.85} style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#101820',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#101820',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#172430',
    borderRadius: 28,
    padding: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 22,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#b8c4ce',
    marginBottom: 28,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4ade80',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 18,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#07130c',
    fontSize: 17,
    fontWeight: '800',
  },
});