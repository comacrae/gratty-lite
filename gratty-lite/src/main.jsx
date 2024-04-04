import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0ProviderWithRedirectCallback } from "./components/authenticationGuard.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0ProviderWithRedirectCallback
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />
    </Auth0ProviderWithRedirectCallback>
  </React.StrictMode>
);
