import React, { useEffect, useState } from "react";

import { ButtonSubmit1 } from "./buttons";

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



export {
    ChesGridContainers, 
    InfoContainerMain,
    BigInfoContainer,

}