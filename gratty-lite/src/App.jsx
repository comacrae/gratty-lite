import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useRouteLoaderData,
  Form,
  Link,
} from "react-router-dom";
import Root from "./routes/root.jsx";
import About from "./routes/about.jsx";
import { Login } from "./routes/login.jsx";
import Secret from "./routes/secret.jsx";
import Profile from "./routes/profile.jsx";
import ErrorPage from "./error.jsx";
import Home from "./routes/home.jsx";
import { AuthProvider } from "./auth.jsx";

export async function loginLoader() {
  if (AuthProvider.isAuthenticated) {
    redirect("/");
  }
  return null;
}

async function loginAction({ request }) {
  let formData = await request.formData();
  let username = formData.get("username");

  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  try {
    await AuthProvider.signin(username);
  } catch (error) {
    console.log(error);
    return {
      error: "invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo);
}

function protectedLoader({ request }) {
  if (!AuthProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "root",
    loader: () => {
      return {
        username: AuthProvider.userName,
        isAuthenticated: AuthProvider.isAuthenticated,
      };
    },
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
        element: <Profile />,
        loader: protectedLoader,
      },
      {
        path: "login",
        element: <Login />,
        loader: loginLoader,
        action: loginAction,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
