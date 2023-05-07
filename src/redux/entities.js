import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducers/authSlice";

export default combineReducers({
	auth: authReducer,
});
