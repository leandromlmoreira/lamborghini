import { useEffect, useRef } from "react";
import { Animated, Platform } from "react-native";
import { motion } from "../theme/tokens";

export function useEntrance(delay = 0, distance = 24) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: motion.slow,
      delay,
      easing: motion.easeOut,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [delay, progress]);

  return {
    opacity: progress,
    transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [distance, 0] }) }],
  };
}
