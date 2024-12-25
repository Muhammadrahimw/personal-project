import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/home";
import LayoutComp from "./components/layout";
import Movie from "./pages/movie";
import Favourite from "./pages/favourite";
import Shop from "./pages/shop";

let router = createBrowserRouter([
	{
		path: `/`,
		element: <LayoutComp />,
		children: [
			{
				path: `/`,
				element: <Home />,
			},
			{
				path: `/movie/:id`,
				element: <Movie />,
			},
			{
				path: `/favourites`,
				element: <Favourite />,
			},
			{
				path: `/shop`,
				element: <Shop />,
			},
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
