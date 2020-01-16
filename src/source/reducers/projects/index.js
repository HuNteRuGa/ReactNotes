import {
  INPUT_PROJECT_TITLE,
  INPUT_PROJECT_DESCRIPTION,
  CREATE_PROJECT,
  BEFORE_LOAD_PROJECTS,
  LOAD_PROJECTS,
  INPUT_TASK_TITLE,
  INPUT_TASK_DESCRIPTION,
  SHOW_TASKS,
  SHOW_IN_PROCESS,
  SHOW_DONE,
  SHOW_ALL,
  SHOW_ADD_TASK,
  HIDE_ADD_TASK,
  ADD_TASK,
  SHOW_EDIT_PROJECT_TITLE,
  SHOW_EDIT_PROJECT_DESCRIPTION,
  SAVE_PROJECT_TITLE,
  SAVE_PROJECT_DESCRIPTION,
  INPUT_EDIT_PROJECT_TITLE,
  INPUT_EDIT_PROJECT_DESCRIPTION,
  SET_OPENED_PROJECT_NUMBER
} from "../../actions/projects/types";

const initialState = {
  inputProjectTitle: "",
  inputProjectDescription: "",
  inputTaskTitle: "",
  inputTaskDescription: "",
  inputEditProjectTitle: "",
  inputEditProjectDescription: "",
  showTasks: true,
  showInProcess: true,
  showDone: true,
  showAddTask: false,
  showEditProjectTitle: false,
  showEditProjectDescription: false,
  openedProjectNumber: null,
  projects: null
};

const initialShow = {
  showTasks: false,
  showInProcess: false,
  showDone: false
};

export default (originalState = initialState, action = {}) => {
  const state = { ...originalState };

  let project = null;
  if (state.openedProjectNumber && state.projects[state.openedProjectNumber])
    project = state.projects[state.openedProjectNumber];

  switch (action.type) {
    case INPUT_PROJECT_TITLE:
      return { ...state, inputProjectTitle: action.payload };
    case INPUT_PROJECT_DESCRIPTION:
      return { ...state, inputProjectDescription: action.payload };
    case INPUT_TASK_TITLE:
      return { ...state, inputTaskTitle: action.payload };
    case INPUT_TASK_DESCRIPTION:
      return { ...state, inputTaskDescription: action.payload };
    case SHOW_TASKS:
      return { ...state, ...initialShow, showTasks: true };
    case SHOW_IN_PROCESS:
      return { ...state, ...initialShow, showInProcess: true };
    case SHOW_DONE:
      return { ...state, ...initialShow, showDone: true };
    case SHOW_ALL:
      return { ...state, showDone: true, showTasks: true, showInProcess: true, showAddTask: false };
    case SHOW_ADD_TASK:
      return { ...state, ...initialShow, showTasks: true, showAddTask: true };
    case HIDE_ADD_TASK:
      return { ...state, showAddTask: false };
    case CREATE_PROJECT:
      return { ...state };
    case BEFORE_LOAD_PROJECTS:
      return { ...state, projects: [] };
    case LOAD_PROJECTS:
      return { ...state, projects: action.payload.res };
    case ADD_TASK:
      if (action.payload.res) {
        state.projects[state.openedProjectNumber].task.unshift(action.payload.res);
        return { ...state, showAddTask: false, inputTaskTitle: "", inputTaskDescription: "" };
      } else return { ...state };
    case SHOW_EDIT_PROJECT_TITLE:
      return {
        ...state,
        showEditProjectTitle: true,
        inputEditProjectTitle: project.title
      };
    case SHOW_EDIT_PROJECT_DESCRIPTION:
      return {
        ...state,
        showEditProjectDescription: true,
        inputEditProjectDescription: project.description
      };
    case SAVE_PROJECT_TITLE:
      if (action.payload.res) {
        state.projects[state.openedProjectNumber].title = state.inputEditProjectTitle;
        return { ...state, showEditProjectTitle: false };
      } else return { ...state };
    case SAVE_PROJECT_DESCRIPTION:
      if (action.payload.res) {
        state.projects[state.openedProjectNumber].description = state.inputEditProjectDescription;
        return { ...state, showEditProjectDescription: false };
      } else return { ...state };
    case INPUT_EDIT_PROJECT_TITLE:
      return { ...state, inputEditProjectTitle: action.payload };
    case INPUT_EDIT_PROJECT_DESCRIPTION:
      return { ...state, inputEditProjectDescription: action.payload };
    case SET_OPENED_PROJECT_NUMBER:
      if (!state.projects[action.payload]) return { ...state };
      else return { ...state, openedProjectNumber: action.payload };
    default:
      return { ...state };
  }
};
