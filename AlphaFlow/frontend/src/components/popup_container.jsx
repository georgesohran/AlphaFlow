const PopUp1 = (props) => {
    return (
    <div className="absolute top-64 left-0 right-0 mx-auto shadow-2xl bg-gray-800 border-2 border-gray-500
    animate-movedown rounded-lg text-white
    w-4/5 p-4 ">
        {props.children}
    </div>
    )
}

export {PopUp1}