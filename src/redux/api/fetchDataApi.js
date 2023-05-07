import axios from "axios";
import * as actions from "../actionCreators/apiActions";

const fetchDataApi =
	({ dispatch }) =>
	(next) =>
	async (action) => {
		if (action.type !== actions.apiCallBegan.type) {
			return next(action);
		}

		const { url, method, data, onStart, onSuccess, onError, headers } =
			action.payload;

		if (onStart) {
			dispatch({ type: onStart });
		}

		next(action);

		try {
			const response = await axios.request({
				baseURL: process.env.REACT_APP_ADMIN_API_BASE_URL,
				headers: {
					...headers,
					"Access-Control-Allow-Origin": "*",
					Accept: "application/json, text/plain",
					"Content-Type": "application/json;charset=UTF-8",
				},
				url,
				method,
				data,
			});

			if (response.data) {
				dispatch(actions.apiCallSuccess(response.data));

				if (onSuccess) {
					dispatch({ type: onSuccess, payload: response.data });
				}
			} else {
				dispatch(actions.apiCallFailed("Data Fetching Failed"));
			}
		} catch (error) {
			const errorMessage = error.message || "An error occurred";
			dispatch(actions.apiCallFailed(errorMessage));

			if (onError) {
				dispatch({ type: onError, payload: errorMessage });
			}
		}
	};

export default fetchDataApi;
