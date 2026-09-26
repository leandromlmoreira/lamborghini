import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Car } from "../models/Car";
import { carImageUri } from "../models/Car";

type Props = {
  car: Car;
};

/** Converte "$450,000" em 450000. */
function priceToNumber(price: string): number {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}

function formatUsd(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

export default function CarCard({ car }: Props) {
  const [quantity, setQuantity] = useState(0);
  const unitPrice = priceToNumber(car.price);
  const subtotal = unitPrice * quantity;

  return (
    <View style={styles.card}>
      <Image source={{ uri: carImageUri(car.id) }} style={styles.image} resizeMode="contain" />

      <View style={styles.info}>
        <Text style={styles.name}>{car.carName}</Text>
        <Text style={styles.year}>{car.releaseYear}</Text>
        <Text style={styles.price}>{car.price}</Text>

        <View style={styles.priceControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setQuantity((q) => Math.max(0, q - 1))}
          >
            <Text style={styles.controlText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{quantity}</Text>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setQuantity((q) => q + 1)}
          >
            <Text style={styles.controlText}>+</Text>
          </TouchableOpacity>
        </View>

        {quantity > 0 && (
          <Text style={styles.subtotal}>Subtotal: {formatUsd(subtotal)}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#1a1a1f",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  image: {
    width: 120,
    height: 100,
    backgroundColor: "#0d0d10",
  },
  info: {
    flex: 1,
    padding: 12,
  },
  name: {
    color: "#f5f5f5",
    fontWeight: "700",
    fontSize: 15,
  },
  year: {
    color: "#9a9aa5",
    fontSize: 12,
    marginTop: 2,
  },
  price: {
    color: "#f4c542",
    fontWeight: "700",
    marginTop: 6,
  },
  priceControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  controlButton: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#3a3a45",
    alignItems: "center",
    justifyContent: "center",
  },
  controlText: {
    color: "#f5f5f5",
    fontWeight: "700",
  },
  quantity: {
    color: "#f5f5f5",
    minWidth: 20,
    textAlign: "center",
  },
  subtotal: {
    color: "#7ee787",
    fontSize: 12,
    marginTop: 6,
  },
});
