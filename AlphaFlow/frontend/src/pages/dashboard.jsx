import TopNavBar from "../components/navbar";
import MyFooter from "../components/footer";
import {ButtonSubmit1} from "../components/buttons"
import { LargeInputField } from "../components/inputfield";

import { getAuth } from "../util";

import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { DateTime } from "luxon";
import Cookies from "universal-cookie";
const cookies = new Cookies();


const Dashboard = () => {
    const [notes, setNotes] = useState([])
    const [goals, setGoals] = useState([])
    const [newNoteContent, setNewNoteContent] = useState('')
    const [newGoalContent, setNewGoalContent] = useState({})
    const [upcomingEvents, setUpcomingEvents] = useState({})

    const [mode, setMode] = useState('default')

    const navigate = useNavigate()

    //protection
    useEffect(() => {
        getAuth().then((auth) => {
            if(auth) {
                getNotes()
                getGoals()
                getUpcomingEvents()
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
        .then(res => res.json())
        .then(res_data => {
            if('detail' in res_data) {
                console.log(res_data.detail)
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
        .then(res => res.json())
        .then(res_data => {
            if('detail' in res_data) {
                console.log(res_data.detail)
            } else {
                setGoals(res_data)
            }
        })
    }

    
    const addNote = async() => {
        console.log(newNoteContent)
        fetch('api/notes', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            credentials:'same-origin',
            body:JSON.stringify({
                contents:newNoteContent
            })
        })
        .then(res => res.json())
        .then(res_data => {
            if('detail' in res_data) {
                console.log(res_data.detail)
            } else {
                setNotes(res_data)
                setMode('default')
            }
        })
    }
    const addGoal = async() => {
        fetch('api/goals', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            credentials:'same-origin',
            body:JSON.stringify({
                contents:newGoalContent
            })
        })
        .then(res => res.json())
        .then(res_data => {
            if('detail' in res_data) {
                console.log(res_data.detail)
            } else {
                setGoals(res_data)
                setMode('default')
            }
        })
    }


    const editNote = async(index) => {
        fetch('api/notes', {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            credentials:'same-origin',
            body:JSON.stringify({
                contents: newNoteContent,
                id: notes[index].id
            })
        })
        .then(res => res.json())
        .then((res_data) => {
            if('detail' in res_data) {
                console.log(res_data)
            } else {
                setNotes(res_data)
            }
            setMode('default')
        })
    }
    const editGoal = async(index) => {
        fetch('api/goals', {
            method:'PUT',
            headers: {
                'Content-Type':'application/json',
                'X-CSRFToken':cookies.get('csrftoken')
            },
            credentials:'same-origin',
            body: JSON.stringify({
                contents:newGoalContent,
                id:goals[index].id
            })
        })
        .then(res => res.json())
        .then((res_data) => {
            if('detail' in res_data) {
                console.log(res_data)
            } else {
                setGoals(res_data)
            }
            setMode('default')
        })
    }


    const deleteNote = async(index) => {
        fetch('api/notes', {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            credentials:'same-origin',
            body: JSON.stringify({
                id:notes[index].id
            })
        })
        .then(res => res.json())
        .then(res_data => {
            if('detail' in res_data) {
                console.log(res_data.detail)
            } else {
                setNotes(res_data)
            }
        })
    }
    const deleteGoal = async(index) => {
        fetch('/api/goals', {
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            credentials:'same-origin',
            body:JSON.stringify({
                id:goals[index].id
            })
        })
        .then(res => res.json())
        .then(res_data => {
            if('detail' in res_data) {
                console.log(res_data.detail)
            } else {
                setGoals(res_data)
            }
        })
    }

    const getUpcomingEvents = async() => {
        fetch('/api/get_upcoming_events', {
            method:'GET',
            headers: {
                'X-CSRFToken':cookies.get('csrftoken')
            },
            credentials:'same-origin'
        })
        .then(res => res.json())
        .then(res_data => {
            if('detail' in res_data) {
                console.log(res_data.detail)
            } else {
                setUpcomingEvents(res_data)
                console.log(res_data)
            }
        })
    }

    return (
        <div className='bg-gray-900 min-h-screen'>
            <div className='bg-gradient-to-t from-gray-900 to-indigo-800'>
                <TopNavBar authorized={true}/>
                <div className='mx-auto justify-center mb-16
                md:mb-40 md:flex '>
                    <NotesContainer items={notes}  
                        addItem={addNote} editItem={editNote} deleteItem={deleteNote}
                        newContent={newNoteContent} changeNewContent={setNewNoteContent}
                        mode={mode} setMode={setMode}/>
                    <GoalsContainer items={goals}  
                        addItem={addGoal} editItem={editGoal} deleteItem={deleteGoal}
                        newContent={newGoalContent} changeNewContent={setNewGoalContent}
                        mode={mode} setMode={setMode}/>
                </div>
                <div className="mx-auto justify-center md:flex mb-56">
                    <UpcomingEventsContainer events={upcomingEvents}/>
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
        my-2 m-2 h-auto p-4 mx-8 md:w-1/3 md:mx-4 md:my-28 ">
            <p className="text-4xl p-2 bg-gray-700 rounded-md">Notes</p>
            <div className="divide-y divide-solid divide-gray-600">
                <div className="mt-2 text-gray-300 ">
                    <p className="text-lg">All notes</p>
                </div>
                <div>
                {!props.items.length?
                    ('No notes created'):
                    (props.items.map((item, index) => (<>
                        <div className="grid grid-cols-2" style={props.mode==`editNote-${index}`?{display:'none'}:{display:'grid'}}
                        onMouseEnter={() => {document.getElementById(`edit-note-sec-${index}`).style.display='block'}}
                        onMouseLeave={() => {document.getElementById(`edit-note-sec-${index}`).style.display='none'}}>
                            <div className="col-span-1 text-left">
                            - {item.contents}
                            </div>
                            <div className="col-span-1 text-right">
                                <div id={`edit-note-sec-${index}`} style={{display:'none'}}>
                                    <button className="mx-1 text-gray-500 hover:text-green-500"
                                    onClick={() => {props.setMode(`editNote-${index}`)}}>
                                        edit
                                    </button>
                                    <button className="mx-1 text-gray-500 hover:text-red-500"
                                    onClick={() => {props.deleteItem(index)}}>
                                        delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style={props.mode==`editNote-${index}`?{display:'block'}:{display:'none'}}>
                            <LargeInputField value={props.newContent} changeValue={props.changeNewContent}/>

                            <div className="mx-auto w-auto flex-wrap">
                                <ButtonSubmit1 text='Edit Note' onClick={() => {props.editItem(index)}}/>
                                <ButtonSubmit1 text='Cancel' onClick={() => {props.setMode('default')}}/>
                            </div>
                        </div>
                        </>)
                    ))
                }
                </div>
            </div>
            {/* add new section */}
            <div className="z-10">
                <div>
                    {props.mode == 'default'? 
                    (<ButtonSubmit1 text='Add new note' onClick={() => {props.setMode('addNote')}}/>):
                    (<></>)}
                </div>
                <div style={props.mode=='addNote'? {display:'block'} : {display:'none'}}
                className="w-auto items-center">
                    <textarea cols={30} rows={4} placeholder="Your new note here" 
                    className="bg-gray-800 text-gray-100 rounded-md p-2
                    border-2 border-gray-400
                    focus:outline-none focus:ring focus:border-blue-400" 
                    onChange={(ev) => {props.changeNewContent(ev.target.value)}}>{props.newContent}</textarea>

                    <div className="mx-auto w-auto flex-wrap">
                        <ButtonSubmit1 text='Add Note' onClick={props.addItem}/>
                        <ButtonSubmit1 text='Cancel' onClick={() => {props.setMode('default')}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


const GoalsContainer = (props) => {    
    return (
        <div className="text-white text-center bg-gray-800 rounded-md  
        my-2 m-2 h-auto p-4 mx-8 md:w-1/3 md:mx-4 md:my-28 ">
            <p className="text-4xl p-2 bg-gray-700 rounded-md">Goals</p>
            <div className="divide-y divide-solid divide-gray-600">
                <div className="mt-2 text-gray-300 ">
                    <p className="text-lg">All Goals</p>
                </div>
                <div>
                {!props.items.length?
                    ('No goals set'):
                    (props.items.map((item, index) => (<>
                        <div className="grid grid-cols-2" style={props.mode==`editGoal-${index}`?{display:'none'}:{display:'grid'}}
                        onMouseEnter={() => {document.getElementById(`edit-goal-sec-${index}`).style.display='block'}}
                        onMouseLeave={() => {document.getElementById(`edit-goal-sec-${index}`).style.display='none'}}>
                            <div className="col-span-1 text-left">
                            - {item.contents}
                            </div>
                            <div className="col-span-1 text-right">
                                <div id={`edit-goal-sec-${index}`} style={{display:'none'}}>
                                    <button className="mx-1 text-gray-500 hover:text-green-500"
                                    onClick={() => {props.setMode(`editGoal-${index}`)}}>
                                        edit
                                    </button>
                                    <button className="mx-1 text-gray-500 hover:text-red-500"
                                    onClick={() => {props.deleteItem(index)}}>
                                        delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div style={props.mode==`editGoal-${index}`?{display:'block'}:{display:'none'}}>
                            {props.changeNewContent(item.contents)}
                            <LargeInputField value={props.newContent} changeValue={props.changeNewContent}/>

                            <div className="mx-auto w-auto flex-wrap">
                                <ButtonSubmit1 text='edit' onClick={() => {props.editItem(index)}}/>
                                <ButtonSubmit1 text='Cancel' onClick={() => {props.setMode('default')}}/>
                            </div>
                        </div>
                        </>)
                    ))
                }
                </div>  
            </div>
            {/* add new section */}
            <div className="">
                <div>
                    {props.mode != 'addGoal'? 
                    (<ButtonSubmit1 text='Set new goal' onClick={() => {props.setMode('addGoal')}}/>):
                    (<div className="w-auto items-center">
                        <textarea cols={30} rows={4} placeholder="Your new goal here" 
                        className="bg-gray-800 text-gray-100 rounded-md p-2
                        border-2 border-gray-400
                        focus:outline-none focus:ring focus:border-blue-400" 
                        onChange={(ev) => {props.changeNewContent(ev.target.value)}}>{props.newContent}</textarea>
                        
                        <p className="text-red-600">Warning! you can't change goals contents later</p>
                        
                        <div className="mx-auto w-auto flex-wrap">
                            <ButtonSubmit1 text='Add goal' onClick={props.addItem}/>
                            <ButtonSubmit1 text='Cancel' onClick={() => {props.setMode('default')}}/>
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}


const UpcomingEventsContainer = (props) => {
    return (
    <div className="text-white text-center bg-gray-800 rounded-md  
    my-2 m-2 h-auto p-4 mx-8 md:w-2/3 md:mx-4 md:my-28 ">
        <p className="text-2xl">Upcoming Events</p>
        <div className="divide-y divide-solid divide-gray-600">
            <div className="mt-2 text-gray-300 ">
                <Link to='/schedule' className="hover:text-gray-600 hover:underline">modify and view events</Link>
            </div>
            <div>
                
            </div>
        </div>
    </div>
    )
}

export default Dashboard