import { formatDateTimeISO } from '@/common/date';
import type { LL2Launch } from '@/types/launches';
import { Link } from 'expo-router';
import { Image, Text, View } from 'react-native';

export default function LaunchCard({ launch }: { launch: LL2Launch }) {
  const provider = launch.launch_service_provider?.name;
  const pad = launch.pad?.name;
  const place = launch.pad?.location?.name;
  const when = formatDateTimeISO(launch.net);
  const status = launch.status?.name ?? 'TBD';

  return (
    <Link href={`/launches/${launch.id}`} asChild>
      <View style={{ flexDirection: 'row', gap: 12, padding: 16 }}>
        {launch.image ? (
          <Image
            source={{ uri: launch.image }}
            style={{
              width: 96,
              height: 96,
              borderRadius: 8,
              backgroundColor: '#222',
            }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 8,
              backgroundColor: '#222',
            }}
          />
        )}

        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: '700', fontSize: 16 }} numberOfLines={2}>
            {launch.name}
          </Text>
          <Text style={{ color: '#666', marginTop: 2 }}>{when}</Text>
          <Text style={{ color: '#666' }} numberOfLines={1}>
            {provider ?? 'Unknown provider'}
            {pad ? ` • ${pad}` : ''}
            {place ? ` — ${place}` : ''}
          </Text>
          <Text style={{ marginTop: 6, color: '#0a7' }}>{status}</Text>
        </View>
      </View>
    </Link>
  );
}
