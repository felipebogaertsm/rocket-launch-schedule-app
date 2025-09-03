import { Text, View } from 'react-native';

export default function EmptyState({ hint }: { hint?: string }) {
  return (
    <View style={{ padding: 24, alignItems: 'center' }}>
      <Text style={{ color: '#aaa' }}>No launches to show.</Text>
      {hint ? (
        <Text style={{ color: '#aaa', marginTop: 6 }}>{hint}</Text>
      ) : null}
    </View>
  );
}
