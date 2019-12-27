import { connect } from "react-redux";

import Notes from "../../components/Homepage/Notes/Notes";

import { loadProjects, beforeLoadProjects } from "../../actions/projects";

const mapStateToProps = state => ({
  projects: state.projects
});

const mapDispatchToProps = dispatch => ({
  onLoadProjects: () => {
    loadProjects(dispatch);
  },
  onBeforeLoadProjects: () => {
    dispatch(beforeLoadProjects());
  }
});

const store = connect(mapStateToProps, mapDispatchToProps)(Notes);
export default store;
