import { useRef, useState, type ReactNode } from "react";
import { Animated, Platform, Pressable, type StyleProp, type ViewStyle } from "react-native";
import { useSound } from "../../sound/SoundContext";
import type { Cue } from "../../sound/patches";
import { motion } from "../../theme/tokens";

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  pressedScale?: number;
  accessibilityLabel?: string;
  accessibilityState?: { selected?: boolean; disabled?: boolean };
  disabled?: boolean;
  cue?: Cue | null;
  children: ReactNode | ((hovered: boolean) => ReactNode);
};

export function PressableScale({
  onPress,
  style,
  wrapperStyle,
  pressedScale = 0.97,
  accessibilityLabel,
  accessibilityState,
  disabled,
  cue = "click",
  children,
}: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const [hovered, setHovered] = useState(false);
  const { play } = useSound();

  const animateTo = (toValue: number, duration: number) =>
    Animated.timing(scale, {
      toValue,
      duration,
      easing: motion.easeOut,
      useNativeDriver: Platform.OS !== "web",
    }).start();

  const pressIn = () => {
    animateTo(pressedScale, motion.press);
    if (cue) play(cue);
  };

  return (
    <Pressable
      onPress={onPress}
      style={wrapperStyle}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState}
      onPressIn={pressIn}
      onPressOut={() => animateTo(1, motion.fast)}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {typeof children === "function" ? children(hovered) : children}
      </Animated.View>
    </Pressable>
  );
}
