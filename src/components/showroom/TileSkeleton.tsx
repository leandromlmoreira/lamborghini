import { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, View } from "react-native";
import { colors, motion } from "../../theme/tokens";
import { Shell } from "../ui/Shell";

export function TileSkeleton({ width }: { width: number }) {
  const pulse = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 900, easing: motion.easeOut, useNativeDriver: Platform.OS !== "web" }),
        Animated.timing(pulse, { toValue: 0.4, duration: 900, easing: motion.easeOut, useNativeDriver: Platform.OS !== "web" }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  return (
    <Animated.View style={{ width, opacity: pulse }} accessibilityLabel="Carregando modelo">
      <Shell>
        <View style={styles.stage} />
        <View style={styles.body}>
          <View style={[styles.bar, { width: "30%" }]} />
          <View style={[styles.bar, styles.barTall, { width: "70%" }]} />
          <View style={[styles.bar, { width: "40%", marginTop: 12 }]} />
        </View>
      </Shell>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  stage: { height: 188, backgroundColor: "#0C0C0F" },
  body: { padding: 20, gap: 10 },
  bar: { height: 10, borderRadius: 5, backgroundColor: colors.surfaceRaised },
  barTall: { height: 18 },
});
