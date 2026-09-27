import { Stack } from "expo-router";
import { GarageScreen } from "../screens/GarageScreen";

export default function GarageRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Toro · Minha garagem" }} />
      <GarageScreen />
    </>
  );
}
