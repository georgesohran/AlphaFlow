import React from "react";

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
    return (
        <div className="bg-gray-800 text-white
        p-4 rounded-lg text-center
        mx-auto w-2/4 mb-32 mt-28
        md:w-1/3">
            <div>
                <p className="text-4xl mb-6">Log In</p>
            </div>
            {props.fields}
            <button className="bg-blue-800 text-white
            px-4 py-2 rounded-md
            hover:bg-blue-900">
                login
            </button>
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
    RegisterContainer
}