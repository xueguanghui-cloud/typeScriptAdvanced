import React from "react";
import { RouteObject } from "react-router";
import EditMovie from "../pages/movie/EditMovie";
import AddMovie from "../pages/movie/AddMovie";
import MovieList from "../pages/movie/MovieList";
const Home = React.lazy(() => import("../pages/Home"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  { path: "/home", element: <Home /> },
  { path: "/movie", element: <MovieList /> },
  { path: "/movie/add", element: <AddMovie /> },
  { path: "/movie/edit/:id", element: <EditMovie /> },
];

export default routes;
