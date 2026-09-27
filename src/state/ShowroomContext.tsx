import { createContext, useContext, useMemo, type ReactNode } from "react";
import { garageEntries, garageUnits, garageValue } from "../domain/garage";
import { useCatalog } from "../hooks/useCatalog";
import { useGarage } from "../hooks/useGarage";

function useShowroomState() {
  const catalog = useCatalog();
  const garage = useGarage();
  const entries = useMemo(() => garageEntries(garage.garage, catalog.cars), [garage.garage, catalog.cars]);

  return {
    ...catalog,
    ...garage,
    entries,
    units: garageUnits(garage.garage),
    total: garageValue(entries),
  };
}

type ShowroomState = ReturnType<typeof useShowroomState>;

const ShowroomContext = createContext<ShowroomState | null>(null);

export function ShowroomProvider({ children }: { children: ReactNode }) {
  const value = useShowroomState();
  return <ShowroomContext.Provider value={value}>{children}</ShowroomContext.Provider>;
}

export function useShowroom(): ShowroomState {
  const value = useContext(ShowroomContext);
  if (!value) throw new Error("useShowroom precisa estar dentro de ShowroomProvider");
  return value;
}
