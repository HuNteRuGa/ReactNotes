import { connect } from "react-redux";

import Signup from "../../components/Guestpage/Signup";
import {
  inputSignupPassword,
  inputSignupRepeatPassword,
  inputSignupUsername,
  signup
} from "../../actions/accounts";

const mapStateToProps = state => ({
  accounts: state.accounts
});

const mapDispatchToProps = dispatch => ({
  onInputSignupUsername: payload => {
    dispatch(inputSignupUsername(payload));
  },
  onInputSignupPassword: payload => {
    dispatch(inputSignupPassword(payload));
  },
  onInputSignupRepeatPassword: payload => {
    dispatch(inputSignupRepeatPassword(payload));
  },
  onSignup: data => {
    signup(dispatch, data);
  }
});

const store = connect(mapStateToProps, mapDispatchToProps)(Signup);
export default store;
