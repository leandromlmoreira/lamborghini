import { StyleSheet, Text } from "react-native";
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
    <PressableScale onPress={onPress} accessibilityLabel={label} style={[styles.chip, active && styles.active]}>
      {(hovered) => (
        <>
          <Text style={[styles.label, hovered && styles.labelHovered, active && styles.labelActive]}>{label}</Text>
          {count !== undefined && <Text style={[styles.count, active && styles.countActive]}>{count}</Text>}
        </>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.shell,
  },
  active: { backgroundColor: colors.text, borderColor: colors.text },
  label: { fontFamily: fonts.semibold, fontSize: 13, color: colors.muted },
  labelHovered: { color: colors.text },
  labelActive: { color: colors.background },
  count: { fontFamily: fonts.semibold, fontSize: 11, color: colors.faint },
  countActive: { color: colors.faint },
});
