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
  return (
    <div>
      <RouterProvider router={router}/>
    </div>  
  )
}

export default App
