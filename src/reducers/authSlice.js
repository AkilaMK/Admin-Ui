import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../redux/actionCreators/apiActions";
import jwtDecode from "jwt-decode";

const loadStoredAuthData = () => {
	const jwtToken = localStorage.getItem("access_token");
	if (jwtToken) {
		const decodedToken = jwtDecode(jwtToken);
		return {
			name: decodedToken.sub,
		};
	}
	return null;
};

const slice = createSlice({
	name: "auth",
	initialState: {
		user: loadStoredAuthData(),
		loading: false,
		error: null,
	},
	reducers: {
		loginRequest: (state, action) => {
			state.loading = true;
		},
		loginSuccess: (state, action) => {
			const decodedToken = jwtDecode(action.payload.access_token);
			localStorage.setItem("access_token", action.payload.access_token);

			state.user = {
				name: decodedToken.sub,
			};

			state.loading = false;
			state.error = null;
		},
		loginFailed: (state, action) => {
			state.user = null;
			state.loading = false;
			state.error = action.payload;
		},
		logout: (state, action) => {
			localStorage.removeItem("access_token");
			state.user = null;
		},
	},
});

export const { loginRequest, loginSuccess, loginFailed, logout } =
	slice.actions;

export default slice.reducer;

// Action Creator
export const loginUser = (email, password) => {
	const credentials = btoa(`${email}:${password}`);
	return apiCallBegan({
		url: "/auth/login",
		method: "POST",
		onStart: loginRequest.type,
		onSuccess: loginSuccess.type,
		onError: loginFailed.type,
		headers: {
			Authorization: `Basic ${credentials}`,
		},
	});
};

// Action Logout
export const logoutUser = () => (dispatch) => {
	dispatch(slice.actions.logout());
};

// Selectors
export const getUser = (state) => {
	return state.entities.auth.user;
};
export const isLoading = (state) => state.entities.auth.loading;
export const getError = (state) => state.entities.auth.error;
