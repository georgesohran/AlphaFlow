import React from 'react'
import TopNavBar from '../components/navbar'
import { LoginContainer, BigInfoContainer, ChesGridContainers, InfoContainerMain} from '../components/info_containers'
import MyFooter from '../components/footer'

const LoginPage = () => {
    const fields = [
        <InputField name='username'/>,
        <InputField name='password'/>
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


const InputField = (props) => {
    return (
        <div className='mb-4'>
            <input type='text' placeholder={props.name} name={props.name} 
            className='rounded-md p-1 text-gray-200 bg-gray-700 
            hover:bg-gray-600
            focus:outline-none focus:ring focus:border-blue-300 focus:bg-gray-600
            '/>
        </div>
        
    )
}