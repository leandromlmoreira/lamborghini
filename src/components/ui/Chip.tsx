import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../theme/tokens";
import { PressableScale } from "./PressableScale";

type Props = {
  label: string;
  count?: number;
  active: boolean;
  onPress: () => void;
};

export function Chip({ label, count, active, onPress }: Props) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={label} accessibilityState={{ selected: active }} cue="tick">
      {(hovered) => (
        <View style={[styles.chip, hovered && styles.hovered, active && styles.active]}>
          <Text style={[styles.label, (hovered || active) && styles.labelOn]}>{label}</Text>
          {count !== undefined && <Text style={[styles.count, active && styles.countActive]}>{String(count).padStart(2, "0")}</Text>}
          <View style={[styles.rail, active && styles.railActive]} />
        </View>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "rgba(255,255,255,0.02)",
    overflow: "hidden",
  },
  hovered: { borderColor: colors.lineStrong },
  active: { borderColor: colors.accentLine, backgroundColor: colors.accentSoft },
  label: { fontFamily: fonts.techSemibold, fontSize: 13, letterSpacing: 1, color: colors.muted, textTransform: "uppercase" },
  labelOn: { color: colors.text },
  count: { fontFamily: fonts.tech, fontSize: 12, color: colors.faint },
  countActive: { color: colors.accent },
  rail: { position: "absolute", left: 12, right: 12, bottom: 0, height: 2, backgroundColor: "transparent" },
  railActive: { backgroundColor: colors.accent },
});
