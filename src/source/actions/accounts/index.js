import { INPUT_SIGNIN_PASSWORD, INPUT_SIGNIN_USERNAME, INPUT_SIGNUP_PASSWORD, INPUT_SIGNUP_REPEAT_PASSWORD, INPUT_SIGNUP_USERNAME } from "./types";

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
