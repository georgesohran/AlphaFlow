import React from "react"
import TopNavBar from '../components/navbar'
import { RegisterContainer } from '../components/info_containers'
import MyFooter from '../components/footer'
import InputField from '../components/inputfield'


const RegisterPage = () => {
    const fields = [
        <InputField name='username'/>,
        <InputField name='email'/>,
        <InputField name='password'/>,
        <InputField name='password again'/>
    ]
    return (
        <div className='bg-gray-900 min-h-screen'>
            <div className="bg-gradient-to-t from-gray-900 to-indigo-800 ">
                <TopNavBar /> 
                <div className='mb-96'>
                    <RegisterContainer fields={fields}/>
                </div>
            </div>
            <MyFooter />
        </div>
    )
}

export default RegisterPage