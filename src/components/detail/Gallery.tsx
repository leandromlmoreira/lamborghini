import { useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import type { ShowroomCar } from "../../domain/catalog";
import { useEntrance } from "../../hooks/useEntrance";
import { useLayout } from "../../hooks/useLayout";
import { colors, fonts } from "../../theme/tokens";
import { Stage, type StageTone } from "../art/Stage";
import { CarPhoto } from "../car/CarPhoto";
import { PressableScale } from "../ui/PressableScale";
import { Shell } from "../ui/Shell";

type Scene = { key: string; label: string; tone: StageTone; mirrored?: boolean; zoom?: number };

const SCENES: Scene[] = [
  { key: "studio", label: "Estúdio", tone: "gold" },
  { key: "profile", label: "Perfil oposto", tone: "ice", mirrored: true },
  { key: "detail", label: "Detalhe", tone: "ember", zoom: 1.5 },
];

export function Gallery({ car }: { car: ShowroomCar }) {
  const [active, setActive] = useState(SCENES[0]);
  const { isWide, isMedium } = useLayout();

  return (
    <View style={styles.wrap}>
      <Shell>
        <View style={[styles.stage, { height: isWide ? 420 : isMedium ? 340 : 230 }]}>
          <SceneView key={active.key} car={car} scene={active} />
          <Text style={styles.sceneLabel}>{active.label}</Text>
        </View>
      </Shell>
      <View style={styles.thumbs}>
        {SCENES.map((scene) => (
          <PressableScale
            key={scene.key}
            onPress={() => setActive(scene)}
            accessibilityLabel={`Ver cena ${scene.label}`}
            wrapperStyle={styles.thumbWrap}
          >
            {(hovered) => (
              <Shell active={scene.key === active.key || hovered} coreStyle={styles.thumbCore}>
                <View style={styles.thumbStage}>
                  <Stage tone={scene.tone} grid={false} />
                  <CarPhoto uri={car.image} label={scene.label} mirrored={scene.mirrored} zoom={scene.zoom} />
                </View>
                <Text style={[styles.thumbLabel, scene.key === active.key && styles.thumbLabelActive]} numberOfLines={1}>
                  {scene.label}
                </Text>
              </Shell>
            )}
          </PressableScale>
        ))}
      </View>
    </View>
  );
}

function SceneView({ car, scene }: { car: ShowroomCar; scene: Scene }) {
  const entrance = useEntrance(0, 12);
  return (
    <Animated.View style={[styles.scene, entrance]}>
      <Stage tone={scene.tone} />
      <View style={styles.photo}>
        <CarPhoto uri={car.image} label={car.fullName} mirrored={scene.mirrored} zoom={scene.zoom} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  stage: { backgroundColor: "#0C0C0F", overflow: "hidden" },
  scene: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, justifyContent: "center", paddingHorizontal: 28 },
  photo: { marginTop: 40 },
  sceneLabel: {
    position: "absolute",
    top: 18,
    left: 20,
    fontFamily: fonts.semibold,
    fontSize: 10,
    letterSpacing: 2.4,
    color: colors.muted,
    textTransform: "uppercase",
  },
  thumbs: { flexDirection: "row", gap: 10 },
  thumbWrap: { flex: 1 },
  thumbCore: { backgroundColor: "#0C0C0F" },
  thumbStage: { height: 64, justifyContent: "center", paddingHorizontal: 10, overflow: "hidden" },
  thumbLabel: {
    fontFamily: fonts.semibold,
    fontSize: 11,
    color: colors.muted,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: colors.hairline,
  },
  thumbLabelActive: { color: colors.gold },
});
