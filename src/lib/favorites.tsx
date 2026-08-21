import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'quickbite_favorites';

export type FavoriteMeal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export async function getFavorites(): Promise<FavoriteMeal[]> {
  const raw = await AsyncStorage.getItem(FAVORITES_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function isFavorite(idMeal: string): Promise<boolean> {
  const favorites = await getFavorites();
  return favorites.some((f) => f.idMeal === idMeal);
}

export async function addFavorite(meal: FavoriteMeal): Promise<void> {
  const favorites = await getFavorites();
  if (favorites.some((f) => f.idMeal === meal.idMeal)) return;
  const updated = [...favorites, meal];
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}

export async function removeFavorite(idMeal: string): Promise<void> {
  const favorites = await getFavorites();
  const updated = favorites.filter((f) => f.idMeal !== idMeal);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
}
