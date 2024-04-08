import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";
import SchedulePage from "./pages/schedule";

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { useEffect } from "react";

import Cookies from "universal-cookie";
const cookies = new Cookies()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<LandingPage/>} />
      <Route path="login" element={<LoginPage />}/> <Route path="static/login" element={<LoginPage />}/>
      <Route path="register" element={<RegisterPage/>}/> <Route path="static/register" element={<RegisterPage />} />
      <Route path="dashboard" element={<Dashboard/>}/> <Route path="static/dashboard" element={<Dashboard/>}/>
      <Route path="schedule" element={<SchedulePage/>}/> <Route path="static/schedule" element={<SchedulePage/>}/>
    </Route>
  )
)


function App() {

  return (
      <RouterProvider router={router}/>
  )
}

export default App
