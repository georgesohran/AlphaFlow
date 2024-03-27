import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./inputfield";

import Cookies from "universal-cookie";
const cookies = new Cookies();


const InfoContainerMain = (props) => {
    return (
        <div className="bg-gray-800 text-white
        p-4 rounded-lg
        mx-auto w-3/4 my-56
        md:w-2/4
        ">
            <p className="text-center text-4xl">
                {props.heading}
            </p>
            <br />
            <p className="text-center whitespace-pre-line">
                {props.text}
            </p>
        </div>  
    )
}



const InfoContainer = (props) => {
    return (
        <div className="text-white bg-gray-800 
        m-2 h-auto p-4 rounded ">
            <p className="whitespace-pre-line">
                {props.text}
            </p>
        </div>
    )
}



const MultiContainer = (props) => {
    return (
        <div className="text-white text-center bg-gray-800 rounded-md  
        my-2 m-2 h-auto p-4 mx-8 md:w-1/4 md:mx-4 md:my-28 ">
            <p className="text-4xl p-2 bg-gray-700 rounded-md">{props.title}</p>
            <div className="divide-y divide-solid divide-gray-600">
                <p className="mt-2 mb-2">{props.description}</p>
                <div className="mt-2 text-left mx-12 text-gray-300 ">
                    {
                        props.items?
                        (
                            props.items.map((item, index) => (
                                <div className="list-item" key={index}>{item.contents}</div>
                            ))
                        )
                        :
                        (<div className="list-item">no items</div>)
                    }
                </div>
            </div>
                        
        </div>
    )
}



const ChesGridContainers = (props) => {
    let infoContainers = []

    let count = 0
    props.texts.forEach(text => {
        if (count == 0) {
            infoContainers.push(<InfoContainer text={text}/>)
            count = 1
        }
        else {
            infoContainers.push(
                    <div className="row-auto"></div>,
                    <div className="row-auto"></div>,
                    <InfoContainer text={text}/>
                )
            count = 0
        }
    })

    return (
        <div className="md:mx-32 lg:mx-64 my-32">
            <div className="grid grid-cols-2 ">
                {infoContainers}
            </div>
        </div>
    )
}


const BigInfoContainer = (props) => {
    return (
        <div className="bg-gray-800 text-white rounded-md 
        p-8 mx-8 my-32 text-xl text-center md:mx-32 lg:mx-64">
            <p>{props.text}</p>
            <br />
            <button className="bg-blue-700 rounded-md p-2 hover:bg-blue-900">Some button</button>
        </div>
    )
}



const LoginContainer = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [detail, setDetail] = useState('')
    
    const navigate = useNavigate()

    const loginUser = async(e) => {
        e.preventDefault()

        let res = await fetch(`/api/login`, {
            method:'POST',
            headers:{
                'Content-Type': 'aplication/json',
                "X-CSRFToken": cookies.get("csrftoken"),
            },
            credentials: "same-origin",
            body:JSON.stringify({
                username:username,
                password:password
            })
        })
        let res_data = await res.json()
        setDetail(res_data.detail)
        return navigate('/dashboard')
    }
    
    return (
        <div className="bg-gray-800 text-white
        p-4 rounded-lg text-center
        mx-auto w-2/4 mb-32 mt-28
        md:w-1/3">
            <div>
                <p className="text-4xl mb-6">Log In</p>
            </div>
            <InputField name='username' value={username} change={setUsername} type='text'/>
            <InputField name='password' value={password} change={setPassword} type='password'/>
            <button onClick={loginUser} className="bg-blue-800 text-white
            px-4 py-2 rounded-md
            hover:bg-blue-900">
                login
            </button>
            <p className="mb-3 text-gray-300">{detail}</p>
        </div>
    )
}
const RegisterContainer = (props) => {
    return (
        <div className="bg-gray-800 text-white
        p-4 rounded-lg text-center
        mx-auto w-2/4 mb-32 mt-28
        md:w-1/3">
            <div>
                <p className="text-4xl mb-6">Register</p>
            </div>
            {props.fields}
            <button className="bg-blue-800 text-white
            px-4 py-2 rounded-md
            hover:bg-blue-900">
                register
            </button>
        </div>
    )
}

export {
    ChesGridContainers, 
    InfoContainerMain,
    BigInfoContainer,
    LoginContainer,
    RegisterContainer,
    MultiContainer
}