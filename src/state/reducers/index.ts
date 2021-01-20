import { combineReducers } from "redux";
import repositoriesReducer from "./repostitoryReducers";

const reducers = combineReducers({
  repositories: repositoriesReducer,
});

export default reducers;
