import { redirect } from "react-router-dom";
export const AuthProvider = {
  isAuthenticated: false,
  username: null,
  login: async function (username) {
    console.log("attempting login");
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    AuthProvider.isAuthenticated = true;
    AuthProvider.username = username;
  },

  logout: async function (username) {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    AuthProvider.isAuthenticated = false;
    AuthProvider.username = null;
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
  console.log("login loader");
  if (AuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

export async function logoutAction() {
  console.log("attempting logout");
  await AuthProvider.logout();
  console.log(AuthProvider.isAuthenticated);
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
