import React, {useEffect, useState} from "react";
import {
	useAddFavouritesMutation,
	useAddShopsMutation,
	useGetPopularMoviesQuery,
} from "../../redux/apiSlice";
import {Rate} from "antd";
import {IoHeart, IoHeartOutline} from "react-icons/io5";
import {Link} from "react-router-dom";

const ComedyComponent = () => {
	let {isLoading, error} = useGetPopularMoviesQuery(1);
	let [addFavourites] = useAddFavouritesMutation();
	let [favourite, setFavourite] = useState([]);
	let [addShops] = useAddShopsMutation();
	let [shop, setShop] = useState([]);
	let [page, setPage] = useState([1, 2, 3]);
	let allData = [];

	let allDataFunc = (pages) => {
		pages.forEach((page) => {
			let {data} = useGetPopularMoviesQuery(page);
			if (data) {
				allData = [...allData, ...data.results];
			}
		});
		return allData;
	};

	allDataFunc(page);

	useEffect(() => {
		try {
			const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
			setFavourite(favourites);
		} catch (e) {
			console.error("Error parsing favourites from localStorage", e);
			setFavourite([]);
		}
	}, []);

	let favouriteFunc = async (movie) => {
		let updatedFavourites = [...favourite];
		const movieExists = updatedFavourites.some((fav) => fav.id === movie.id);

		if (movieExists) {
			updatedFavourites = updatedFavourites.filter(
				(fav) => fav.id !== movie.id
			);
		} else {
			updatedFavourites.push(movie);
		}

		try {
			await addFavourites(movie);
			setFavourite(updatedFavourites);
			localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
		} catch (e) {
			console.error("Error updating favourites:", e);
		}
	};

	let shopFunc = async (movie) => {
		let updatedShops = [...shop];
		const movieExists = updatedShops.some((fav) => fav.id === movie.id);

		if (movieExists) {
			updatedShops = updatedShops.filter((fav) => fav.id !== movie.id);
		} else {
			updatedShops.push(movie);
		}

		try {
			await addShops(movie);
			setShop(updatedShops);
			localStorage.setItem("shopMovie", JSON.stringify(updatedShops));
		} catch (e) {
			console.error("Error updating shopMovie:", e);
		}
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	const RatingStars = ({voteAverage}) => {
		return (
			<Rate
				disabled
				allowHalf
				value={voteAverage / 2}
				className="custom-rate text-base text-[#1d4ed8]"
			/>
		);
	};

	return (
		<section className="w-[90%] mx-auto mt-8">
			<h2 className="text-[2.5em] text-white">Comedy</h2>
			<div className="grid grid-cols-5 gap-4 mt-4 max-[1380px]:text-sm tr max-[1240px]:text-xs max-[1080px]:text-sm max-[1080px]:grid-cols-4 max-[980px]:text-xs max-[850px]:grid-cols-3 max-[850px]:text-sm max-[720px]:text-xs max-sm:text-[0.55em] max-[480px]:text-[0.35em] max-[380px]:grid-cols-2 max-[380px]:text-[0.55em]">
				{allData?.map((movie) =>
					movie.genre_ids.includes(35) ? (
						<div
							key={movie.id}
							className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
							<Link to={`/movie/${movie.id}`} state={{movie}}>
								<div
									style={{
										backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
									}}
									className="w-full h-[12em] rounded-t-lg bgStyle"></div>
							</Link>
							<div className="px-5 pb-5">
								<div>
									<h5 className="mt-2 text-xl font-semibold tracking-tight text-gray-900 h dark:text-white">
										{movie.original_title.slice(0, 20)}
									</h5>
								</div>
								<div className="flex items-center mt-2.5 mb-5">
									<div className="flex items-center">
										<RatingStars voteAverage={movie.vote_average} />
									</div>
									<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
										{(movie.vote_average / 2).toFixed(1)}
									</span>
								</div>
								<div className="flex items-center justify-between gap-4">
									<div
										onClick={() => shopFunc(movie)}
										className="flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-[0.5em] cursor-pointer hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 max-sm:py-4">
										Add to cart
									</div>
									<div
										onClick={() => favouriteFunc(movie)}
										className="text-white w-[35%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[0.5em] text-sm px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer flex justify-center items-center max-sm:py-4">
										{favourite?.some((fav) => fav.id === movie.id) ? (
											<IoHeart className="text-3xl" />
										) : (
											<IoHeartOutline className="text-3xl" />
										)}
									</div>
								</div>
							</div>
						</div>
					) : (
						""
					)
				)}
			</div>
		</section>
	);
};

export default ComedyComponent;
