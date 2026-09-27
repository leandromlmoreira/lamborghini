import { useEffect, useRef, useState } from "react";
import { Animated, Platform, StyleSheet, Text, View } from "react-native";
import type { ShowroomCar } from "../../domain/catalog";
import { useLayout } from "../../hooks/useLayout";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useTilt } from "../../hooks/useTilt";
import { colors, fonts, motion } from "../../theme/tokens";
import { Stage, type StageTone } from "../art/Stage";
import { CarPhoto } from "../car/CarPhoto";
import { PressableScale } from "../ui/PressableScale";

type Scene = { key: string; label: string; tone: StageTone; mirrored?: boolean; zoom?: number };

const SCENES: Scene[] = [
  { key: "studio", label: "Estúdio", tone: "acid" },
  { key: "profile", label: "Perfil oposto", tone: "ice", mirrored: true },
  { key: "detail", label: "Detalhe", tone: "amber", zoom: 1.5 },
];

export function Gallery({ car }: { car: ShowroomCar }) {
  const [active, setActive] = useState(SCENES[0]);
  const { isWide, isMedium } = useLayout();
  const tilt = useTilt(2);

  return (
    <View style={styles.wrap}>
      <View style={styles.panel} {...tilt.handlers}>
        <View style={[styles.stage, { height: isWide ? 440 : isMedium ? 360 : 240 }]}>
          <SceneView key={active.key} car={car} scene={active} shift={tilt.shiftStyle} />
          <View style={styles.hud}>
            <Text style={styles.hudLabel}>{`Vista · ${active.label}`}</Text>
            <Text style={styles.hudIndex}>{`${SCENES.indexOf(active) + 1}/${SCENES.length}`}</Text>
          </View>
        </View>
      </View>
      <View style={styles.thumbs} accessibilityRole="tablist">
        {SCENES.map((scene) => {
          const selected = scene.key === active.key;
          return (
            <PressableScale
              key={scene.key}
              onPress={() => setActive(scene)}
              accessibilityLabel={`Ver cena ${scene.label}`}
              accessibilityState={{ selected }}
              wrapperStyle={styles.thumbWrap}
              cue="whoosh"
            >
              {(hovered) => (
                <View style={[styles.thumb, (selected || hovered) && styles.thumbOn, selected && styles.thumbSelected]}>
                  <View style={styles.thumbStage}>
                    <Stage tone={scene.tone} grid={false} />
                    <CarPhoto uri={car.image} label={scene.label} mirrored={scene.mirrored} zoom={scene.zoom} />
                  </View>
                  <Text style={[styles.thumbLabel, selected && styles.thumbLabelActive]} numberOfLines={1}>
                    {scene.label}
                  </Text>
                  <View style={[styles.thumbRail, selected && styles.thumbRailActive]} />
                </View>
              )}
            </PressableScale>
          );
        })}
      </View>
    </View>
  );
}

function SceneView({ car, scene, shift }: { car: ShowroomCar; scene: Scene; shift: object }) {
  const reduced = useReducedMotion();
  const progress = useRef(new Animated.Value(reduced ? 1 : 0)).current;

  useEffect(() => {
    if (reduced) return;
    Animated.timing(progress, {
      toValue: 1,
      duration: 620,
      easing: motion.easeOut,
      useNativeDriver: Platform.OS !== "web",
    }).start();
  }, [progress, reduced]);

  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [64, 0] });

  return (
    <View style={styles.scene}>
      <Stage tone={scene.tone} horizon={172} />
      <Animated.View style={[styles.photo, { opacity: progress, transform: [{ translateX }] }]}>
        <Animated.View style={shift}>
          <CarPhoto uri={car.image} label={car.fullName} mirrored={scene.mirrored} zoom={scene.zoom} reflection={!scene.zoom} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  panel: { borderRadius: 16, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.stage, overflow: "hidden" },
  stage: { overflow: "hidden" },
  scene: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, justifyContent: "center", paddingHorizontal: 28 },
  photo: { marginTop: 44 },
  hud: {
    position: "absolute",
    top: 16,
    left: 18,
    right: 18,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hudLabel: { fontFamily: fonts.techSemibold, fontSize: 12, letterSpacing: 2, color: colors.muted, textTransform: "uppercase" },
  hudIndex: { fontFamily: fonts.techBold, fontSize: 13, letterSpacing: 1, color: colors.text },
  thumbs: { flexDirection: "row", gap: 10 },
  thumbWrap: { flex: 1 },
  thumb: { borderRadius: 10, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.stage, overflow: "hidden" },
  thumbOn: { borderColor: colors.lineStrong },
  thumbSelected: { borderColor: colors.accentLine },
  thumbStage: { height: 64, justifyContent: "center", paddingHorizontal: 10, overflow: "hidden" },
  thumbLabel: {
    fontFamily: fonts.techSemibold,
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    color: colors.muted,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  thumbLabelActive: { color: colors.accent },
  thumbRail: { position: "absolute", left: 0, right: 0, bottom: 0, height: 2, backgroundColor: "transparent" },
  thumbRailActive: { backgroundColor: colors.accent },
});
