import TopNavBar from "../components/navbar";
import MyFooter from "../components/footer";
import {ButtonSubmit1} from "../components/buttons"

import { getAuth } from "../util";

import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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

    return (
        <div className='bg-gray-900 min-h-screen'>

            <div className='bg-gradient-to-t from-gray-900 to-indigo-800'>
                <TopNavBar authorized={true}/>
                <div className='mx-auto justify-center md:flex mb-56'>
                    <NotesContainer items={notes}  
                        addItem={addNote} editItem={editNote} deleteItem={deleteNote}
                        newContent={newNoteContent} changeNewContent={setNewNoteContent}
                        mode={mode} setMode={setMode}/>
                    <GoalsContainer items={goals}  
                        addItem={addGoal} editItem={editGoal} deleteItem={deleteGoal}
                        newContent={newGoalContent} changeNewContent={setNewGoalContent}
                        mode={mode} setMode={setMode}/>
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
                    <div className="mx-6 my-4">
                        {props.items == []?
                            (<div>No notes</div>):
                            (props.items.map((item, index) => (
                                <div 
                                onMouseEnter={() => {document.getElementById(`edit-note-sec-${index}`).style.display = 'block'}} 
                                onMouseLeave={() => {document.getElementById(`edit-note-sec-${index}`).style.display = 'none'}} 
                                className="list-item whitespace-pre-line" key={index}>
                                    {/* notes info */}
                                    <div style={props.mode==`editNote-${index}`? {display:'none'} : {display:'block'}}>
                                        <div className="text-left w-1/2 float-left">{item.contents}</div>

                                        <div className="text-right w-1/2 float-right" id={`edit-note-sec-${index}`} 
                                        style={props.mode==`editNote-${index}`? {display:'block'} : {display:'none'}}>

                                            <button onClick={() => {props.setMode(`editNote-${index}`)}} 
                                            className="text-gray-500 hover:text-green-600 mx-1">edit</button>
                                            <button onClick={() => {props.deleteItem(index)}} 
                                            className="text-gray-500 hover:text-red-600 mx-1" >delete</button>
                                        </div>

                                    </div>
                                    {/* edit content */}
                                    <div style={props.mode==`editNote-${index}`? {display:'block'} : {display:'none'}}
                                    className="w-auto items-center">
                                        <textarea cols={30} rows={4} 
                                        className="bg-gray-800 text-gray-100 rounded-md p-2
                                        border-2 border-gray-400
                                        focus:outline-none focus:ring focus:border-blue-400" 
                                        onChange={(ev) => {props.changeNewContent(ev.target.value)}}>{item.contents}</textarea>

                                        <div className="mx-auto w-auto flex-wrap">
                                            <ButtonSubmit1 text='Edit note' onClick={() => {props.editItem(index)}}/>
                                            <ButtonSubmit1 text='Cancel' onClick={() => {props.setMode('default')}}/>
                                        </div>
                                    </div>
                                </div>)
                            ))
                        }
                    </div>
                </div>  
            </div>
            {/* add new section */}
            <div className="z-10">
                <div>
                    {props.mode != 'addNote'? 
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
                    <p className="text-lg">All goals</p>
                </div>
                <div>
                    <div className="mx-6 my-4 text-left">
                        {props.items == []?
                            (<div>No goals set</div>):
                            (props.items.map((item, index) => (
                                <div 
                                onMouseEnter={() => {document.getElementById(`edit-goal-sec-${index}`).style.display = 'block'}} 
                                onMouseLeave={() => {document.getElementById(`edit-goal-sec-${index}`).style.display = 'none'}} 
                                className="list-item whitespace-pre-line" key={index}>
                                    {/* goals info */}
                                    <div style={props.mode==`editGoal-${index}`? {display:'none'} : {display:'block'}}>
                                        <div className="text-left w-1/2 float-left">{item.contents}</div>

                                        <div className="text-right w-1/2 float-left" id={`edit-goal-sec-${index}`} 
                                        style={props.mode==`editGoal-${index}`? {display:'flex'} : {display:'none'}}>

                                            <button onClick={() => {props.setMode(`editGoal-${index}`)}} 
                                            className="text-gray-500 hover:text-green-600">more...</button>
                                        </div>

                                    </div>
                                    {/* edit content */}
                                    <div style={props.mode==`editGoal-${index}`? {display:'block'} : {display:'none'}}
                                    className="w-auto items-center">
                                        <textarea cols={30} rows={4} 
                                        className="bg-gray-800 text-gray-100 rounded-md p-2
                                        border-2 border-gray-400
                                        focus:outline-none focus:ring focus:border-blue-400" 
                                        onChange={(ev) => {props.changeNewContent(ev.target.value)}}>{item.contents}</textarea>

                                        <div className="mx-auto w-auto flex-wrap">
                                            <ButtonSubmit1 text='Edit goal' onClick={() => {props.editItem(index)}}/>
                                            <ButtonSubmit1 text='Cancel' onClick={() => {props.setMode('default')}}/>
                                        </div>
                                    </div>
                                </div>)
                            ))
                        }
                    </div>
                </div>  
            </div>
            {/* add new section */}
            <div className="z-10">
                <div>
                    {props.mode != 'addGoal'? 
                    (<ButtonSubmit1 text='Add new goal' onClick={() => {props.setMode('addGoal')}}/>):
                    (<></>)}
                </div>
                <div style={props.mode=='addGoal'? {display:'block'} : {display:'none'}}
                className="w-auto items-center">
                    <textarea cols={30} rows={4} placeholder="Your new goal here" 
                    className="bg-gray-800 text-gray-100 rounded-md p-2
                    border-2 border-gray-400
                    focus:outline-none focus:ring focus:border-blue-400" 
                    onChange={(ev) => {props.changeNewContent(ev.target.value)}}>{props.newContent}</textarea>

                    <div className="mx-auto w-auto flex-wrap">
                        <ButtonSubmit1 text='Add goal' onClick={props.addItem}/>
                        <ButtonSubmit1 text='Cancel' onClick={() => {props.setMode('default')}}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}


const CloseEventsContainer = (props) => {
    return (
    <div className="text-white text-center bg-gray-800 rounded-md  
    my-2 m-2 h-auto p-4 mx-8 md:w-2/3 md:mx-4 md:my-28 ">
        <p className="text-2xl">Upcoming Events</p>
        <div className="divide-y divide-solid divide-gray-600">
            <div className="mt-2 text-gray-300 ">
                <Link to='/schedule' className="text-lg">modify and view events</Link>
            </div>
        </div>
    </div>
    )
}

export default Dashboard