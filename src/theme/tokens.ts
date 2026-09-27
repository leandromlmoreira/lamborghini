import { Easing } from "react-native";

export const colors = {
  background: "#08080A",
  surface: "#111114",
  surfaceRaised: "#17171B",
  shell: "rgba(255,255,255,0.03)",
  hairline: "rgba(255,255,255,0.07)",
  hairlineStrong: "rgba(255,255,255,0.14)",
  highlight: "rgba(255,255,255,0.06)",
  text: "#F4F1EA",
  muted: "#9A958C",
  faint: "#5E5A54",
  gold: "#E9B824",
  goldDeep: "#B8860B",
  goldSoft: "rgba(233,184,36,0.12)",
  goldLine: "rgba(233,184,36,0.35)",
  onGold: "#141005",
  danger: "#FF7A66",
  dangerSoft: "rgba(255,122,102,0.12)",
};

export const fonts = {
  display: "Michroma_400Regular",
  body: "Manrope_400Regular",
  medium: "Manrope_500Medium",
  semibold: "Manrope_600SemiBold",
  bold: "Manrope_700Bold",
  heavy: "Manrope_800ExtraBold",
};

export const radii = {
  shell: 28,
  core: 22,
  control: 999,
};

export const motion = {
  easeOut: Easing.bezier(0.32, 0.72, 0, 1),
  easeSnap: Easing.bezier(0.2, 0.9, 0.1, 1),
  fast: 180,
  base: 420,
  slow: 720,
};

export const layout = {
  maxWidth: 1180,
  wide: 1024,
  medium: 700,
};
