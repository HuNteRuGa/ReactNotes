import {
  INPUT_SIGNIN_USERNAME,
  INPUT_SIGNIN_PASSWORD,
  INPUT_SIGNUP_USERNAME,
  INPUT_SIGNUP_PASSWORD,
  INPUT_SIGNUP_REPEAT_PASSWORD,
  SIGNIN,
  SIGNUP,
  CHECK_AUTH
} from "../../actions/accounts/types";

let initialState = {
  signinUsername: "",
  signinPassword: "",

  signinError: 1,

  signupUsername: "",
  signupPassword: "",
  signupRepeatPassword: "",

  signupError: 1,

  jwt: {}
};

export default (state = initialState, action = {}) => {
  console.log(action);
  switch (action.type) {
    case INPUT_SIGNIN_USERNAME:
      return { ...state, signinError: 1, signinUsername: action.payload };
    case INPUT_SIGNIN_PASSWORD:
      return { ...state, signinError: 1, signinPassword: action.payload };
    case INPUT_SIGNUP_USERNAME:
      return { ...state, signupError: 1, signupUsername: action.payload };
    case INPUT_SIGNUP_PASSWORD:
      return { ...state, signupError: 1, signupPassword: action.payload };
    case INPUT_SIGNUP_REPEAT_PASSWORD:
      return { ...state, signupError: 1, signupRepeatPassword: action.payload };
    case SIGNIN:
      localStorage.setItem("jwt", action.payload.res ? JSON.stringify(action.payload.res) : false);
      return {
        ...state,
        signinError: action.payload.res ? 1 : action.payload.code,
        jwt: JSON.parse(localStorage.getItem("jwt"))
      };
    case SIGNUP:
      return { ...state, signupError: action.payload.res ? 1 : action.payload.code };
    case CHECK_AUTH:
      const jwtString = localStorage.getItem("jwt");
      return {
        ...state,
        jwt: jwtString ? JSON.parse(jwtString) : {}
      };
    default:
      return { ...state };
  }
};
