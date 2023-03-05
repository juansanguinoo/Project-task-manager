import { useReducer } from 'react';
import AuthContext from './AuthContext';
import { AuthReducer } from './AuthReducer';
import axiosClient from '../../config/axios';
import authToken from '../../config/authToken';

import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  GET_USER,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT,
} from '../../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    authenticated: null,
    user: null,
    message: null,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const registerUser = async (data) => {
    try {
      const response = await axiosClient.post('/api/users', data);
      localStorage.setItem('token', response.data.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });
      authenticatedUser();
    } catch (error) {
      localStorage.removeItem('token');
      const alert = {
        msg: error.response.data.msg,
        category: 'alert-error',
      };

      dispatch({
        type: REGISTER_ERROR,
        payload: alert,
      });
    }
  };

  const authenticatedUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      authToken(token);
    }

    try {
      const response = await axiosClient.get('/api/auth');

      dispatch({
        type: GET_USER,
        payload: response.data.user,
      });
    } catch (error) {
      localStorage.removeItem('token');
      console.log(error.response);
      dispatch({
        type: LOGIN_ERROR,
      });
    }
  };

  const loginUser = async (data) => {
    try {
      const response = await axiosClient.post('/api/auth', data);
      localStorage.setItem('token', response.data.token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data,
      });
      authenticatedUser();
    } catch (error) {
      localStorage.removeItem('token');
      console.log(error.response);
      const alert = {
        msg: error.response.data.msg,
        category: 'alert-error',
      };

      dispatch({
        type: LOGIN_ERROR,
        payload: alert,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({
      type: LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        authenticated: state.authenticated,
        user: state.user,
        message: state.message,
        registerUser,
        loginUser,
        authenticatedUser,
        logout,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
