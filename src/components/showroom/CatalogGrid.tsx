import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import type { ShowroomCar } from "../../domain/catalog";
import type { Garage } from "../../domain/garage";
import { useLayout } from "../../hooks/useLayout";
import { CarTile } from "../car/CarTile";
import { TileSkeleton } from "./TileSkeleton";
import { wideSlots } from "./bento";

type Props = {
  cars: ShowroomCar[];
  garage: Garage;
  loading: boolean;
  onToggle: (id: number) => void;
};

const GAP = 20;

export function CatalogGrid({ cars, garage, loading, onToggle }: Props) {
  const { contentWidth, columns } = useLayout();
  const tileWidth = Math.floor((contentWidth - GAP * (columns - 1)) / columns);
  const wide = wideSlots(cars.length, columns);

  if (loading) {
    return (
      <View style={styles.grid}>
        {Array.from({ length: columns * 2 }, (_, index) => (
          <TileSkeleton key={index} width={tileWidth} />
        ))}
      </View>
    );
  }

  return (
    <View style={styles.grid}>
      {cars.map((car, index) => (
        <CarTile
          key={car.id}
          car={car}
          order={index}
          width={wide.has(index) ? tileWidth * 2 + GAP : tileWidth}
          featured={wide.has(index)}
          quantity={garage[car.id] ?? 0}
          onOpen={(id) => router.push(`/carro/${id}`)}
          onToggle={onToggle}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", gap: GAP },
});
