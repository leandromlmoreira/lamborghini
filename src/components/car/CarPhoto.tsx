import { useState } from "react";
import { Image, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";
import { Silhouette } from "../art/Silhouette";

export const PHOTO_RATIO = 500 / 151;

type Props = {
  uri: string;
  label: string;
  mirrored?: boolean;
  zoom?: number;
  style?: StyleProp<ViewStyle>;
};

export function CarPhoto({ uri, label, mirrored = false, zoom = 1, style }: Props) {
  const [failed, setFailed] = useState(false);
  const transform = [{ scaleX: mirrored ? -zoom : zoom }, { scaleY: zoom }];

  return (
    <View style={[styles.frame, style]}>
      {failed ? (
        <Silhouette />
      ) : (
        <Image
          source={{ uri }}
          accessibilityLabel={label}
          resizeMode="contain"
          onError={() => setFailed(true)}
          style={[styles.image, { transform }]}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { width: "100%", aspectRatio: PHOTO_RATIO },
  image: { width: "100%", height: "100%" },
});
