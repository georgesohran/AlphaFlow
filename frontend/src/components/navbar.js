import React from "react";


const TopNavBar = () => {
    return (
        <nav className="bg-slate-900 text-blue-50">
            <div className="max-w-screen-xl items-center 
            flex flex-wrap justify-between mx-auto p-4">
            
                <div className="flex items-center space-x-3">
                    <div>Icon</div>
                    <div>Dashboard</div>
                </div>
                <div className="flex items-center space-x-3">
                    <button className="px-3 py-1
                    outline outline-4 outline-gray-300 rounded-md">Login</button>
                    <button>Register</button>
                </div>
            </div>
        </nav>
    )
}

export default TopNavBar 