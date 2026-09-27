import { StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { colors } from "../../theme/tokens";

export function TopScrim({ height }: { height: number }) {
  return (
    <View style={[styles.scrim, { height }]} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 10 10" preserveAspectRatio="none">
        <Defs>
          <LinearGradient id="top-scrim" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={colors.background} stopOpacity={1} />
            <Stop offset="0.55" stopColor={colors.background} stopOpacity={0.85} />
            <Stop offset="1" stopColor={colors.background} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={10} height={10} fill="url(#top-scrim)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  scrim: { position: "absolute", top: 0, left: 0, right: 0, zIndex: 9 },
});
