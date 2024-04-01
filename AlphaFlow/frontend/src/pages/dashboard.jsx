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


    return (
        <div className='bg-gray-900 min-h-screen'>

            <div className='bg-gradient-to-t from-gray-900 to-indigo-800'>
                <TopNavBar authorized={true}/>
                <div className='mx-auto justify-center md:flex mb-56'>
                    <NotesContainer items={notes} addCommand={addNote} 
                        addItem={addNote}
                        mode={mode} setMode={setMode}
                        changeNewContents={setNewNoteContent}/>
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
                <div className="mt-2 text-gray-300 ">
                    <p className="text-lg">All notes</p>
                </div>
                <div>
                    <div className="mx-6 my-4 text-left">
                        {props.items == []?
                            (<div>No notes</div>):
                            (props.items.map((item, index) => (
                                <div 
                                onMouseEnter={() => {document.getElementById(`edit-btn-${index}`).style.display = 'block'}} 
                                onMouseLeave={() => {document.getElementById(`edit-btn-${index}`).style.display = 'none'}} 
                                className="list-item whitespace-pre-line" key={index}>
                                    <div style={props.mode=='editNote'? {display:'none'} : {display:'block'}}
                                    className="flex flex-wrap items-center justify-between p-2">
                                        <div>{item.contents}</div>
                                        <div>
                                            <button id={`edit-btn-${index}`} style={{display:'none'}} onClick={() => {setMode('editNote')}} 
                                            className="text-gray-500">edit</button>
                                        </div>
                                    </div>
                                    <div style={props.mode=='editNote'? {display:'block'} : {display:'none'}}>
                                        <textarea cols={30} rows={4} value={item.contents}
                                        className="bg-gray-800 text-gray-100 rounded-md p-2
                                        border-2 border-gray-400
                                        focus:outline-none focus:ring focus:border-blue-400" 
                                        onChange={(ev) => {props.changeNewContents(ev.target.value)}}/>

                                        <div className="flex">
                                            <ButtonSubmit1 text='Eddit note' onClick={props.addItem}/>
                                            <ButtonSubmit1 text='Cancel' onClick={() => {props.setMode('default')}}/>
                                        </div>
                                    </div>
                                </div>)
                            ))
                        }
                    </div>
                </div>  
            </div>
            <div>
                {props.mode == 'default'? 
                (<ButtonSubmit1 text='Add new note' onClick={() => {props.setMode('addNote')}}/>):
                (<></>)}
            </div>
            <div style={props.mode=='addNote'? {display:'block'} : {display:'none'}}>
                <textarea cols={30} rows={4} placeholder="Your new note here" 
                className="bg-gray-800 text-gray-100 rounded-md p-2
                border-2 border-gray-400
                focus:outline-none focus:ring focus:border-blue-400" 
                onChange={(ev) => {props.changeNewContents(ev.target.value)}}/>

                <div className="flex">
                    <ButtonSubmit1 text='Add note' onClick={props.addItem}/>
                    <ButtonSubmit1 text='Cancel' onClick={() => {props.setMode('default')}}/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard