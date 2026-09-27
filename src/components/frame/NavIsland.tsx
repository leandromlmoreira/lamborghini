import { router, usePathname } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useShowroom } from "../../state/ShowroomContext";
import { colors, fonts } from "../../theme/tokens";
import { Mark } from "../brand/Mark";
import { PressableScale } from "../ui/PressableScale";
import { SoundToggle } from "./SoundToggle";

type Tab = { href: "/" | "/garagem"; label: string };

const TABS: Tab[] = [
  { href: "/", label: "Acervo" },
  { href: "/garagem", label: "Garagem" },
];

export function NavIsland({ compact }: { compact: boolean }) {
  const pathname = usePathname();
  const { units } = useShowroom();

  return (
    <View style={styles.bar}>
      <PressableScale onPress={() => router.navigate("/")} accessibilityLabel="Toro, voltar ao acervo" cue={null}>
        <View style={styles.brand}>
          <Mark compact={compact} />
        </View>
      </PressableScale>
      <View style={styles.right}>
        <View style={styles.tabs}>
          {TABS.map((tab) => {
            const active = tab.href === "/" ? pathname === "/" || pathname.startsWith("/carro") : pathname === tab.href;
            return (
              <PressableScale
                key={tab.href}
                onPress={() => router.navigate(tab.href)}
                accessibilityLabel={tab.label}
                accessibilityState={{ selected: active }}
              >
                {(hovered) => (
                  <View style={styles.tab}>
                    <Text style={[styles.tabLabel, (active || hovered) && styles.tabLabelActive]}>{tab.label}</Text>
                    {tab.href === "/garagem" && units > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{units}</Text>
                      </View>
                    )}
                    <View style={[styles.rail, active && styles.railActive]} />
                  </View>
                )}
              </PressableScale>
            );
          })}
        </View>
        <SoundToggle showLabel={!compact} />
      </View>
    </View>
  );
}

const glass = Platform.OS === "web" ? ({ backdropFilter: "blur(16px) saturate(140%)" } as object) : {};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    backgroundColor: "rgba(8,8,10,0.82)",
    ...glass,
  },
  brand: { paddingVertical: 6, paddingRight: 6 },
  right: { flexDirection: "row", alignItems: "center", gap: 6 },
  tabs: { flexDirection: "row" },
  tab: { flexDirection: "row", alignItems: "center", gap: 8, height: 40, paddingHorizontal: 12 },
  tabLabel: { fontFamily: fonts.techSemibold, fontSize: 13, letterSpacing: 1.4, color: colors.muted, textTransform: "uppercase" },
  tabLabelActive: { color: colors.text },
  rail: { position: "absolute", left: 12, right: 12, bottom: 2, height: 2, backgroundColor: "transparent" },
  railActive: { backgroundColor: colors.accent },
  badge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    borderRadius: 4,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontFamily: fonts.techBold, fontSize: 12, color: colors.onAccent },
});
