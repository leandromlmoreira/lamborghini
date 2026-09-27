import { StyleSheet, Text, View } from "react-native";
import Svg, { Polygon } from "react-native-svg";
import { colors, fonts } from "../../theme/tokens";

type Props = {
  compact?: boolean;
};

export function MarkGlyph({ size = 26 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Polygon points="7,7 30,7 26.5,13 3.5,13" fill={colors.accent} />
      <Polygon points="14,15 20.5,15 14.5,27 8,27" fill={colors.accent} />
      <Polygon points="23,15 27.5,15 26,18 21.5,18" fill={colors.text} opacity={0.85} />
    </Svg>
  );
}

export function Mark({ compact = false }: Props) {
  return (
    <View style={styles.row}>
      <MarkGlyph />
      {!compact && <Text style={styles.word}>TORO</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  word: { fontFamily: fonts.display, color: colors.text, fontSize: 15, letterSpacing: 5 },
});
