import { StyleSheet, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors, fonts } from "../../theme/tokens";

type Props = {
  compact?: boolean;
};

export function Mark({ compact = false }: Props) {
  return (
    <View style={styles.row}>
      <Svg width={26} height={26} viewBox="0 0 32 32" fill="none">
        <Path d="M16 2l12 7v14l-12 7-12-7V9z" stroke={colors.gold} strokeWidth={1.4} />
        <Path d="M9 11h14M16 11v12M11 7l5 4 5-4" stroke={colors.gold} strokeWidth={1.4} strokeLinecap="round" />
      </Svg>
      {!compact && <Text style={styles.word}>TORO</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  word: { fontFamily: fonts.display, color: colors.text, fontSize: 13, letterSpacing: 4 },
});
