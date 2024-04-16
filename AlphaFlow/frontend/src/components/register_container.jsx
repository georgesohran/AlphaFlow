import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { InputField } from "./inputfield"; 
import { ButtonSubmit1 } from "./buttons";

import Cookies from "universal-cookie";
const cookies = new Cookies();


const RegisterContainer = (props) => {

    const username = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const password2 = useRef(null)
    const [detail, setDetail] = useState('')

    const navigate = useNavigate()

    const registerUser = () => {
        fetch('api/register', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials:'same-origin',
            body:JSON.stringify({
                email: email.current.value,
                username: username.current.value,
                password: password.current.value,
                password_repeat: password2.current.value,
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
        p-4 rounded-lg text-center
        mx-auto w-2/4 mb-32 mt-28
        md:w-1/3">
            <div>
                <p className="text-4xl mb-6">Register</p>
            </div>
            <InputField name='username' value={username} type='text'/>
            <InputField name='email' value={email} type='text'/>
            <InputField name='password' value={password} type='password'/>
            <InputField name='password again' value={password2} type='password'/>
            <ButtonSubmit1 text='register' onClick={registerUser}/>
            <p className="mb-3 text-gray-300">{detail}</p>
        </div>
    )
}

export default RegisterContainer