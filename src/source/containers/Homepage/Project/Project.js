import { connect } from "react-redux";

import "../../../styles/Homepage/Project/Project.scss";

import Project from "../../../components/Homepage/Notes/Project/Project";

import {
  inputTaskTitle,
  inputTaskDescription,
  loadProjects,
  beforeLoadProjects,
  addTask,
  showTasks,
  showInProcess,
  showDone,
  showAll,
  showAddTask,
  hideAddTask,
  showEditProjectTitle,
  showEditProjectDescription,
  saveProjectTitle,
  saveProjectDescription,
  inputEditProjectTitle,
  inputEditProjectDescription,
  setOpenedProjectNumber
} from "../../../actions/projects";

const mapStateToProps = state => ({
  projects: state.projects
});

const mapDispatchToProps = dispatch => ({
  onInputTaskTitle: payload => {
    dispatch(inputTaskTitle(payload));
  },
  onInputTaskDescription: payload => {
    dispatch(inputTaskDescription(payload));
  },
  onShowTasks: () => {
    dispatch(showTasks());
  },
  onShowInProcess: () => {
    dispatch(showInProcess());
  },
  onShowDone: () => {
    dispatch(showDone());
  },
  onShowAll: () => {
    dispatch(showAll());
  },
  onShowAddTask: () => {
    dispatch(showAddTask());
  },
  onHideAddTask: () => {
    dispatch(hideAddTask());
  },
  onLoadProjects: () => {
    loadProjects(dispatch);
  },
  onBeforeLoadProjects: () => {
    dispatch(beforeLoadProjects());
  },
  onAddTask: project => {
    addTask(dispatch, project);
  },
  onShowEditProjectTitle: () => {
    dispatch(showEditProjectTitle());
  },
  onShowEditProjectDescription: () => {
    dispatch(showEditProjectDescription());
  },
  onSaveProjectTitle: data => {
    saveProjectTitle(dispatch, data);
  },
  onSaveProjectDescription: data => {
    saveProjectDescription(dispatch, data);
  },
  onInputEditProjectTitle: data => {
    dispatch(inputEditProjectTitle(data));
  },
  onInputEditProjectDescription: data => {
    dispatch(inputEditProjectDescription(data));
  },
  onSetOpenedProjectNumber: data => {
    dispatch(setOpenedProjectNumber(data));
  }
});

const store = connect(mapStateToProps, mapDispatchToProps)(Project);
export default store;
