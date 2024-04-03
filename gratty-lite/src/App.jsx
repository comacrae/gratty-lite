import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useRouterLoaderData,
  Form,
  Link,
} from "react-router-dom";
import Root from "./routes/root.jsx";
import About from "./routes/about.jsx";
import Login from "./routes/login.jsx";
import Secret from "./routes/secret.jsx";
import Profile from "./routes/profile.jsx";
import ErrorPage from "./error.jsx";
import Home from "./routes/home.jsx";
import AuthProvider from "./auth.jsx";

async function loginLoader() {
  if (AuthProvider.isAuthenticated) {
    return redirect("/");
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
    AuthProvider.login(username);
  } catch (error) {
    return {
      error: "invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo);
}

function LoginPage() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("username") != null;

  let actionData = useActionData();

  return (
    <div>
      <p>You must log in to view the page at {from}</p>
      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Username: <input name="username" />
        </label>{" "}
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        {actionData && actionData.error ? (
          <p style={{ color: "red" }}>{actionData.error}</p>
        ) : null}
      </Form>
    </div>
  );
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
    loader: () => {
      return { user: AuthProvider.username };
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
      },
      {
        path: "login",
        element: LoginPage,
        loader: loginLoader,
        action: loginAction,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
