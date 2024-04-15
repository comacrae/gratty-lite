import { redirect } from "react-router-dom";
import { getUserID } from "./loaderUtils";
export const AuthProvider = {
  isAuthenticated: false,
  username: null,
  userID: null,
  login: async function (username) {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    AuthProvider.isAuthenticated = true;
    AuthProvider.username = username;
    // would have some verification here
    const idResponse = await getUserID(username);
    if (idResponse.id) {
      AuthProvider.userID = idResponse.id;
    } else {
      throw Error("user ID returned from server for given username is null");
    }
  },

  logout: async function (username) {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    AuthProvider.isAuthenticated = false;
    AuthProvider.username = null;
    AuthProvider.userID = null;
  },
};

export async function loginAction({ request }) {
  let formData = await request.formData();
  let username = formData.get("username");
  if (!username) {
    return { error: "You must provide a username to login" };
  }

  try {
    await AuthProvider.login(username);
  } catch (error) {
    return { error: "invalid login attempt" };
  }

  let redirectTo = formData.get("redirectTo");
  return redirect(redirectTo || "/");
}

export async function loginLoader() {
  if (AuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

export async function logoutAction() {
  await AuthProvider.logout();
  return redirect("/");
}

export function protectedLoader(request) {
  if (!AuthProvider.isAuthenticated) {
    let params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return AuthProvider.username;
}
