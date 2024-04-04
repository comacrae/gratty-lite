import { useAuth0 } from "@auth0/auth0-react";
export default function Profile() {
  let { user } = useAuth0();
  console.log(user);
  return <p>{new String(user)}</p>;
}
