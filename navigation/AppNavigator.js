import React, { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { enableScreens } from "react-native-screens";

import NewQuestionDetailScreen, {
  screenOptions as detailScreenOptions,
} from "../screens/pocketstack/NewQuestionDetailScreen";

import SearchScreen, {
  screenOptions as searchScreenOptions,
} from "../screens/pocketstack/SearchScreen";
import UserProfileScreen, {
  screenOptions as userProfileScreenOptions,
} from "../screens/user/UserProfileScreen";
import UserQuestionScreen, {
  screenOptions as userQuestionScreenOptions,
} from "../screens/user/UserQuestionScreen";
import EditProfileScreen from "../screens/user/EditProfileScreen";
import CreateQuestionScreen, {
  screenOptions as createQuestionScreenOptions,
} from "../screens/user/CreateQuestionScreen";
import EditQuestionScreen, {
  screenOptions as editQuestionScreenOptions,
} from "../screens/user/EditQuestionScreen";

import CreateAnswerScreen, {
  screenOptions as createAnswerScreenOptions,
} from "../screens/user/CreateAnswerScreen";
import EditAnswerScreen, {
  screenOptions as editAnswerScreenOptions,
} from "../screens/user/EditAnswerScreen";
import HomeScreen, {
  screenOptions as homeScreenOptions,
} from "../screens/pocketstack/HomeScreen";

enableScreens();

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: "#001b3a",
        headerTitleStyle: {
          fontSize: 25,
          fontFamily: "AvertaStd-Regular",
        },
        headerTitleAlign: "center",
      }}
    >
      <HomeStack.Screen
        name="questions"
        component={HomeScreen}
        options={homeScreenOptions}
      />
      <HomeStack.Screen
        name="Post question"
        component={CreateQuestionScreen}
        options={createQuestionScreenOptions}
      />
      <HomeStack.Screen
        name="Detail"
        component={NewQuestionDetailScreen}
        options={detailScreenOptions}
      />
      <HomeStack.Screen
        name="Edit Question"
        component={EditQuestionScreen}
        options={editQuestionScreenOptions}
      />
      <HomeStack.Screen
        name="Post answer"
        component={CreateAnswerScreen}
        options={createAnswerScreenOptions}
      />
      <HomeStack.Screen
        name="edit_Answer"
        component={EditAnswerScreen}
        options={editAnswerScreenOptions}
      />
    </HomeStack.Navigator>
  );
};
const SearchStack = createStackNavigator();

const SearchStackNavigator = ({ navigation, route }) => {
  useLayoutEffect(() => {
    const tabHiddenRoutes = [
      "Post question",
      "Edit Question",
      "Post answer",
      "edit_Answer",
    ];
    if (tabHiddenRoutes.includes(getFocusedRouteNameFromRoute(route))) {
      navigation.setOptions({ tabBarVisible: false });
    } else {
      navigation.setOptions({ tabBarVisible: true });
    }
  }, [navigation, route]);
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
          elevation: 0,
        },
        headerTitleStyle: {
          fontSize: 25,
          fontFamily: "AvertaStd-Regular",
        },
        headerTintColor: "#001b3a",
      }}
    >
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={searchScreenOptions}
      />
      <SearchStack.Screen
        name="Detail"
        component={NewQuestionDetailScreen}
        options={detailScreenOptions}
      />
      <SearchStack.Screen
        name="Edit Question"
        component={EditQuestionScreen}
        options={editQuestionScreenOptions}
      />
      <SearchStack.Screen
        name="Post answer"
        component={CreateAnswerScreen}
        options={createAnswerScreenOptions}
      />
      <SearchStack.Screen
        name="edit_Answer"
        component={EditAnswerScreen}
        options={editAnswerScreenOptions}
      />
    </SearchStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
        },
        headerTintColor: "#001b3a",
        headerTitleStyle: {
          fontSize: 25,
          fontFamily: "AvertaStd-Regular",
        },
        headerTitleAlign: "center",
      }}
    >
      <ProfileStack.Screen
        name="Your Profile"
        component={UserProfileScreen}
        options={userProfileScreenOptions}
      />
      <ProfileStack.Screen
        name="Edit information"
        component={EditProfileScreen}
      />
      <ProfileStack.Screen
        name="user_question"
        component={UserQuestionScreen}
        options={userQuestionScreenOptions}
      />
      <ProfileStack.Screen
        name="Detail"
        component={NewQuestionDetailScreen}
        options={detailScreenOptions}
      />
      <ProfileStack.Screen
        name="Edit Question"
        component={EditQuestionScreen}
        options={editQuestionScreenOptions}
      />
      <ProfileStack.Screen
        name="Post answer"
        component={CreateAnswerScreen}
        options={createAnswerScreenOptions}
      />
      <ProfileStack.Screen
        name="edit_Answer"
        component={EditAnswerScreen}
        options={editAnswerScreenOptions}
      />
    </ProfileStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        inactiveTintColor: "#888",
        activeTintColor: "#ff4848",
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          height: 60,
          borderTopWidth: 0,
        },
      }}
      backBehavior="initialRoute"
    >
      <BottomTab.Screen
        name="home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: (props) => (
            <AntDesign name="appstore1" size={20} color={props.color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="search"
        component={SearchStackNavigator}
        options={{
          tabBarIcon: (props) => (
            <Ionicons name="search-outline" size={25} color={props.color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="profile"
        component={ProfileStackNavigator}
        options={{
          tabBarIcon: (props) => (
            <Ionicons name="person" size={25} color={props.color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
