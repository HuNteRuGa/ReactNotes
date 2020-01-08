import { connect } from "react-redux";

import Tasks from "../../../components/Homepage/Notes/Project/Tasks";

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
  hideAddTask
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
  }
});

const store = connect(mapStateToProps, mapDispatchToProps)(Tasks);
export default store;
