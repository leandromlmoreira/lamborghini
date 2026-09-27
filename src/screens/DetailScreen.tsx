import { router } from "expo-router";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import { ERA_LABEL, formatUsd, priceRank, type ShowroomCar } from "../domain/catalog";
import { useEntrance } from "../hooks/useEntrance";
import { useLayout } from "../hooks/useLayout";
import { useShowroom } from "../state/ShowroomContext";
import { colors, fonts } from "../theme/tokens";
import { Gallery } from "../components/detail/Gallery";
import { PerformanceSheet } from "../components/detail/PerformanceSheet";
import { PurchasePanel } from "../components/detail/PurchasePanel";
import { SpecGrid, type Spec } from "../components/detail/SpecGrid";
import { ScreenFrame } from "../components/frame/ScreenFrame";
import { CatalogGrid } from "../components/showroom/CatalogGrid";
import { BackLink } from "../components/ui/BackLink";
import { EmptyState } from "../components/ui/EmptyState";
import { SectionHeading } from "../components/ui/SectionHeading";

export function DetailScreen({ id }: { id: number }) {
  const { cars, source, garage, adjust, toggle } = useShowroom();
  const car = cars.find((item) => item.id === id);

  if (!car) {
    return (
      <ScreenFrame curtain="Ficha">
        {source === "loading" ? (
          <CatalogGrid cars={[]} garage={garage} loading onToggle={toggle} />
        ) : (
          <EmptyState
            title="Modelo fora do acervo"
            message="Esse endereço não corresponde a nenhum carro em exibição."
            action="Voltar ao acervo"
            onAction={() => router.replace("/")}
          />
        )}
      </ScreenFrame>
    );
  }

  const related = cars.filter((item) => item.era === car.era && item.id !== car.id).slice(0, 3);

  return (
    <ScreenFrame curtain={car.family} rev={car.performance}>
      <DetailBody car={car} cars={cars} quantity={garage[car.id] ?? 0} onAdjust={(delta) => adjust(car.id, delta)} />
      {related.length > 0 && (
        <View style={styles.related}>
          <SectionHeading
            title="Continue a visita"
            aside={<Text style={styles.aside}>{`Mesma era · ${ERA_LABEL[car.era]}`}</Text>}
          />
          <CatalogGrid cars={related} garage={garage} loading={false} onToggle={toggle} />
        </View>
      )}
    </ScreenFrame>
  );
}

type BodyProps = {
  car: ShowroomCar;
  cars: ShowroomCar[];
  quantity: number;
  onAdjust: (delta: number) => void;
};

function DetailBody({ car, cars, quantity, onAdjust }: BodyProps) {
  const { isWide, isMedium } = useLayout();
  const gallery = useEntrance(520, 32);
  const info = useEntrance(640);
  const specs: Spec[] = [
    { label: "Ano", value: String(car.year) },
    { label: "Era", value: ERA_LABEL[car.era] },
    { label: "Família", value: car.family },
    { label: "Ranking de preço", value: `${priceRank(cars, car)}º de ${cars.length}` },
  ];
  const nameSize = isWide ? 32 : isMedium ? 30 : 21;

  return (
    <View style={styles.top}>
      <BackLink label="Voltar ao acervo" onPress={goBack} />
      <View style={[styles.split, isWide && styles.splitWide]}>
        <Animated.View style={[isWide && styles.galleryWide, isWide && sticky, gallery]}>
          <Gallery car={car} />
        </Animated.View>
        <Animated.View style={[styles.info, isWide && styles.infoWide, info]}>
          <View style={styles.heading}>
            <Text style={styles.meta}>{`${car.family} · ${car.year}`}</Text>
            <Text style={[styles.name, { fontSize: nameSize, lineHeight: Math.round(nameSize * 1.3) }]} accessibilityRole="header">
              {car.name}
            </Text>
            {car.fullName !== car.name && <Text style={styles.fullName}>{car.fullName}</Text>}
          </View>
          <Text style={styles.price}>{formatUsd(car.price)}</Text>
          <PerformanceSheet performance={car.performance} />
          <SpecGrid specs={specs} />
          <PurchasePanel car={car} quantity={quantity} onAdjust={onAdjust} />
        </Animated.View>
      </View>
    </View>
  );
}

const sticky = Platform.OS === "web" ? ({ position: "sticky", top: 112 } as object) : {};

function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace("/");
}

const styles = StyleSheet.create({
  top: { gap: 24 },
  split: { gap: 36 },
  splitWide: { flexDirection: "row", alignItems: "flex-start", gap: 48 },
  galleryWide: { flex: 1.3 },
  info: { gap: 22 },
  infoWide: { flex: 1 },
  heading: { gap: 10 },
  meta: { fontFamily: fonts.techSemibold, fontSize: 12, letterSpacing: 2.4, color: colors.accent, textTransform: "uppercase" },
  name: { fontFamily: fonts.display, color: colors.text, textTransform: "uppercase", letterSpacing: 0.2 },
  fullName: { fontFamily: fonts.medium, fontSize: 14, color: colors.muted },
  price: { fontFamily: fonts.techBold, fontSize: 30, color: colors.text, fontVariant: ["tabular-nums"], letterSpacing: -0.3 },
  related: { marginTop: 112, gap: 28 },
  aside: { fontFamily: fonts.techSemibold, fontSize: 12, letterSpacing: 1.6, color: colors.muted, textTransform: "uppercase" },
});
