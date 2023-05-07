import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import fetchDataApi from "./api/fetchDataApi";
import reducer from "./reducer";

const createStore = () => {
	return configureStore({
		reducer,
		middleware: [...getDefaultMiddleware(), fetchDataApi],
	});
};

export default createStore;
