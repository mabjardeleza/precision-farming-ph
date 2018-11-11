import { combineReducers } from "redux";

import { barnsReducer, barnStatusReducer } from "./barn";
import {
  overviewReducer,
  progressStatusReducer,
  todosReducer,
  dailyReducer
} from "./overview";

export default combineReducers({
  barns: barnsReducer,
  barnStatus: barnStatusReducer,
  overview: overviewReducer,
  progressStatus: progressStatusReducer,
  todos: todosReducer,
  daily: dailyReducer
});
