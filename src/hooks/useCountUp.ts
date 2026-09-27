import { useEffect, useRef, useState } from "react";
import { Animated } from "react-native";
import { motion } from "../theme/tokens";
import { useReducedMotion } from "./useReducedMotion";

export function useCountUp(target: number, delay = 0, duration = 1100): number {
  const reduced = useReducedMotion();
  const progress = useRef(new Animated.Value(0)).current;
  const [value, setValue] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }
    progress.setValue(0);
    const listener = progress.addListener(({ value: amount }) => setValue(target * amount));
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration,
      delay,
      easing: motion.easeOut,
      useNativeDriver: false,
    });
    animation.start();
    return () => {
      animation.stop();
      progress.removeListener(listener);
    };
  }, [delay, duration, progress, reduced, target]);

  return value;
}
