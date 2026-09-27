import { router } from "expo-router";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { formatUsdCompact, type ShowroomCar } from "../../domain/catalog";
import { formatSeconds } from "../../domain/performance";
import type { CatalogSource } from "../../hooks/useCatalog";
import { useEntrance } from "../../hooks/useEntrance";
import { useLayout } from "../../hooks/useLayout";
import { useTilt } from "../../hooks/useTilt";
import { colors, fonts } from "../../theme/tokens";
import { Stage } from "../art/Stage";
import { CarPhoto } from "../car/CarPhoto";
import { Readout } from "../car/Readout";
import { Icon } from "../icons/Icon";
import { CtaButton } from "../ui/CtaButton";
import { PressableScale } from "../ui/PressableScale";

type Props = {
  flagship?: ShowroomCar;
  count: number;
  source: CatalogSource;
  onExplore: () => void;
};

const STATUS: Record<CatalogSource, string> = {
  loading: "Conectando ao acervo",
  live: "API ao vivo",
  archive: "Acervo salvo, sem conexão",
};

export function Hero({ flagship, count, source, onExplore }: Props) {
  const { isWide, isMedium } = useLayout();
  const copy = useEntrance(520);
  const stage = useEntrance(680, 40);
  const titleSize = isWide ? 56 : isMedium ? 42 : 27;

  return (
    <View style={styles.hero}>
      <Animated.View style={[styles.top, isWide && styles.topWide, copy]}>
        <Text style={[styles.title, { fontSize: titleSize, lineHeight: Math.round(titleSize * 1.18) }]} accessibilityRole="header">
          {`${count || "Dez"} lendas.\n`}
          <Text style={styles.titleAccent}>Uma garagem</Text>
          {"\nsó sua."}
        </Text>
        <View style={[styles.side, isWide && styles.sideWide]}>
          <Text style={styles.lead}>
            Seis décadas de supercarros italianos sob luz de estúdio. Abra a ficha, ouça o motor e monte a sua coleção com
            valor calculado na hora.
          </Text>
          <View style={styles.actions}>
            <CtaButton label="Explorar o acervo" icon="arrow-right" onPress={onExplore} />
            <CtaButton label="Garagem" variant="ghost" icon="garage" onPress={() => router.navigate("/garagem")} />
          </View>
          <View style={styles.status}>
            <View style={[styles.lamp, source === "archive" && styles.lampOff, source === "loading" && styles.lampIdle]} />
            <Text style={styles.statusText}>{`${STATUS[source]} · ${String(count).padStart(2, "0")} modelos`}</Text>
          </View>
        </View>
      </Animated.View>

      <Animated.View style={stage}>
        <FlagshipStage flagship={flagship} />
      </Animated.View>
    </View>
  );
}

const outline =
  Platform.OS === "web" ? ({ color: "transparent", WebkitTextStroke: "1px rgba(243,243,238,0.1)" } as object) : {};

function FlagshipStage({ flagship }: { flagship?: ShowroomCar }) {
  const { isWide, isMedium } = useLayout();
  const tilt = useTilt(3);
  const height = isWide ? 470 : isMedium ? 380 : 230;

  return (
    <PressableScale
      onPress={() => flagship && router.push(`/carro/${flagship.id}`)}
      pressedScale={0.995}
      accessibilityLabel={flagship ? `Abrir a ficha do ${flagship.name}` : "Carregando a peça principal"}
    >
      {(hovered) => (
        <View style={[styles.panel, hovered && styles.panelHover]} {...tilt.handlers}>
          <View style={[styles.stage, { height }]}>
            <Stage tone="acid" horizon={isMedium ? 176 : 170} />
            <Text style={[styles.watermark, { fontSize: isWide ? 150 : isMedium ? 110 : 54 }, outline]} numberOfLines={1}>
              {flagship?.family.toUpperCase() ?? "TORO"}
            </Text>
            {flagship && (
              <Animated.View style={[styles.car, { width: isWide ? "68%" : isMedium ? "80%" : "92%" }, tilt.shiftStyle]}>
                <CarPhoto uri={flagship.image} label={flagship.fullName} reflection />
              </Animated.View>
            )}
            {flagship && isMedium && (
              <View style={styles.readouts}>
                <FlagshipReadouts car={flagship} size={isWide ? 40 : 32} />
              </View>
            )}
          </View>
          {flagship && !isMedium && (
            <View style={styles.readoutsStacked}>
              <FlagshipReadouts car={flagship} size={22} />
            </View>
          )}
          <View style={styles.caption}>
            <View style={styles.captionText}>
              <Text style={styles.captionTag}>Peça principal</Text>
              <Text style={styles.captionName} numberOfLines={1}>
                {flagship ? `${flagship.name} · ${flagship.year}` : "Carregando acervo"}
              </Text>
            </View>
            <View style={styles.captionRight}>
              <Text style={styles.captionPrice}>{flagship ? formatUsdCompact(flagship.price) : "—"}</Text>
              <View style={[styles.open, hovered && styles.openHover]}>
                <Icon name="arrow-right" size={16} color={hovered ? colors.onAccent : colors.text} />
              </View>
            </View>
          </View>
        </View>
      )}
    </PressableScale>
  );
}

function FlagshipReadouts({ car, size }: { car: ShowroomCar; size: number }) {
  const { performance } = car;
  return (
    <View style={styles.readoutRow}>
      <Readout value={String(performance.power)} unit="cv" label="Potência" size={size} accent />
      <Readout value={formatSeconds(performance.zeroToHundred)} unit="s" label="0–100 km/h" size={size} />
      <Readout value={String(performance.topSpeed)} unit="km/h" label="Máxima" size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 40 },
  top: { gap: 28 },
  topWide: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 48 },
  title: { fontFamily: fonts.display, color: colors.text, textTransform: "uppercase", letterSpacing: -0.5 },
  titleAccent: { color: colors.accent },
  side: { gap: 22 },
  sideWide: { width: 470, paddingBottom: 6 },
  lead: { fontFamily: fonts.body, fontSize: 16, lineHeight: 26, color: colors.muted, maxWidth: 440 },
  actions: { flexDirection: "row", flexWrap: "wrap", gap: 14, paddingLeft: 6 },
  status: { flexDirection: "row", alignItems: "center", gap: 10 },
  lamp: { width: 7, height: 7, borderRadius: 1, backgroundColor: colors.accent, transform: [{ rotate: "45deg" }] },
  lampIdle: { backgroundColor: colors.faint },
  lampOff: { backgroundColor: colors.danger },
  statusText: { fontFamily: fonts.techSemibold, fontSize: 12, letterSpacing: 1.4, color: colors.muted, textTransform: "uppercase" },
  panel: { borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.stage, overflow: "hidden" },
  panelHover: { borderColor: colors.lineStrong },
  stage: { alignItems: "center", justifyContent: "center", overflow: "hidden" },
  watermark: {
    position: "absolute",
    top: "8%",
    left: 0,
    right: 0,
    textAlign: "center",
    fontFamily: fonts.display,
    letterSpacing: 4,
    color: "rgba(243,243,238,0.04)",
  },
  car: { marginTop: "6%", maxWidth: 820 },
  readouts: { position: "absolute", left: 28, bottom: 24 },
  readoutsStacked: { paddingHorizontal: 18, paddingVertical: 16, borderTopWidth: 1, borderTopColor: colors.line },
  readoutRow: { flexDirection: "row", gap: 28 },
  caption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    paddingLeft: 20,
    paddingRight: 12,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  captionText: { flex: 1, gap: 3 },
  captionTag: { fontFamily: fonts.techSemibold, fontSize: 11, letterSpacing: 2, color: colors.accent, textTransform: "uppercase" },
  captionName: { fontFamily: fonts.bold, fontSize: 16, color: colors.text },
  captionRight: { flexDirection: "row", alignItems: "center", gap: 14 },
  captionPrice: { fontFamily: fonts.techBold, fontSize: 18, color: colors.text, fontVariant: ["tabular-nums"] },
  open: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.lineStrong,
    alignItems: "center",
    justifyContent: "center",
  },
  openHover: { backgroundColor: colors.accent, borderColor: colors.accent },
});
