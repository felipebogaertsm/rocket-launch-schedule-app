import { Pressable, Text, View } from 'react-native';

export default function ErrorView({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <View style={{ padding: 16, alignItems: 'center' }}>
      <Text style={{ color: '#f66', textAlign: 'center', marginBottom: 8 }}>
        {message ?? 'Something went wrong.'}
      </Text>
      {onRetry ? (
        <Pressable
          onPress={onRetry}
          style={{
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderWidth: 1,
            borderRadius: 8,
          }}
        >
          <Text>Retry</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
