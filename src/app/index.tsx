import { Stack } from "expo-router";
import { ShowroomScreen } from "../screens/ShowroomScreen";

export default function ShowroomRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Toro · Showroom" }} />
      <ShowroomScreen />
    </>
  );
}
