import TopNavBar from "../components/navbar";
import MyFooter from "../components/footer";
import {ButtonSubmit1} from "../components/buttons"

import { getAuth } from "../util";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();


const Dashboard = () => {
    const [notes, setNotes] = useState([])
    const [goals, setGoals] = useState([])
    const [newNoteContent, setNewNoteContent] = useState('')
    const [newGoalContent, setNewGoalContent] = useState('')

    const [mode, setMode] = useState('default')

    const navigate = useNavigate()

    //protection
    useEffect(() => {
        getAuth().then((auth) => {
            if(auth) {
                getNotes()
                getGoals()
            } else {
                navigate('/login')
            }
        })
    }, [])


    const getNotes = async() => {
        fetch('api/notes', {
            method:'GET',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials:'same-origin'
        })
        .then(res => {
            if(res.status == 200) {
                return res.json()
            } else {
                return null
            }
        })
        .then(res_data => {
            if(res_data == null) {
                console.log('unauthorized')
            } else {
                setNotes(res_data)
            }
        })
    }
    const getGoals = async() => {
        fetch('api/goals', {
            method:'GET',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials:'same-origin'
        })
        .then(res => {
            if(res.status == 200) {
                return res.json()
            } else {
                return null
            }
        })
        .then(res_data => {
            if(res_data == null) {
                console.log('unauthorized')
            } else {
                setGoals(res_data)
            }
        })
    }

    
    const addNote = async() => {
        fetch('api/notes', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            credentials:'same-origin',
            body:JSON.stringify({
                content:newNoteContent
            })
        })
        .then(res => {
            if(res.status == 200) {
                return res.json()
            } else {
                return null
            }
        })
        .then(res_data => {
            if(res_data != null) {
                setNotes([res_data])
            } else {
                console.log('unauthorized')
            }
        })
    }
    const addGoal = async() => {
        fetch('api/notes', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            credentials:'same-origin',
            body:JSON.stringify({
                content:newGoalContent
            })
        })
        .then(res => {
            if(res.status == 200) {
                return res.json()
            } else {
                return null
            }
        })
        .then(res_data => {
            if(res_data != null) {
                setGoals([res_data])
            } else {
                console.log('unauthorized')
            }
        })
    }


    return (
        <div className='bg-gray-900 min-h-screen'>

            <div className='bg-gradient-to-t from-gray-900 to-indigo-800'>
                <TopNavBar authorized={true}/>
                <div className='mx-auto justify-center md:flex mb-56'>
                    <NotesContainer items={notes} addCommand={addNote} change={setNotes} 
                        addItem={addNote}
                        mode={mode} setMode={setMode}/>
                    <br/>
                </div> 
                
            </div>
            <MyFooter text='something'/>
        </div>
    )
}


///////////////////////////////////////////////


const NotesContainer = (props) => {    
    return (
        <div className="text-white text-center bg-gray-800 rounded-md  
        my-2 m-2 h-auto p-4 mx-8 md:w-1/4 md:mx-4 md:my-28 ">
            <p className="text-4xl p-2 bg-gray-700 rounded-md">Notes</p>
            <div className="divide-y divide-solid divide-gray-600">
                <p className="mt-2 mb-2">All notes</p>
                <div className="mt-2 text-left mx-12 text-gray-300 ">
                    {props.items == []?
                        (<div>No notes</div>):
                        (props.items.map((item, index) => (
                            <div className="list-item whitespace-pre-line" key={index}>
                                {item.contents}
                            </div>)
                        ))
                    }
                </div>
                <ButtonSubmit1 text='Add new note' onClick={() => {props.setMode('addNote')}}/>
            </div>
            <div style={props.mode=='addNote'? {display:'block'} : {display:'none'}}>
                <textarea cols={30} rows={4} placeholder="Your new note here" 
                className="bg-gray-800 text-gray-100 rounded-md p-2
                focus:outline-none focus:ring focus:border-blue-400" />
                <div className="flex">
                    <ButtonSubmit1 text='Add note' onClick={props.addItem}/>
                    <ButtonSubmit1 text='Cancel' onClick={() => {props.setMode('default')}}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard