import { combineReducers } from "redux";
import auth from "./reducer";

const rootReducer = combineReducers({
  user: auth,
});
export default rootReducer;
