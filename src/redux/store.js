import {configureStore} from "@reduxjs/toolkit";
import {createApi} from "@reduxjs/toolkit/query/react";
import {setupListeners} from "@reduxjs/toolkit/query";

let api = createApi({
	reducerPath: `api`,
	baseQuery: async ({url, params}) => {
		const baseUrl = import.meta.env.VITE_APP_API_URL;
		const apiKey = import.meta.env.VITE_APP_API_KEY;

		const queryParams = new URLSearchParams(params);
		queryParams.set("api_key", apiKey);

		const response = await fetch(`${baseUrl}${url}?${queryParams.toString()}`);
		const json = await response.json();

		if (!response.ok) {
			throw new Error(`HTTP Error! Status: ${response.status}`);
		}

		return {data: json};
	},

	endpoints: (builder) => ({
		getPopularMovies: builder.query({
			query: (page = 1) => ({
				url: `/movie/popular`,
				params: {page},
			}),
		}),

		searchMovies: builder.query({
			query: (query) => ({url: `/search/movie`, params: {query}}),
		}),
		getMovieDetails: builder.query({
			query: (movieId) => ({url: `/movie/${movieId}`, params: {}}),
		}),
	}),
});

const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export {store, api};
