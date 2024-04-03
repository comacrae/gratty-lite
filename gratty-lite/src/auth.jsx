export default function AuthProvider() {
  let isAuthenticated = false;
  let username = null;

  async function signin(username) {
    await new Promise((r) => setTimeout(r, 500));
    isAuthenticated = true;
    username = username;
  }
  async function signout(username) {
    await new Promise((r) => setTimeout(r, 500));
    isAuthenticated = true;
    username = "";
  }
}
