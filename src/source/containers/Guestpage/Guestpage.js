import { connect } from "react-redux";

import Guestpage from "../../components/Guestpage/Guestpage";
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

const store = connect(mapStateToProps, mapDispatchToProps)(Guestpage);
export default store;
