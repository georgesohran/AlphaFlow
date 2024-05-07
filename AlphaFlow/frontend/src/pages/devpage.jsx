import { useState } from "react"
import { TimeInputField } from "../components/inputfield"


const DevPage = () => {
    const [value, setValue] = useState('12:00')
    return (
        <div className="bg-gray-900 h-screen text-gray-100 p-3">
            <h1 className="text-gray-100 text-xl">DEV PAGE</h1>
            <div>
                <TimeInputField />
            </div>
        </div>
    )
}

export default DevPage