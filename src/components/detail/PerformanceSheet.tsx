import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { formatSeconds, performanceBars, type Performance } from "../../domain/performance";
import { useCountUp } from "../../hooks/useCountUp";
import { useLayout } from "../../hooks/useLayout";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { colors, fonts, motion } from "../../theme/tokens";

type Row = {
  key: string;
  label: string;
  value: number;
  unit: string;
  fill: number;
  format: (value: number) => string;
  note: string;
};

const TICKS = Array.from({ length: 24 }, (_, index) => index);

export function PerformanceSheet({ performance }: { performance: Performance }) {
  const bars = performanceBars(performance);
  const rows: Row[] = [
    { key: "power", label: "Potência", value: performance.power, unit: "cv", fill: bars.power, format: (v) => String(Math.round(v)), note: "escala 800 cv" },
    {
      key: "acceleration",
      label: "0–100 km/h",
      value: performance.zeroToHundred,
      unit: "s",
      fill: bars.acceleration,
      format: formatSeconds,
      note: "menos é mais",
    },
    { key: "top", label: "Velocidade máxima", value: performance.topSpeed, unit: "km/h", fill: bars.topSpeed, format: (v) => String(Math.round(v)), note: "escala 360 km/h" },
  ];

  return (
    <View style={styles.sheet} accessibilityLabel="Ficha de desempenho">
      <View style={styles.header}>
        <Text style={styles.title}>Desempenho</Text>
        <Text style={styles.engine}>{`${performance.engine}${performance.estimated ? " · estimado" : ""}`}</Text>
      </View>
      {rows.map((row, index) => (
        <MetricBar key={row.key} row={row} delay={420 + index * 140} />
      ))}
    </View>
  );
}

function MetricBar({ row, delay }: { row: Row; delay: number }) {
  const { isMedium } = useLayout();
  const reduced = useReducedMotion();
  const progress = useRef(new Animated.Value(reduced ? 1 : 0)).current;
  const shown = useCountUp(row.value, delay, 1200);

  useEffect(() => {
    if (reduced) return;
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: 1200,
      delay,
      easing: motion.easeOut,
      useNativeDriver: false,
    }).start();
  }, [delay, progress, reduced, row.fill]);

  const width = progress.interpolate({ inputRange: [0, 1], outputRange: ["0%", `${Math.round(row.fill * 100)}%`] });

  return (
    <View style={styles.row} accessibilityLabel={`${row.label}: ${row.format(row.value)} ${row.unit}`}>
      <View style={styles.rowTop}>
        <Text style={styles.label}>{row.label}</Text>
        <View style={styles.valueLine}>
          <Text style={[styles.value, { fontSize: isMedium ? 40 : 32 }]}>{row.format(shown)}</Text>
          <Text style={styles.unit}>{row.unit}</Text>
        </View>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width }]}>
          <View style={styles.edge} />
        </Animated.View>
        <View style={styles.ticks} pointerEvents="none">
          {TICKS.map((tick) => (
            <View key={tick} style={[styles.tick, tick % 6 === 0 && styles.tickMajor]} />
          ))}
        </View>
      </View>
      <Text style={styles.note}>{row.note}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: { gap: 22, paddingVertical: 22, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.line },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  title: { fontFamily: fonts.display, fontSize: 13, letterSpacing: 3, color: colors.text, textTransform: "uppercase" },
  engine: { fontFamily: fonts.techSemibold, fontSize: 12, letterSpacing: 1.4, color: colors.muted, textTransform: "uppercase" },
  row: { gap: 10 },
  rowTop: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", gap: 12 },
  label: { fontFamily: fonts.techSemibold, fontSize: 12, letterSpacing: 1.8, color: colors.muted, textTransform: "uppercase", paddingBottom: 6 },
  valueLine: { flexDirection: "row", alignItems: "baseline", gap: 6 },
  value: { fontFamily: fonts.techBold, color: colors.text, fontVariant: ["tabular-nums"], letterSpacing: -0.5 },
  unit: { fontFamily: fonts.techSemibold, fontSize: 14, color: colors.muted, textTransform: "uppercase" },
  track: { height: 10, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.05)", overflow: "hidden" },
  fill: { height: "100%", backgroundColor: colors.accent },
  edge: { position: "absolute", right: 0, top: 0, bottom: 0, width: 3, backgroundColor: "#F4FFD0" },
  ticks: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, flexDirection: "row", justifyContent: "space-between" },
  tick: { width: 2, height: "100%", backgroundColor: colors.background, opacity: 0.55 },
  tickMajor: { opacity: 1 },
  note: { fontFamily: fonts.tech, fontSize: 11, letterSpacing: 1.2, color: colors.faint, textTransform: "uppercase", textAlign: "right" },
});
