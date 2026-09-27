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
      <IconButton icon="minus" label={`Remover uma unidade de ${label}`} onPress={() => onChange(-1)} size={36} />
      <Text style={styles.value} accessibilityLabel={`${value} unidades`}>
        {String(value).padStart(2, "0")}
      </Text>
      <IconButton icon="plus" label={`Adicionar uma unidade de ${label}`} onPress={() => onChange(1)} size={36} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.shell,
    alignSelf: "flex-start",
  },
  value: { fontFamily: fonts.display, color: colors.text, fontSize: 14, minWidth: 40, textAlign: "center" },
});
