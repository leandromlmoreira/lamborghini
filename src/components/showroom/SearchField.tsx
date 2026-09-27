import { useState } from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { colors, fonts } from "../../theme/tokens";
import { Icon } from "../icons/Icon";
import { IconButton } from "../ui/IconButton";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

const noOutline = Platform.OS === "web" ? ({ outlineStyle: "none" } as object) : {};

export function SearchField({ value, onChange }: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={[styles.field, focused && styles.focused]}>
      <Icon name="search" size={18} color={focused ? colors.accent : colors.muted} />
      <TextInput
        value={value}
        onChangeText={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Buscar por modelo ou ano"
        placeholderTextColor={colors.faint}
        accessibilityLabel="Buscar no acervo"
        style={[styles.input, noOutline]}
      />
      {value.length > 0 && <IconButton icon="close" label="Limpar busca" onPress={() => onChange("")} size={32} cue="tick" />}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    height: 48,
    paddingLeft: 16,
    paddingRight: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.surface,
  },
  focused: { borderColor: colors.accentLine },
  input: { flex: 1, minWidth: 0, height: "100%", fontFamily: fonts.medium, fontSize: 15, color: colors.text },
});
