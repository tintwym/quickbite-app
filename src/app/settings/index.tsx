import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const MENU_ITEMS = [
  { icon: '🔔', label: 'Notifications', route: '/settings/notifications' },
  { icon: '👤', label: 'Account', route: '/settings/notifications' },
  { icon: 'ℹ️', label: 'About QuickBite', route: '/settings/notifications' },
];

export default function SettingsMenuScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.menu}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.item}
            onPress={() => router.push(item.route as any)}
          >
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.label}>{item.label}</Text>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: { fontSize: 22, fontWeight: '700', color: '#ff6b35' },
  menu: { paddingHorizontal: 16, paddingTop: 8 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  icon: { fontSize: 20, marginRight: 14 },
  label: { fontSize: 16, flex: 1 },
  chevron: { fontSize: 20, color: '#ccc' },
});
