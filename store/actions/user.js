import axiosInstance from '../../api/axiosApi';


export const GET_USER_PROFILE_STATE = "GET_USER_PROFILE_STATE"
export const PUT_USER_PROFILE_STATE = "PUT_USER_PROFILE_STATE"
export const GET_USER_DATA = "GET_USER_DATA";


export const getUserData = (userId) => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/users/${userId}/`);
      if (!response.status === 200) {
        throw new Error("Status code not 200");
      }
      const resData = await response.data;
      dispatch({ type: GET_USER_DATA, data: resData });
    } catch (error) {
      throw error;
    }
  };
};


export const getUserProfile = () => async (dispatch) => {
  try {
    const response = await axiosInstance.get('/auth/user/');
    if (!response.status === 200) {
      throw new Error("Status code not 200");
    }

    const resData = await response.data;
    // console.log(resData);

    dispatch({ type: GET_USER_PROFILE_STATE, profileData: resData });
  } catch (error) {
    throw error;
  }
}


export const updateUserProfile = ({ username, first_name, last_name, email, about_me, location, website_url }) => async (dispatch) => {
  try {
    const response = await axiosInstance.put('/auth/user/', {
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      about_me: about_me,
      location: location,
      website_url: website_url
    });
    console.log(response.status);
    if (!(response.status === 200)) {
      throw new Error("Status code not 200");
    }

    const resData = await response.data;
    console.log("inside update", resData);

    dispatch({ type: GET_USER_PROFILE_STATE, profileData: resData });
  } catch (error) {
    throw error;
  }
}


export const passwordReset = ({ email }) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/password_reset/', {
      email: email,
    });
    console.log(response.status);

    const resData = await response.data;
    console.log(resData);
  } catch (error) {
    throw error;
  }
}


export const passwordResetConfirm = ({ password, confirmPassword, token }) => async (dispatch) => {
  try {
    const response = await axiosInstance.post('/auth/password_reset/confirm/', {
      password: password,
      token: token,
    });
    console.log(response.status);

    const resData = await response.data;
    console.log(resData);
  } catch (error) {
    throw error;
  }
}