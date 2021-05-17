import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from 'expo-secure-store';

import { autoLogin } from '../store/actions/signin';
import { autoSocialLogin } from '../store/actions/signup';
import AuthenticateScreen from '../screens/user/Authenticate';
import BottomTabNavigator from './AppNavigator';


const RootStack = createStackNavigator();


export default function RootStackNavigator() {
    const isAuthenticated = useSelector(state => state.userStatus.isLoggedIn);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function checkToken() {
            setLoading(true);
            try {
                const session = await SecureStore.getItemAsync('userData');
                const sessionData = JSON.parse(session);

                const social = await SecureStore.getItemAsync('socialData');
                const socialUserData = JSON.parse(social);

                if (sessionData) {
                    if (socialUserData) {
                        dispatch(autoSocialLogin(socialUserData.socialData));
                    }
                    console.log('inside useEffect', sessionData.userToken);
                    dispatch(autoLogin(sessionData.userToken));
                }
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        checkToken();
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#43516c" />
            </View>
        )
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
                <RootStack.Screen
                    name="Authenticate"
                    component={AuthenticateScreen}
                />
            )}
        </RootStack.Navigator>
    );
}
