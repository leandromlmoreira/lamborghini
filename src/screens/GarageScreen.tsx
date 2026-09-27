import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useLayout } from "../hooks/useLayout";
import { useShowroom } from "../state/ShowroomContext";
import { ScreenFrame } from "../components/frame/ScreenFrame";
import { GarageRow } from "../components/garage/GarageRow";
import { GarageSummary } from "../components/garage/GarageSummary";
import { EmptyState } from "../components/ui/EmptyState";
import { SectionHeading } from "../components/ui/SectionHeading";

export function GarageScreen() {
  const { entries, units, total, adjust, remove } = useShowroom();
  const { isWide } = useLayout();

  return (
    <ScreenFrame>
      <View style={styles.page}>
        <SectionHeading eyebrow="Minha garagem" title={entries.length ? "Sua coleção particular" : "A garagem está vazia"} />
        {entries.length === 0 ? (
          <EmptyState
            title="Nenhuma lenda estacionada"
            message="Toque no coração de um modelo ou use o contador na ficha para começar a sua coleção."
            action="Explorar o acervo"
            onAction={() => router.navigate("/")}
          />
        ) : (
          <View style={[styles.split, isWide && styles.splitWide]}>
            <View style={[styles.list, isWide && styles.listWide]}>
              {entries.map((entry, index) => (
                <GarageRow
                  key={entry.car.id}
                  entry={entry}
                  order={index}
                  onAdjust={(delta) => adjust(entry.car.id, delta)}
                  onRemove={() => remove(entry.car.id)}
                />
              ))}
            </View>
            <View style={isWide ? styles.summaryWide : undefined}>
              <GarageSummary units={units} models={entries.length} total={total} />
            </View>
          </View>
        )}
      </View>
    </ScreenFrame>
  );
}

const styles = StyleSheet.create({
  page: { gap: 32 },
  split: { gap: 20 },
  splitWide: { flexDirection: "row", alignItems: "flex-start", gap: 28 },
  list: { gap: 14 },
  listWide: { flex: 1 },
  summaryWide: { width: 340 },
});
