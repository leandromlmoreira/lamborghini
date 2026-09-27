import { useEffect, useRef, useState } from "react";
import { Animated, Platform, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { colors, fonts, motion } from "../../theme/tokens";

export function RouteCurtain({ label }: { label: string }) {
  const reduced = useReducedMotion();
  const { width } = useWindowDimensions();
  const progress = useRef(new Animated.Value(0)).current;
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 640,
      delay: 60,
      easing: motion.easeInOut,
      useNativeDriver: Platform.OS !== "web",
    });
    animation.start(() => setDone(true));
    return () => animation.stop();
  }, [progress, reduced]);

  if (done) return null;

  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [0, width + 8] });
  const labelShift = progress.interpolate({ inputRange: [0, 1], outputRange: [0, -width * 0.35] });

  return (
    <Animated.View pointerEvents="none" style={[styles.curtain, { transform: [{ translateX }] }]}>
      <View style={styles.edge} />
      <Animated.View style={[styles.center, { transform: [{ translateX: labelShift }] }]}>
        <Text style={styles.kicker}>TORO · SHOWROOM</Text>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.bar} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  curtain: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, backgroundColor: colors.background, zIndex: 20 },
  edge: { position: "absolute", top: 0, bottom: 0, left: 0, width: 2, backgroundColor: colors.accent },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  kicker: { fontFamily: fonts.techSemibold, fontSize: 12, letterSpacing: 4, color: colors.muted },
  label: { fontFamily: fonts.display, fontSize: 22, letterSpacing: 6, color: colors.text, textTransform: "uppercase" },
  bar: { width: 64, height: 3, backgroundColor: colors.accent, transform: [{ skewX: "-30deg" }] },
});
