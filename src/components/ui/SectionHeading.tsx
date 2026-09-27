import type { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLayout } from "../../hooks/useLayout";
import { colors, fonts } from "../../theme/tokens";
import { Eyebrow } from "./Eyebrow";

type Props = {
  eyebrow: string;
  title: string;
  aside?: ReactNode;
};

export function SectionHeading({ eyebrow, title, aside }: Props) {
  const { isMedium } = useLayout();
  return (
    <View style={[styles.row, isMedium && styles.rowMedium]}>
      <View style={styles.text}>
        <Eyebrow label={eyebrow} tone="muted" />
        <Text style={[styles.title, { fontSize: isMedium ? 30 : 22 }]}>{title}</Text>
      </View>
      {aside}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { gap: 16 },
  rowMedium: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between" },
  text: { gap: 16, flexShrink: 1 },
  title: { fontFamily: fonts.display, color: colors.text, letterSpacing: -0.3 },
});
