import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from "react-router-dom";
import { useState } from "react";


const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <LoginPage/>
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
])


function App() {
  const [csrf, setCsrf] = useState('')
  const [isAuthenticated, setAuth] = useState(false)

  const getCSRF = () => {
    fetch("/api/csrf/", {
      credentials: "same-origin",
    })
    .then((res) => {
      let csrfToken = res.headers.get("X-CSRFToken")
      setCsrf(csrfToken)
      console.log(csrfToken)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  return (
    <div>
      <RouterProvider router={router}/>
    </div>  
  )
}

export default App
