import { useCallback, useEffect, useMemo, useState } from "react";
import { FALLBACK_CARS } from "../data/fallbackCars";
import { toShowroomCar } from "../domain/catalog";
import type { Car } from "../models/Car";
import { fetchCars } from "../services/api";

export type CatalogSource = "loading" | "live" | "archive";

export function useCatalog() {
  const [raw, setRaw] = useState<Car[]>([]);
  const [source, setSource] = useState<CatalogSource>("loading");

  const load = useCallback(async () => {
    setSource("loading");
    try {
      setRaw(await fetchCars());
      setSource("live");
    } catch {
      setRaw(FALLBACK_CARS);
      setSource("archive");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const cars = useMemo(() => raw.map(toShowroomCar), [raw]);

  return { cars, source, reload: load };
}
