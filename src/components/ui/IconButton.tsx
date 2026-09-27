import { StyleSheet, View } from "react-native";
import type { Cue } from "../../sound/patches";
import { colors } from "../../theme/tokens";
import { Icon, type IconName } from "../icons/Icon";
import { PressableScale } from "./PressableScale";

type Props = {
  icon: IconName;
  label: string;
  onPress: () => void;
  active?: boolean;
  size?: number;
  cue?: Cue;
};

export function IconButton({ icon, label, onPress, active = false, size = 40, cue = "click" }: Props) {
  return (
    <PressableScale onPress={onPress} accessibilityLabel={label} pressedScale={0.88} cue={cue}>
      {(hovered) => (
        <View style={[styles.button, { width: size, height: size }, hovered && styles.hovered, active && styles.active]}>
          <Icon name={icon} size={Math.round(size * 0.44)} color={active ? colors.onAccent : hovered ? colors.accent : colors.text} />
        </View>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "rgba(5,5,6,0.66)",
    borderWidth: 1,
    borderColor: colors.lineStrong,
  },
  hovered: { borderColor: colors.accentLine },
  active: { borderColor: colors.accent, backgroundColor: colors.accent },
});
