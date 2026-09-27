import { router } from "expo-router";
import { Animated, StyleSheet, Text, View } from "react-native";
import { formatUsd, formatUsdCompact } from "../../domain/catalog";
import type { GarageEntry } from "../../domain/garage";
import { useEntrance } from "../../hooks/useEntrance";
import { useLayout } from "../../hooks/useLayout";
import { colors, fonts } from "../../theme/tokens";
import { Stage } from "../art/Stage";
import { CarPhoto } from "../car/CarPhoto";
import { IconButton } from "../ui/IconButton";
import { PressableScale } from "../ui/PressableScale";
import { Shell } from "../ui/Shell";
import { Stepper } from "../ui/Stepper";

type Props = {
  entry: GarageEntry;
  order: number;
  onAdjust: (delta: number) => void;
  onRemove: () => void;
};

export function GarageRow({ entry, order, onAdjust, onRemove }: Props) {
  const { car, quantity, subtotal } = entry;
  const { isMedium } = useLayout();
  const entrance = useEntrance(order * 80, 16);
  const removeButton = <IconButton icon="close" label={`Tirar ${car.name} da garagem`} onPress={onRemove} size={36} />;

  return (
    <Animated.View style={entrance}>
      <Shell>
        <View style={[styles.row, isMedium && styles.rowMedium]}>
          <PressableScale
            onPress={() => router.push(`/carro/${car.id}`)}
            accessibilityLabel={`Abrir ${car.name}`}
            style={[styles.thumb, isMedium && styles.thumbMedium]}
          >
            <Stage tone="acid" grid={false} />
            <CarPhoto uri={car.image} label={car.fullName} />
          </PressableScale>
          <View style={styles.info}>
            <View style={styles.infoText}>
              <Text style={styles.family}>{`${car.family} · ${car.year}`}</Text>
              <Text style={styles.name} numberOfLines={1}>
                {car.name}
              </Text>
              <Text style={styles.unit}>{`${formatUsdCompact(car.price)} por unidade`}</Text>
            </View>
            {!isMedium && removeButton}
          </View>
          <View style={[styles.controls, !isMedium && styles.controlsStacked]}>
            <Stepper value={quantity} onChange={onAdjust} label={car.name} />
            <Text style={[styles.subtotal, isMedium && styles.subtotalMedium]} numberOfLines={1}>
              {formatUsd(subtotal)}
            </Text>
            {isMedium && removeButton}
          </View>
        </View>
      </Shell>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  row: { padding: 12, gap: 16 },
  rowMedium: { flexDirection: "row", alignItems: "center", gap: 24 },
  thumb: { height: 108, justifyContent: "center", paddingHorizontal: 14, borderRadius: 10, overflow: "hidden", backgroundColor: colors.stage },
  thumbMedium: { width: 200 },
  info: { flex: 1, flexDirection: "row", alignItems: "flex-start", gap: 12, paddingHorizontal: 4 },
  infoText: { flex: 1, gap: 4 },
  family: { fontFamily: fonts.techSemibold, fontSize: 11, letterSpacing: 2.2, color: colors.accent, textTransform: "uppercase" },
  name: { fontFamily: fonts.bold, fontSize: 18, color: colors.text },
  unit: { fontFamily: fonts.techSemibold, fontSize: 12, letterSpacing: 0.8, color: colors.muted, textTransform: "uppercase" },
  controls: { flexDirection: "row", alignItems: "center", gap: 16, paddingRight: 4 },
  controlsStacked: { justifyContent: "space-between", paddingHorizontal: 4, paddingTop: 14, borderTopWidth: 1, borderTopColor: colors.line },
  subtotal: { flexShrink: 1, fontFamily: fonts.techBold, fontSize: 18, color: colors.text, fontVariant: ["tabular-nums"] },
  subtotalMedium: { fontSize: 14, minWidth: 136, textAlign: "right" },
});
