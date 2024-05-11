import React, { useEffect, useState } from "react";
import { DateTime, Info } from "luxon";
import { getDaysInMonth, formatTwoDigits } from "../util";


const InputField = (props) => {
    return (
        <div className="mb-4">
            <input type={props.type} ref={props.value} placeholder={props.name} 
            className="rounded-md p-1 text-gray-200 bg-gray-700 
            hover:bg-gray-600
            focus:outline-none focus:ring focus:border-blue-300 focus:bg-gray-600
            "/>
        </div>
        
    )
}



const TimeInputField = (props) => {
    const [opened, setOpened] = useState(false)
    return (
        <div className="my-1 relative flex flex-row gap-1">
            <input value={props.value} placeholder="hh:mm" onFocus={() => {setOpened(true)}}
            onChange={(ev) => {props.changeValue(ev.target.value)}}
            className="rounded-md p-1 text-gray-200 bg-gray-700 w-24
            focus:outline-none focus:ring-1 focus:border-blue-300 focus:bg-gray-600
            "/>
            <button className="size-9 p-1 bg-gray-700 rounded-md"
            onClick={() => {setOpened(!opened)}}>
                <svg viewBox="0 0 24 24">
                    <path fill="#9ca3af" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                    <path fill="#9ca3af" d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                </svg>
            </button>
            <div className="absolute flex flex-row justify-around h-36 bg-gray-700 border-gray-800 pr-2 rounded-md w-32 top-10 z-10" 
            style={{display:opened? 'flex': 'none'}}>
                <div className="flex flex-col overflow-y-scroll w-20">
                    {Array.from({length:24}).map((val, index) => (
                        <button className="rounded hover:bg-gray-600"
                        onClick={() => {
                            props.changeValue(`${formatTwoDigits(index)}:${props.value.split(':')[1]}`)
                            setOpened(false)
                        }}>{index}</button>
                    ))}
                </div>
                <div className="flex flex-col">
                    {Array.from({length:6}).map((val, index) => (
                        <button className="px-1 rounded hover:bg-gray-600"
                        onClick={() => {
                            props.changeValue(`${props.value.split(':')[0]}:${index}0`)
                            setOpened(false)
                        }}>{index}0</button>
                    ))}
                </div>
            </div>
        </div>
    )
}
const DateInputField = (props) => {
    const [opened, setOpened] = useState(false)
    return (
        <div className="my-1 relative flex gap-1">
            <input value={props.value} onChange={(ev) => {props.changeValue(ev.target.value)}} placeholder="dd.mm.yyyy"
            className="rounded-md p-1 text-gray-200 bg-gray-700 w-24 
            focus:outline-none focus:ring-1 focus:border-blue-300 focus:bg-gray-600
            "/>
            <button className="size-9 p-1 bg-gray-700 rounded-md"
            onClick={() => {setOpened(!opened)}}>
                <svg viewBox="0 0 24 24">
                    <path fill="#9ca3af" d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                    <path fill="#9ca3af" d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                </svg>
            </button>
            <div className="absolute flex flex-row justify-around h-36 bg-gray-700 border-gray-800 pr-2 rounded-md w-32 top-10 z-20"
            style={{display:opened? 'flex' : 'none'}}>
                <div className="flex flex-col overflow-y-scroll w-20">
                    {Array.from({length:getDaysInMonth(parseInt(props.value.split('.')[1]))}).map((val, index) => (
                        <button className="rounded hover:bg-gray-600"
                        onClick={() => {
                            props.changeValue(`${formatTwoDigits(index+1)}.${props.value.split('.')[1]}.${props.value.split('.')[2]}`)
                            setOpened(false)
                        }}>{index+1}</button>
                    ))}
                </div>
                <div className="flex flex-col overflow-y-scroll w-20">
                    {Array.from({length:12}).map((val, index) => (
                        <button className="rounded hover:bg-gray-600"
                        onClick={() => {
                            props.changeValue(`${props.value.split('.')[0]}.${formatTwoDigits(index+1)}.${props.value.split('.')[2]}`)
                            setOpened(false)
                        }}>{Info.months('short')[index]}</button>
                    ))}
                </div>
            </div>
        </div>
    )
}

const LargeInputField = (props) => {
    return (
        <div className="mx-auto">
            <textarea cols={30} rows={4} placeholder={props.placeholder}
            className="bg-gray-800 text-gray-100 rounded-md p-2
            border-2 border-gray-500 w-full  
            hover:border-gray-400
            focus:outline-none focus:border-blue-400" 
            onChange={(ev) => {props.changeValue(ev.target.value)}}>{props.value}</textarea>
        </div>
    )
}


export {
    InputField,
    TimeInputField,
    LargeInputField,
    DateInputField
}