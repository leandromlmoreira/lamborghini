import { Stack, useLocalSearchParams } from "expo-router";
import { DetailScreen } from "../../screens/DetailScreen";
import { useShowroom } from "../../state/ShowroomContext";

export default function CarRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { cars } = useShowroom();
  const carId = Number(id);
  const name = cars.find((car) => car.id === carId)?.name;

  return (
    <>
      <Stack.Screen options={{ title: name ? `Toro · ${name}` : "Toro · Ficha" }} />
      <DetailScreen id={carId} />
    </>
  );
}
