import { StyleSheet, View } from "react-native";
import Svg, { Defs, RadialGradient, Rect, Stop } from "react-native-svg";
import { colors } from "../../theme/tokens";

export function Backdrop() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100">
        <Defs>
          <RadialGradient id="backdrop-top" cx="72%" cy="0%" r="70%">
            <Stop offset="0" stopColor={colors.gold} stopOpacity={0.1} />
            <Stop offset="1" stopColor={colors.gold} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id="backdrop-side" cx="0%" cy="80%" r="60%">
            <Stop offset="0" stopColor="#8FB8FF" stopOpacity={0.05} />
            <Stop offset="1" stopColor="#8FB8FF" stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={100} height={100} fill="url(#backdrop-top)" />
        <Rect x={0} y={0} width={100} height={100} fill="url(#backdrop-side)" />
      </Svg>
    </View>
  );
}
