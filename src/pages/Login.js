import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";

const Login = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      history.push("/all-products");
    } catch (err) {
      console.error(err);
      setError("Email ou mot de passe invalide.");

      const wantsRegister = window.confirm(
        "Wrong credentials, Create an account ?"
      );
      if (wantsRegister) {
        history.push("/register");
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-logo">
        <img src={"logo192.png"} alt="Online Store logo" />
      </div>

      <div className="login-card">
        <h2>Log In</h2>

        {error && <p className="login-error">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              value={email}
              placeholder="Ex: LeSpirituel@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="login-actions">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>

            <Link to="/register">
              <button type="button" className="btn btn-secondary">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
