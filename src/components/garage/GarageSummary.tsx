import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { formatUsd } from "../../domain/catalog";
import { colors, fonts } from "../../theme/tokens";
import { CtaButton } from "../ui/CtaButton";
import { Shell } from "../ui/Shell";

type Props = {
  units: number;
  models: number;
  total: number;
};

export function GarageSummary({ units, models, total }: Props) {
  return (
    <Shell active coreStyle={styles.core}>
      <View style={styles.body}>
        <Text style={styles.label}>Valor da coleção</Text>
        <Text style={styles.total}>
          {formatUsd(total)}
        </Text>
        <View style={styles.meta}>
          <Metric label="Unidades" value={units} />
          <Metric label="Modelos" value={models} />
        </View>
        <View style={styles.action}>
          <CtaButton label="Continuar no acervo" variant="ghost" onPress={() => router.navigate("/")} />
        </View>
      </View>
    </Shell>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>{String(value).padStart(2, "0")}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  core: { backgroundColor: "#0C0F05" },
  body: { padding: 24, gap: 10 },
  label: { fontFamily: fonts.techSemibold, fontSize: 11, letterSpacing: 2, color: colors.muted, textTransform: "uppercase" },
  total: { fontFamily: fonts.techBold, fontSize: 34, lineHeight: 40, color: colors.accent, fontVariant: ["tabular-nums"], letterSpacing: -0.5 },
  meta: { flexDirection: "row", gap: 32, marginTop: 14, paddingTop: 18, borderTopWidth: 1, borderTopColor: colors.line },
  metric: { gap: 6 },
  action: { marginTop: 18 },
  metricValue: { fontFamily: fonts.techBold, fontSize: 26, color: colors.text, fontVariant: ["tabular-nums"] },
});
