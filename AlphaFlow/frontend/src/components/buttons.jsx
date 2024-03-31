
const ButtonSubmit1 = (props) => {
    return (
        <button onClick={props.onClick} className="text-white bg-indigo-700 
        m-4 px-4 py-2 
        rounded-md 
        hover:bg-indigo-800
        focus:border-blue-300 focus:border-2" >
            {props.text}
        </button>
    )
}

export {ButtonSubmit1}