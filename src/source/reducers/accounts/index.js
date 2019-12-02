import {
  INPUT_SIGNIN_USERNAME,
  INPUT_SIGNIN_PASSWORD,
  INPUT_SIGNUP_USERNAME,
  INPUT_SIGNUP_PASSWORD,
  INPUT_SIGNUP_REPEAT_PASSWORD
} from "../../actions/accounts/types";

let initialState = {
  signinUsername: "",
  signinPassword: "",
  signupUsername: "",
  signupPassword: "",
  signupRepeatPassword: ""
};

export default (state = initialState, action = {}) => {
  console.log(action);
  switch (action.type) {
    case INPUT_SIGNIN_USERNAME:
      return { ...state, signinUsername: action.payload };
    case INPUT_SIGNIN_PASSWORD:
      return { ...state, signinPassword: action.payload };
    case INPUT_SIGNUP_USERNAME:
      return { ...state, signupUsername: action.payload };
    case INPUT_SIGNUP_PASSWORD:
      return { ...state, signupPassword: action.payload };
    case INPUT_SIGNUP_REPEAT_PASSWORD:
      return { ...state, signupRepeatPassword: action.payload };
    default:
      return state;
  }
};
