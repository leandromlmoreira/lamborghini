import { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { colors, motion } from "../../theme/tokens";
import { Shell } from "../ui/Shell";

export function TileSkeleton({ width }: { width: number }) {
  const reduced = useReducedMotion();
  const sweep = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reduced) return;
    const loop = Animated.loop(
      Animated.timing(sweep, { toValue: 1, duration: 1300, easing: motion.easeInOut, useNativeDriver: Platform.OS !== "web" }),
    );
    loop.start();
    return () => loop.stop();
  }, [reduced, sweep]);

  const translateX = sweep.interpolate({ inputRange: [0, 1], outputRange: [-width, width] });

  return (
    <View style={{ width }} accessibilityLabel="Carregando modelo">
      <Shell>
        <View style={styles.stage}>
          <Animated.View style={[styles.scan, { transform: [{ translateX }] }]} />
        </View>
        <View style={styles.body}>
          <View style={[styles.bar, { width: "30%" }]} />
          <View style={[styles.bar, styles.barTall, { width: "70%" }]} />
          <View style={[styles.bar, { width: "55%", marginTop: 12 }]} />
        </View>
      </Shell>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { height: 210, backgroundColor: colors.stage, overflow: "hidden" },
  scan: { position: "absolute", top: 0, bottom: 0, width: 2, left: "50%", backgroundColor: colors.accentLine },
  body: { padding: 20, gap: 10 },
  bar: { height: 10, borderRadius: 3, backgroundColor: colors.surfaceRaised },
  barTall: { height: 18 },
});
