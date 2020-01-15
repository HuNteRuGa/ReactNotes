import {
  INPUT_PROJECT_TITLE,
  INPUT_PROJECT_DESCRIPTION,
  INPUT_TASK_TITLE,
  INPUT_TASK_DESCRIPTION,
  CREATE_PROJECT,
  BEFORE_LOAD_PROJECTS,
  LOAD_PROJECTS,
  ADD_TASK,
  SHOW_TASKS,
  SHOW_IN_PROCESS,
  SHOW_DONE,
  SHOW_ALL,
  SHOW_ADD_TASK,
  HIDE_ADD_TASK,
  SHOW_EDIT_PROJECT_TITLE,
  SHOW_EDIT_PROJECT_DESCRIPTION,
  SAVE_PROJECT_TITLE,
  SAVE_PROJECT_DESCRIPTION,
  INPUT_EDIT_PROJECT_DESCRIPTION,
  INPUT_EDIT_PROJECT_TITLE,
  SET_OPENED_PROJECT_NUMBER
} from "./types";
import {
  createProjectApi,
  loadProjectsApi,
  addTaskApi,
  saveProjectTitleApi,
  saveProjectDescriptionApi
} from "../../scripts/api/projects";

export const inputProjectTitle = payload => ({
  type: INPUT_PROJECT_TITLE,
  payload: payload
});

export const inputProjectDescription = payload => ({
  type: INPUT_PROJECT_DESCRIPTION,
  payload: payload
});

export const inputTaskTitle = payload => ({
  type: INPUT_TASK_TITLE,
  payload: payload
});

export const inputTaskDescription = payload => ({
  type: INPUT_TASK_DESCRIPTION,
  payload: payload
});

export const beforeLoadProjects = () => ({
  type: BEFORE_LOAD_PROJECTS,
  payload: null
});

export const showTasks = () => ({
  type: SHOW_TASKS,
  paylaod: null
});

export const showInProcess = () => ({
  type: SHOW_IN_PROCESS,
  paylaod: null
});

export const showDone = () => ({
  type: SHOW_DONE,
  paylaod: null
});

export const showAll = () => ({
  type: SHOW_ALL,
  payload: null
});

export const showAddTask = () => ({
  type: SHOW_ADD_TASK,
  paylaod: null
});

export const hideAddTask = () => ({
  type: HIDE_ADD_TASK,
  paylaod: null
});

export const createProject = async (dispatch, data) => {
  const res = await createProjectApi(data);
  dispatch({ type: CREATE_PROJECT, payload: res });
};

export const loadProjects = async dispatch => {
  const res = await loadProjectsApi();
  dispatch({ type: LOAD_PROJECTS, payload: res });
};

export const addTask = async (dispatch, data) => {
  const res = await addTaskApi(data);
  dispatch({ type: ADD_TASK, paylaod: res });
};

export const showEditProjectTitle = () => ({
  type: SHOW_EDIT_PROJECT_TITLE,
  payload: null
});

export const showEditProjectDescription = () => ({
  type: SHOW_EDIT_PROJECT_DESCRIPTION,
  payload: null
});

export const inputEditProjectTitle = data => ({
  type: INPUT_EDIT_PROJECT_TITLE,
  payload: data
});

export const inputEditProjectDescription = data => ({
  type: INPUT_EDIT_PROJECT_DESCRIPTION,
  payload: data
});

export const saveProjectTitle = async (dispatch, data) => {
  const res = await saveProjectTitleApi(data);
  dispatch({ type: SAVE_PROJECT_TITLE, payload: res });
};

export const saveProjectDescription = async (dispatch, data) => {
  const res = await saveProjectDescriptionApi(data);
  dispatch({ type: SAVE_PROJECT_DESCRIPTION, payload: res });
};

export const setOpenedProjectNumber = data => ({
  type: SET_OPENED_PROJECT_NUMBER,
  payload: data
});
