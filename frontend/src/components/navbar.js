import React from "react";


const TopNavBar = () => {
    return (
        <nav className="bg-gray-800 text-blue-50 
        w-full sticky top-0 border-gray-700 border-y-2">
            <div className="max-w-screen-xl items-center 
            flex flex-wrap justify-between mx-auto p-4">
            
                <div className="flex items-center space-x-3">
                    <div>Icon</div>
                </div>
                <div className="flex items-center space-x-3">
                    <TopNavBarButton name="Register"/>
                    <TopNavBarButton name="Login"/>
                </div>
            </div>
        </nav>
    )
}

const TopNavBarButton = (props) => {
    return (
        <button className="px-3 py-1 outline outline-1 outline-gray-300 rounded-md hover:bg-black ">{props.name}</button>
    )
}

export default TopNavBar 