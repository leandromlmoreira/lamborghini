import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../theme/tokens";
import { IconButton } from "./IconButton";

type Props = {
  value: number;
  onChange: (delta: number) => void;
  label: string;
};

export function Stepper({ value, onChange, label }: Props) {
  return (
    <View style={styles.row}>
      <IconButton icon="minus" label={`Remover uma unidade de ${label}`} onPress={() => onChange(-1)} size={36} cue="tick" />
      <Text style={styles.value} accessibilityLabel={`${value} unidades`}>
        {String(value).padStart(2, "0")}
      </Text>
      <IconButton icon="plus" label={`Adicionar uma unidade de ${label}`} onPress={() => onChange(1)} size={36} cue="tick" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.background,
    alignSelf: "flex-start",
  },
  value: {
    fontFamily: fonts.techBold,
    color: colors.text,
    fontSize: 20,
    minWidth: 48,
    textAlign: "center",
    fontVariant: ["tabular-nums"],
  },
});
