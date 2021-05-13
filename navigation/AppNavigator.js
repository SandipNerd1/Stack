import React, { useCallback, useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Ionicons, AntDesign } from "@expo/vector-icons";

// import HomeScreen, {
//   screenOptions as homeScreenOptions,
// } from "../screens/pocketstack/HomeScreen";

// import NewHomeScreen, {
//   screenOptions as homeScreenOptions,
// } from "../screens/pocketstack/NewHomeScreen";
import NewQuestionDetailScreen, {
  screenOptions as detailScreenOptions,
} from "../screens/pocketstack/NewQuestionDetailScreen";

import SearchScreen from "../screens/pocketstack/SearchScreen";
import MarkedQuestionScreen, {
  screenOptions as markQuestionScreenOptions,
} from "../screens/pocketstack/MarkedQuestionScreen";
import UserProfileScreen, {
  screenOptions as userProfileScreenOptions,
} from "../screens/user/UserProfileScreen";
import EditProfileScreen, {
  screenOptions as editProfileScreenOptions,
} from "../screens/user/EditProfileScreen";
import CreateQuestionScreen, {
  screenOptions as createQuestionScreenOptions,
} from "../screens/user/CreateQuestionScreen";
import EditQuestionScreen, {
  screenOptions as editQuestionScreenOptions,
} from "../screens/user/EditQuestionScreen";
// import QuestionDetailScreen, {
//   screenOptions as detailScreenOptions,
// } from "../screens/pocketstack/QuestionDetailScreen";
import CreateAnswerScreen from "../screens/user/CreateAnswerScreen";
import SampleHomeScreen, {
  screenOptions as sampleHomeScreenScreenOptions,
} from "../screens/pocketstack/SampleHomeScreen";
import HomeScreen, {
  screenOptions as homeScreenOptions,
} from "../screens/pocketstack/HomeScreen";

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: "black",
        headerStyle: {
          backgroundColor: "white",
          elevation: 0,
        },
        headerTitleAlign: "center",
        gestureEnabled: false,
        // gestureDirection: "horizontal",
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
      <HomeStack.Screen name="Post answer" component={CreateAnswerScreen} />
    </HomeStack.Navigator>
  );
};
const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "white",
          elevation: 0,
        },
        headerTintColor: "black",
        headerTitleStyle: {
          fontSize: 30,
        },
        // gestureEnabled: true,
        // gestureDirection: "horizontal",
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SearchStack.Screen name="Search" component={SearchScreen} />
      <SearchStack.Screen
        name="Detail"
        component={NewQuestionDetailScreen}
        options={detailScreenOptions}
      />
    </SearchStack.Navigator>
  );
};

const FavoriteStack = createStackNavigator();

const FavoriteStackNavigator = () => {
  return (
    <FavoriteStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#ff4848",
        },
        headerTintColor: "white",
        // gestureEnabled: true,
        // gestureDirection: "horizontal",
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <FavoriteStack.Screen name="Favorite" component={MarkedQuestionScreen} />
      <FavoriteStack.Screen
        name="Detail"
        component={NewQuestionDetailScreen}
        options={detailScreenOptions}
      />
    </FavoriteStack.Navigator>
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
        headerTintColor: "black",
        headerTitleStyle: {
          fontSize: 25,
        },
        headerTitleAlign: "center",
        // gestureEnabled: true,
        // gestureDirection: "horizontal",
        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={UserProfileScreen}
        options={userProfileScreenOptions}
      />
      <ProfileStack.Screen
        name="Edit"
        component={EditProfileScreen}
        options={editProfileScreenOptions}
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
        inactiveTintColor: "#a9a9a9",
        activeTintColor: "#ff4848",
        keyboardHidesTabBar: true,
        showLabel: false,
        style: {
          height: 60,
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
      {/* <BottomTab.Screen
        name="Post Question"
        component={CreateQuestionScreen}
        options={{
          tabBarIcon: (props) => (
            <AntDesign name="pluscircle" size={25} color={props.color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="favorite"
        component={FavoriteStackNavigator}
        options={{
          tabBarIcon: (props) => (
            <Ionicons name="star" size={25} color={props.color} />
          ),
        }}
      /> */}
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
