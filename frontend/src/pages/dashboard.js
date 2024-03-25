import React from "react";
import { useEffect } from "react";
import { useState } from "react";


const Dashboard = () => {
    localStorage.clear();
    sessionStorage.clear();

    let [notes, setNotes] = useState([])

    const getNotes = async() => {
        const notes_data = await fetch('/api/get_notes').then(response => {console.log(response);response.json()})
        setNotes(notes_data)
    }

    useEffect(() => {
        getNotes()
    }, [])

    return (
        <div>
            <p>Im here</p>
            <div>
                {notes.map((note, index) => 
                    (<p className="text-xl" key={index}>{note.contents}</p>)
                )}
            </div>
        </div>
    )
}


export default Dashboard