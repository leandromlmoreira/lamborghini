import { Easing } from "react-native";

export const colors = {
  background: "#050506",
  stage: "#09090B",
  surface: "#0D0D10",
  surfaceRaised: "#141418",
  line: "rgba(255,255,255,0.08)",
  lineStrong: "rgba(255,255,255,0.18)",
  sheen: "rgba(255,255,255,0.06)",
  text: "#F3F3EE",
  muted: "#A2A29B",
  faint: "#7E7E78",
  accent: "#C8FF1A",
  accentDeep: "#9BCC00",
  accentSoft: "rgba(200,255,26,0.08)",
  accentLine: "rgba(200,255,26,0.45)",
  onAccent: "#0A0E00",
  ice: "#8EC5FF",
  amber: "#FF8A3D",
  danger: "#FF6B4A",
  dangerSoft: "rgba(255,107,74,0.1)",
  dangerLine: "rgba(255,107,74,0.35)",
};

export const fonts = {
  display: "Syncopate_700Bold",
  displayLight: "Syncopate_400Regular",
  tech: "ChakraPetch_500Medium",
  techSemibold: "ChakraPetch_600SemiBold",
  techBold: "ChakraPetch_700Bold",
  body: "Manrope_400Regular",
  medium: "Manrope_500Medium",
  semibold: "Manrope_600SemiBold",
  bold: "Manrope_700Bold",
};

export const radii = {
  panel: 14,
  inner: 10,
  control: 8,
};

export const skew = "-12deg";
export const unskew = "12deg";

export const motion = {
  easeOut: Easing.bezier(0.23, 1, 0.32, 1),
  easeInOut: Easing.bezier(0.77, 0, 0.175, 1),
  drawer: Easing.bezier(0.32, 0.72, 0, 1),
  press: 140,
  fast: 220,
  base: 480,
  slow: 820,
};

export const layout = {
  maxWidth: 1200,
  wide: 1024,
  medium: 700,
};
