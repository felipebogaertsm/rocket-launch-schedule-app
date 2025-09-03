import { StyleSheet, useColorScheme } from 'react-native';

type Palette = {
  background: string;
  text: string;
  subtitle: string;
  primary: string;
};

const light: Palette = {
  background: '#ffffff',
  text: '#111111',
  subtitle: '#666666',
  primary: '#4e8cff',
};

const dark: Palette = {
  background: '#0b0b0c',
  text: '#ffffff',
  subtitle: '#9aa0a6',
  primary: '#8ab4f8',
};

const typography = StyleSheet.create({
  h1: { fontSize: 28, fontWeight: '700' },
  h2: { fontSize: 20, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
});

export type Theme = {
  colors: Palette;
  typography: typeof typography;
};

export function useTheme(): Theme {
  const isDark = useColorScheme() === 'dark';
  return { colors: isDark ? dark : light, typography };
}
