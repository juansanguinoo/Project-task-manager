import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from '../../types';

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        message: null,
      };
    case GET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };
    case LOGOUT:
    case LOGIN_ERROR:
    case REGISTER_ERROR:
      return {
        ...state,
        token: null,
        user: null,
        authenticated: null,
        message: action.payload,
      };
    default:
      return state;
  }
};
