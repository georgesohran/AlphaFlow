import LandingPage from "./pages/landing"
import LoginPage from "./pages/login"
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link
} from "react-router-dom";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/dashboard" Component={Dashboard} />
        <Route path="/login" Component={LoginPage} />
        <Route path="/register" Component={RegisterPage}/> 
      </Routes>
    </Router>
  );
}

export default App;
