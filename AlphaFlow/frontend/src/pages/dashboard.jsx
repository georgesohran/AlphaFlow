import TopNavBar from "../components/navbar";
import MyFooter from "../components/footer";
import {ButtonSubmit1} from "../components/buttons"
import { LargeInputField } from "../components/inputfield";

import { getAuth } from "../util";
import { DateInputField } from "../components/inputfield";

import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DateTime, Info, Interval } from "luxon";

import { PopUp1 } from "../components/popup_container";

import Cookies from "universal-cookie";
const cookies = new Cookies();
const weekDays = { 'MON':1, 'TUE':2, 'WED':3, 'THU':4, 'FRI':5, 'SAT':6, 'SUN':7}


const Dashboard = () => {
    const [notes, setNotes] = useState([])
    const [goals, setGoals] = useState([])
    const [newNoteContent, setNewNoteContent] = useState('')
    const [newGoalContent, setNewGoalContent] = useState({
        text: '',
        deadline: `01.01.${DateTime.now().year + 1}`,
        reached: false,
    })
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
                let tempEventData = {1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[]}
                
                for(let timeEvent of res_data['onetime_events']) {
                    let dateTimeEvent = {
                        start: DateTime.fromISO(timeEvent.start),
                        finish: DateTime.fromISO(timeEvent.finish),
                        color: timeEvent.color,
                        description: timeEvent.description
                    }
                    tempEventData[dateTimeEvent.start.weekday].push(dateTimeEvent)
                }
    
                for(let timeEvent of res_data['weekly_events']) {
                    let dateTimeEvent = {
                        start: DateTime.fromISO(timeEvent.start, {zone:'UTC'}).toLocal(),
                        finish: DateTime.fromISO(timeEvent.finish, {zone:'UTC'}).toLocal(),
                        color: timeEvent.color,
                        description: timeEvent.description
                    }
                    tempEventData[weekDays[timeEvent.day]].push(dateTimeEvent)
                }
    
                for(let timeEvent of res_data['daily_events']) {
                    let dateTimeEvent = {
                        start: DateTime.fromISO(timeEvent.start, {zone:'UTC'}).toLocal(),
                        finish: DateTime.fromISO(timeEvent.finish, {zone:'UTC'}).toLocal(),
                        color: timeEvent.color,
                        description: timeEvent.description,
                    }
                    for(let i = 1; i < 8; i++) {
                        tempEventData[i].push(dateTimeEvent)
                    }
                }
                setUpcomingEvents(tempEventData)
            }
        })
    }

    return (
        <div className='bg-gray-900 min-h-screen'>
            <div>
                <TopNavBar authorized={true}/>                

                {mode=='addNote' && 
                <PopUp1>
                    <div className="my-2">
                        <LargeInputField value={newNoteContent} changeValue={setNewNoteContent}
                        placeholder="new note here"/>
                    </div>
                    <span>
                        <ButtonSubmit1 onClick={addNote} text="Add Note"/>
                        <ButtonSubmit1 onClick={() => {setMode('default')}} text="Close"/>
                    </span>
                </PopUp1>}

                {mode.includes('editNote') && 
                <PopUp1>
                    <div className="my-2">
                        <LargeInputField value={newNoteContent} changeValue={setNewNoteContent}
                        placeholder="new note here"/>
                    </div>
                    <span>
                        <ButtonSubmit1 onClick={() => {editNote(parseInt(mode.split('-')[1]))}} text="Edit Note"/>
                        <ButtonSubmit1 onClick={() => {setMode('default')}} text="Close"/>
                    </span>
                </PopUp1>}

                
                <div className='mx-auto justify-center mb-10 md:flex'>
                    <NotesContainer items={notes}  
                        addItem={addNote} editItem={editNote} deleteItem={deleteNote}
                        newContent={newNoteContent} changeNewContent={setNewNoteContent}
                        mode={mode} setMode={setMode}/>
                    <GoalsContainer items={goals} events={upcomingEvents} notes={notes} 
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
        <div className="text-white text-center bg-gray-800 rounded-md border-2 border-gray-600
        my-2 m-2 h-auto p-4 mx-8 md:w-2/5 md:mx-4 md:mt-28">
            <p className="text-4xl p-2 bg-gray-700 rounded-md">Notes</p>
            <div className="divide-y divide-solid divide-gray-600">
                <div className="mt-2 text-gray-300 ">
                    <p className="text-lg">All notes</p>
                </div>
                <div>
                {!props.items.length?
                    ('No notes created'):
                    (props.items.map((item, index) => (
                        <NoteBlock item={item} index={index} changeNewContent={props.changeNewContent} setMode={props.setMode}/>
                        )
                    ))
                }
                </div>
            </div>
            {/* add new section */}
            <div className="z-10">
                <div>
                    {props.mode != 'addNote'? 
                    (<ButtonSubmit1 text='Add new note' 
                    onClick={() => {
                        props.setMode('addNote');
                        props.changeNewContent('')
                        }}/>):
                    (<></>)}
                </div>
            </div>
        </div>
    )
}
const NoteBlock = (props) => {

    return (
        <div className="grid grid-cols-2 py-2 px-1 rounded-md my-1 bg-gray-700" style={props.mode==`editNote-${props.index}`?{display:'none'}:{display:'grid'}}
        onMouseEnter={() => {document.getElementById(`edit-note-sec-${props.index}`).style.display='block'}}
        onMouseLeave={() => {document.getElementById(`edit-note-sec-${props.index}`).style.display='none'}}>
            <div className="col-span-1 text-left">
            {props.item.contents}
            </div>
            <div className="col-span-1 text-right">
                <div id={`edit-note-sec-${props.index}`} style={{display:'none'}}>
                    <button className="mx-1 text-gray-400 hover:text-green-500"
                    onClick={() => {
                        props.changeNewContent(item.contents)
                        props.setMode(`editNote-${props.index}`)
                    }}>
                        edit
                    </button>
                    <button className="mx-1 text-gray-400 hover:text-red-500"
                    onClick={() => {props.deleteItem(props.index)}}>
                        delete
                    </button>
                </div>
            </div>
        </div>
    )
}

const GoalsContainer = (props) => {
    const navigate = useNavigate()
    return (
        <div className="text-white text-center bg-gray-800 rounded-md border-2 border-gray-600
        my-2 m-2 h-auto p-4 mx-8 md:w-2/5 md:mx-4 md:mt-28">
            <p className="text-4xl p-2 bg-gray-700 rounded-md">Goals</p>
            <div className="divide-y divide-solid divide-gray-600">
                <div className="mt-2 text-gray-200 ">
                    <p className="text-lg">All Goals</p>
                </div>
                <div>
                {props.items.length==0?
                    ('No goals set'):
                    (props.items.map((item, index) => (<>
                        <div className="grid grid-cols-2 my-2 p-2 bg-gray-700 rounded-md">
                            <div className="col-span-1 text-left h-6">
                                {item.contents}
                            </div>
                        </div>
                        </>)
                    ))
                }
                </div>  
            </div>
            {/* add new section */}
            <ButtonSubmit1 onClick={() => {navigate('/goals')}}>Add or Edit Goals</ButtonSubmit1>
        </div>
    )
}


const UpcomingEventsContainer = (props) => {
    return (
    <div className="text-white text-center bg-gray-800 rounded-md border-2 border-gray-600
    my-2 m-2 h-auto p-4 mx-8 md:w-5/6 md:mx-4 md:mb-28 ">
        <p className="text-2xl">Upcoming Events</p>
        <div className="divide-y divide-solid divide-gray-600">
            <div className="mx-2 text-gray-300 ">
                <Link to='/schedule' className="hover:text-gray-600 hover:underline">modify and edit events</Link>
            </div>
            <div className="flex flex-wrap justify-around">
                {props.events && Array.from({length:7}).map((val, index) => 
                    <EventsVisualizer events={props.events[DateTime.now().plus({day:index}).weekday]}
                    relNow={DateTime.now().plus({day:index})}/>
                )}
            </div>
        </div>
    </div>
    )
}

const EventsVisualizer = (props) => {
    const navigate = useNavigate()
    return (
    <div className={`size-64 text-left ${props.relNow.weekday==DateTime.now().weekday? 'border-red-500':'border-gray-600'} 
    border-2 p-2 rounded-md m-2`}>
        <div className="text-xl">{Info.weekdays('long')[props.relNow.weekday-1]}</div>
        <div className=" h-42">
            {props.events &&  props.events.slice(0,3).map((timeEvent, index) => (
                <div className={`border-l-4 pr-2 border-t-2 border-b-2 border-b-gray-600 border-t-gray-600 border-r-2 border-r-gray-600 rounded-md mt-1
                ${Interval.fromDateTimes(timeEvent.start, timeEvent.finish).contains(props.relNow)?'bg-gray-gray-700':''}`}
                style={{borderLeftColor: timeEvent.color}}>
                    <div className="text-gray-400 overflow-hidden">{timeEvent.description}</div>
                    <div className="text-gray-600">
                        {timeEvent.start.toFormat('HH:mm')} - {timeEvent.finish.toFormat('HH:mm')}
                    </div>
                </div>
            ))}
            {props.events && props.events.length > 3 && 
            <button onClick={() => {navigate('/schedule')}} 
            className="text-gray-500 hover:bg-gray-600 hover:text-gray-300 rounded-md p-1 transition-all mt-1">
                {props.events.length - 3} more    
            </button>}
        </div>
        
    </div>
    )
}

export default Dashboard