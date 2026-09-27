import { ChakraPetch_500Medium, ChakraPetch_600SemiBold, ChakraPetch_700Bold } from "@expo-google-fonts/chakra-petch";
import { Manrope_400Regular, Manrope_500Medium, Manrope_600SemiBold, Manrope_700Bold } from "@expo-google-fonts/manrope";
import { Syncopate_400Regular, Syncopate_700Bold } from "@expo-google-fonts/syncopate";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SoundProvider } from "../sound/SoundContext";
import { ShowroomProvider } from "../state/ShowroomContext";
import { colors } from "../theme/tokens";
import { installWebGlobals } from "../theme/webGlobals";

installWebGlobals();

export default function RootLayout() {
  const [loaded] = useFonts({
    Syncopate_400Regular,
    Syncopate_700Bold,
    ChakraPetch_500Medium,
    ChakraPetch_600SemiBold,
    ChakraPetch_700Bold,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  if (!loaded) return <View style={{ flex: 1, backgroundColor: colors.background }} />;

  return (
    <SoundProvider>
      <ShowroomProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: "fade",
          }}
        />
      </ShowroomProvider>
    </SoundProvider>
  );
}
