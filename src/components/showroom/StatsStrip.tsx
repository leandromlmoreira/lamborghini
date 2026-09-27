import { StyleSheet, Text, View } from "react-native";
import { useLayout } from "../../hooks/useLayout";
import { colors, fonts } from "../../theme/tokens";

export type Stat = { label: string; value: string };

export function StatsStrip({ stats }: { stats: Stat[] }) {
  const { isMedium } = useLayout();
  return (
    <View style={styles.strip}>
      {stats.map((stat, index) => (
        <View
          key={stat.label}
          style={[styles.cell, { flexBasis: isMedium ? "25%" : "50%" }, index > 0 && isMedium && styles.divider]}
        >
          <Text style={styles.value}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 24,
    paddingVertical: 28,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.hairline,
  },
  cell: { paddingHorizontal: 4, gap: 8 },
  divider: { borderLeftWidth: 1, borderLeftColor: colors.hairline, paddingLeft: 24 },
  value: { fontFamily: fonts.display, fontSize: 20, color: colors.text },
  label: { fontFamily: fonts.medium, fontSize: 12, color: colors.muted, letterSpacing: 0.4 },
});
