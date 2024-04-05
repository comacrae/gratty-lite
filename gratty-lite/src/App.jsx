import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import Root from "./routes/root.jsx";
import About from "./routes/about.jsx";
import Profile from "./routes/profile.jsx";
import ErrorPage from "./error.jsx";
import Home from "./routes/home.jsx";
import { ProtectedRoute } from "./components/authenticationGuard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "root",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "profile",
        element: <ProtectedRoute component={Profile} />,
        loader: () => {
          const { auth0 } = useAuth();
          console.log(auth0);
        },
      },
      {
        path: "lists",
        element: <ProtectedRoute component={Profile} />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
