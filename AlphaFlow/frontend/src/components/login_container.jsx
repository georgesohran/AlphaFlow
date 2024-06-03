import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { InputField } from "./inputfield"; 
import { ButtonSubmit1 } from "./buttons";

import Cookies from "universal-cookie";
const cookies = new Cookies();


const LoginContainer = () => {

    const username = useRef(null)
    const password = useRef(null)
    const [detail, setDetail] = useState('')

    const navigate = useNavigate()

    const loginUser = () => {
        fetch(`/api/login`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials: 'same-origin',
            body:JSON.stringify({
                username:username.current.value,
                password:password.current.value,
            })
        })
        .then(res => {
            if (res.status == 200){
                navigate('/dashboard') 
            }
            return res.json()
        })
        .then((res_data) => {
            if(res_data.hasOwnProperty('detail')){
                setDetail(res_data.detail)
            }
        })
    }
    
    return (
        <div className="bg-gray-800 text-white
        py-4 rounded-lg text-center
        mx-auto w-3/4 mb-32 mt-28
        md:w-1/3">
            <div>
                <p className="text-4xl mb-6">Log In</p>
            </div>
            <div className="w-auto mb-4">
                <InputField name='username' value={username} type='text'/>
            </div>
            <div className="w-auto mb-4">
                <InputField name='password' value={password} type='password'/>            
            </div>
            <div className="w-48 mx-auto">
                <ButtonSubmit1 text={'login'} onClick={loginUser}/>
            </div>
            <p className="mb-3 text-gray-300">{detail}</p>
        </div>
    )
}

export default LoginContainer