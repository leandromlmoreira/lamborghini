import { useMemo, useRef } from "react";
import { Animated, type GestureResponderEvent } from "react-native";
import { useReducedMotion } from "./useReducedMotion";

type PointerLike = GestureResponderEvent & {
  currentTarget: unknown;
  nativeEvent: { clientX: number; clientY: number; pointerType?: string };
};

function springTo(value: Animated.Value, toValue: number) {
  Animated.spring(value, { toValue, stiffness: 170, damping: 20, mass: 0.7, useNativeDriver: false }).start();
}

export function useTilt(strength = 6) {
  const reduced = useReducedMotion();
  const x = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(0)).current;

  return useMemo(() => {
    const onPointerMove = (event: PointerLike) => {
      if (reduced || event.nativeEvent.pointerType === "touch") return;
      const rect = (event.currentTarget as unknown as HTMLElement).getBoundingClientRect();
      springTo(x, ((event.nativeEvent.clientX - rect.left) / rect.width) * 2 - 1);
      springTo(y, ((event.nativeEvent.clientY - rect.top) / rect.height) * 2 - 1);
    };
    const onPointerLeave = () => {
      springTo(x, 0);
      springTo(y, 0);
    };
    const degrees = (value: Animated.Value, flip: number) =>
      value.interpolate({ inputRange: [-1, 1], outputRange: [`${-strength * flip}deg`, `${strength * flip}deg`] });

    return {
      handlers: { onPointerMove, onPointerLeave },
      tiltStyle: { transform: [{ perspective: 1000 }, { rotateY: degrees(x, 1) }, { rotateX: degrees(y, -1) }] },
      glareStyle: { transform: [{ translateX: x.interpolate({ inputRange: [-1, 1], outputRange: [-220, 220] }) }] },
      shiftStyle: { transform: [{ translateX: x.interpolate({ inputRange: [-1, 1], outputRange: [-10, 10] }) }] },
    };
  }, [reduced, strength, x, y]);
}
