import type { Car } from "../models/Car";
import { carImageUri } from "../models/Car";

export type Era = "classic" | "legend" | "modern";
export type EraFilter = Era | "all";
export type SortKey = "price-desc" | "price-asc" | "year-desc" | "year-asc";

export type ShowroomCar = {
  id: number;
  name: string;
  fullName: string;
  family: string;
  year: number;
  era: Era;
  price: number;
  image: string;
};

export const ERA_LABEL: Record<Era, string> = {
  classic: "Clássico",
  legend: "Lenda",
  modern: "Moderno",
};

export const ERA_FILTERS: { key: EraFilter; label: string }[] = [
  { key: "all", label: "Todos" },
  { key: "classic", label: "Clássicos" },
  { key: "legend", label: "Lendas" },
  { key: "modern", label: "Modernos" },
];

export const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "price-desc", label: "Maior preço" },
  { key: "price-asc", label: "Menor preço" },
  { key: "year-desc", label: "Mais novos" },
  { key: "year-asc", label: "Mais antigos" },
];

const FAMILIES = ["Huracán", "Aventador", "Countach", "Diablo", "Miura", "Veneno"];

export function priceToNumber(price: string): number {
  return Number(price.replace(/[^0-9.]/g, "")) || 0;
}

export function formatUsd(value: number): string {
  return `US$ ${value.toLocaleString("pt-BR")}`;
}

export function formatUsdCompact(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `US$ ${millions.toFixed(millions >= 10 ? 0 : 1).replace(".", ",")} mi`;
  }
  return `US$ ${Math.round(value / 1000)} mil`;
}

export function eraOf(year: number): Era {
  if (year < 1980) return "classic";
  if (year < 2010) return "legend";
  return "modern";
}

export function familyOf(name: string): string {
  return FAMILIES.find((family) => name.includes(family)) ?? name.split(" ")[0];
}

export function displayName(name: string): string {
  return name.replace(/^\d{4}\s+/, "").replace(/^Lamborghini\s+/, "");
}

export function toShowroomCar(car: Car): ShowroomCar {
  return {
    id: car.id,
    name: displayName(car.carName),
    fullName: car.carName,
    family: familyOf(car.carName),
    year: car.releaseYear,
    era: eraOf(car.releaseYear),
    price: priceToNumber(car.price),
    image: carImageUri(car.id),
  };
}

const SORTERS: Record<SortKey, (a: ShowroomCar, b: ShowroomCar) => number> = {
  "price-desc": (a, b) => b.price - a.price,
  "price-asc": (a, b) => a.price - b.price,
  "year-desc": (a, b) => b.year - a.year,
  "year-asc": (a, b) => a.year - b.year,
};

export function sortCars(cars: ShowroomCar[], key: SortKey): ShowroomCar[] {
  return [...cars].sort(SORTERS[key]);
}

function normalize(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function filterCars(cars: ShowroomCar[], era: EraFilter, query: string): ShowroomCar[] {
  const needle = normalize(query.trim());
  return cars.filter(
    (car) =>
      (era === "all" || car.era === era) &&
      (!needle || normalize(`${car.fullName} ${car.year}`).includes(needle)),
  );
}

export function countByEra(cars: ShowroomCar[], era: EraFilter): number {
  return era === "all" ? cars.length : cars.filter((car) => car.era === era).length;
}

export function priceRank(cars: ShowroomCar[], car: ShowroomCar): number {
  return sortCars(cars, "price-desc").findIndex((item) => item.id === car.id) + 1;
}

export function flagship(cars: ShowroomCar[]): ShowroomCar | undefined {
  return sortCars(cars, "price-desc")[0];
}

export function catalogValue(cars: ShowroomCar[]): number {
  return cars.reduce((total, car) => total + car.price, 0);
}

export function yearSpan(cars: ShowroomCar[]): [number, number] {
  const years = cars.map((car) => car.year);
  return [Math.min(...years), Math.max(...years)];
}
