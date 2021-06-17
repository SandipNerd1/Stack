import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Accordion from "react-native-collapsible/Accordion";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { logout } from "../../store/actions/signin";
import { getUserProfile, getUserData } from "../../store/actions/user";
import AnimatedButton from "../../components/UI/AnimatedButton";

import StartupScreen from "../StartupScreen";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const UserProfileScreen = (props) => {
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state.userStatus.profileData);
  const socialProfileData = useSelector((state) => state.userStatus.socialData);

  const userId = userProfileData.id;

  const userData = useSelector((state) => state.userStatus.userData);

  const [activeSections, setActiveSections] = useState([]);

  // console.log(userProfileData);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("user data refreshed");
    dispatch(getUserProfile());
    dispatch(getUserData(userId));
  }, [userId, getUserData, getUserProfile]);

  // useEffect(() => {
  //   const willFocusSub = props.navigation.addListener("focus", loadUserData);

  //   return willFocusSub;
  // }, [loadUserData]);

  if (loading) {
    return <StartupScreen />;
  }

  const SECTIONS = [
    {
      title: "Developer name",
      content: userProfileData.first_name + " " + userProfileData.last_name,
    },
    {
      title: "About me",
      content: userProfileData.about_me,
    },
  ];

  const renderHeader = (section) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: SCREEN_WIDTH / 10,
          paddingVertical: SCREEN_HEIGHT / 50,
          marginTop: 10,
        }}
      >
        {section.title === "Developer name" ? (
          <AntDesign name="profile" size={20} color="#001b3a" />
        ) : (
          <MaterialIcons name="description" size={25} color="#001b3a" />
        )}
        <Text
          style={{
            fontFamily: "AvertaStd-Semibold",
            fontSize: 16,
            color: "#001b3a",
            paddingHorizontal: 10,
          }}
        >
          {section.title}
        </Text>
      </View>
    );
  };

  const renderContent = (section) => {
    return (
      <View style={{ paddingHorizontal: SCREEN_WIDTH / 10 }}>
        <Text style={{ fontFamily: "AvertaStd-Regular", color: "#708999" }}>
          {section.content}
        </Text>
      </View>
    );
  };
  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <View style={styles.userInfo}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri:
                  "picture" in socialProfileData
                    ? socialProfileData.picture.data.url
                    : "photoUrl" in socialProfileData
                    ? socialProfileData.photoUrl
                    : "https://image.flaticon.com/icons/png/128/149/149071.png",
              }}
              style={{ width: "100%", height: "100%", borderRadius: 75 }}
              resizeMode="contain"
            />
          </View>
          <View style={{ width: "60%", marginHorizontal: SCREEN_WIDTH / 20 }}>
            <Text style={styles.userName}>{userProfileData.username}</Text>
            <Text style={styles.userDescription} numberOfLines={2}>
              {userProfileData.about_me}
            </Text>
          </View>
        </View>
        <View style={styles.contact}>
          <View style={styles.contactInfo}>
            <Ionicons name="location-outline" size={20} color="#708999" />
            <Text style={styles.contactText}>{userProfileData.location}</Text>
          </View>
          <View style={styles.contactInfo}>
            <Ionicons name="mail-outline" size={20} color="#708999" />
            <Text style={styles.contactText}>{userProfileData.email}</Text>
          </View>
          <View style={styles.contactInfo}>
            <AntDesign name="link" size={20} color="#708999" />
            <Text selectable={false} style={styles.contactText}>
              {userProfileData.website_url}
            </Text>
          </View>
        </View>
        <View style={styles.status}>
          <TouchableNativeFeedback>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "50%",
                paddingVertical: SCREEN_HEIGHT / 40,
              }}
            >
              <Text style={styles.statusNumber}>{userData.question_count}</Text>
              <Text style={styles.statusText}>Questions</Text>
            </View>
          </TouchableNativeFeedback>
          <View style={{ width: 2, backgroundColor: "#708999", height: 50 }} />
          <TouchableNativeFeedback>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "49%",
                paddingVertical: SCREEN_HEIGHT / 40,
              }}
            >
              <Text style={styles.statusNumber}>{userData.answer_count}</Text>
              <Text style={styles.statusText}>Answers</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View style={{ paddingVertical: SCREEN_HEIGHT / 20 }}>
          <View
            style={{
              // paddingHorizontal: SCREEN_WIDTH / 10,
              paddingBottom: SCREEN_HEIGHT / 40,
            }}
          >
            <Text
              style={{
                fontFamily: "AvertaStd-Semibold",
                fontSize: 20,
                color: "#001b3a",
                paddingBottom: SCREEN_HEIGHT / 40,
                paddingHorizontal: SCREEN_WIDTH / 10,
              }}
            >
              Profile Info
            </Text>
            <Accordion
              sections={SECTIONS}
              activeSections={activeSections}
              renderHeader={renderHeader}
              renderContent={renderContent}
              onChange={updateSections}
              expandMultiple={true}
              underlayColor={null}
              touchableComponent={TouchableNativeFeedback}
            />
          </View>
          <Text
            style={{
              fontFamily: "AvertaStd-Semibold",
              fontSize: 20,
              color: "#001b3a",
              paddingHorizontal: SCREEN_WIDTH / 10,
              paddingBottom: SCREEN_HEIGHT / 40,
            }}
          >
            Account
          </Text>
          <AnimatedButton
            navigateTo={() => {
              props.navigation.navigate("user_question");
            }}
          >
            <AntDesign name="questioncircleo" size={20} color="#001b3a" />
            <Text style={styles.navigateText}>Your questions</Text>
          </AnimatedButton>
          <AnimatedButton>
            <AntDesign name="infocirlceo" size={20} color="#001b3a" />
            <Text style={styles.navigateText}>About the app</Text>
          </AnimatedButton>
          <AnimatedButton>
            <MaterialIcons name="privacy-tip" size={20} color="#001b3a" />
            <Text style={styles.navigateText}>Privacy policy</Text>
          </AnimatedButton>
          <AnimatedButton
            navigateTo={async () => {
              setLoading(true);
              try {
                await dispatch(logout());
              } catch (e) {
                console.log(e);
              }
              setLoading(false);
            }}
          >
            <AntDesign name="logout" size={20} color="#001b3a" />
            <Text style={styles.navigateText}>Logout</Text>
          </AnimatedButton>
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit"
          iconName="refresh"
          buttonStyle={{ fontSize: 30 }}
          onPress={() => props.navigation.navigate("Edit information")}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: SCREEN_HEIGHT / 40,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: SCREEN_WIDTH / 10,
  },
  imageContainer: {
    width: 100,
    height: 100,
    overflow: "hidden",
  },
  userName: {
    fontSize: 20,
    fontFamily: "AvertaStd-Semibold",
    color: "#001b3a",
  },
  userDescription: {
    fontFamily: "AvertaStd-Regular",
    color: "#708999",
    marginVertical: 5,
  },
  contact: {
    marginVertical: SCREEN_HEIGHT / 30,
    marginHorizontal: SCREEN_WIDTH / 10,
  },
  contactInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  contactText: {
    marginHorizontal: 10,
    fontFamily: "AvertaStd-Regular",
    color: "#708999",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: "#708999",
    borderBottomColor: "#708999",
  },
  statusNumber: {
    fontSize: 20,
    fontFamily: "AvertaStd-Semibold",
    color: "#001b3a",
  },
  statusText: {
    fontFamily: "AvertaStd-Regular",
    color: "#708999",
  },
  navigateText: {
    fontFamily: "AvertaStd-Semibold",
    paddingHorizontal: SCREEN_WIDTH / 30,
    color: "#001b3a",
    fontSize: 16,
  },
});

export default UserProfileScreen;
