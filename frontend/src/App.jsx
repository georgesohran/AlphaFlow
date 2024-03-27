import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from "./pages/landing";


function App() {
  return (
    <div>
      <LandingPage />
    </div>  
  )
}

export default App
