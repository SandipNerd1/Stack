import * as SecureStore from 'expo-secure-store';

import axiosInstance from '../../api/axiosApi';


export const setLoginLocal = async (userData) => {
  try {
    await SecureStore.setItemAsync('userData', JSON.stringify(userData));
  } catch (err) {
    console.log(err);
  }
};

export const removeLoginLocal = async () => {
  try {
    await SecureStore.deleteItemAsync('userData');
    await SecureStore.deleteItemAsync('socialData');
  } catch (err) {
    console.log(err);
  }
};

export const setAuthHeader = token => {
  console.log('inside setAuthHeader', token);
  axiosInstance.defaults.headers['Authorization'] = "Token " + token;
};

export const removeAuthHeader = () => {
  axiosInstance.defaults.headers['Authorization'] = null;
};


export const setSocialLoginLocal = async (socialData) => {
  try {
    await SecureStore.setItemAsync('socialData', JSON.stringify(socialData));
  } catch (err) {
    console.log(err);
  }
}


export const config = {
  androidClientId: '641469862151-dbg5rc3ek05g9lrk1qmsuv4ben0pvs3c.apps.googleusercontent.com',
  // iosClientId: YOUR_CLIENT_ID_HERE,
  scopes: ['profile', 'email'],
};
