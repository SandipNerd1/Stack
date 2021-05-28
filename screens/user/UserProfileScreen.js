import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { logout } from "../../store/actions/signin";
import { getUserProfile } from "../../store/actions/user";

import StartupScreen from "../StartupScreen";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const UserProfileScreen = (props) => {
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state.userStatus.profileData);
  const socialProfileData = useSelector((state) => state.userStatus.socialData);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  if (loading) {
    return <StartupScreen />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <View style={styles.headerContainer}>
          <View
            style={{
              width: 100,
              height: 100,
              borderWidth: 3,
              borderColor: "white",
              borderRadius: 75,
              overflow: "hidden",
              elevation: 10,
              backgroundColor: 'white',
            }}
          >
            <Image
              source={{
                uri:
                  "picture" in socialProfileData
                    ? socialProfileData.picture.data.url
                    : "photoUrl" in socialProfileData
                      ? socialProfileData.photoUrl
                      : 'https://cdn.iconscout.com/icon/free/png-512/account-avatar-profile-human-man-user-30448.png',
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 75,
              }}
            />
          </View>
          <View
            style={{ alignItems: "center", marginVertical: SCREEN_HEIGHT / 40 }}
          >
            <Text
              style={{
                fontFamily: "AvertaStd-Semibold",
                fontSize: 23,
                color: "#001b3a",
              }}
            >
              {userProfileData.first_name} {userProfileData.last_name}
            </Text>
            <Text
              style={{
                fontFamily: "AvertaStd-Regular",
                textAlign: "center",
                color: "#708999",
                fontSize: 16,
              }}
            >
              {userProfileData.about_me}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: SCREEN_WIDTH / 20,
            // elevation: 3,
            // borderRadius: 10,
          }}
        >
          <View style={styles.details}>
            <Text style={styles.detailHeader}>NAME</Text>
            <Text style={styles.text}>
              {userProfileData.first_name} {userProfileData.last_name}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>USERNAME</Text>
            <Text style={styles.text}>{userProfileData.username}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>E-MAIL ID</Text>
            <Text style={styles.text}>{userProfileData.email}</Text>
          </View>
          {/* <View style={styles.details}>
            <Text style={styles.detailHeader}>Last Name</Text>
            <Text style={styles.text}>{userProfileData.last_name}</Text>
          </View> */}
          <View style={styles.details}>
            <Text style={styles.detailHeader}>LOCATION</Text>
            <Text style={styles.text}>
              {userProfileData.location
                ? userProfileData.location
                : "Not provided"}
            </Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>WEBSITE URL</Text>
            <Text style={styles.text}>{userProfileData.website_url}</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            paddingHorizontal: SCREEN_WIDTH / 20,
            paddingBottom: SCREEN_HEIGHT / 20,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={async () => {
              setLoading(true);
              try {
                await dispatch(logout());
              } catch (e) {
                console.log(e);
              }
              setLoading(false);
            }}
          >
            <AntDesign name="logout" size={20} color="white" />
            <Text
              style={{
                paddingHorizontal: 10,
                color: "white",
                fontFamily: "AvertaStd-Semibold",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export const screenOptions = (props) => {
  return {
    headerStyle: {
      elevation: 0,
      backgroundColor: "white",
    },
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontSize: 20,
      fontFamily: "AvertaStd-Semibold",
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit"
          iconName="ios-pencil-sharp"
          buttonStyle={{ fontSize: 25 }}
          onPress={() => props.navigation.navigate("Edit information")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f1f4f9",
    // backgroundColor: "white",
  },
  headerContainer: {
    alignItems: "center",
    paddingHorizontal: SCREEN_WIDTH / 10,
    paddingVertical: SCREEN_HEIGHT / 40,
    backgroundColor: "white",
  },
  details: {
    // borderBottomWidth: 1,
    // borderBottomColor: "#ccc",
    marginBottom: 40,
    backgroundColor: "white",
    paddingHorizontal: SCREEN_WIDTH / 40,
  },
  detailHeader: {
    fontFamily: "AvertaStd-Regular",
    fontSize: 13,
    color: "#708999",
    width: "30%",
    backgroundColor: "white",
    zIndex: 100,
    marginHorizontal: SCREEN_WIDTH / 20,
    textAlign: "center",
  },
  logoutButton: {
    flex: 1,
    paddingVertical: SCREEN_HEIGHT / 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff4848",
    marginHorizontal: SCREEN_WIDTH / 10,
    borderRadius: 20,
  },
  text: {
    color: "#001b3a",
    fontFamily: "AvertaStd-Semibold",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#708999",
    borderRadius: 20,
    paddingHorizontal: SCREEN_WIDTH / 20,
    marginTop: -SCREEN_HEIGHT / 60,
    fontSize: 15,
  },
});

export default UserProfileScreen;
