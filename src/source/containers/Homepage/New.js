import { connect } from "react-redux";

import Homepage from "../../components/Homepage/Notes/New";

import { inputProjectTitle, inputProjectDescription, createProject } from "../../actions/projects";

const mapStateToProps = state => ({
  projects: state.projects
});

const mapDispatchToProps = dispatch => ({
  onInputTitle: payload => {
    dispatch(inputProjectTitle(payload));
  },
  onInputDescription: payload => {
    dispatch(inputProjectDescription(payload));
  },
  onCreateProject: data => {
    createProject(dispatch, data);
  }
});

const store = connect(mapStateToProps, mapDispatchToProps)(Homepage);
export default store;
