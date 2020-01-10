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
  ADD_TASK
} from "../../actions/projects/types";

let initialState = {
  inputProjectTitle: "",
  inputProjectDescription: "",
  inputTaskTitle: "",
  inputTaskDescription: "",
  showTasks: true,
  showInProcess: true,
  showDone: true,
  showAddTask: false,
  projects: null
};

const initialShow = {
  showTasks: false,
  showInProcess: false,
  showDone: false
};

export default (state = initialState, action = {}) => {
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
      return { ...state };
    default:
      return { ...state };
  }
};
