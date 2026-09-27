import { useEffect, useRef } from "react";
import { Animated, Platform, StyleSheet, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { motion } from "../../theme/tokens";

type Props = {
  visible: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Glare({ visible, style }: Props) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: visible ? motion.fast : motion.base,
      easing: motion.easeOut,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [opacity, visible]);

  return (
    <Animated.View pointerEvents="none" style={[styles.layer, { opacity }]}>
      <Animated.View style={[styles.band, style]}>
        <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <Defs>
            <LinearGradient id="tile-glare" x1="0" y1="0" x2="1" y2="0.35">
              <Stop offset="0.3" stopColor="#FFFFFF" stopOpacity={0} />
              <Stop offset="0.5" stopColor="#FFFFFF" stopOpacity={0.09} />
              <Stop offset="0.54" stopColor="#FFFFFF" stopOpacity={0.02} />
              <Stop offset="0.7" stopColor="#FFFFFF" stopOpacity={0} />
            </LinearGradient>
          </Defs>
          <Rect x={0} y={0} width={100} height={100} fill="url(#tile-glare)" />
        </Svg>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  layer: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, overflow: "hidden" },
  band: { position: "absolute", top: 0, bottom: 0, left: "-50%", width: "200%" },
});
