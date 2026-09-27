import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../theme/tokens";

type Props = {
  label: string;
  tone?: "gold" | "muted";
};

export function Eyebrow({ label, tone = "gold" }: Props) {
  const gold = tone === "gold";
  const color = gold ? colors.gold : colors.muted;
  return (
    <View style={[styles.pill, gold ? styles.goldPill : styles.mutedPill]}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
  },
  goldPill: { backgroundColor: colors.goldSoft, borderColor: colors.goldLine },
  mutedPill: { backgroundColor: colors.shell, borderColor: colors.hairline },
  dot: { width: 5, height: 5, borderRadius: 3 },
  text: { fontFamily: fonts.semibold, fontSize: 10, letterSpacing: 2.2, textTransform: "uppercase" },
});
