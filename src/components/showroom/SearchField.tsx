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
      <Icon name="search" size={18} color={focused ? colors.gold : colors.muted} />
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
      {value.length > 0 && <IconButton icon="close" label="Limpar busca" onPress={() => onChange("")} size={30} />}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    height: 50,
    paddingLeft: 18,
    paddingRight: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.hairline,
    backgroundColor: colors.shell,
  },
  focused: { borderColor: colors.goldLine, backgroundColor: colors.goldSoft },
  input: { flex: 1, minWidth: 0, height: "100%", fontFamily: fonts.medium, fontSize: 14, color: colors.text },
});
