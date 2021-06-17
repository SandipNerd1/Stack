import { SET_LOGIN_STATE, SET_LOGOUT_STATE } from "../actions/signin";
import { SET_SOCIAL_DATA } from "../actions/signup";
import {
  GET_USER_PROFILE_STATE,
  PUT_USER_PROFILE_STATE,
  GET_USER_DATA,
} from "../actions/user";

const initialState = {
  socialData: {},
  profileData: "",
  userData: "",
  currentUser: "",
  isLoggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGIN_STATE:
      return {
        ...state,
        currentUser: action.userToken,
        isLoggedIn: true,
      };
    case SET_LOGOUT_STATE:
      return {
        ...state,
        socialData: {},
        profileData: "",
        currentUser: action.userToken,
        isLoggedIn: false,
      };
    case SET_SOCIAL_DATA:
      return {
        ...state,
        socialData: action.socialData,
      };
    case GET_USER_PROFILE_STATE:
      return {
        ...state,
        profileData: action.profileData,
      };
    case GET_USER_DATA:
      return {
        ...state,
        userData: action.data,
      };
    default:
      return state;
  }
};
