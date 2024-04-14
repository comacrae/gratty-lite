import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root.jsx";
import About from "./routes/about.jsx";
import Profile, { profileLoader } from "./routes/profile.jsx";
import ErrorPage from "./error.jsx";
import Home from "./routes/home.jsx";
import Login from "./routes/login.jsx";
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
      return { username: AuthProvider.username, userID: AuthProvider.userID };
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
        path: "profile",
        element: <Profile />,
        loader: profileLoader,
      },

      {
        id: "lists",
        path: "lists",
        element: <Profile />,
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
