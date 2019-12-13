import {
  INPUT_SIGNIN_PASSWORD,
  INPUT_SIGNIN_USERNAME,
  INPUT_SIGNUP_PASSWORD,
  INPUT_SIGNUP_REPEAT_PASSWORD,
  INPUT_SIGNUP_USERNAME,
  SIGNIN,
  SIGNUP,
  CHECK_AUTH
} from "./types";

import { signupApi, signinApi } from "../../scripts/api/accounts";

export const inputSigninPassword = payload => ({
  type: INPUT_SIGNIN_PASSWORD,
  payload: payload
});
export const inputSigninUsername = payload => ({
  type: INPUT_SIGNIN_USERNAME,
  payload: payload
});
export const inputSignupPassword = payload => ({
  type: INPUT_SIGNUP_PASSWORD,
  payload: payload
});
export const inputSignupRepeatPassword = payload => ({
  type: INPUT_SIGNUP_REPEAT_PASSWORD,
  payload: payload
});
export const inputSignupUsername = payload => ({
  type: INPUT_SIGNUP_USERNAME,
  payload: payload
});

export const signin = async (dispatch, data) => {
  const res = await signinApi(data);
  dispatch({
    type: SIGNIN,
    payload: res
  });
};
export const signup = async (dispatch, data) => {
  const res = await signupApi(data);
  dispatch({
    type: SIGNUP,
    payload: res
  });
};

export const checkAuth = () => ({
  type: CHECK_AUTH,
  payload: null
});
