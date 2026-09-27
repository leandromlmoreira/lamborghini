import { describe, expect, it } from "vitest";
import { FALLBACK_CARS } from "../data/fallbackCars";
import {
  displayName,
  eraOf,
  filterCars,
  flagship,
  formatUsdCompact,
  priceRank,
  priceToNumber,
  sortCars,
  toShowroomCar,
} from "./catalog";

const cars = FALLBACK_CARS.map(toShowroomCar);

describe("catálogo", () => {
  it("converte preço em número", () => {
    expect(priceToNumber("$1,200,000")).toBe(1200000);
  });

  it("limpa ano e marca do nome exibido", () => {
    expect(displayName("2015 Lamborghini Huracán GT3")).toBe("Huracán GT3");
  });

  it("classifica a era pelo ano", () => {
    expect(eraOf(1966)).toBe("classic");
    expect(eraOf(1999)).toBe("legend");
    expect(eraOf(2014)).toBe("modern");
  });

  it("anexa a ficha de desempenho a cada carro", () => {
    expect(cars.every((car) => car.performance.power > 0)).toBe(true);
  });

  it("filtra por era e busca sem acento", () => {
    expect(filterCars(cars, "all", "huracan").map((car) => car.family)).toEqual(["Huracán", "Huracán", "Huracán"]);
    expect(filterCars(cars, "classic", "").every((car) => car.era === "classic")).toBe(true);
  });

  it("ordena, ranqueia e acha a peça principal", () => {
    expect(sortCars(cars, "year-asc")[0].year).toBe(1966);
    expect(flagship(cars)?.name).toBe("Veneno");
    expect(priceRank(cars, cars.find((car) => car.name === "Veneno")!)).toBe(1);
  });

  it("formata valores compactos", () => {
    expect(formatUsdCompact(4500000)).toBe("US$ 4,5 mi");
    expect(formatUsdCompact(450000)).toBe("US$ 450 mil");
  });
});
