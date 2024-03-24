import React from 'react'
import TopNavBar from '../components/navbar'
import { LoginContainer } from '../components/info_containers'
import MyFooter from '../components/footer'
import InputField from '../components/inputfield'

const LoginPage = () => {
    const fields = [
        <InputField name='username'/>,
        <InputField name='password'/>
    ]
    return (
        <div className='min-h-screen bg-gray-900'>
            <div className='bg-gradient-to-t from-gray-900 to-indigo-800 '>
                <TopNavBar />
                <div className='mb-96'>
                    <LoginContainer fields={fields}/>
                </div>
            </div>
            <MyFooter text='some text'/>
        </div>
        
    )
}

export default LoginPage


