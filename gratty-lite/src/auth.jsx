"use strict";

export const AuthProvider = {
  isAuthenticated: false,
  userName: null,

  async signin(username) {
    await new Promise((r) => setTimeout(r, 500));
    AuthProvider.isAuthenticated = true;
    AuthProvider.userName = username;
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500));
    auth.isAuthenticated = false;
    auth.userName = "";
  },
};
