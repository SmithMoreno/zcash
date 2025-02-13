import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Icons from "phosphor-react-native";
import * as ImagePicker from "expo-image-picker";
import { Image } from "expo-image";

import { ImageUploadProps } from "@/types/types";
import { colors, radius } from "@/constants/theme";
import { Typo } from "./Typo";
import { scale, verticalScale } from "@/util/styling";
import { getFilePath } from "@/services/imageService";

export const ImageUpload = ({
  file,
  onSelect,
  onClear,
  containerStyle,
  imageStyle,
  placeholder,
}: ImageUploadProps) => {
  const pickImage = async () => {
     let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ["images"],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });
        
        if (!result.canceled) {
          onSelect(result.assets[0]);
        }
      
  }
  return (
    <View>
      {!file && (
        <TouchableOpacity
          onPress={pickImage}
          style={[styles.inputContainer, containerStyle && containerStyle]}
        >
          <Icons.UploadSimple size={24} color={colors.neutral200} />
          {placeholder && <Typo size={15}>{placeholder}</Typo>}
        </TouchableOpacity>
      )}
      {file && (
        <View style={[styles.image, containerStyle && containerStyle]}>
          <Image
            style={{ flex: 1 }}
            source={getFilePath(file)}
            contentFit="cover"
            transition={100}
          />
          <TouchableOpacity 
          onPress={onClear}
           activeOpacity={0.7} style={styles.deleteIcon}>
            <Icons.XCircle
              weight="fill"
              size={verticalScale(24)}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    height: verticalScale(54),
    backgroundColor: colors.neutral700,
    borderRadius: radius._15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.neutral500,
    borderStyle: "dashed",
  },
  image: {
    height: scale(150),
    width: scale(150),
    borderRadius: radius._15,
    borderCurve: "continuous",
    overflow: "hidden",
  },
  deleteIcon: {
    position: "absolute",
    top: scale(6),
    right: scale(6),
    shadowColor: colors.black,
    shadowOffset:{width: 0, height: 5},
    shadowOpacity: 1,
    shadowRadius: 10,
  },
});
