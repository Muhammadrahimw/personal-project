import React from "react";
import {useGetMovieDetailsQuery} from "../../redux/apiSlice";
import {Rate} from "antd";
import {Link, useLocation} from "react-router-dom";

const MovieComponent = () => {
	let {data, isLoading, error} = useGetMovieDetailsQuery(
		useLocation()?.state?.movie.id
	);

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
		<section className="w-[90%] mx-auto mt-12">
			<div className="grid grid-cols-2 gap-6">
				<div
					style={{
						backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.backdrop_path})`,
					}}
					className="w-full h-[25em] rounded-lg bgStyle flex justify-end items-end p-4">
					<a target="_blank" href={data?.homepage}>
						<span className="px-3 py-1 text-gray-300 bg-[#80808094] rounded-md cursor-pointer unded-md backdrop-blur-md text-xl hover:text-white">
							Watch
						</span>
					</a>
				</div>
				<div>
					<h2 className="text-[#ffffff] text-[2.5em]">
						{data?.original_title}
					</h2>
					<p className="text-gray-300">{data?.overview}</p>
					<div className="flex items-center gap-3 mt-5 text-gray-300">
						<p>Langugage</p>
						<div className="px-3 py-1 bg-gray-700 rounded">
							{data?.spoken_languages[0]?.name}
						</div>
					</div>
					<div className="flex items-center gap-3 mt-5 text-gray-300">
						<p>Genres</p>
						<div className="flex items-center gap-2">
							{data?.genres.map((value) => (
								<div
									key={value.id}
									className="px-3 py-1 bg-gray-700 rounded cursor-pointer">
									{value.name}
								</div>
							))}
						</div>
					</div>
					<p className="mt-6 text-gray-300">Minute: {data?.runtime}</p>
					<div className="flex items-center gap-5 mt-6 text-gray-300">
						<p>From: </p>
						<div className="flex items-center gap-2">
							{data?.production_companies.map((value) =>
								value.logo_path ? (
									<div key={value.id} className="flex items-center gap-2">
										<div
											style={{
												backgroundImage: `url(https://image.tmdb.org/t/p/original${value.logo_path})`,
											}}
											className="min-w-[5em] h-[3em] bg-gray-700 bg-center bg-no-repeat bg-contain rounded-lg"></div>
										<p className="text-xs">{value.name}</p>
									</div>
								) : (
									""
								)
							)}
						</div>
					</div>
					<div className="flex items-center gap-2 mt-5 text-gray-300">
						<p className="mr-1">Relase date:</p>
						<p>{data?.release_date.slice(0, 4)} year</p>
						<p>{data?.release_date.slice(5, 7)} month</p>
						<p>{data?.release_date.slice(8, 10)} day</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MovieComponent;
