import React from "react";
import { useEffect } from "react";
import { useState } from "react";


const Dashboard = () => {
    let [notes, setNotes] = useState([])

    useEffect(getNotes, [])

    async function getNotes() {
        fetch('http://127.0.0.1:8000/api/get_notes')
        .then(response => response.json())
        .then((notes_data) => {
            console.log(notes_data)
            setNotes(notes_data)
        })
        
        setNotes(notes)
    }

    return (
        <div>
            {notes.map((note, index) => {
                <p className="text-5xl" key={index}>{note.contents}</p>
            })}
        </div>
    )
}


export default Dashboard