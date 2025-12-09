import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";

const Register = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      history.push("/all-products");
    } catch (err) {
      console.error(err);
      setError(
        "Impossible de créer le compte. Vérifie l'email et le mot de passe."
      );
    }
  };

  const goToLogin = () => {
    history.push("/");
  };

  return (
    <div className="register-page">
      {/* Logo centré */}
      <div className="register-logo">
        <img src={"logo192.png"} alt="Online Store Logo" />
      </div>

      {/* Carte */}
      <div className="register-card">
        <h2>Register</h2>

        {error && <p className="register-error">{error}</p>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Boutons alignés à droite */}
          <div className="register-actions">
            <button type="submit" className="btn btn-primary">
              Register
            </button>

            <button type="button" className="btn btn-secondary" onClick={goToLogin}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
