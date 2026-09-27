import { StyleSheet, Text, View } from "react-native";
import { useSound } from "../../sound/SoundContext";
import { colors, fonts } from "../../theme/tokens";
import { Icon } from "../icons/Icon";
import { PressableScale } from "../ui/PressableScale";

export function SoundToggle({ showLabel }: { showLabel: boolean }) {
  const { supported, enabled, toggle } = useSound();
  if (!supported) return null;

  return (
    <PressableScale
      onPress={toggle}
      accessibilityLabel={enabled ? "Desligar os efeitos sonoros" : "Ligar os efeitos sonoros"}
      accessibilityState={{ selected: enabled }}
      pressedScale={0.92}
    >
      {(hovered) => (
        <View style={[styles.button, hovered && styles.hovered, enabled && styles.on]}>
          <Icon name={enabled ? "sound-on" : "sound-off"} size={18} color={enabled ? colors.accent : hovered ? colors.text : colors.muted} />
          {showLabel && <Text style={[styles.label, enabled && styles.labelOn]}>{enabled ? "Som on" : "Som off"}</Text>}
        </View>
      )}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    height: 40,
    minWidth: 40,
    paddingHorizontal: 11,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.line,
    justifyContent: "center",
  },
  hovered: { borderColor: colors.lineStrong },
  on: { borderColor: colors.accentLine, backgroundColor: colors.accentSoft },
  label: { fontFamily: fonts.techSemibold, fontSize: 12, letterSpacing: 1.2, color: colors.muted, textTransform: "uppercase" },
  labelOn: { color: colors.accent },
});
