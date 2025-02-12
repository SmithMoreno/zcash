import { StyleSheet, Text, View } from "react-native";
import { ButtomCustom } from "@/components/ButtomCustom";
import { Typo } from "@/components/Typo";
import { colors } from "@/constants/theme";
import { useAuth } from "@/context/authContext";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import { router } from "expo-router";
import ScreenWrapper from "@/components/ScreenWrapper";

const Home = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra sesión en Firebase
      logout(); // Actualiza el estado global de autenticación
      router.replace("/welcome"); // Redirige a la pantalla de bienvenida
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <ScreenWrapper>
      <Typo>Home</Typo>
      <ButtomCustom onPress={handleLogout}>
        <Typo color={colors.black}>Logout</Typo>
      </ButtomCustom>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({});
