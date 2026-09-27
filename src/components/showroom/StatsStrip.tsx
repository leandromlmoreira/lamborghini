import { StyleSheet, Text, View } from "react-native";
import { useLayout } from "../../hooks/useLayout";
import { colors, fonts } from "../../theme/tokens";

export type Stat = { label: string; value: string; unit?: string };

export function StatsStrip({ stats }: { stats: Stat[] }) {
  const { isMedium } = useLayout();
  return (
    <View style={styles.strip}>
      {stats.map((stat, index) => (
        <View
          key={stat.label}
          style={[styles.cell, { flexBasis: isMedium ? "25%" : "50%" }, index > 0 && isMedium && styles.divider]}
        >
          <Text style={styles.label}>{stat.label}</Text>
          <View style={styles.valueRow}>
            <Text style={[styles.value, { fontSize: isMedium ? 34 : 26 }]}>{stat.value}</Text>
            {stat.unit && <Text style={styles.unit}>{stat.unit}</Text>}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 28,
    paddingVertical: 28,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.line,
  },
  cell: { paddingHorizontal: 4, gap: 10 },
  divider: { borderLeftWidth: 1, borderLeftColor: colors.line, paddingLeft: 24 },
  valueRow: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  value: { fontFamily: fonts.techBold, color: colors.text, fontVariant: ["tabular-nums"], letterSpacing: -0.5 },
  unit: { fontFamily: fonts.techSemibold, fontSize: 13, color: colors.muted, textTransform: "uppercase" },
  label: { fontFamily: fonts.techSemibold, fontSize: 11, color: colors.faint, letterSpacing: 1.8, textTransform: "uppercase" },
});
