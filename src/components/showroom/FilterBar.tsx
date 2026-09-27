import { ScrollView, StyleSheet, View } from "react-native";
import { countByEra, ERA_FILTERS, SORT_OPTIONS, type EraFilter, type ShowroomCar, type SortKey } from "../../domain/catalog";
import { useLayout } from "../../hooks/useLayout";
import { Chip } from "../ui/Chip";
import { SearchField } from "./SearchField";

type Props = {
  cars: ShowroomCar[];
  era: EraFilter;
  sort: SortKey;
  query: string;
  onEra: (era: EraFilter) => void;
  onSort: (sort: SortKey) => void;
  onQuery: (query: string) => void;
};

export function FilterBar({ cars, era, sort, query, onEra, onSort, onQuery }: Props) {
  const { isWide } = useLayout();
  return (
    <View style={styles.wrap}>
      <View style={[styles.top, isWide && styles.topWide]}>
        <View style={isWide ? styles.searchWide : undefined}>
          <SearchField value={query} onChange={onQuery} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
          {ERA_FILTERS.map((option) => (
            <Chip
              key={option.key}
              label={option.label}
              count={countByEra(cars, option.key)}
              active={era === option.key}
              onPress={() => onEra(option.key)}
            />
          ))}
        </ScrollView>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
        {SORT_OPTIONS.map((option) => (
          <Chip key={option.key} label={option.label} active={sort === option.key} onPress={() => onSort(option.key)} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 14 },
  top: { gap: 14 },
  topWide: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  searchWide: { width: 380 },
  chips: { gap: 8 },
});
