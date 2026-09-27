import { describe, expect, it } from "vitest";
import { FALLBACK_CARS } from "../data/fallbackCars";
import { toShowroomCar } from "./catalog";
import { changeQuantity, garageEntries, garageUnits, garageValue, removeFromGarage } from "./garage";

const cars = FALLBACK_CARS.map(toShowroomCar);

describe("garagem", () => {
  it("soma e remove unidades sem ficar negativo", () => {
    const garage = changeQuantity(changeQuantity({}, 10, 2), 10, -5);
    expect(garage).toEqual({});
  });

  it("calcula unidades, subtotal e total", () => {
    const garage = changeQuantity(changeQuantity({}, 10, 2), 9, 1);
    const entries = garageEntries(garage, cars);
    expect(garageUnits(garage)).toBe(3);
    expect(garageValue(entries)).toBe(4500000 * 2 + 1200000);
  });

  it("tira o modelo inteiro", () => {
    expect(removeFromGarage({ 1: 3, 2: 1 }, 1)).toEqual({ 2: 1 });
  });
});
