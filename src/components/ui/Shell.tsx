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
    <View style={[styles.panel, active && styles.active, style]}>
      <View style={[styles.core, coreStyle]}>{children}</View>
      <View style={[styles.sheen, active && styles.sheenActive]} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    borderRadius: radii.panel,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  active: { borderColor: colors.accentLine },
  core: { flexGrow: 1 },
  sheen: {
    position: "absolute",
    top: 0,
    left: 24,
    right: 24,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  sheenActive: { backgroundColor: colors.accent, opacity: 0.7 },
});
