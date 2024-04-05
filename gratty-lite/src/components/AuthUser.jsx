import { useAuth0 } from "@auth0/auth0-react";

export const AuthUser = () => {
  const { user } = useAuth0();
  const getUser = () => user;
  return <>{props.children(getUser)}</>;
};
