import React, { useCallback, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { getFavorites, FavoriteMeal } from '@/lib/favorites';

export default function ExploreScreen() {
  const router = useRouter();
  const [favorites, setFavorites] = useState<FavoriteMeal[]>([]);

  // Reload favorites every time this tab comes into focus,
  // so it reflects whatever was just saved on the detail screen.
  useFocusEffect(
    useCallback(() => {
      getFavorites().then(setFavorites);
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No favorites yet. Tap the heart on a recipe to save it here.</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idMeal}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/detail/${item.idMeal}`)}
            >
              <Image source={{ uri: item.strMealThumb }} style={styles.thumb} />
              <Text style={styles.cardTitle}>{item.strMeal}</Text>
            </TouchableOpacity>
          )}
        />
      )}
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
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 12,
    padding: 10,
  },
  thumb: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  cardTitle: { fontSize: 16, fontWeight: '600', flexShrink: 1 },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
  emptyText: { textAlign: 'center', color: '#888', fontSize: 15 },
});
