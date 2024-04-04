import { withAuthenticationRequired, Auth0Provider } from "@auth0/auth0-react";
import { redirect } from "react-router-dom";
import React from "react";

export const ProtectedRoute = ({ component, ...args }) => {
  const Component = withAuthenticationRequired(component, args);
  return <Component />;
};

export const Auth0ProviderWithRedirectCallback = ({ children, ...props }) => {
  const onRedirectCallback = (appState) => {
    redirect((appState && appState.returnTo) || window.location.pathname);
  };

  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};
