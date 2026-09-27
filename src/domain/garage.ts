import type { ShowroomCar } from "./catalog";

export type Garage = Record<number, number>;

export type GarageEntry = {
  car: ShowroomCar;
  quantity: number;
  subtotal: number;
};

export function changeQuantity(garage: Garage, id: number, delta: number): Garage {
  const quantity = Math.max(0, (garage[id] ?? 0) + delta);
  const next = { ...garage };
  if (quantity === 0) delete next[id];
  else next[id] = quantity;
  return next;
}

export function removeFromGarage(garage: Garage, id: number): Garage {
  const next = { ...garage };
  delete next[id];
  return next;
}

export function garageEntries(garage: Garage, cars: ShowroomCar[]): GarageEntry[] {
  return cars
    .filter((car) => garage[car.id])
    .map((car) => ({ car, quantity: garage[car.id], subtotal: car.price * garage[car.id] }));
}

export function garageUnits(garage: Garage): number {
  return Object.values(garage).reduce((total, quantity) => total + quantity, 0);
}

export function garageValue(entries: GarageEntry[]): number {
  return entries.reduce((total, entry) => total + entry.subtotal, 0);
}
