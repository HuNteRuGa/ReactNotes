import {
  INPUT_PROJECT_TITLE,
  INPUT_PROJECT_DESCRIPTION,
  CREATE_PROJECT
} from "../../actions/projects/types";

let initialState = {
  inputProjectTitle: "",
  inputProjectDescription: ""
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case INPUT_PROJECT_TITLE:
      return { ...state, inputProjectTitle: action.payload };
    case INPUT_PROJECT_DESCRIPTION:
      return { ...state, inputProjectDescription: action.payload };
    case CREATE_PROJECT:
      return { ...state };
    default:
      return { ...state };
  }
};
