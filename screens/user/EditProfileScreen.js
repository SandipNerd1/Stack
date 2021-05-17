import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import { updateUserProfile } from "../../store/actions/user";

const EditProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProfileData = useSelector((state) => state.userStatus.profileData);
  const socialProfileData = useSelector((state) => state.userStatus.socialData);

  const [username, setUsername] = useState(userProfileData.username);
  const [firstName, setFirstName] = useState(userProfileData.first_name);
  const [lastName, setLastName] = useState(userProfileData.last_name);
  const [email, setEmail] = useState(userProfileData.email);
  const [aboutMe, setAboutMe] = useState(userProfileData.about_me);
  const [location, setLocation] = useState(userProfileData.location);
  const [websiteUrl, setWebsiteUrl] = useState(userProfileData.website_url);

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
      headerTitleAlign: "center",
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Save"
            iconName="md-save"
            buttonStyle={{ fontSize: 30 }}
            onPress={async () => {
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
                navigation.navigate("Profile");
              } catch (e) {
                console.log(e);
              }
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
      <View style={{ flex: 1, backgroundColor: "white" }}>
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
              {firstName} {lastName}
            </Text>
            <Text style={{ textAlign: "center" }}>{aboutMe}</Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#001b3a" }}>
            Profile details
          </Text>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={(userName) => setUsername(userName)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={[styles.details, { width: 130 }]}>
              <Text style={styles.detailHeader}>First Name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={(firstname) => setFirstName(firstname)}
              />
            </View>
            <View style={[styles.details, { width: 130 }]}>
              <Text style={styles.detailHeader}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={(lastname) => setLastName(lastname)}
              />
            </View>
          </View>

          <View style={styles.details}>
            <Text style={styles.detailHeader}>About me</Text>
            <TextInput
              style={styles.input}
              value={aboutMe}
              onChangeText={(about) => setAboutMe(about)}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={(loc) => setLocation(loc)}
            />
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>Website URL</Text>
            <TextInput
              style={styles.input}
              value={websiteUrl}
              onChangeText={(website) => setWebsiteUrl(website)}
            />
          </View>
        </View>
      </View>
    </ScrollView>
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
  headerContainer: {
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 4,
  },
  details: {
    paddingVertical: 10,
  },
  detailHeader: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#001b3a",
  },
});

export default EditProfileScreen;
