import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";
import { changeQuantity, removeFromGarage, type Garage } from "../domain/garage";

const STORAGE_KEY = "toro.garage.v1";

async function readGarage(): Promise<Garage> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Garage) : {};
  } catch {
    return {};
  }
}

async function writeGarage(garage: Garage) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(garage));
  } catch {
    return;
  }
}

export function useGarage() {
  const [garage, setGarage] = useState<Garage>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    readGarage().then((stored) => {
      setGarage(stored);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) writeGarage(garage);
  }, [garage, ready]);

  const adjust = useCallback((id: number, delta: number) => {
    setGarage((current) => changeQuantity(current, id, delta));
  }, []);

  const remove = useCallback((id: number) => {
    setGarage((current) => removeFromGarage(current, id));
  }, []);

  const toggle = useCallback((id: number) => {
    setGarage((current) => (current[id] ? removeFromGarage(current, id) : changeQuantity(current, id, 1)));
  }, []);

  return { garage, adjust, remove, toggle };
}
