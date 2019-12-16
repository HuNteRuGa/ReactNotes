import { combineReducers } from "redux";

import accounts from "./accounts";
import projects from "./projects";

const rootReducer = combineReducers({
  accounts,
  projects
});

export default rootReducer;
