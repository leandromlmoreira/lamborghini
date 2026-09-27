import { useState } from "react";
import { Image, Platform, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import Svg, { Defs, LinearGradient, Rect, Stop } from "react-native-svg";
import { colors } from "../../theme/tokens";
import { Silhouette } from "../art/Silhouette";

export const PHOTO_RATIO = 500 / 151;

type Props = {
  uri: string;
  label: string;
  mirrored?: boolean;
  zoom?: number;
  reflection?: boolean;
  style?: StyleProp<ViewStyle>;
};

const fadeMask =
  Platform.OS === "web"
    ? ({ maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0) 62%)" } as object)
    : {};

export function CarPhoto({ uri, label, mirrored = false, zoom = 1, reflection = false, style }: Props) {
  const [failed, setFailed] = useState(false);
  const flip = mirrored ? -zoom : zoom;

  const picture = (inverted: boolean) =>
    failed ? (
      <Silhouette />
    ) : (
      <Image
        source={{ uri }}
        accessibilityLabel={inverted ? undefined : label}
        accessibilityElementsHidden={inverted}
        resizeMode="contain"
        onError={() => setFailed(true)}
        style={[styles.image, { transform: [{ scaleX: flip }, { scaleY: inverted ? -zoom : zoom }] }]}
      />
    );

  return (
    <View style={[styles.frame, style]}>
      {picture(false)}
      {reflection && (
        <View style={[styles.reflection, fadeMask]} pointerEvents="none">
          {picture(true)}
          {Platform.OS !== "web" && <ReflectionFade />}
        </View>
      )}
    </View>
  );
}

function ReflectionFade() {
  return (
    <Svg style={StyleSheet.absoluteFill} width="100%" height="100%" viewBox="0 0 10 10" preserveAspectRatio="none">
      <Defs>
        <LinearGradient id="reflection-fade" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={colors.background} stopOpacity={0.45} />
          <Stop offset="0.6" stopColor={colors.background} stopOpacity={1} />
        </LinearGradient>
      </Defs>
      <Rect x={0} y={0} width={10} height={10} fill="url(#reflection-fade)" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  frame: { width: "100%", aspectRatio: PHOTO_RATIO },
  image: { width: "100%", height: "100%" },
  reflection: { position: "absolute", left: 0, right: 0, top: "97%", height: "100%", opacity: 0.5 },
});
