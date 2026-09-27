import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../theme/tokens";

export type Spec = { label: string; value: string };

export function SpecGrid({ specs }: { specs: Spec[] }) {
  return (
    <View style={styles.grid}>
      {specs.map((spec) => (
        <View key={spec.label} style={styles.cell}>
          <Text style={styles.label}>{spec.label}</Text>
          <Text style={styles.value} numberOfLines={1}>
            {spec.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", borderTopWidth: 1, borderLeftWidth: 1, borderColor: colors.hairline },
  cell: {
    flexBasis: "50%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 6,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.hairline,
  },
  label: { fontFamily: fonts.semibold, fontSize: 10, letterSpacing: 2, color: colors.faint, textTransform: "uppercase" },
  value: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
});
