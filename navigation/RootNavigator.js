import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';

import { autoLogin } from '../store/actions/signin';
import { autoSocialLogin } from '../store/actions/signup';

import AuthenticateScreen from '../screens/user/Authenticate';
import BottomTabNavigator from './AppNavigator';
import NewSignInScreen from '../screens/user/NewSignInScreen';
import NewSignUpScreen from '../screens/user/NewSignUpScreen';
import StartupScreen from '../screens/StartupScreen';


const RootStack = createStackNavigator();


export default function RootStackNavigator() {
    const isAuthenticated = useSelector(state => state.userStatus.isLoggedIn);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    console.log("initial loading", loading);

    useEffect(() => {
        async function checkToken() {
            console.log("inside useeffect", loading);
            try {
                const session = await SecureStore.getItemAsync('userData');
                const sessionData = JSON.parse(session);

                const social = await SecureStore.getItemAsync('socialData');
                const socialUserData = JSON.parse(social);

                if (sessionData) {
                    console.log('inside useEffect', sessionData.userToken);
                    await dispatch(autoLogin(sessionData.userToken));
                    if (socialUserData) {
                        await dispatch(autoSocialLogin(socialUserData.socialData));
                    }
                }
            } catch (error) {
                // console.log(error.response);
                Alert.alert("Your session has expired!", "Please login again.");
            }
            setLoading(false);
        }
        checkToken();
    }, [])

    if (loading) {
        return <StartupScreen />
    }

    return (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            {isAuthenticated ? (
                <RootStack.Screen
                    name="Tab"
                    component={BottomTabNavigator}
                />
            ) : (
                <>
                    <RootStack.Screen
                        name="Sign In"
                        component={NewSignInScreen}
                    />
                    <RootStack.Screen
                        name="Sign Up"
                        component={NewSignUpScreen}
                    />
                    <RootStack.Screen
                        name="Startup"
                        component={StartupScreen}
                    />
                </>
            )}
        </RootStack.Navigator>
    );
}
