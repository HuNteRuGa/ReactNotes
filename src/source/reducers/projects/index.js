import {
  INPUT_PROJECT_TITLE,
  INPUT_PROJECT_DESCRIPTION,
  CREATE_PROJECT,
  BEFORE_LOAD_PROJECTS,
  LOAD_PROJECTS
} from "../../actions/projects/types";

let initialState = {
  inputProjectTitle: "",
  inputProjectDescription: "",
  projects: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case INPUT_PROJECT_TITLE:
      return { ...state, inputProjectTitle: action.payload };
    case INPUT_PROJECT_DESCRIPTION:
      return { ...state, inputProjectDescription: action.payload };
    case CREATE_PROJECT:
      return { ...state };
    case BEFORE_LOAD_PROJECTS:
      return { ...state, projects: [] };
    case LOAD_PROJECTS:
      return { ...state, projects: action.payload.res };
    default:
      return { ...state };
  }
};
