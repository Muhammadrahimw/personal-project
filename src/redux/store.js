import {configureStore} from "@reduxjs/toolkit";
import {createApi} from "@reduxjs/toolkit/query/react";
import {setupListeners} from "@reduxjs/toolkit/query";

let api = createApi({
	reducerPath: `api`,
	baseQuery: async ({url, params}) => {
		if (!url) {
			throw new Error("URL parameter is missing in baseQuery!");
		}
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
		addFavourites: builder.mutation({
			queryFn: (info) => {
				let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
				const isFavourite = favourites.some((fav) => fav.id === info.id);
				if (isFavourite) {
					favourites = favourites.filter((fav) => fav.id !== info.id);
				} else {
					favourites.push(info);
				}
				localStorage.setItem("favourites", JSON.stringify(favourites));

				return {data: info};
			},
		}),
		addShops: builder.mutation({
			queryFn: (info) => {
				let shopMovie = JSON.parse(localStorage.getItem("shopMovie")) || [];
				let inShopMovie = shopMovie.some((shop) => shop.id === info.id);
				if (!inShopMovie) {
					shopMovie.push(info);
				}
				localStorage.setItem("shopMovie", JSON.stringify(shopMovie));

				return {data: info};
			},
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
