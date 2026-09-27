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
      <View style={styles.dot} />
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
      <IconButton icon="refresh" label="Tentar carregar a API de novo" onPress={onRetry} size={38} />
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,122,102,0.28)",
    backgroundColor: colors.dangerSoft,
  },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger },
  text: { flex: 1, gap: 2 },
  title: { fontFamily: fonts.bold, fontSize: 13, color: colors.text },
  message: { fontFamily: fonts.body, fontSize: 12, lineHeight: 18, color: colors.muted },
});
