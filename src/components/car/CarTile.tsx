import { Animated, StyleSheet, Text, View } from "react-native";
import { ERA_LABEL, formatUsdCompact, type ShowroomCar } from "../../domain/catalog";
import { useEntrance } from "../../hooks/useEntrance";
import { colors, fonts } from "../../theme/tokens";
import { Stage } from "../art/Stage";
import { Icon } from "../icons/Icon";
import { IconButton } from "../ui/IconButton";
import { PressableScale } from "../ui/PressableScale";
import { Shell } from "../ui/Shell";
import { CarPhoto } from "./CarPhoto";

type Props = {
  car: ShowroomCar;
  quantity: number;
  order: number;
  width: number;
  featured?: boolean;
  onOpen: (id: number) => void;
  onToggle: (id: number) => void;
};

export function CarTile({ car, quantity, order, width, featured = false, onOpen, onToggle }: Props) {
  const entrance = useEntrance(120 + order * 70);
  const saved = quantity > 0;

  return (
    <Animated.View style={[{ width }, entrance]}>
      <PressableScale onPress={() => onOpen(car.id)} pressedScale={0.985} accessibilityLabel={`Ver ${car.fullName}`}>
        {(hovered) => (
          <Shell active={hovered || saved}>
            <View style={styles.stage}>
              <Stage tone={car.era === "classic" ? "ember" : car.era === "legend" ? "ice" : "gold"} />
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
                <CarPhoto uri={car.image} label={car.fullName} />
              </View>
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
                />
              </View>
              <View style={styles.footer}>
                <Text style={styles.price}>{formatUsdCompact(car.price)}</Text>
                <View style={styles.more}>
                  <Text style={[styles.moreLabel, hovered && styles.moreLabelHovered]}>
                    {saved ? `${quantity} na garagem` : "Ver ficha"}
                  </Text>
                  <Icon name="arrow-right" size={14} color={hovered ? colors.gold : colors.muted} />
                </View>
              </View>
            </View>
          </Shell>
        )}
      </PressableScale>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  stage: { height: 188, justifyContent: "center", paddingHorizontal: 20, backgroundColor: "#0C0C0F" },
  tags: { position: "absolute", top: 16, left: 18, right: 18, flexDirection: "row", justifyContent: "space-between" },
  era: { fontFamily: fonts.semibold, fontSize: 10, letterSpacing: 2, color: colors.muted, textTransform: "uppercase" },
  year: { fontFamily: fonts.display, fontSize: 10, letterSpacing: 1.5, color: colors.faint },
  photo: { marginTop: 18, width: "100%", maxWidth: 520, alignSelf: "center" },
  photoFeatured: { maxWidth: 440 },
  watermark: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 44,
    textAlign: "center",
    fontFamily: fonts.display,
    fontSize: 72,
    letterSpacing: 14,
    color: "rgba(244,241,234,0.035)",
  },
  photoHovered: { transform: [{ translateX: 6 }, { scale: 1.03 }] },
  body: { padding: 20, gap: 18, borderTopWidth: 1, borderTopColor: colors.hairline },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  titleBlock: { flex: 1, gap: 4 },
  family: { fontFamily: fonts.semibold, fontSize: 10, letterSpacing: 2.4, color: colors.gold, textTransform: "uppercase" },
  name: { fontFamily: fonts.bold, fontSize: 18, color: colors.text, letterSpacing: -0.2 },
  footer: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  price: { fontFamily: fonts.display, fontSize: 15, color: colors.text, letterSpacing: 0.5 },
  more: { flexDirection: "row", alignItems: "center", gap: 6 },
  moreLabel: { fontFamily: fonts.semibold, fontSize: 12, color: colors.muted },
  moreLabelHovered: { color: colors.gold },
});
