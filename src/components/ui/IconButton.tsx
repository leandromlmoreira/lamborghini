import { StyleSheet } from "react-native";
import { colors } from "../../theme/tokens";
import { Icon, type IconName } from "../icons/Icon";
import { PressableScale } from "./PressableScale";

type Props = {
  icon: IconName;
  label: string;
  onPress: () => void;
  active?: boolean;
  size?: number;
};

export function IconButton({ icon, label, onPress, active = false, size = 40 }: Props) {
  return (
    <PressableScale
      onPress={onPress}
      accessibilityLabel={label}
      pressedScale={0.9}
      style={[styles.button, { width: size, height: size, borderRadius: size / 2 }, active && styles.active]}
    >
      {(hovered) => <Icon name={icon} size={Math.round(size * 0.42)} color={active || hovered ? colors.gold : colors.text} />}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(8,8,10,0.6)",
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
  },
  active: { borderColor: colors.goldLine, backgroundColor: colors.goldSoft },
});
