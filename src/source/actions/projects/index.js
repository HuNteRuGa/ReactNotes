import { INPUT_PROJECT_TITLE, INPUT_PROJECT_DESCRIPTION, CREATE_PROJECT } from "./types";

export const inputProjectTitle = payload => ({
  type: INPUT_PROJECT_TITLE,
  payload: payload
});

export const inputProjectDescription = payload => ({
  type: INPUT_PROJECT_DESCRIPTION,
  payload: payload
});

export const createProject = async (dispatch, data) => {
  dispatch({ type: CREATE_PROJECT, payload: data });
};
