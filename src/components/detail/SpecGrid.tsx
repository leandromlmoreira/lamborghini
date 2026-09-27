import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../theme/tokens";

export type Spec = { label: string; value: string };

export function SpecGrid({ specs }: { specs: Spec[] }) {
  return (
    <View style={styles.grid}>
      {specs.map((spec, index) => (
        <View key={spec.label} style={[styles.cell, index % 2 === 1 && styles.cellRight, index >= 2 && styles.cellLower]}>
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
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { flexBasis: "50%", paddingVertical: 14, paddingRight: 16, gap: 6 },
  cellRight: { paddingLeft: 16, paddingRight: 0, borderLeftWidth: 1, borderLeftColor: colors.line },
  cellLower: { borderTopWidth: 1, borderTopColor: colors.line },
  label: { fontFamily: fonts.techSemibold, fontSize: 11, letterSpacing: 1.8, color: colors.faint, textTransform: "uppercase" },
  value: { fontFamily: fonts.techBold, fontSize: 18, color: colors.text },
});
