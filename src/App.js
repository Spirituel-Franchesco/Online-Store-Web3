import { useEffect } from "react";
import { auth } from "./Firebase/firebaseConfig";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllProducts from "./pages/AllProducts";
import ProtectedRoute from "./ProtectedRoute";
import ProductDetails from "./pages/ProductDetails";
import FilterProducts from "./pages/FilterProducts";
import SortProducts from "./pages/SortProducts";
import Navbar from "./components/Navbar";

const App = () => {

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Login} />

        <Route path="/register" component={Register} />

        <ProtectedRoute path="/all-products" component={AllProducts} />

        <ProtectedRoute path="/product/:id" component={ProductDetails} />

        <ProtectedRoute path="/filter-products" component={FilterProducts} />

        <ProtectedRoute path="/sort-products" component={SortProducts} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
