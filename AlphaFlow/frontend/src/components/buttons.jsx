
const ButtonSubmit1 = (props) => {
    return (
        <button onClick={props.onClick} className="text-white bg-indigo-700 
        m-4 px-4 py-2 
        rounded-md 
        hover:bg-indigo-800 transition-all
        focus:border-blue-300 focus:border-2" >
            {props.text}
        </button>
    )
}

const ButtonSubmit2 = (props) => {
    return (
        <button onClick={props.onClick} className="
        text-white bg-gray-800 border border-gray-400 
        px-4 py-2 w-full my-1
        rounded-md 
        hover:bg-gray-900 hover:border-gray-200 transition-all
        focus:border-blue-300 focus:border-2 ">
            {props.text}
        </button>
    )
}

export {
    ButtonSubmit1,
    ButtonSubmit2,
}