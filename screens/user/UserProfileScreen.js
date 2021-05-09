import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const UserProfileScreen = (props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <View style={styles.headerContainer}>
          <View style={{ width: 150, height: 150 }}>
            <Image
              source={{
                uri:
                  "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png",
              }}
              style={{ width: "100%", height: "100%", borderRadius: 75 }}
            />
          </View>
          <View style={{ alignItems: "center", marginVertical: 10 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 23, color: "#001b3a" }}
            >
              Peter McKinnon
            </Text>
            <Text style={{ textAlign: "center" }}>
              Passionate journalist interested in social and financial themes
            </Text>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#001b3a" }}>
            Profile details
          </Text>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>Username</Text>
            <Text>Johnny_Blade</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>About me</Text>
            <Text>Johnny_Blade</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>Location</Text>
            <Text>Saint California</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>Website_url</Text>
            <Text>teraBaapMahan.com</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Account</Text>
          <TouchableOpacity style={styles.logoutButton}>
            <AntDesign name="logout" size={20} />
            <Text style={{ paddingHorizontal: 10 }}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitleAlign: "center",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Edit"
          buttonStyle={{ fontSize: 15, color: "#ff4848" }}
          onPress={() => navData.navigation.navigate("Edit")}
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
