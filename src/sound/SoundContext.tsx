import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { playCue, setSoundEnabled, soundSupported } from "./engine";
import type { Cue, RevInput } from "./patches";

const STORAGE_KEY = "toro.sound.v1";

type SoundState = {
  supported: boolean;
  enabled: boolean;
  toggle: () => void;
  play: (cue: Cue, rev?: RevInput) => void;
};

const SoundContext = createContext<SoundState>({
  supported: false,
  enabled: false,
  toggle: () => undefined,
  play: () => undefined,
});

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored !== "on") return;
        setSoundEnabled(true);
        setEnabled(true);
      })
      .catch(() => undefined);
  }, []);

  const toggle = useCallback(() => {
    const next = !enabled;
    setSoundEnabled(next, true);
    setEnabled(next);
    if (next) setTimeout(() => playCue("click"), 60);
    AsyncStorage.setItem(STORAGE_KEY, next ? "on" : "off").catch(() => undefined);
  }, [enabled]);

  const value = useMemo(() => ({ supported: soundSupported, enabled, toggle, play: playCue }), [enabled, toggle]);

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound(): SoundState {
  return useContext(SoundContext);
}
