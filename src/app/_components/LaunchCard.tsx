import { formatDateTimeISO } from '@/common/date';
import { useTheme } from '@/styles/theme';
import type { LL2Launch } from '@/types/launches';
import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

export default function LaunchCard({ launch }: { launch: LL2Launch }) {
  const { colors, typography } = useTheme();

  const provider = launch.launch_service_provider?.name;
  const pad = launch.pad?.name;
  const place = launch.pad?.location?.name;
  const when = formatDateTimeISO(launch.net);
  const status = launch.status?.name ?? 'TBD';

  return (
    <Link href={`/launches/${launch.id}`} asChild>
      <Pressable
        style={{
          flexDirection: 'row',
          gap: 12,
          padding: 16,
          backgroundColor: colors.background,
        }}
      >
        {launch.image ? (
          <Image
            source={{ uri: launch.image }}
            style={{
              width: 96,
              height: 96,
              borderRadius: 8,
              backgroundColor: colors.subtitle,
            }}
            resizeMode="cover"
          />
        ) : (
          <View
            style={{
              width: 96,
              height: 96,
              borderRadius: 8,
              backgroundColor: colors.subtitle,
            }}
          />
        )}

        <View style={{ flex: 1 }}>
          <Text
            style={[typography.h2, { color: colors.text }]}
            numberOfLines={2}
          >
            {launch.name}
          </Text>

          <Text style={{ color: colors.subtitle, marginTop: 2 }}>{when}</Text>

          <Text style={{ color: colors.subtitle }} numberOfLines={1}>
            {provider ?? 'Unknown provider'}
            {pad ? ` • ${pad}` : ''}
            {place ? ` — ${place}` : ''}
          </Text>

          <Text style={{ marginTop: 6, color: colors.primary }}>{status}</Text>
        </View>
      </Pressable>
    </Link>
  );
}
