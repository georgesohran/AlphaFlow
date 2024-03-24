import React from "react";
import { useEffect } from "react";
import { useState } from "react";


const Dashboard = () => {
    let [notes, setNotes] = useState([])

    const getNotes = async() => {
        fetch('http://127.0.0.1:8000/api/get_notes')
        .then(response => response.json())
        .then((notes_data) => {
            console.log(notes_data)
            setNotes(notes_data)
        })
        
        setNotes(notes)
    }

    useEffect(getNotes, [])

    return (
        <div>
            <p>Im here</p>
            {notes.map((note, index) => {
                <p className="text-5xl" key={index}>{note.contents}</p>
            })}
        </div>
    )
}


export default Dashboard