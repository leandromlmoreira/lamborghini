import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../theme/tokens";

type Props = {
  value: string;
  unit: string;
  label: string;
  size?: number;
  accent?: boolean;
};

export function Readout({ value, unit, label, size = 28, accent = false }: Props) {
  return (
    <View style={styles.cell}>
      <View style={styles.line}>
        <Text style={[styles.value, { fontSize: size, lineHeight: Math.round(size * 1.05) }, accent && styles.accent]}>{value}</Text>
        <Text style={[styles.unit, { fontSize: Math.max(11, Math.round(size * 0.36)) }]}>{unit}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: { gap: 6 },
  line: { flexDirection: "row", alignItems: "baseline", gap: 5 },
  value: { fontFamily: fonts.techBold, color: colors.text, fontVariant: ["tabular-nums"], letterSpacing: -0.5 },
  accent: { color: colors.accent },
  unit: { fontFamily: fonts.techSemibold, color: colors.muted, textTransform: "uppercase", letterSpacing: 0.8 },
  label: { fontFamily: fonts.techSemibold, fontSize: 11, letterSpacing: 1.6, color: colors.faint, textTransform: "uppercase" },
});
