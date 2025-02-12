import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import * as Icons from "phosphor-react-native";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/util/styling";
import { ModalWrapper } from "@/components/ModalWrapper";
import { Header } from "@/components/Header";
import { BackButton } from "@/components/BackButton";
import { getProfileImage } from "@/services/imageService";
import { Typo } from "@/components/Typo";
import Input from "@/components/Input";
import { UserDataType } from "@/types/types";
import { ButtomCustom } from "@/components/ButtomCustom";
import { useAuth } from "@/context/authContext";
import { updateUser } from "@/services/userService";
import * as ImagePicker from "expo-image-picker";

const ProfileModal = () => {
  const { user, updateUserData } = useAuth();
  const [userDta, setUserDta] = useState<UserDataType>({
    name: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setUserDta({
      name: user?.name || "",
      image: user?.image || null,
    });
  }, [user]);

  const onPickerImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    
    if (!result.canceled) {
      setUserDta({ ...userDta, image: result.assets[0] });
    }
  };

  const onSubmit = async () => {
    let { name, image } = userDta;
    if (!name.trim()) {
      Alert.alert("User", "please fill all the fields");
      return;
    }
    
    setLoading(true);
    const res = await updateUser(user?.uid as string, userDta);
    setLoading(false);
    
    if (res.success) {
      // Actualiza los datos del usuario y cierra el modal
      await updateUserData(user?.uid as string);
      router.back(); // Redirige solo si la actualización fue exitosa
    } else {
      Alert.alert("User", res.msg); // Muestra el mensaje de error
    }
  };
  
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          style={{ marginBottom: spacingY._15 }}
          leftIcon={<BackButton />}
          title="Update Profile"
        />
        {/* form*/}
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Image
              contentFit="cover"
              transition={100}
              style={styles.avatar}
              source={getProfileImage(userDta.image)}
            />
            <TouchableOpacity
              onPress={onPickerImage}
              activeOpacity={0.7}
              style={styles.editIcon}
            >
              <Icons.Pencil
                size={verticalScale(20)}
                color={colors.neutral800}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Name</Typo>
            <Input
              placeholder="name"
              value={userDta.name}
              onChangeText={(value) => {
                setUserDta({ ...userDta, name: value });
              }}
            />
          </View>
        </ScrollView>
      </View>
      {/* footer*/}
      <View style={styles.footer}>
        <ButtomCustom loading={loading} style={{ flex: 1 }} onPress={onSubmit}>
          <Typo fontWeight={"700"} color={colors.black}>
            Save
          </Typo>
        </ButtomCustom>
      </View>
    </ModalWrapper>
  );
};

export default ProfileModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    borderWidth: 1,
    marginBottom: spacingY._5,
    borderTopColor: colors.neutral700,
    paddingTop: spacingY._15,
    gap: scale(12),
  },
  form: {
    gap: spacingX._30,
    marginTop: spacingY._15,
  },
  avatarContainer: {
    position: "relative",
    alignItems: "center",
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticalScale(135),
    width: verticalScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
  },
  editIcon: {
    position: "absolute",
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: spacingY._7,
  },
  inputContainer: {
    gap: spacingY._10,
  },
});
