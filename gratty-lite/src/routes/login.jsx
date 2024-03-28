import { Form, redirect } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import GrattyNavbar from "../components/navbar";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (username === "user" && password === "password") {
      await login({ username });
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <Container>
      <GrattyNavbar />

      <div>
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </Container>
  );
}
