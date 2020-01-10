import { connect } from "react-redux";

import NewTask from "../../../components/Homepage/Notes/Project/NewTask";

import {
  inputTaskTitle,
  inputTaskDescription,
  addTask,
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
  onHideAddTask: () => {
    dispatch(hideAddTask());
  },
  onAddTask: data => {
    addTask(dispatch, data);
  }
});

const store = connect(mapStateToProps, mapDispatchToProps)(NewTask);
export default store;
