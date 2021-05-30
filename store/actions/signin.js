import axiosInstance from '../../api/axiosApi';
import { setLoginLocal, setAuthHeader, removeLoginLocal, removeAuthHeader } from '../helpers/helper';


export const SET_LOGIN_STATE = "SET_LOGIN_STATE"
export const SET_LOGOUT_STATE = "SET_LOGOUT_STATE"


export const login = ({ email, password }) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/login/', {
      email: email,
      password: password,
    })
    if (!response.status === 200) {
      throw new Error("Login status code not 200");
    }

    const resData = await response.data;

    const secureStorageData = { userToken: resData.key };
    setLoginLocal(secureStorageData);

    setAuthHeader(resData.key);

    dispatch({ type: SET_LOGIN_STATE, userToken: resData.key });
  } catch (error) {
    throw error;
  }
}


export const logout = () => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/logout/');
    if (!response.status === 200) {
      throw new Error("Logout status code not 200");
    }

    const resData = await response.data;

    removeLoginLocal();

    removeAuthHeader();

    dispatch({ type: SET_LOGOUT_STATE, userToken: '' });
  } catch (error) {
    throw error;
  }
}


export const autoLogin = (secureStorageToken) => async (dispatch) => {
  try {
    setAuthHeader(secureStorageToken);

    const response = await axiosInstance.get('/auth/user/');
    console.log(response.status);

    if (response.status === 200) {
      await dispatch({ type: SET_LOGIN_STATE, userToken: secureStorageToken });
    }
  } catch (error) {
    removeAuthHeader();
    removeLoginLocal();
    console.log(axiosInstance.defaults.headers);
    throw error;
  }
}
