import React from 'react'
import TopNavBar from '../components/navbar'
import { LoginContainer, BigInfoContainer, ChesGridContainers, InfoContainerMain} from '../components/info_containers'
import MyFooter from '../components/footer'

const LoginPage = () => {
    const fields = [
        <input />
    ]
    return (
        <div className='min-h-screen bg-gray-900'>
            <div className='bg-gradient-to-t from-gray-900 from-20% to-indigo-800 '>
                <TopNavBar />
                <div className='mb-96'>
                    <LoginContainer fields={fields}/>
                </div>
                <MyFooter text='some text'/>
            </div>
        </div>
        
    )
}

export default LoginPage