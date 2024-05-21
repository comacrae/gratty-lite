import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root.jsx";
import About from "./routes/about.jsx";
import Profile, { profileLoader } from "./routes/profile.jsx";
import ErrorPage from "./error.jsx";
import Home from "./routes/home.jsx";
import Login from "./routes/login.jsx";
import Lists, { listsLoader } from "./routes/lists.jsx";
import List, { listLoader } from "./routes/list.jsx";
import FollowingList, { followingLoader } from "./routes/following.jsx";
import FollowedByList, { followedByLoader } from "./routes/followed-by.jsx";
import {
  AuthProvider,
  loginAction,
  loginLoader,
  logoutAction,
} from "./components/auth.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "root",
    loader: () => {
      return {
        username: AuthProvider.username,
        userID: AuthProvider.userID,
        isAuthenticated: AuthProvider.isAuthenticated,
      };
    },
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        id: "home",
        loader: () => {
          return AuthProvider.isAuthenticated;
        },
        element: <Home />,
      },
      {
        id: "about",
        path: "about",
        element: <About />,
      },
      {
        id: "login",
        path: "login",
        loader: loginLoader,
        action: loginAction,
        element: <Login />,
      },
      {
        id: "profile",
        path: ":userID/profile",
        element: <Profile />,
        loader: profileLoader,
      },

      {
        id: ":userID/lists",
        path: "lists",
        loader: listsLoader,
        element: <Lists />,
      },
      {
        id: "list",
        path: ":userID/lists/:listID",
        loader: listLoader,
        element: <List />,
      },
      {
        id: "followers",
        path: ":userID/following",
        loader: followingLoader,
        element: <FollowingList />,
      },
      {
        id: "followed-by",
        path: ":userID/followed-by",
        loader: followedByLoader,
        element: <FollowedByList />,
      },
    ],
  },
  {
    id: "logout",
    path: "/logout",
    action: logoutAction,
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
