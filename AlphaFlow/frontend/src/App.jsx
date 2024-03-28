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

  const getSession = () => {
    fetch("/api/session/", {
      credentials: "same-origin",
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      if (data.isAuthenticated) {
        this.setState({isAuthenticated: true})
      } else {
        this.setState({isAuthenticated: false})
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  return (
    <RouterProvider router={router} /> 
  )
}

export default App
