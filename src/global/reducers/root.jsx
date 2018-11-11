import { combineReducers } from "redux";
import reducer from "modules/reducers";

const rootReducer = combineReducers({
  farm: reducer
});

export default rootReducer;
