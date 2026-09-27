import { StyleSheet, View } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { colors } from "../../theme/tokens";

export function Backdrop() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
        <Defs>
          <RadialGradient id="backdrop-top" cx="50%" cy="-10%" r="75%">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.07} />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="backdrop-side" cx="100%" cy="30%" r="55%">
            <Stop offset="0" stopColor={colors.accent} stopOpacity={0.045} />
            <Stop offset="1" stopColor={colors.accent} stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={100} height={100} fill="url(#backdrop-top)" />
        <Rect x={0} y={0} width={100} height={100} fill="url(#backdrop-side)" />
      </Svg>
    </View>
  );
}
