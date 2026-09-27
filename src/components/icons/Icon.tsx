import Svg, { Circle, Path } from "react-native-svg";
import { colors } from "../../theme/tokens";

export type IconName =
  | "arrow-right"
  | "arrow-left"
  | "heart"
  | "heart-filled"
  | "plus"
  | "minus"
  | "search"
  | "garage"
  | "close"
  | "refresh";

type Props = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

const PATHS: Record<Exclude<IconName, "search">, string> = {
  "arrow-right": "M5 12h14M13 6l6 6-6 6",
  "arrow-left": "M19 12H5M11 6l-6 6 6 6",
  heart: "M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z",
  "heart-filled": "M12 20s-7-4.35-7-10a4 4 0 0 1 7-2.65A4 4 0 0 1 19 10c0 5.65-7 10-7 10z",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  garage: "M3 10l9-6 9 6v10H3zM7 20v-6h10v6M7 17h10",
  close: "M6 6l12 12M18 6L6 18",
  refresh: "M20 11a8 8 0 1 0-2.34 5.66M20 5v6h-6",
};

export function Icon({ name, size = 18, color = colors.text, strokeWidth = 1.5 }: Props) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {name === "search" ? (
        <>
          <Circle cx={11} cy={11} r={6.5} stroke={color} strokeWidth={strokeWidth} />
          <Path d="M16 16l4 4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
        </>
      ) : (
        <Path
          d={PATHS[name]}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={name === "heart-filled" ? color : "none"}
        />
      )}
    </Svg>
  );
}
