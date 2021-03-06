import { connect } from "react-redux";

import Signin from "../../components/Guestpage/Signin";
import { inputSigninPassword, inputSigninUsername, signin } from "../../actions/accounts";

const mapStateToProps = state => ({
  accounts: state.accounts
});

const mapDispatchToProps = dispatch => ({
  onInputSigninUsername: payload => {
    dispatch(inputSigninUsername(payload));
  },
  onInputSigninPassword: payload => {
    dispatch(inputSigninPassword(payload));
  },
  onSignin: data => {
    signin(dispatch, data);
  }
});

const store = connect(mapStateToProps, mapDispatchToProps)(Signin);
export default store;
