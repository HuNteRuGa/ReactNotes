import { connect } from "react-redux";

import "../../../styles/Homepage/Project/Project.scss";

import Project from "../../../components/Homepage/Notes/Project/Project";

import { loadProjects, beforeLoadProjects, addTask } from "../../../actions/projects";

const mapStateToProps = state => ({
  projects: state.projects
});

const mapDispatchToProps = dispatch => ({
  onLoadProjects: () => {
    loadProjects(dispatch);
  },
  onBeforeLoadProjects: () => {
    dispatch(beforeLoadProjects());
  },
  onAddTask: project => {
    addTask(dispatch, project);
  }
});

const store = connect(mapStateToProps, mapDispatchToProps)(Project);
export default store;
