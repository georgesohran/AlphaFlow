import React from "react";

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

export default InputField