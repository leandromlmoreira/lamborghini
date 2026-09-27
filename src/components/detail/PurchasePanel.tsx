import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { formatUsd, type ShowroomCar } from "../../domain/catalog";
import { colors, fonts } from "../../theme/tokens";
import { CtaButton } from "../ui/CtaButton";
import { Shell } from "../ui/Shell";
import { Stepper } from "../ui/Stepper";

type Props = {
  car: ShowroomCar;
  quantity: number;
  onAdjust: (delta: number) => void;
};

export function PurchasePanel({ car, quantity, onAdjust }: Props) {
  return (
    <Shell active={quantity > 0}>
      <View style={styles.body}>
        <View style={styles.row}>
          <View style={styles.block}>
            <Text style={styles.label}>Unidades na garagem</Text>
            <Stepper value={quantity} onChange={onAdjust} label={car.name} />
          </View>
          <View style={[styles.block, styles.right]}>
            <Text style={styles.label}>Subtotal</Text>
            <Text style={[styles.subtotal, quantity === 0 && styles.subtotalIdle]}>{formatUsd(car.price * quantity)}</Text>
          </View>
        </View>
        {quantity === 0 ? (
          <CtaButton label="Guardar na garagem" icon="plus" onPress={() => onAdjust(1)} />
        ) : (
          <CtaButton label="Abrir a garagem" icon="garage" variant="ghost" onPress={() => router.navigate("/garagem")} />
        )}
      </View>
    </Shell>
  );
}

const styles = StyleSheet.create({
  body: { padding: 20, paddingLeft: 24, gap: 22 },
  row: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 18 },
  block: { gap: 10 },
  right: { alignItems: "flex-end" },
  label: { fontFamily: fonts.techSemibold, fontSize: 11, letterSpacing: 1.8, color: colors.faint, textTransform: "uppercase" },
  subtotal: { fontFamily: fonts.techBold, fontSize: 24, color: colors.accent, paddingVertical: 6, fontVariant: ["tabular-nums"] },
  subtotalIdle: { color: colors.faint },
});
