import { useColorScheme } from 'react-native';

export const lightTheme = {
  colors: {
    background: '#ffffff',
    text: '#000000',
    subtitle: '#666666',
    primary: '#007aff',
  },
  typography: {
    h1: { fontSize: 28, fontWeight: 'bold' },
    h2: { fontSize: 20, fontWeight: '600' },
    body: { fontSize: 16 },
  },
};

export const darkTheme = {
  colors: {
    background: '#000000',
    text: '#ffffff',
    subtitle: '#cccccc',
    primary: '#0a84ff',
  },
  typography: lightTheme.typography, // usually same sizes
};

// Hook to get the active theme
export function useTheme() {
  const scheme = useColorScheme(); // "light" | "dark"
  return scheme === 'dark' ? darkTheme : lightTheme;
}
