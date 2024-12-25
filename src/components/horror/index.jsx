import React from "react";
import {useGetPopularMoviesQuery} from "../../redux/apiSlice";
import {Rate} from "antd";

const HorrorComponent = () => {
	const {data, isLoading, error} = useGetPopularMoviesQuery(1);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	console.log(data.results[0]);

	const RatingStars = ({voteAverage}) => {
		// const rating = Math.round();

		return (
			<Rate
				disabled
				allowHalf
				value={voteAverage / 2}
				className="text-base text-[#1d4ed8] "
			/>
		);
	};

	return (
		<section className="w-[90%] mx-auto grid grid-cols-5 gap-4 mt-12">
			{data?.results.map((movie) => (
				<div
					key={movie.id}
					className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<div
						style={{
							backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
						}}
						className="w-full h-[12em] rounded-t-lg bgStyle"></div>
					<div className="px-5 pb-5">
						<div>
							<h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
								{movie.original_title}
							</h5>
						</div>
						<div className="flex items-center mt-2.5 mb-5">
							<div className="flex items-center space-x-1 rtl:space-x-reverse">
								<RatingStars voteAverage={movie.vote_average} />
							</div>
							<span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
								5.0
							</span>
						</div>
						<div className="flex items-center justify-between">
							<span className="text-3xl font-bold text-gray-900 dark:text-white">
								$599
							</span>
							<p className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
								Add to cart
							</p>
						</div>
					</div>
				</div>
			))}
		</section>
	);
};

export default HorrorComponent;
