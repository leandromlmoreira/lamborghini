import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../theme/tokens";
import { Stage } from "../art/Stage";
import { Silhouette } from "../art/Silhouette";
import { CtaButton } from "./CtaButton";
import { Shell } from "./Shell";

type Props = {
  title: string;
  message: string;
  action: string;
  onAction: () => void;
};

export function EmptyState({ title, message, action, onAction }: Props) {
  return (
    <Shell>
      <View style={styles.body}>
        <View style={styles.art}>
          <Stage tone="gold" />
          <View style={styles.silhouette}>
            <Silhouette />
          </View>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.action}>
          <CtaButton label={action} onPress={onAction} />
        </View>
      </View>
    </Shell>
  );
}

const styles = StyleSheet.create({
  body: { alignItems: "center", paddingHorizontal: 24, paddingBottom: 40, gap: 12 },
  art: { alignSelf: "stretch", marginHorizontal: -24, height: 200, alignItems: "center", justifyContent: "center" },
  silhouette: { width: "70%", maxWidth: 340, aspectRatio: 500 / 151, opacity: 0.8 },
  title: { fontFamily: fonts.display, fontSize: 20, color: colors.text, textAlign: "center" },
  message: { fontFamily: fonts.body, fontSize: 14, lineHeight: 22, color: colors.muted, textAlign: "center", maxWidth: 380 },
  action: { marginTop: 12 },
});
