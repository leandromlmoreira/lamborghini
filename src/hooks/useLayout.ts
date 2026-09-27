import { useWindowDimensions } from "react-native";
import { layout } from "../theme/tokens";

export function useLayout() {
  const { width } = useWindowDimensions();
  const isWide = width >= layout.wide;
  const isMedium = width >= layout.medium;
  const gutter = isWide ? 48 : isMedium ? 32 : 16;
  const contentWidth = Math.min(width - gutter * 2, layout.maxWidth);
  const columns = isWide ? 3 : isMedium ? 2 : 1;
  return { width, isWide, isMedium, gutter, contentWidth, columns };
}
