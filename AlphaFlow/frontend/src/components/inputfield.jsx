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
        <div className="my-1">
            <input value={props.value} onChange={(ev) => {props.changeValue(ev.target.value)}} placeholder="hh:mm"
            className="rounded-md p-1 text-gray-200 bg-gray-700 w-24 
            focus:outline-none focus:ring-1 focus:border-blue-300 focus:bg-gray-600
            "/>
        </div>
    )
}
const DateInputField = (props) => {
    return (
        <div className="my-1">
            <input value={props.value} onChange={(ev) => {props.changeValue(ev.target.value)}} placeholder="dd.mm.yyyy"
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
            border-2 border-gray-500 w-full  
            hover:border-gray-400
            focus:outline-none focus:border-blue-400" 
            onChange={(ev) => {props.changeValue(ev.target.value)}}>{props.value}</textarea>
        </div>
    
    )
}

const OptionsInputField = (props) => {
    return (
        <select defaultValue={['default']} 
        className="bg-gray-700 p-1 rounded-md text-gray-200 mt-1
        focus:outline-none focus:ring-1 focus:border-blue-300 ">
            {props.default && <option selected value='default'>{props.default}</option>}

            {props.options.map((opt, index) => (
                <option value={opt}>{opt}</option>
            ))}
        
        </select>
    )
}


export {
    InputField,
    TimeInputField,
    LargeInputField,
    OptionsInputField,
    DateInputField
}