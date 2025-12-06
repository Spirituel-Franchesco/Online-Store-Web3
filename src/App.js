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

function App() {
  useEffect(() => {
    console.log("Firebase auth ready:", auth);
  }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />

        <Route path="/register" component={Register} />

        <ProtectedRoute path="/all-products" component={AllProducts} />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
