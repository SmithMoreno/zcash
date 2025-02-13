import { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { scale, verticalScale } from "@/util/styling";
import { ModalWrapper } from "@/components/ModalWrapper";
import { Header } from "@/components/Header";
import { BackButton } from "@/components/BackButton";
import { Typo } from "@/components/Typo";
import Input from "@/components/Input";
import { WalletType } from "@/types/types";
import { ButtomCustom } from "@/components/ButtomCustom";
import { useAuth } from "@/context/authContext";
import { ImageUpload } from "@/components/ImageUpload";
import { createOrUpdateWallet } from "@/services/walletService";

const WalletModal = () => {
  const { user, updateUserData } = useAuth();
  const [wallet, setWallet] = useState<WalletType>({
    name: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    let { name, image } = wallet;
    if (!name.trim() || !image) {
      Alert.alert("Wallet", "please fill all the fields");
      return;
    }

    const data: WalletType = {
      name,
      image,
      uid: user?.uid,
    };
    // todo: Include wallet id if updating
    setLoading(true);
    const res = await createOrUpdateWallet(data);
    console.log("res", res);
    setLoading(false);
    //console.log("resultad", res);
    if (res.success) {
      router.back(); // Redirige solo si la actualización fue exitosa
    } else {
      Alert.alert("Wallet", res.msg); // Muestra el mensaje de error
    }
  };

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          style={{ marginBottom: spacingY._15 }}
          leftIcon={<BackButton />}
          title="New Wallet"
        />
        {/* form*/}
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Name</Typo>
            <Input
              placeholder="Salary"
              value={wallet.name}
              onChangeText={(value) => {
                setWallet({ ...wallet, name: value });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Typo color={colors.neutral200}>Wallet Icons</Typo>
            {/* input image*/}
            <ImageUpload
              file={wallet.image}
              onSelect={(file) => {
                setWallet({ ...wallet, image: file });
              }}
              onClear={() => {
                setWallet({ ...wallet, image: null });
              }}
              placeholder="Upload an image"
            />
          </View>
        </ScrollView>
      </View>
      {/* footer*/}
      <View style={styles.footer}>
        <ButtomCustom loading={loading} style={{ flex: 1 }} onPress={onSubmit}>
          <Typo fontWeight={"700"} color={colors.black}>
            Add Wallet
          </Typo>
        </ButtomCustom>
      </View>
    </ModalWrapper>
  );
};

export default WalletModal;

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
