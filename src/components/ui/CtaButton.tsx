import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../theme/tokens";
import { Icon, type IconName } from "../icons/Icon";
import { PressableScale } from "./PressableScale";

type Props = {
  label: string;
  onPress: () => void;
  variant?: "solid" | "ghost";
  icon?: IconName;
};

export function CtaButton({ label, onPress, variant = "solid", icon = "arrow-right" }: Props) {
  const solid = variant === "solid";
  const ink = solid ? colors.onGold : colors.text;
  return (
    <PressableScale onPress={onPress} accessibilityLabel={label} style={[styles.button, solid ? styles.solid : styles.ghost]}>
      {(hovered) => (
        <>
          <Text style={[styles.label, { color: ink }]}>{label}</Text>
          <View style={[styles.orb, solid ? styles.orbSolid : styles.orbGhost, hovered && styles.orbHovered]}>
            <Icon name={icon} size={16} color={ink} strokeWidth={1.8} />
          </View>
        </>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingLeft: 22,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  solid: { backgroundColor: colors.gold },
  ghost: { backgroundColor: colors.shell, borderWidth: 1, borderColor: colors.hairlineStrong },
  label: { fontFamily: fonts.bold, fontSize: 14, letterSpacing: 0.2 },
  orb: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
  orbSolid: { backgroundColor: "rgba(20,16,5,0.12)" },
  orbGhost: { backgroundColor: colors.highlight },
  orbHovered: { transform: [{ translateX: 3 }, { scale: 1.05 }] },
});
