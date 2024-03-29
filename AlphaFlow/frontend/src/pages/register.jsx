import React from "react"
import TopNavBar from '../components/navbar'
import { RegisterContainer } from '../components/info_containers'
import MyFooter from '../components/footer'



const RegisterPage = () => {
    return (
        <div className='bg-gray-900 min-h-screen'>
            <div className="bg-gradient-to-t from-gray-900 to-indigo-800 ">
                <TopNavBar authorized={false}/> 
                <div className='mb-96'>
                    <RegisterContainer/>
                </div>
            </div>
            <MyFooter />
        </div>
    )
}

export default RegisterPage