import Svg, { Circle, Path } from "react-native-svg";
import { colors } from "../../theme/tokens";

export function Silhouette() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 500 151" fill="none">
      <Path
        d="M24 116l14-12c14-8 44-12 76-14l84-32c22-8 44-11 70-11l58 3c26 3 44 12 66 26l58 10c18 3 26 12 26 26v4H24z"
        stroke={colors.goldLine}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path d="M206 60c20-7 40-10 64-10l54 3 38 20H198z" stroke={colors.goldLine} strokeWidth={1.4} strokeLinejoin="round" />
      <Path d="M428 74l44-8" stroke={colors.goldLine} strokeWidth={2} strokeLinecap="round" />
      <Path d="M60 104h40M330 96h60" stroke={colors.goldLine} strokeWidth={1} strokeLinecap="round" />
      <Circle cx={126} cy={116} r={23} stroke={colors.goldLine} strokeWidth={2} />
      <Circle cx={392} cy={116} r={23} stroke={colors.goldLine} strokeWidth={2} />
      <Circle cx={126} cy={116} r={9} stroke={colors.goldLine} strokeWidth={1} />
      <Circle cx={392} cy={116} r={9} stroke={colors.goldLine} strokeWidth={1} />
    </Svg>
  );
}
