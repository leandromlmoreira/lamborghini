import { Animated, StyleSheet, Text, View } from "react-native";
import { ERA_LABEL, formatUsdCompact, type Era, type ShowroomCar } from "../../domain/catalog";
import { formatSeconds } from "../../domain/performance";
import { useEntrance } from "../../hooks/useEntrance";
import { useTilt } from "../../hooks/useTilt";
import { colors, fonts } from "../../theme/tokens";
import { Stage, type StageTone } from "../art/Stage";
import { Icon } from "../icons/Icon";
import { IconButton } from "../ui/IconButton";
import { PressableScale } from "../ui/PressableScale";
import { CarPhoto } from "./CarPhoto";
import { Glare } from "./Glare";

type Props = {
  car: ShowroomCar;
  quantity: number;
  order: number;
  width: number;
  featured?: boolean;
  onOpen: (id: number) => void;
  onToggle: (id: number) => void;
};

export const ERA_TONE: Record<Era, StageTone> = {
  classic: "amber",
  legend: "ice",
  modern: "acid",
};

export function CarTile({ car, quantity, order, width, featured = false, onOpen, onToggle }: Props) {
  const entrance = useEntrance(760 + order * 60);
  const tilt = useTilt(featured ? 3 : 5);
  const saved = quantity > 0;
  const { performance } = car;

  return (
    <Animated.View style={[{ width }, entrance]}>
      <PressableScale onPress={() => onOpen(car.id)} pressedScale={0.985} accessibilityLabel={`Ver ${car.fullName}`}>
        {(hovered) => (
          <Animated.View style={[styles.card, (hovered || saved) && styles.cardActive, tilt.tiltStyle]} {...tilt.handlers}>
            <View style={[styles.stage, featured && styles.stageFeatured]}>
              <Stage tone={ERA_TONE[car.era]} horizon={featured ? 172 : 168} />
              <View style={styles.tags}>
                <Text style={styles.era}>{ERA_LABEL[car.era]}</Text>
                <Text style={styles.year}>{car.year}</Text>
              </View>
              {featured && (
                <Text style={styles.watermark} numberOfLines={1}>
                  {car.family.toUpperCase()}
                </Text>
              )}
              <View style={[styles.photo, featured && styles.photoFeatured, hovered && styles.photoHovered]}>
                <CarPhoto uri={car.image} label={car.fullName} reflection />
              </View>
              <Glare visible={hovered} style={tilt.glareStyle} />
            </View>
            <View style={styles.body}>
              <View style={styles.titleRow}>
                <View style={styles.titleBlock}>
                  <Text style={styles.family}>{car.family}</Text>
                  <Text style={styles.name} numberOfLines={1}>
                    {car.name}
                  </Text>
                </View>
                <IconButton
                  icon={saved ? "heart-filled" : "heart"}
                  label={saved ? `Tirar ${car.name} da garagem` : `Guardar ${car.name} na garagem`}
                  onPress={() => onToggle(car.id)}
                  active={saved}
                  cue="tick"
                />
              </View>
              <View style={styles.specs}>
                <Spec value={String(performance.power)} unit="cv" />
                <Spec value={formatSeconds(performance.zeroToHundred)} unit="s" />
                <Spec value={String(performance.topSpeed)} unit="km/h" />
              </View>
              <View style={styles.footer}>
                <Text style={styles.price}>{formatUsdCompact(car.price)}</Text>
                <View style={styles.more}>
                  <Text style={[styles.moreLabel, hovered && styles.moreLabelHovered]}>
                    {saved ? `${quantity} na garagem` : "Ver ficha"}
                  </Text>
                  <Icon name="arrow-right" size={14} color={hovered ? colors.accent : colors.muted} />
                </View>
              </View>
            </View>
          </Animated.View>
        )}
      </PressableScale>
    </Animated.View>
  );
}

function Spec({ value, unit }: { value: string; unit: string }) {
  return (
    <View style={styles.spec}>
      <Text style={styles.specValue}>{value}</Text>
      <Text style={styles.specUnit}>{unit}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
    overflow: "hidden",
  },
  cardActive: { borderColor: colors.accentLine },
  stage: { height: 210, alignItems: "center", justifyContent: "center", paddingHorizontal: 22, overflow: "hidden" },
  stageFeatured: { height: 250 },
  tags: { position: "absolute", top: 16, left: 18, right: 18, flexDirection: "row", justifyContent: "space-between" },
  era: { fontFamily: fonts.techSemibold, fontSize: 11, letterSpacing: 2, color: colors.muted, textTransform: "uppercase" },
  year: { fontFamily: fonts.techBold, fontSize: 13, letterSpacing: 1, color: colors.text },
  photo: { marginTop: 22, width: "100%", maxWidth: 480 },
  photoFeatured: { maxWidth: 560 },
  watermark: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 40,
    textAlign: "center",
    fontFamily: fonts.display,
    fontSize: 84,
    letterSpacing: 6,
    color: "rgba(243,243,238,0.035)",
  },
  photoHovered: { transform: [{ translateY: -4 }, { scale: 1.035 }] },
  body: { paddingHorizontal: 20, paddingTop: 18, paddingBottom: 18, gap: 16, borderTopWidth: 1, borderTopColor: colors.line },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  titleBlock: { flex: 1, gap: 4 },
  family: { fontFamily: fonts.techSemibold, fontSize: 11, letterSpacing: 2.4, color: colors.accent, textTransform: "uppercase" },
  name: { fontFamily: fonts.bold, fontSize: 18, color: colors.text, letterSpacing: -0.2 },
  specs: { flexDirection: "row", gap: 18, paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.line },
  spec: { flexDirection: "row", alignItems: "baseline", gap: 4 },
  specValue: { fontFamily: fonts.techBold, fontSize: 17, color: colors.text, fontVariant: ["tabular-nums"] },
  specUnit: { fontFamily: fonts.techSemibold, fontSize: 11, color: colors.muted, textTransform: "uppercase" },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  price: { fontFamily: fonts.techBold, fontSize: 18, color: colors.text, fontVariant: ["tabular-nums"] },
  more: { flexDirection: "row", alignItems: "center", gap: 6 },
  moreLabel: { fontFamily: fonts.techSemibold, fontSize: 12, letterSpacing: 1.2, color: colors.muted, textTransform: "uppercase" },
  moreLabelHovered: { color: colors.accent },
});
