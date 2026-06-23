import { Image, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

type ShiftPayLogoProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function ShiftPayLogo({ size = 88, style }: ShiftPayLogoProps) {
  return (
    <View
      style={[
        styles.container,
        {
          width: size,
          height: size,
        },
        style,
      ]}
    >
      <Image
        source={require('../assets/images/splash-icon.png')}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});