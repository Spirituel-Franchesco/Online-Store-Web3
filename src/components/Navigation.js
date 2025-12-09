import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebaseConfig";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { currentUser } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
    history.push("/");
  };

  if (
    !currentUser ||
    location.pathname === "/" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  const isActive = (path) => location.pathname === path;

  const changeView = (mode) => {
    const params = new URLSearchParams(location.search);
    params.set("view", mode);

    history.push(`/all-products?${params.toString()}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className={`nav-tab ${isActive("/all-products") ? "active" : ""}`}
          onClick={() => history.push("/all-products")}
        >
          All
        </button>

        <button
          className={`nav-tab ${isActive("/sort-products") ? "active" : ""}`}
          onClick={() => history.push("/sort-products")}
        >
          Sort
        </button>

        <button
          className={`nav-tab ${isActive("/filter-products") ? "active" : ""}`}
          onClick={() => history.push("/filter-products")}
        >
          Categories
        </button>

        {/* Icône panier */}
        <button
          className="nav-icon"
          onClick={() => history.push("/cart")}
          title="Cart"
        >
          🛒
        </button>
      </div>

      <div className="navbar-right">
        {/* cheval = vue carrousel */}
        <button
          className="icon-button"
          onClick={() => changeView("carousel")}
          title="Vue carrousel"
        >
          🐴
        </button>

        {/* carré = vue grille */}
        <button
          className="icon-button"
          onClick={() => changeView("grid")}
          title="Vue grille"
        >
          ▉
        </button>

        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
