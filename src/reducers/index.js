import { combineReducers } from "redux";
import lessons from "./lessonReducer";
import courses from "./courseReducer";
import app from "./appReducer";

let reducers = combineReducers({
  lessons,
  courses,
  app,
});

export default reducers;
