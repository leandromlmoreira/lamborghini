import type { ReactNode, RefObject } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLayout } from "../../hooks/useLayout";
import { colors, fonts, layout } from "../../theme/tokens";
import { Backdrop } from "../art/Backdrop";
import { NavIsland } from "./NavIsland";

type Props = {
  children: ReactNode;
  scrollRef?: RefObject<ScrollView | null>;
};

export function ScreenFrame({ children, scrollRef }: Props) {
  const { gutter, isMedium } = useLayout();
  const insets = useSafeAreaInsets();
  const top = insets.top + (isMedium ? 24 : 12);

  return (
    <View style={styles.root}>
      <Backdrop />
      <ScrollView ref={scrollRef} contentContainerStyle={{ paddingTop: top + 76, paddingHorizontal: gutter }}>
        <View style={styles.column}>
          {children}
          <View style={styles.footer}>
            <Text style={styles.footerMark}>TORO · SHOWROOM</Text>
            <Text style={styles.footerText}>Dados ao vivo da API pública do acervo. Valores de referência em dólar.</Text>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.navDock, { top, paddingHorizontal: gutter }]} pointerEvents="box-none">
        <View style={styles.navColumn}>
          <NavIsland compact={!isMedium} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, overflow: "hidden" },
  column: { width: "100%", maxWidth: layout.maxWidth, alignSelf: "center" },
  navDock: { position: "absolute", left: 0, right: 0 },
  navColumn: { width: "100%", maxWidth: 560, alignSelf: "center" },
  footer: {
    marginTop: 96,
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
    gap: 8,
  },
  footerMark: { fontFamily: fonts.display, fontSize: 11, letterSpacing: 3, color: colors.muted },
  footerText: { fontFamily: fonts.body, fontSize: 12, color: colors.faint, lineHeight: 18 },
});
