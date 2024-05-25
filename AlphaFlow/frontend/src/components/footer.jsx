import React from "react";

const MyFooter = (props) => {
    return (
        <footer className='bg-gray-800 text-white 
        w-auto py-8 text-center sticky'>
            {props.text}
        </footer>
    )
}

export default MyFooter