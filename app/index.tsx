import { useTheme } from '@/styles/theme';
import { Link } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[theme.typography.h1, { color: theme.colors.text }]}>
        Welcome!
      </Text>
      <Text style={[theme.typography.h2, { color: theme.colors.subtitle }]}>
        Explore the latest rocket launches
      </Text>
      <Link href="/launches" asChild>
        <Button title="Go to Launches" color={theme.colors.primary} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
