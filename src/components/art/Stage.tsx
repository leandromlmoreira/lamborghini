import { StyleSheet, View } from "react-native";
import Svg, { Defs, Ellipse, Line, LinearGradient, RadialGradient, Rect, Stop } from "react-native-svg";
import { colors } from "../../theme/tokens";

export type StageTone = "acid" | "ice" | "amber";

type Props = {
  tone?: StageTone;
  grid?: boolean;
  horizon?: number;
};

export const STAGE_TONES: Record<StageTone, string> = {
  acid: colors.accent,
  ice: colors.ice,
  amber: colors.amber,
};

const FLOOR_LINES = [-80, -48, -24, -8, 8, 24, 48, 80];

export function Stage({ tone = "acid", grid = true, horizon = 150 }: Props) {
  const glow = STAGE_TONES[tone];
  const id = `${tone}-${horizon}`;
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Svg width="100%" height="100%" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice">
        <Defs>
          <LinearGradient id={`wall-${id}`} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#101014" />
            <Stop offset={String(horizon / 240)} stopColor="#07070A" />
            <Stop offset="1" stopColor="#020203" />
          </LinearGradient>
          <RadialGradient id={`beam-${id}`} cx="50%" cy="0%" r="100%">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.14} />
            <Stop offset="0.45" stopColor="#FFFFFF" stopOpacity={0.05} />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id={`lamp-${id}`} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.9} />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id={`halo-${id}`} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor={glow} stopOpacity={0.2} />
            <Stop offset="0.6" stopColor={glow} stopOpacity={0.04} />
            <Stop offset="1" stopColor={glow} stopOpacity={0} />
          </RadialGradient>
          <RadialGradient id={`pool-${id}`} cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#FFFFFF" stopOpacity={0.1} />
            <Stop offset="1" stopColor="#FFFFFF" stopOpacity={0} />
          </RadialGradient>
          <LinearGradient id={`edge-${id}`} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={glow} stopOpacity={0} />
            <Stop offset="0.5" stopColor={glow} stopOpacity={0.5} />
            <Stop offset="1" stopColor={glow} stopOpacity={0} />
          </LinearGradient>
        </Defs>
        <Rect x={0} y={0} width={400} height={240} fill={`url(#wall-${id})`} />
        <Ellipse cx={200} cy={0} rx={130} ry={horizon + 30} fill={`url(#beam-${id})`} />
        <Ellipse cx={200} cy={0} rx={62} ry={horizon} fill={`url(#beam-${id})`} />
        <Ellipse cx={200} cy={1} rx={46} ry={3} fill={`url(#lamp-${id})`} />
        <Ellipse cx={200} cy={horizon - 24} rx={190} ry={90} fill={`url(#halo-${id})`} />
        {grid &&
          FLOOR_LINES.map((offset) => (
            <Line
              key={offset}
              x1={200 + offset * 0.9}
              y1={horizon}
              x2={200 + offset * 7}
              y2={240}
              stroke="#FFFFFF"
              strokeOpacity={0.045}
              strokeWidth={0.5}
            />
          ))}
        <Line x1={0} y1={horizon} x2={400} y2={horizon} stroke={`url(#edge-${id})`} strokeWidth={0.6} />
        <Ellipse cx={200} cy={horizon + 26} rx={170} ry={20} fill={`url(#pool-${id})`} />
      </Svg>
    </View>
  );
}
