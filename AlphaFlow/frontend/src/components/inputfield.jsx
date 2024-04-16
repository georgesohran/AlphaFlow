import React from "react";

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
    return (
        <div className="my-2">
            <input value={props.value} onChange={(ev) => {props.changeValue(ev.target.value)}} placeholder="hh:mm"
            className="rounded-md p-1 text-gray-200 bg-gray-700 w-24 
            focus:outline-none focus:ring-1 focus:border-blue-300 focus:bg-gray-600
            "/>
        </div>
    )
}

const LargeInputField = (props) => {
    return (
        <div className="mx-auto">
            <textarea cols={30} rows={4} placeholder={props.placeholder}
            className="bg-gray-800 text-gray-100 rounded-md p-2
            border-2 border-gray-500 w-11/12  
            hover:border-gray-400
            focus:outline-none focus:border-blue-400" 
            onChange={(ev) => {props.changeValue(ev.target.value)}}>{props.value}</textarea>
        </div>
    
    )
}

export {
    InputField,
    TimeInputField,
    LargeInputField
}