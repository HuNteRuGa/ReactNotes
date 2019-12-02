import { connect } from "react-redux";

import Signin from "../../components/Guestpage/Signin";
import {
  inputSigninPassword,
  inputSigninUsername,
  inputSignupPassword,
  inputSignupRepeatPassword,
  inputSignupUsername
} from "../../actions/accounts";

const mapStateToProps = state => ({
  accounts: state.accounts
});

const mapDispatchToProps = dispatch => ({
  onInputSigninUsername: payload => {
    dispatch(inputSigninUsername(payload));
  },
  onInputSiginPassword: payload => {
    dispatch(inputSigninPassword(payload));
  },
  onInputSigupUsername: payload => {
    dispatch(inputSignupUsername(payload));
  },
  onInputSigupUsername: payload => {
    dispatch(inputSignupPassword(payload));
  },
  onInputSigupUsername: payload => {
    dispatch(inputSignupRepeatPassword(payload));
  }
});

const store = connect(mapStateToProps, mapDispatchToProps)(Signin);
export default store;
