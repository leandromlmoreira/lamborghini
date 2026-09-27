import { router } from "expo-router";
import { Animated, StyleSheet, Text, View } from "react-native";
import { ERA_LABEL, formatUsd, priceRank, type ShowroomCar } from "../domain/catalog";
import { useEntrance } from "../hooks/useEntrance";
import { useLayout } from "../hooks/useLayout";
import { useShowroom } from "../state/ShowroomContext";
import { colors, fonts } from "../theme/tokens";
import { Gallery } from "../components/detail/Gallery";
import { PurchasePanel } from "../components/detail/PurchasePanel";
import { SpecGrid, type Spec } from "../components/detail/SpecGrid";
import { ScreenFrame } from "../components/frame/ScreenFrame";
import { CatalogGrid } from "../components/showroom/CatalogGrid";
import { BackLink } from "../components/ui/BackLink";
import { EmptyState } from "../components/ui/EmptyState";
import { Eyebrow } from "../components/ui/Eyebrow";
import { SectionHeading } from "../components/ui/SectionHeading";

export function DetailScreen({ id }: { id: number }) {
  const { cars, source, garage, adjust, toggle } = useShowroom();
  const car = cars.find((item) => item.id === id);

  if (!car) {
    return (
      <ScreenFrame>
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
    <ScreenFrame>
      <DetailBody car={car} cars={cars} quantity={garage[car.id] ?? 0} onAdjust={(delta) => adjust(car.id, delta)} />
      {related.length > 0 && (
        <View style={styles.related}>
          <SectionHeading eyebrow={`Mesma era · ${ERA_LABEL[car.era]}`} title="Continue a visita" />
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
  const info = useEntrance(120);
  const specs: Spec[] = [
    { label: "Ano", value: String(car.year) },
    { label: "Era", value: ERA_LABEL[car.era] },
    { label: "Família", value: car.family },
    { label: "Ranking de preço", value: `${priceRank(cars, car)}º de ${cars.length}` },
  ];

  return (
    <View style={styles.top}>
      <BackLink label="Voltar ao acervo" onPress={goBack} />
      <View style={[styles.split, isWide && styles.splitWide]}>
        <View style={isWide ? styles.galleryWide : undefined}>
          <Gallery car={car} />
        </View>
        <Animated.View style={[styles.info, isWide && styles.infoWide, info]}>
          <Eyebrow label={`${car.family} · ${car.year}`} />
          <Text style={[styles.name, { fontSize: isMedium ? 36 : 26, lineHeight: isMedium ? 46 : 34 }]}>{car.name}</Text>
          {car.fullName !== car.name && <Text style={styles.fullName}>{car.fullName}</Text>}
          <Text style={styles.price}>{formatUsd(car.price)}</Text>
          <SpecGrid specs={specs} />
          <PurchasePanel car={car} quantity={quantity} onAdjust={onAdjust} />
        </Animated.View>
      </View>
    </View>
  );
}

function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace("/");
}

const styles = StyleSheet.create({
  top: { gap: 28 },
  split: { gap: 32 },
  splitWide: { flexDirection: "row", alignItems: "flex-start", gap: 40 },
  galleryWide: { flex: 1.35 },
  info: { gap: 18 },
  infoWide: { flex: 1 },
  name: { fontFamily: fonts.display, color: colors.text, letterSpacing: -0.4 },
  fullName: { fontFamily: fonts.medium, fontSize: 14, color: colors.muted, marginTop: -8 },
  price: { fontFamily: fonts.display, fontSize: 22, color: colors.gold, marginVertical: 6 },
  related: { marginTop: 96, gap: 28 },
});
