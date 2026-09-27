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
    <PressableScale onPress={onPress} accessibilityLabel={label} style={styles.link}>
      {(hovered) => (
        <>
          <View style={[styles.orb, hovered && styles.orbHovered]}>
            <Icon name="arrow-left" size={15} color={hovered ? colors.gold : colors.text} />
          </View>
          <Text style={[styles.label, hovered && styles.labelHovered]}>{label}</Text>
        </>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  link: { flexDirection: "row", alignItems: "center", gap: 12, alignSelf: "flex-start", paddingRight: 8 },
  orb: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  orbHovered: { borderColor: colors.goldLine, transform: [{ translateX: -3 }] },
  label: { fontFamily: fonts.semibold, fontSize: 13, color: colors.muted },
  labelHovered: { color: colors.text },
});
