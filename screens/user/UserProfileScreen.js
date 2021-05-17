import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { logout } from "../../store/actions/signin";
import { getUserProfile } from "../../store/actions/user";

const UserProfileScreen = (props) => {
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state.userStatus.profileData);
  const socialProfileData = useSelector((state) => state.userStatus.socialData);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <View style={styles.headerContainer}>
          <View style={{ width: 150, height: 150 }}>
            <Image
              source={{
                uri:
                  "picture" in socialProfileData
                    ? socialProfileData.picture.data.url
                    : "photoUrl" in socialProfileData
                    ? socialProfileData.photoUrl
                    : "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png",
              }}
              style={{ width: "100%", height: "100%", borderRadius: 75 }}
            />
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 23, color: "#001b3a" }}
            >
              {userProfileData.first_name} {userProfileData.last_name}
            </Text>
            <Text style={{ textAlign: "center" }}>
              {userProfileData.about_me}
            </Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#001b3a" }}>
            Profile details
          </Text>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>Username</Text>
            <Text>{userProfileData.username}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>First Name</Text>
            <Text>{userProfileData.first_name}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>Last Name</Text>
            <Text>{userProfileData.last_name}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>Location</Text>
            <Text>{userProfileData.location}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>Website URL</Text>
            <Text>{userProfileData.website_url}</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Account</Text>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={async () => {
              try {
                await dispatch(logout());
              } catch (e) {
                console.log(e);
              }
            }}
          >
            <AntDesign name="logout" size={20} />
            <Text style={{ paddingHorizontal: 10 }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export const screenOptions = (props) => {
  return {
    headerTitleAlign: "center",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit"
          iconName="md-pencil"
          buttonStyle={{ fontSize: 30 }}
          onPress={() => props.navigation.navigate("Edit")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  details: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  detailHeader: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#001b3a",
  },
  logoutButton: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default UserProfileScreen;
