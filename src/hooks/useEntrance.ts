import { useEffect, useRef } from "react";
import { Animated, Platform } from "react-native";
import { motion } from "../theme/tokens";
import { useReducedMotion } from "./useReducedMotion";

export function useEntrance(delay = 0, distance = 24) {
  const reduced = useReducedMotion();
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduced) {
      progress.setValue(1);
      return;
    }
    Animated.timing(progress, {
      toValue: 1,
      duration: motion.slow,
      delay,
      easing: motion.easeOut,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [delay, progress, reduced]);

  return {
    opacity: progress,
    transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
  };
}
