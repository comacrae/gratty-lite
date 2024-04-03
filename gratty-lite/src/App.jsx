import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root.jsx";
import About from "./routes/about.jsx";
import Login from "./routes/login.jsx";
import Secret from "./routes/secret.jsx";
import Profile from "./routes/profile.jsx";
import ErrorPage from "./error.jsx";
import Home from "./routes/home.jsx";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/protectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "secret",
        element: <Secret />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
