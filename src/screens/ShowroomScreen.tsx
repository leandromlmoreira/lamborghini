import { useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import {
  catalogValue,
  filterCars,
  flagship,
  formatUsdCompact,
  sortCars,
  yearSpan,
  type EraFilter,
  type ShowroomCar,
  type SortKey,
} from "../domain/catalog";
import { useShowroom } from "../state/ShowroomContext";
import { colors, fonts } from "../theme/tokens";
import { ScreenFrame } from "../components/frame/ScreenFrame";
import { CatalogGrid } from "../components/showroom/CatalogGrid";
import { FilterBar } from "../components/showroom/FilterBar";
import { Hero } from "../components/showroom/Hero";
import { StatsStrip, type Stat } from "../components/showroom/StatsStrip";
import { EmptyState } from "../components/ui/EmptyState";
import { Notice } from "../components/ui/Notice";
import { SectionHeading } from "../components/ui/SectionHeading";

export function ShowroomScreen() {
  const { cars, source, reload, garage, toggle, units } = useShowroom();
  const [era, setEra] = useState<EraFilter>("all");
  const [sort, setSort] = useState<SortKey>("price-desc");
  const [query, setQuery] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const catalogY = useRef(0);

  const visible = useMemo(() => sortCars(filterCars(cars, era, query), sort), [cars, era, query, sort]);
  const stats = useMemo<Stat[]>(() => buildStats(cars, units), [cars, units]);

  const resetFilters = () => {
    setEra("all");
    setQuery("");
  };

  return (
    <ScreenFrame scrollRef={scrollRef} curtain="Acervo">
      <Hero
        flagship={flagship(cars)}
        count={cars.length}
        source={source}
        onExplore={() => scrollRef.current?.scrollTo({ y: catalogY.current, animated: true })}
      />

      <View style={styles.stats}>
        <StatsStrip stats={stats} />
      </View>

      <View style={styles.catalog} onLayout={(event) => (catalogY.current = event.nativeEvent.layout.y)}>
        <SectionHeading
          title="Escolha a sua próxima lenda"
          aside={<Text style={styles.count}>{`${visible.length} de ${cars.length} modelos`}</Text>}
        />

        {source === "archive" && (
          <Notice
            title="Mostrando o acervo salvo"
            message="A API não respondeu agora. Os dados são uma cópia fiel; toque para tentar de novo."
            onRetry={reload}
          />
        )}

        <FilterBar cars={cars} era={era} sort={sort} query={query} onEra={setEra} onSort={setSort} onQuery={setQuery} />

        {source !== "loading" && visible.length === 0 ? (
          <EmptyState
            title="Nenhum modelo por aqui"
            message={query ? `Nada no acervo combina com “${query}” neste filtro. Tente outro nome ou ano.` : "Nenhum modelo neste filtro por enquanto."}
            action="Limpar filtros"
            onAction={resetFilters}
          />
        ) : (
          <CatalogGrid cars={visible} garage={garage} loading={source === "loading"} onToggle={toggle} />
        )}
      </View>
    </ScreenFrame>
  );
}

function buildStats(cars: ShowroomCar[], units: number): Stat[] {
  if (cars.length === 0) return [];
  const [first, last] = yearSpan(cars);
  return [
    { label: "Valor do acervo", value: formatUsdCompact(catalogValue(cars)) },
    { label: "Linha do tempo", value: `${first}–${last}` },
    { label: "Potência máxima", value: String(Math.max(...cars.map((car) => car.performance.power))), unit: "cv" },
    { label: "Na sua garagem", value: String(units).padStart(2, "0"), unit: units === 1 ? "unidade" : "unidades" },
  ];
}

const styles = StyleSheet.create({
  stats: { marginTop: 64 },
  catalog: { marginTop: 112, gap: 28 },
  count: { fontFamily: fonts.techSemibold, fontSize: 12, letterSpacing: 1.6, color: colors.muted, textTransform: "uppercase" },
});
