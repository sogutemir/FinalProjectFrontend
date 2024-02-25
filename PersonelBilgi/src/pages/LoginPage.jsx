import React, {useState} from "react";
import { loginUser } from "/src/api/Login";
import Cookies from "js-cookie";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
    event.preventDefault();
    await loginUser(username, password);
    if (Cookies.get("user_token")) {
      window.location.reload();
    }
  }

  return (
    <>
      <form onSubmit={handleLogin} className="login-form-controller">
        <div className="login-field">
          <label className="login-label">Username</label>
          <div className="login-control">
            <input
              className="login-input"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div className="login-field">
          <label className="login-label">Password</label>
          <div className="login-control">
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <button className="login-button">Sign in</button>
      </form>
    </>
  );
}

export default LoginPage;