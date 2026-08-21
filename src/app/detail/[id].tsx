import { addFavorite, isFavorite, removeFavorite } from "@/lib/favorites";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

type MealDetail = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory: string;
  strArea: string;
};

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [meal, setMeal] = useState<MealDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMeal(data.meals?.[0] ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    isFavorite(id).then(setFavorite);
  }, [id]);

  const toggleFavorite = async () => {
    if (!meal) return;
    if (favorite) {
      await removeFavorite(meal.idMeal);
      setFavorite(false);
    } else {
      await addFavorite({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
      });
      setFavorite(true);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff6b35" />
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={styles.center}>
        <Text>Recipe not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{meal.strMeal}</Text>
          <TouchableOpacity onPress={toggleFavorite} style={styles.favButton}>
            <Text style={styles.favIcon}>{favorite ? "❤️" : "🤍"}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.meta}>
          {meal.strCategory} · {meal.strArea}
        </Text>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructions}>{meal.strInstructions}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 240 },
  content: { padding: 20 },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { fontSize: 24, fontWeight: "700", flexShrink: 1, marginRight: 12 },
  favButton: { padding: 4 },
  favIcon: { fontSize: 26 },
  meta: { color: "#888", marginBottom: 16, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  instructions: { fontSize: 15, lineHeight: 22, color: "#333" },
});
