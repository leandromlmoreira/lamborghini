import { StyleSheet, Text, View } from "react-native";
import { colors, fonts, skew, unskew } from "../../theme/tokens";
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
  const ink = solid ? colors.onAccent : colors.text;
  return (
    <PressableScale onPress={onPress} accessibilityLabel={label} pressedScale={0.96} wrapperStyle={styles.wrap}>
      {(hovered) => (
        <View style={[styles.button, solid ? styles.solid : styles.ghost, hovered && (solid ? styles.solidHover : styles.ghostHover)]}>
          <View style={styles.content}>
            <Text style={[styles.label, { color: ink }]}>{label}</Text>
            <View style={[styles.icon, hovered && styles.iconHovered]}>
              <Icon name={icon} size={16} color={solid ? ink : hovered ? colors.accent : ink} strokeWidth={1.8} />
            </View>
          </View>
        </View>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  wrap: { alignSelf: "flex-start" },
  button: {
    height: 50,
    paddingHorizontal: 26,
    justifyContent: "center",
    borderRadius: 6,
    transform: [{ skewX: skew }],
  },
  solid: { backgroundColor: colors.accent },
  solidHover: { backgroundColor: "#D8FF52" },
  ghost: { borderWidth: 1, borderColor: colors.lineStrong, backgroundColor: "rgba(255,255,255,0.02)" },
  ghostHover: { borderColor: colors.accentLine, backgroundColor: colors.accentSoft },
  content: { flexDirection: "row", alignItems: "center", gap: 14, transform: [{ skewX: unskew }] },
  label: { fontFamily: fonts.techBold, fontSize: 14, letterSpacing: 1.6, textTransform: "uppercase" },
  icon: { width: 18, alignItems: "center" },
  iconHovered: { transform: [{ translateX: 4 }] },
});
