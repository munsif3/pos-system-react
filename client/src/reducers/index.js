import { combineReducers } from "redux";
import orderReducer from "./orderReducer";
import itemReducer from "./itemReducer";

export default combineReducers({
  order: orderReducer,
  item: itemReducer
});
