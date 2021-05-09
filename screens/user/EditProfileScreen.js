import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
} from "react-native";

import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";

const EditProfileScreen = (props) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={[styles.details, { width: 130 }]}>
              <Text style={styles.detailHeader}>Firstname</Text>
              <TextInput style={styles.input} />
            </View>
            <View style={[styles.details, { width: 130 }]}>
              <Text style={styles.detailHeader}>Lastname</Text>
              <TextInput style={styles.input} />
            </View>
          </View>

          <View style={styles.details}>
            <Text style={styles.detailHeader}>About me</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>Location</Text>
            <TextInput style={styles.input} />
          </View>
          <View style={styles.details}>
            <Text style={styles.detailHeader}>Website_url</Text>
            <TextInput style={styles.input} />
          </View>
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
          title="Save"
          buttonStyle={{ fontSize: 15 }}
          onPress={() => navData.navigation.navigate("Edit")}
        />
      </HeaderButtons>
    ),
  };
};

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
