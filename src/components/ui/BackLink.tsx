import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../theme/tokens";
import { Icon } from "../icons/Icon";
import { PressableScale } from "./PressableScale";

type Props = {
  label: string;
  onPress: () => void;
};

export function BackLink({ label, onPress }: Props) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={label} wrapperStyle={styles.wrap}>
      {(hovered) => (
        <View style={styles.link}>
          <View style={[styles.icon, hovered && styles.iconHovered]}>
            <Icon name="arrow-left" size={16} color={hovered ? colors.accent : colors.text} />
          </View>
          <Text style={[styles.label, hovered && styles.labelHovered]}>{label}</Text>
        </View>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  wrap: { alignSelf: "flex-start" },
  link: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 6, paddingRight: 8 },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  iconHovered: { borderColor: colors.accentLine, transform: [{ translateX: -3 }] },
  label: { fontFamily: fonts.techSemibold, fontSize: 13, letterSpacing: 1.4, color: colors.muted, textTransform: "uppercase" },
  labelHovered: { color: colors.text },
});
