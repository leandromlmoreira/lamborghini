import { useEffect, type ReactNode, type RefObject } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLayout } from "../../hooks/useLayout";
import { useSound } from "../../sound/SoundContext";
import type { RevInput } from "../../sound/patches";
import { colors, fonts, layout } from "../../theme/tokens";
import { Backdrop } from "../art/Backdrop";
import { MarkGlyph } from "../brand/Mark";
import { NavIsland } from "./NavIsland";
import { RouteCurtain } from "./RouteCurtain";
import { TopScrim } from "./TopScrim";

type Props = {
  children: ReactNode;
  scrollRef?: RefObject<ScrollView | null>;
  curtain: string;
  rev?: RevInput;
};

export function ScreenFrame({ children, scrollRef, curtain, rev }: Props) {
  const { gutter, isMedium } = useLayout();
  const insets = useSafeAreaInsets();
  const { play } = useSound();
  const top = insets.top + (isMedium ? 20 : 12);

  useEffect(() => {
    play("whoosh");
  }, [play]);

  useEffect(() => {
    if (!rev) return;
    const timer = setTimeout(() => play("rev", rev), 260);
    return () => clearTimeout(timer);
  }, [play, rev]);

  return (
    <View style={styles.root}>
      <Backdrop />
      <View style={[styles.navDock, { top, paddingHorizontal: gutter }]} pointerEvents="box-none">
        <View style={styles.navColumn}>
          <NavIsland compact={!isMedium} />
        </View>
      </View>
      <ScrollView ref={scrollRef} contentContainerStyle={{ paddingTop: top + (isMedium ? 112 : 92), paddingHorizontal: gutter }}>
        <View style={styles.column}>
          {children}
          <View style={[styles.footer, isMedium && styles.footerWide]}>
            <View style={styles.footerBrand}>
              <MarkGlyph size={20} />
              <Text style={styles.footerMark}>TORO · SHOWROOM</Text>
            </View>
            <Text style={styles.footerText}>
              Dados ao vivo da API pública do acervo. Valores em dólar e ficha técnica aproximada, só como referência.
            </Text>
          </View>
        </View>
      </ScrollView>
      <TopScrim height={top + 84} />
      <RouteCurtain label={curtain} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background, overflow: "hidden" },
  column: { width: "100%", maxWidth: layout.maxWidth, alignSelf: "center" },
  navDock: { position: "absolute", left: 0, right: 0, zIndex: 10 },
  navColumn: { width: "100%", maxWidth: layout.maxWidth, alignSelf: "center" },
  footer: {
    marginTop: 112,
    paddingVertical: 32,
    borderTopWidth: 1,
    borderTopColor: colors.line,
    gap: 14,
  },
  footerWide: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  footerBrand: { flexDirection: "row", alignItems: "center", gap: 10 },
  footerMark: { fontFamily: fonts.display, fontSize: 11, letterSpacing: 3, color: colors.muted },
  footerText: { fontFamily: fonts.body, fontSize: 13, color: colors.faint, lineHeight: 20, maxWidth: 520 },
});
