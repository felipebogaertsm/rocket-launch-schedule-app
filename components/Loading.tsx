import { ActivityIndicator, View } from 'react-native';

export default function Loading() {
  return (
    <View
      style={{
        paddingVertical: 24,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator />
    </View>
  );
}
