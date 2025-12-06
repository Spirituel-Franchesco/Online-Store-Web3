import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = async () => {
    await signOut(auth);
    history.push("/");
  };

  if (!currentUser) return null; 

  return (
    <nav className="navbar">
      <span className="navbar-logo">Online Store</span>

      <div className="navbar-links">
        <Link to="/all-products">Tous les produits</Link>
        <Link to="/filter-products">Filtrer</Link>
        <Link to="/sort-products">Trier</Link>
        <Link to="/cart">Panier</Link>
        {/* plus tard : <Link to="/cart">Panier</Link> */}
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
    </nav>
  );
};

export default Navigation;
