import type { ReactNode } from "react";
import { StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { colors, radii } from "../../theme/tokens";

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  coreStyle?: StyleProp<ViewStyle>;
  active?: boolean;
};

export function Shell({ children, style, coreStyle, active = false }: Props) {
  return (
    <View style={[styles.shell, active && styles.shellActive, style]}>
      <View style={[styles.core, coreStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  shell: {
    padding: 6,
    borderRadius: radii.shell,
    backgroundColor: colors.shell,
    borderWidth: 1,
    borderColor: colors.hairline,
  },
  shellActive: { borderColor: colors.goldLine },
  core: {
    flexGrow: 1,
    borderRadius: radii.core,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.highlight,
    overflow: "hidden",
  },
});
