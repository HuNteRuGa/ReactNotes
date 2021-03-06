import { connect } from "react-redux";

import App from "../components/App";

const mapStateToProps = state => ({
  accounts: state.accounts
});

const mapDispatchToProps = dispatch => ({});

const store = connect(mapStateToProps, mapDispatchToProps)(App);
export default store;
