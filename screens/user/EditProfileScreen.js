import React, { useEffect, useState } from "react";
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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { updateUserProfile } from "../../store/actions/user";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state.userStatus.profileData);
  const socialProfileData = useSelector((state) => state.userStatus.socialData);

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
  })

  const handleInputFocus = (textinput) => {
    setIsFocused({ [textinput]: true });
  }

  const handleInputBlur = (textinput) => {
    setIsFocused({ [textinput]: false });
  }

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
      },
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName="md-save"
            buttonStyle={{ fontSize: 30 }}
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
                  Alert.alert("Profile update failed", error.response.data.website_url[0]);
                } else if (error.response.data.username) {
                  Alert.alert("Profile update failed", error.response.data.username[0]);
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

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#43516c" />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            }}
          >
            <Image
              source={{
                uri:
                  "picture" in socialProfileData
                    ? socialProfileData.picture.data.url
                    : "photoUrl" in socialProfileData
                      ? socialProfileData.photoUrl
                      : "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png",
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </View>
          <View
            style={{ alignItems: "center", marginVertical: SCREEN_HEIGHT / 40 }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 23, color: "#001b3a" }}
            >
              {firstName} {lastName}
            </Text>
            <Text
              style={{ textAlign: "center", color: "#708999", fontSize: 16 }}
            >
              {aboutMe}
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: SCREEN_WIDTH / 20,
            backgroundColor: "white",
          }}
        >
          <View style={styles.details}>
            <Text style={styles.detailHeader}>USERNAME</Text>
            <TextInput
              style={isFocused.user ? [styles.input, { borderColor: 'black' }] : styles.input}
              value={username}
              onChangeText={(userName) => setUsername(userName)}
              onFocus={() => handleInputFocus('user')}
              onBlur={() => handleInputBlur('user')}
              multiline
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>FIRST NAME</Text>
            <TextInput
              style={isFocused.first ? [styles.input, { borderColor: 'black' }] : styles.input}
              value={firstName}
              onChangeText={(firstname) => setFirstName(firstname)}
              onFocus={() => handleInputFocus('first')}
              onBlur={() => handleInputBlur('first')}
              multiline
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>LAST NAME</Text>
            <TextInput
              style={isFocused.last ? [styles.input, { borderColor: 'black' }] : styles.input}
              value={lastName}
              onChangeText={(lastname) => setLastName(lastname)}
              onFocus={() => handleInputFocus('last')}
              onBlur={() => handleInputBlur('last')}
              multiline
            />
          </View>

          <View style={styles.details}>
            <Text style={styles.detailHeader}>ABOUT ME</Text>
            <TextInput
              style={isFocused.about ? [styles.input, { borderColor: 'black' }] : styles.input}
              value={aboutMe}
              onChangeText={(about) => setAboutMe(about)}
              onFocus={() => handleInputFocus('about')}
              onBlur={() => handleInputBlur('about')}
              multiline
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>LOCATION</Text>
            <TextInput
              style={isFocused.loc ? [styles.input, { borderColor: 'black' }] : styles.input}
              value={location}
              onChangeText={(loc) => setLocation(loc)}
              onFocus={() => handleInputFocus('loc')}
              onBlur={() => handleInputBlur('loc')}
              multiline
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>WEBSITE URL</Text>
            <TextInput
              style={isFocused.website ? [styles.input, { borderColor: 'black' }] : styles.input}
              value={websiteUrl}
              onChangeText={(website) => setWebsiteUrl(website)}
              onFocus={() => handleInputFocus('website')}
              onBlur={() => handleInputBlur('website')}
              multiline
            />
          </View>
        </View>
      </ScrollView>
      <TouchableNativeFeedback>
        <View
          style={{
            flex: 1,
            position: "absolute",
            bottom: 10,
            backgroundColor: "#ff4848",
            paddingHorizontal: 30,
            paddingVertical: 10,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Update profile</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

// export const screenOptions = (navData) => {
//   const { username, firstname, lastname, about, location, website } = navData.route.params ? navData.route.params : null;
//   console.log(username);
//   console.log(firstname);

//   return {
//     headerTitleAlign: "center",
//     headerRight: () => (
//       <HeaderButtons HeaderButtonComponent={HeaderButton}>
//         <Item
//           title="Save"
//           buttonStyle={{ fontSize: 15 }}
//           onPress={() => console.log(lastname)}
//         />
//       </HeaderButtons>
//     ),
//   };
// };

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 20,
    backgroundColor: "white",
  },
  input: {
    color: "#001b3a",
    fontWeight: "bold",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: SCREEN_WIDTH / 20,
    marginTop: -SCREEN_HEIGHT / 60,
    fontSize: 15,
  },
  details: {
    marginBottom: 30,
    backgroundColor: "white",
    paddingHorizontal: SCREEN_WIDTH / 40,
  },
  detailHeader: {
    fontSize: 13,
    color: "#708999",
    width: "30%",
    backgroundColor: "white",
    zIndex: 100,
    marginHorizontal: SCREEN_WIDTH / 20,
    textAlign: "center",
  },
});

export default EditProfileScreen;
