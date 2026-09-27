import { router, usePathname } from "expo-router";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useShowroom } from "../../state/ShowroomContext";
import { colors, fonts } from "../../theme/tokens";
import { Mark } from "../brand/Mark";
import { PressableScale } from "../ui/PressableScale";

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
      <PressableScale onPress={() => router.navigate("/")} accessibilityLabel="Toro, voltar ao acervo">
        <Mark compact={compact} />
      </PressableScale>
      <View style={styles.tabs}>
        {TABS.map((tab) => {
          const active = tab.href === "/" ? pathname === "/" || pathname.startsWith("/carro") : pathname === tab.href;
          return (
            <PressableScale
              key={tab.href}
              onPress={() => router.navigate(tab.href)}
              accessibilityLabel={tab.label}
              style={[styles.tab, active && styles.tabActive]}
            >
              {(hovered) => (
                <>
                  <Text style={[styles.tabLabel, (active || hovered) && styles.tabLabelActive]}>{tab.label}</Text>
                  {tab.href === "/garagem" && units > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{units}</Text>
                    </View>
                  )}
                </>
              )}
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
}

const glass = Platform.OS === "web" ? ({ backdropFilter: "blur(18px)" } as object) : {};

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingLeft: 18,
    paddingRight: 6,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.hairlineStrong,
    backgroundColor: "rgba(14,14,17,0.86)",
    ...glass,
  },
  tabs: { flexDirection: "row", gap: 4 },
  tab: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 999 },
  tabActive: { backgroundColor: colors.highlight },
  tabLabel: { fontFamily: fonts.semibold, fontSize: 13, color: colors.muted },
  tabLabelActive: { color: colors.text },
  badge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: 10,
    backgroundColor: colors.gold,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { fontFamily: fonts.heavy, fontSize: 11, color: colors.onGold },
});
