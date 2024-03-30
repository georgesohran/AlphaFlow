import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();


const TopNavBar = (props) => {

    const navigate = useNavigate()

    const logout = () => {
        fetch('api/logout', {
            method:'POST',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials:'same-origin'
        })
        .then(res => {
            if(res.status == 200){
                navigate('/login')
            } else {
                return
            }
        })
    }

    if(props.authorized) {
        return (
            <nav className="bg-gray-800 text-blue-50 
            w-full sticky top-0 border-gray-700 border-y-2">
                <div className="max-w-screen-xl items-center 
                flex flex-wrap justify-between mx-auto p-4">
                
                    <div className="flex items-center space-x-3">
                        Icon here
                    </div>
                    <div className="flex items-center space-x-3">
                        <TopNavBarButton click={logout} name="Logout"/>
                    </div>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className="bg-gray-800 text-blue-50 
            w-full sticky top-0 border-gray-700 border-y-2">
                <div className="max-w-screen-xl items-center 
                flex flex-wrap justify-between mx-auto p-4">
                
                    <div className="flex items-center space-x-3">
                        <TopNavBarLinkButton link="/" name="Main"/>
                    </div>
                    <div className="flex items-center space-x-3">
                        <TopNavBarLinkButton link="/register" name="Register"/>
                        <TopNavBarLinkButton link="/login" name="Login"/>
                    </div>
                </div>
            </nav>
        )
    } 
}



const TopNavBarLinkButton = (props) => {
    return (
        <Link to={props.link} className="px-3 py-1 outline outline-1 outline-gray-300 rounded-md hover:bg-black ">{props.name}</Link>
    )
}
const TopNavBarButton = (props) => {
    return (
        <button onClick={props.click} className="px-3 py-1 outline outline-1 outline-gray-300 rounded-md hover:bg-black ">{props.name}</button>
    )
}


export default TopNavBar 