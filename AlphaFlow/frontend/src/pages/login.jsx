import React, { useEffect } from 'react'
import TopNavBar from '../components/navbar'
import LoginContainer from '../components/login_container'
import MyFooter from '../components/footer'

import { getAuth } from '../util'

import { useNavigate } from 'react-router-dom'


const LoginPage = () => {

    const navigate = useNavigate()

    //some extra protection
    useEffect(() => {
        getAuth().then((auth) => {
            if(auth) {
                navigate('/dashboard')
            }
        })
    }, [])

    return (
        <div className='min-h-screen bg-gray-900'>
            <div className='bg-gradient-to-t from-gray-900 to-indigo-800 '>
                <TopNavBar authorized={false}/>
                <div className='mb-96'>
                    <LoginContainer />
                </div>
            </div>
            <MyFooter text='some text'/>
        </div>
        
    )
}

export default LoginPage


