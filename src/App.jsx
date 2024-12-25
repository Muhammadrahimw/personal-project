import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/home";
import LayoutComp from "./components/layout";
import Movie from "./pages/movie";

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
		],
	},
]);

const App = () => {
	return <RouterProvider router={router} />;
};

export default App;
