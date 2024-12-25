import {useQuery} from "@tanstack/react-query";
import axios from "axios";

let fetchPopularMovies = async () => {
	try {
		const {data} = await axios.get(
			`${import.meta.env.REACT_APP_API_URL}/movie/popular`,
			{
				params: {api_key: import.meta.env.REACT_APP_API_KEY},
			}
		);

		// Agar data yoki results mavjud bo'lmasa, xatolik qaytarish
		if (!data || !data.results) {
			throw new Error("No data found");
		}

		return data; // Kerakli natijalarni qaytarish
	} catch (error) {
		// Xatolikni qaytarish
		throw new Error(error.message);
	}
};

const fetchSearchMovies = async (query) => {
	const {data} = await axios.get(
		`${process.env.REACT_APP_API_URL}/search/movie`,
		{
			params: {
				api_key: process.env.REACT_APP_API_KEY,
				query,
			},
		}
	);
	return data.results;
};

let fetchMovieDetail = async (movieId) => {
	const {data} = await axios.get(
		`${process.env.REACT_APP_API_URL}/movie/${movieId}`,
		{
			params: {api_key: process.env.REACT_APP_API_KEY},
		}
	);
	return data.results;
};

export let usePopularMovies = () => {
	return useQuery({
		queryKey: ["popularMovies"],
		queryFn: fetchPopularMovies,
	});
};

export let useSearchMovies = () => {
	return useQuery([`search`, query], () => fetchSearchMovies(query), {
		enabled: !!query,
	});
};

export const useDetailMovies = (movieId) => {
	return useQuery(["detail", movieId], () => fetchMovieDetail(movieId), {
		enabled: !!movieId,
	});
};
