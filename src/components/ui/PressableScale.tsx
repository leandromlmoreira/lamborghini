import { useRef, useState, type ReactNode } from "react";
import { Animated, Platform, Pressable, type StyleProp, type ViewStyle } from "react-native";
import { motion } from "../../theme/tokens";

type Props = {
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
  pressedScale?: number;
  accessibilityLabel?: string;
  disabled?: boolean;
  children: ReactNode | ((hovered: boolean) => ReactNode);
};

export function PressableScale({ onPress, style, wrapperStyle, pressedScale = 0.97, accessibilityLabel, disabled, children }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const [hovered, setHovered] = useState(false);

  const animateTo = (toValue: number) =>
    Animated.timing(scale, {
      toValue,
      duration: motion.fast,
      easing: motion.easeSnap,
      useNativeDriver: Platform.OS !== "web",
    }).start();

  return (
    <Pressable
      onPress={onPress}
      style={wrapperStyle}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPressIn={() => animateTo(pressedScale)}
      onPressOut={() => animateTo(1)}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
    >
      <Animated.View style={[style, { transform: [{ scale }] }]}>
        {typeof children === "function" ? children(hovered) : children}
      </Animated.View>
    </Pressable>
  );
}
