import { StyleSheet } from 'react-native';

type Palette = {
  background: string;
  text: string;
  subtitle: string;
  primary: string;
};

const colorPalette: Palette = {
  background: '#ffffff',
  text: '#111111',
  subtitle: '#666666',
  primary: '#4e8cff',
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
  return { colors: colorPalette, typography };
}
