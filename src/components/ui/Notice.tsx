import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../theme/tokens";
import { IconButton } from "./IconButton";

type Props = {
  title: string;
  message: string;
  onRetry: () => void;
};

export function Notice({ title, message, onRetry }: Props) {
  return (
    <View style={styles.notice} accessibilityRole="alert">
      <View style={styles.lamp} />
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <IconButton icon="refresh" label="Tentar carregar a API de novo" onPress={onRetry} size={40} />
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 14,
    paddingLeft: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.dangerLine,
    backgroundColor: colors.dangerSoft,
  },
  lamp: { width: 8, height: 8, borderRadius: 2, backgroundColor: colors.danger, transform: [{ rotate: "45deg" }] },
  text: { flex: 1, gap: 2 },
  title: { fontFamily: fonts.techBold, fontSize: 14, letterSpacing: 0.6, color: colors.text, textTransform: "uppercase" },
  message: { fontFamily: fonts.body, fontSize: 13, lineHeight: 19, color: colors.muted },
});
