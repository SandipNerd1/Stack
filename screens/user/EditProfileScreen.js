import React, { useState } from "react";
import {
  Alert,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Dimensions,
  Modal,
  TouchableOpacity,
  TouchableNativeFeedback,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButtons from "../../components/UI/CustomHeaderButton";
import { updateUserProfile, getUserData } from "../../store/actions/user";
import { Feather } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state.userStatus.profileData);
  const socialProfileData = useSelector((state) => state.userStatus.socialData);

  const userData = useSelector((state) => state.userStatus.userData);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState(userProfileData.username);
  const [firstName, setFirstName] = useState(userProfileData.first_name);
  const [lastName, setLastName] = useState(userProfileData.last_name);
  const [email, setEmail] = useState(userProfileData.email);
  const [aboutMe, setAboutMe] = useState(userProfileData.about_me);
  const [location, setLocation] = useState(userProfileData.location);
  const [websiteUrl, setWebsiteUrl] = useState(userProfileData.website_url);
  const [isFocused, setIsFocused] = useState({
    user: false,
    first: false,
    last: false,
    emid: false,
    about: false,
    loc: false,
    website: false,
  });

  const handleInputFocus = (textinput) => {
    setIsFocused({ [textinput]: true });
  };

  const handleInputBlur = (textinput) => {
    setIsFocused({ [textinput]: false });
  };

  // useEffect(() => {
  //   props.navigation.setParams({
  //     username: username,
  //     firstname: firstName,
  //     lastname: lastName,
  //     about: aboutMe,
  //     location: location,
  //     website: websiteUrl
  //   })
  // }, [])

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        elevation: 0,
      },
      headerTitleAlign: "center",
      headerTitleStyle: {
        fontSize: 20,
        fontFamily: "AvertaStd-Semibold",
      },
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButtons}>
          <Item
            title="Save"
            iconName="save-alt"
            buttonStyle={{ fontSize: 25 }}
            onPress={async () => {
              setLoading(true);
              try {
                await dispatch(
                  updateUserProfile({
                    username: username,
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    about_me: aboutMe,
                    location: location,
                    website_url: websiteUrl,
                  })
                );
                navigation.navigate("Your Profile");
              } catch (error) {
                if (error.response.data.website_url) {
                  Alert.alert(
                    "Profile update failed",
                    error.response.data.website_url[0]
                  );
                } else if (error.response.data.username) {
                  Alert.alert(
                    "Profile update failed",
                    error.response.data.username[0]
                  );
                }
              }
              setLoading(false);
            }}
          />
        </HeaderButtons>
      ),
    });
  }, [
    navigation,
    username,
    firstName,
    lastName,
    email,
    aboutMe,
    location,
    websiteUrl,
  ]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <Modal
          visible={loading}
          transparent={true}
          animationType="fade"
          statusBarTranslucent={true}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.5)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#43516c" />
          </View>
        </Modal>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: SCREEN_WIDTH / 10,
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
            }}
          >
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
            />
          </View>
          <View style={{ width: "60%", marginHorizontal: SCREEN_WIDTH / 20 }}>
            <Text style={styles.user}>{username}</Text>
            <Text style={styles.userDescription} numberOfLines={3}>
              {aboutMe}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: SCREEN_WIDTH / 10,
            paddingVertical: SCREEN_HEIGHT / 40,
          }}
        >
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaderText}>Username</Text>
            <TextInput
              style={
                isFocused.user
                  ? [
                      styles.input,
                      { borderBottomColor: "#001b3a", borderBottomWidth: 1 },
                    ]
                  : styles.input
              }
              value={username}
              onChangeText={(userName) => setUsername(userName)}
              onFocus={() => handleInputFocus("user")}
              onBlur={() => handleInputBlur("user")}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaderText}>First name</Text>
            <TextInput
              style={
                isFocused.first
                  ? [
                      styles.input,
                      { borderBottomColor: "#001b3a", borderBottomWidth: 1 },
                    ]
                  : styles.input
              }
              value={firstName}
              onChangeText={(firstName) => setFirstName(firstName)}
              onFocus={() => handleInputFocus("first")}
              onBlur={() => handleInputBlur("first")}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaderText}>Last name</Text>
            <TextInput
              style={
                isFocused.last
                  ? [
                      styles.input,
                      { borderBottomColor: "#001b3a", borderBottomWidth: 1 },
                    ]
                  : styles.input
              }
              value={lastName}
              onChangeText={(lastName) => setLastName(lastName)}
              onFocus={() => handleInputFocus("last")}
              onBlur={() => handleInputBlur("last")}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaderText}>About me</Text>
            <TextInput
              multiline
              style={
                isFocused.about
                  ? [
                      styles.input,
                      { borderBottomColor: "#001b3a", borderBottomWidth: 1 },
                    ]
                  : styles.input
              }
              value={aboutMe}
              onChangeText={(aboutMe) => setAboutMe(aboutMe)}
              onFocus={() => handleInputFocus("about")}
              onBlur={() => handleInputBlur("about")}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaderText}>Location</Text>
            <TextInput
              style={
                isFocused.loc
                  ? [
                      styles.input,
                      { borderBottomColor: "#001b3a", borderBottomWidth: 1 },
                    ]
                  : styles.input
              }
              value={location}
              onChangeText={(location) => setLocation(location)}
              onFocus={() => handleInputFocus("loc")}
              onBlur={() => handleInputBlur("loc")}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeaderText}>Website Url</Text>
            <TextInput
              style={
                isFocused.website
                  ? [
                      styles.input,
                      { borderBottomColor: "#001b3a", borderBottomWidth: 1 },
                    ]
                  : styles.input
              }
              value={websiteUrl}
              onChangeText={(websiteUrl) => setWebsiteUrl(websiteUrl)}
              onFocus={() => handleInputFocus("website")}
              onBlur={() => handleInputBlur("website")}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: SCREEN_HEIGHT / 40,
  },
  inputContainer: {
    marginVertical: SCREEN_HEIGHT / 60,
  },
  inputHeaderText: {
    fontFamily: "AvertaStd-Regular",
    color: "#708999",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#cfd8dd",
    paddingVertical: 5,
    paddingHorizontal: SCREEN_WIDTH / 30,
    fontFamily: "AvertaStd-Semibold",
    color: "#001b3a",
    fontSize: 16,
    fontWeight: "normal",
  },
  user: {
    fontSize: 20,
    fontFamily: "AvertaStd-Semibold",
    color: "#001b3a",
  },
  userDescription: {
    fontFamily: "AvertaStd-Regular",
    color: "#708999",
    marginVertical: 5,
  },
});

export default EditProfileScreen;
