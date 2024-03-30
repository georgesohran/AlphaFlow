import LandingPage from "./pages/landing";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Dashboard from "./pages/dashboard";
import { getAuth } from "./util";

import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';



function App() {

  const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<LandingPage/>} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="dashboard" element={<Dashboard/>}/>
    </Route>
    )
  )

  return (
      <RouterProvider router={router}/>
  )
}

export default App
