// src/Pages/Register.js
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
      // Succès → soit on connecte direct, soit on renvoie vers login.
      history.push("/all-products");
    } catch (err) {
      console.error(err);
      setError("Impossible de créer le compte. Vérifie l'email et le mot de passe.");
    }
  };

  return (
    <div className="register-page">
      <h2>Créer un compte</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">S'inscrire</button>
      </form>

      <p>
        Déjà un compte ?{" "}
        <Link to="/">Se connecter</Link>
      </p>
    </div>
  );
}

export default Register;
