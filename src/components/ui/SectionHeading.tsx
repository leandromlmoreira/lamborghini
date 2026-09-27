import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLayout } from "../../hooks/useLayout";
import { colors, fonts } from "../../theme/tokens";

type Props = {
  title: string;
  aside?: ReactNode;
};

export function SectionHeading({ title, aside }: Props) {
  const { isMedium } = useLayout();
  return (
    <View style={[styles.row, isMedium && styles.rowMedium]}>
      <View style={styles.text}>
        <View style={styles.tick} />
        <Text style={[styles.title, { fontSize: isMedium ? 28 : 19, lineHeight: isMedium ? 38 : 28 }]}>{title}</Text>
      </View>
      {aside}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { gap: 14 },
  rowMedium: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" },
  text: { gap: 16, flexShrink: 1 },
  tick: { width: 36, height: 3, backgroundColor: colors.accent, transform: [{ skewX: "-30deg" }] },
  title: { fontFamily: fonts.display, color: colors.text, textTransform: "uppercase", letterSpacing: 0.5 },
});
