import { useState } from "react";
import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { InputProps } from "@/types/types";
import { colors, radius, spacingX } from "@/constants/theme";
import { verticalScale } from "@/util/styling";
import * as Icons from "phosphor-react-native"; // Asegúrate de tener esta librería instalada

export const Input = (props: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Función para manejar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prevState => !prevState);
  };

  return (
    <View style={[styles.container, props.containerStyle]}>
      {props.icon && props.icon}
      <TextInput
        style={[styles.input, props.inputStyle]}
        placeholderTextColor={colors.neutral400}
        ref={props.inputRef}
        secureTextEntry={props.secureTextEntry && isPasswordVisible} // Usa el estado para la visibilidad
        {...props}
      />
      {props.secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility}>
          {isPasswordVisible ? (
            <Icons.EyeSlash size={24} color={colors.neutral400} />
          ) : (
            <Icons.Eye size={24} color={colors.neutral400} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: verticalScale(53),
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.neutral300,
    borderRadius: radius._17,
    borderCurve: "continuous",
    paddingHorizontal: spacingX._15,
    gap: spacingX._10,
  },
  input: {
    flex: 1,
    fontSize: verticalScale(14),
    fontWeight: "500",
    color: colors.white,
  },
});
