import { StyleSheet, View } from "react-native";
import Svg, { Defs, Ellipse, Line, RadialGradient, Rect, Stop } from "react-native-svg";
import { colors } from "../../theme/tokens";

export type StageTone = "gold" | "ice" | "ember";

type Props = {
  tone?: StageTone;
  grid?: boolean;
};

const TONES: Record<StageTone, string> = {
  gold: colors.gold,
  ice: "#8FB8FF",
  ember: "#FF7A45",
};

const GRID_LINES = [-60, -35, -15, 0, 15, 35, 60];

export function Stage({ tone = "gold", grid = true }: Props) {
  const glow = TONES[tone];
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <RadialGradient id={`halo-${tone}`} cx="50%" cy="42%" r="60%">
            <Stop offset="0" stopColor={glow} stopOpacity={0.22} />
            <Stop offset="0.55" stopColor={glow} stopOpacity={0.05} />
            <Stop offset="1" stopColor={glow} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id={`floor-${tone}`} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#000" stopOpacity={0.85} />
            <Stop offset="1" stopColor="#000" stopOpacity={0} />
          </RadialGradient>
        </Defs>
        <Rect x={0} y={0} width={400} height={240} fill={`url(#halo-${tone})`} />
        {grid &&
          GRID_LINES.map((offset) => (
            <Line
              key={offset}
              x1={200 + offset * 0.6}
              y1={150}
              x2={200 + offset * 6}
              y2={240}
              stroke={glow}
              strokeOpacity={0.08}
              strokeWidth={0.6}
            />
          ))}
        {grid && <Line x1={0} y1={150} x2={400} y2={150} stroke={glow} strokeOpacity={0.12} strokeWidth={0.6} />}
        <Ellipse cx={200} cy={170} rx={150} ry={14} fill={`url(#floor-${tone})`} />
      </Svg>
    </View>
  );
}
