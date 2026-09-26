import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CarCard from "./src/components/CarCard";
import { fetchCars } from "./src/services/api";
import type { Car } from "./src/models/Car";

/**
 * Lamborghini Catalog
 * Consome a API fake de carros da DIO com axios, mostra os cards com imagem,
 * ano e preço, e um contador de "quantidade a comprar" por carro.
 */
export default function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCars();
      setCars(data);
    } catch {
      setError("Não foi possível carregar os carros. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Text style={styles.title}>🏎️ Catálogo Lamborghini</Text>

      {loading && (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#f4c542" />
        </View>
      )}

      {!loading && error && (
        <View style={styles.center}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={load}>
            <Text style={styles.retryText}>Tentar novamente</Text>
          </TouchableOpacity>
        </View>
      )}

      {!loading && !error && (
        <FlatList
          data={cars}
          keyExtractor={(car) => String(car.id)}
          renderItem={({ item }) => <CarCard car={item} />}
          contentContainerStyle={styles.list}
          onRefresh={load}
          refreshing={loading}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101014",
  },
  title: {
    color: "#f5f5f5",
    fontSize: 20,
    fontWeight: "700",
    padding: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  errorText: {
    color: "#f5b0b0",
    fontSize: 14,
  },
  retryButton: {
    borderWidth: 1,
    borderColor: "#f4c542",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  retryText: {
    color: "#f4c542",
    fontWeight: "600",
  },
});
