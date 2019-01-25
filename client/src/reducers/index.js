import { combineReducers } from "redux";
import orderReducer from "./orderReducer";

export default combineReducers({
  order: orderReducer
});
