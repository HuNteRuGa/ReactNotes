import { connect } from "react-redux";

import Homepage from "../../components/Homepage/Homepage";

const mapStateToProps = state => ({
  accounts: state.accounts
});

const mapDispatchToProps = dispatch => ({});

const store = connect(mapStateToProps, mapDispatchToProps)(Homepage);
export default store;
