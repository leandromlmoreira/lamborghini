import { router } from "expo-router";
import { Animated, StyleSheet, Text, View } from "react-native";
import { formatUsdCompact, type ShowroomCar } from "../../domain/catalog";
import { useEntrance } from "../../hooks/useEntrance";
import { useLayout } from "../../hooks/useLayout";
import { colors, fonts } from "../../theme/tokens";
import { Stage } from "../art/Stage";
import { CarPhoto } from "../car/CarPhoto";
import { CtaButton } from "../ui/CtaButton";
import { Eyebrow } from "../ui/Eyebrow";
import { PressableScale } from "../ui/PressableScale";
import { Shell } from "../ui/Shell";

type Props = {
  flagship?: ShowroomCar;
  count: number;
  onExplore: () => void;
};

export function Hero({ flagship, count, onExplore }: Props) {
  const { isWide, isMedium } = useLayout();
  const copy = useEntrance(0);
  const stage = useEntrance(180, 40);

  return (
    <View style={[styles.row, isWide && styles.rowWide]}>
      <Animated.View style={[styles.copy, isWide && styles.copyWide, copy]}>
        <Eyebrow label="Showroom privado · edição 2026" />
        <Text style={[styles.title, { fontSize: isWide ? 54 : isMedium ? 44 : 30, lineHeight: isWide ? 66 : isMedium ? 54 : 40 }]}>
          {count || "Dez"} lendas.{"\n"}
          <Text style={styles.titleAccent}>Uma garagem</Text>
          {"\n"}só sua.
        </Text>
        <Text style={styles.lead}>
          Percorra seis décadas de supercarros italianos, abra a ficha de cada modelo e monte a sua coleção com
          quantidade e valor calculados na hora.
        </Text>
        <View style={styles.actions}>
          <CtaButton label="Explorar o acervo" onPress={onExplore} />
          <CtaButton label="Minha garagem" variant="ghost" icon="garage" onPress={() => router.navigate("/garagem")} />
        </View>
      </Animated.View>

      <Animated.View style={[styles.visual, stage]}>
        <PressableScale
          onPress={() => flagship && router.push(`/carro/${flagship.id}`)}
          pressedScale={0.99}
          accessibilityLabel="Ver a peça principal do acervo"
        >
          {(hovered) => (
            <Shell active={hovered}>
              <View style={[styles.stage, { height: isWide ? 360 : isMedium ? 320 : 220 }]}>
                <Stage tone="gold" />
                <Text style={[styles.watermark, !isMedium && styles.watermarkSmall]} numberOfLines={1}>
                  {flagship?.family.toUpperCase() ?? "TORO"}
                </Text>
                {flagship && (
                  <View style={[styles.photo, hovered && styles.photoHovered]}>
                    <CarPhoto uri={flagship.image} label={flagship.fullName} />
                  </View>
                )}
              </View>
              <View style={styles.caption}>
                <View style={styles.captionText}>
                  <Text style={styles.captionEyebrow}>Peça principal</Text>
                  <Text style={styles.captionName}>{flagship ? `${flagship.name} · ${flagship.year}` : "Carregando acervo"}</Text>
                </View>
                <Text style={styles.captionPrice}>{flagship ? formatUsdCompact(flagship.price) : "—"}</Text>
              </View>
            </Shell>
          )}
        </PressableScale>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { gap: 40 },
  rowWide: { flexDirection: "row", alignItems: "center", gap: 56 },
  copy: { gap: 24 },
  copyWide: { flex: 0.9 },
  title: { fontFamily: fonts.display, color: colors.text, letterSpacing: -0.5 },
  titleAccent: { color: colors.gold },
  lead: { fontFamily: fonts.body, fontSize: 16, lineHeight: 26, color: colors.muted, maxWidth: 460 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 },
  visual: { flex: 1.1 },
  stage: { justifyContent: "center", paddingHorizontal: 24, backgroundColor: "#0C0C0F" },
  watermark: {
    position: "absolute",
    top: 22,
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: fonts.display,
    fontSize: 64,
    letterSpacing: 12,
    color: "rgba(244,241,234,0.04)",
  },
  watermarkSmall: { fontSize: 34, letterSpacing: 6, top: 18 },
  photo: { marginTop: 36 },
  photoHovered: { transform: [{ translateX: 10 }, { scale: 1.02 }] },
  caption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingHorizontal: 22,
    paddingVertical: 18,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  captionText: { flex: 1, gap: 4 },
  captionEyebrow: { fontFamily: fonts.semibold, fontSize: 10, letterSpacing: 2.4, color: colors.gold, textTransform: "uppercase" },
  captionName: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  captionPrice: { fontFamily: fonts.display, fontSize: 16, color: colors.text },
});
