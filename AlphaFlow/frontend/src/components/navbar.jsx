import React from "react";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import { Link } from "react-router-dom";



const TopNavBar = () => {
    let loginp = <LoginPage />
    let registp = <RegisterPage />

    return (
        <nav className="bg-gray-800 text-blue-50 
        w-full sticky top-0 border-gray-700 border-y-2">
            <div className="max-w-screen-xl items-center 
            flex flex-wrap justify-between mx-auto p-4">
            
                <div className="flex items-center space-x-3">
                    <TopNavBarButton link="/" name="Main"/>
                </div>
                <div className="flex items-center space-x-3">
                    <TopNavBarButton link="/register" name="Register"/>
                    <TopNavBarButton link="/login" name="Login"/>
                </div>
            </div>
        </nav>
    )
}

const TopNavBarButton = (props) => {
    return (
        <Link to={props.link} className="px-3 py-1 outline outline-1 outline-gray-300 rounded-md hover:bg-black ">{props.name}</Link>
    )
}

export default TopNavBar 