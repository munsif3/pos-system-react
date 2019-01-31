import { combineReducers } from "redux";
import orderReducer from "./orderReducer";
import itemReducer from "./itemReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  order: orderReducer,
  item: itemReducer,
  errors: errorReducer,
  auth: authReducer
});
