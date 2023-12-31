import {combineReducers} from "redux";
import auth from "./auth";
import message from "./message";
import product from "./product";
import user from "./user";
import order from "./order";

export default combineReducers({
   auth,
   message,
   product,
   user,
   order
});