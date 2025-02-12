import { Alert, StyleSheet,  TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import ScreenWrapper from "@/components/ScreenWrapper";
import { verticalScale } from "@/util/styling";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { Header } from "@/components/Header";
import { useAuth } from "@/context/authContext";
import { Typo } from "@/components/Typo";
import { getProfileImage } from "@/services/imageService";
import { accountOptionType } from "@/types/types";
import * as Icons from "phosphor-react-native";
import { auth } from "@/config/firebase";
import { router, useRouter } from "expo-router";
import { signOut } from "firebase/auth";

const Profile = () => {
  const { user, logout } = useAuth();
  const route = useRouter();

  const accountOption: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon: <Icons.User size={26} color={colors.white} weight="fill" />,
      routeName: "/modal",
      bgColor: "#6366f1",
    },
    {
      title: "Settings",
      icon: <Icons.GearSix size={26} color={colors.white} weight="fill" />,
      // routeName: "/(modal)/prodileModal",
      bgColor: "#059669",
    },
    {
      title: "Privacy Policy",
      icon: <Icons.Lock size={26} color={colors.white} weight="fill" />,
      // routeName: "/(modal)/prodileModal",
      bgColor: colors.neutral600,
    },
    {
      title: "Logout",
      icon: <Icons.Power size={26} color={colors.white} weight="fill" />,
      // routeName: "/(modal)/prodileModal",
      bgColor: "#e11d48",
    },
  ];
  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra sesión en Firebase
      logout(); // Actualiza el estado global de autenticación
      router.replace("/welcome"); // Redirige a la pantalla de bienvenida
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const showLogoutAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Logout"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => handleLogout(),
        style: "destructive",
      },
    ]);
  };
  const handlePress = (item: accountOptionType) => {
    if (item.title === "Logout") {
      showLogoutAlert();
    }
    if (item.routeName) route.push(item.routeName);
  };
 

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/*header */}
        <Header style={{ marginVertical: spacingY._10 }} title={"Profile"} />
        {/*user info */}
        <View style={styles.userInfo}>
          {/*user avatar*/}
          <View style={styles.avatarContainer}>
            <Image
              contentFit="cover"
              transition={100}
              source={getProfileImage(user?.image)}
              style={styles.avatar}
            />
          </View>
          {/*name and email*/}
          <View style={styles.nameContainer}>
            <Typo fontWeight={"600"} size={24} color={colors.neutral100}>
              {user?.name}
            </Typo>
            <Typo size={15} color={colors.neutral400}>
              {user?.email}
            </Typo>
          </View>
        </View>
        {/*account options*/}
        <View style={styles.accountOpcion}>
          {accountOption.map((item, index) => (
            <Animated.View
              entering={FadeInDown.delay(index * 50)
                .springify()
                .damping(14)}
              key={index.toString()}
              style={styles.listItem}
            >
              <TouchableOpacity
                onPress={() => handlePress(item)}
                activeOpacity={0.7}
                style={styles.flexRow}
              >
                {/*icons*/}
                <View
                  style={[styles.listIcon, { backgroundColor: item?.bgColor }]}
                >
                  {item.icon && item.icon}
                </View>
                <Typo fontWeight={"500"} size={16} style={{ flex: 1 }}>
                  {" "}
                  {item.title}
                </Typo>
                <Icons.CaretRight
                  size={verticalScale(20)}
                  weight="bold"
                  color={colors.white}
                />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>
      </View>
    </ScreenWrapper>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    marginTop: verticalScale(30),
    alignItems: "center",
    gap: spacingY._15,
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
    padding: 5,
  },
  nameContainer: {
    alignItems: "center",
    gap: verticalScale(4),
  },
  listIcon: {
    width: verticalScale(44),
    height: verticalScale(44),
    alignItems: "center",
    backgroundColor: colors.neutral500,
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous",
  },
  listItem: {
    marginBottom: verticalScale(17),
  },
  accountOpcion: {
    marginTop: spacingY._35,
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});

export default Profile;