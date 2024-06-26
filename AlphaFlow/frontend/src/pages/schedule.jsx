import { useEffect, useState } from "react"

import TopNavBar from "../components/navbar"
import MyFooter from "../components/footer"
import { getAuth }from "../util" 
import { TimeInputField, LargeInputField, DateInputField, InputField} from "../components/inputfield"
import { ButtonSubmit1, ButtonSubmit2 } from "../components/buttons"

import Select from "react-select"

import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";


//<IoMdArrowDropright />  <IoMdArrowDropleft />

import { DateTime, Info } from "luxon"
import { CirclePicker } from 'react-color'

import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"
const cookies = new Cookies()

const weekDays = { 'MON':1, 'TUE':2, 'WED':3, 'THU':4, 'FRI':5, 'SAT':6, 'SUN':7}

const SchedulePage = () => {
    const [eventsData, setEventData] = useState(null)
    const [detail, setDetail] = useState('')
    const [newTimeEvent, setNewTimeEvent] = useState({
        type:'dailyEvent',
        date: DateTime.now().toFormat('dd.MM.yyyy'),
        start: '12:00',
        finish: '13:00',
        day:'MON',
        description: '',
        color:''
    })
    const [editedEvent, setEditedEvent] = useState(null)
    const [offsetDays, setOffsetDays ] = useState(0)

    const [secNum, setSecNum] = useState(Math.round((window.innerWidth - 384) / 182))
    const navigate = useNavigate()

    useEffect(() => {
        getAuth().then((auth) => {
            if(auth) {
                getEvents()
            } else {
                navigate('/login')
            }
        })
    }, [])

    const getEvents = async() => {
        fetch('/api/get_upcoming_events',{
            method:'GET',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials:'same-origin'
        })
        .then(res => res.json())
        .then(res_data => {
            let tempTimeEventsData = {1:[], 2:[], 3:[], 4:[], 5:[], 6:[], 7:[]}

            for(let timeEvent of res_data['onetime_events']) {
                let dateTimeEvent = {
                    id: timeEvent.id,
                    type: 'onetimeEvent',
                    start: DateTime.fromISO(timeEvent.start),
                    finish: DateTime.fromISO(timeEvent.finish),
                    color: timeEvent.color,
                    description: timeEvent.description
                }
                tempTimeEventsData[dateTimeEvent.start.weekday].push(dateTimeEvent)
            }

            for(let timeEvent of res_data['weekly_events']) {
                let dateTimeEvent = {
                    id: timeEvent.id,
                    type:'weeklyEvent',
                    start: DateTime.fromISO(timeEvent.start, {zone:'UTC'}).toLocal(),
                    finish: DateTime.fromISO(timeEvent.finish, {zone:'UTC'}).toLocal(),
                    color: timeEvent.color,
                    description: timeEvent.description
                }
                tempTimeEventsData[weekDays[timeEvent.day]].push(dateTimeEvent)
            }

            for(let timeEvent of res_data['daily_events']) {
                let dateTimeEvent = {
                    id: timeEvent.id,
                    type:'dailyEvent',
                    start: DateTime.fromISO(timeEvent.start, {zone:'UTC'}).toLocal(),
                    finish: DateTime.fromISO(timeEvent.finish, {zone:'UTC'}).toLocal(),
                    color: timeEvent.color,
                    description: timeEvent.description,
                }
                for(let i = 1; i < 8; i++) {
                    tempTimeEventsData[i].push(dateTimeEvent)
                }
            }
            return setEventData(tempTimeEventsData)
        })
    }

    const createOnetimeEvent = async() => {
        let [day, month, year] = newTimeEvent.date.split('.')

        let start = DateTime.fromISO(newTimeEvent.start)
            .set({day:parseInt(day), month:parseInt(month), year:parseInt(year)}).toUTC().toString()
        let finish = DateTime.fromISO(newTimeEvent.finish)
            .set({day:parseInt(day), month:parseInt(month), year:parseInt(year)}).toUTC().toString()
        
        fetch('api/onetime_events', {
            method:'POST',
            headers: {
                'X-CSRFToken':cookies.get('csrftoken'),
                'Content-Type':'application/json',
            },
            credentials:'same-origin',
            body: JSON.stringify({
                start: start,
                finish: finish,
                description: newTimeEvent.description,
                color: newTimeEvent.color
            })
        })
        .then(res => res.json())
        .then(res_data => {
            setDetail(res_data.detail)
            return getEvents()
        })
    }
    const createWeeklyEvent = async() => {
        fetch('api/weekly_events', {
            method:'POST',
            headers: {
                'X-CSRFToken':cookies.get('csrftoken'),
                'Content-Type':'application/json',
            },
            credentials:'same-origin',
            body: JSON.stringify({
                start: DateTime.fromISO(newTimeEvent.start).toUTC().toFormat('HH:mm:ss'),
                finish: DateTime.fromISO(newTimeEvent.finish).toUTC().toFormat('HH:mm:ss'),
                description: newTimeEvent.description,
                day: newTimeEvent.day,
                color: newTimeEvent.color
            })
        })
        .then(res => res.json())
        .then(res_data => {
            setDetail(res_data.detail)
            return getEvents()
        })
    }
    const createDailyEvent = async() => {
        fetch('/api/daily_events', {
            method:'POST',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
                'Content-Type': 'application/json',
            },
            credentials:"same-origin",
            body: JSON.stringify({
                start: DateTime.fromISO(newTimeEvent.start).toUTC().toFormat('HH:mm:ss'),
                finish: DateTime.fromISO(newTimeEvent.finish).toUTC().toFormat('HH:mm:ss'),
                description: newTimeEvent.description,
                color: newTimeEvent.color
            })
        })
        .then(res => res.json())
        .then(res_data => {
            setDetail(res_data.detail)
            return getEvents()
        })
    }

    const editOnetimeEvent = async() => {
        let [day, month, year] = newTimeEvent.date.split('.')

        let start = DateTime.fromISO(editedEvent.start)
            .set({day:parseInt(day), month:parseInt(month), year:parseInt(year)}).toUTC().toString()
        let finish = DateTime.fromISO(editedEvent.finish)
            .set({day:parseInt(day), month:parseInt(month), year:parseInt(year)}).toUTC().toString()

        fetch('api/onetime_events', {
            method:'PUT',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
                'Content-Type': 'application/json',
            },
            credentials:"same-origin",
            body: JSON.stringify({
                start: start,
                finish: finish,
                description: editedEvent.description,
                color: editedEvent.color,
                id: editedEvent.id
            })
        })
        .then(res => res.json())
        .then(res_data => {
            setDetail(res_data.detail)
            return getEvents()
        })
    }
    const editWeeklyEvent = async() => {
        fetch('api/weekly_events', {
            method:'PUT',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
                'Content-Type': 'application/json',
            },
            credentials:"same-origin",
            body: JSON.stringify({
                start: DateTime.fromISO(editedEvent.start).toUTC().toFormat('HH:mm:ss'),
                finish: DateTime.fromISO(editedEvent.finish).toUTC().toFormat('HH:mm:ss'),
                description: editedEvent.description,
                day: editedEvent.day,
                color: editedEvent.color,
                id: editedEvent.id
            })
        })
        .then(res => res.json())
        .then(res_data => {
            setDetail(res_data.detail)
            return getEvents()
        })
    }
    const editDailyEvent = async() => {
        fetch('api/daily_events', {
            method: 'PUT',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
                'Content-Type': 'application/json',
            },
            credentials:"same-origin",
            body: JSON.stringify({
                start: DateTime.fromISO(editedEvent.start).toUTC().toFormat('HH:mm:ss'),
                finish: DateTime.fromISO(editedEvent.finish).toUTC().toFormat('HH:mm:ss'),
                description: editedEvent.description,
                color: editedEvent.color,
                id: editedEvent.id
            })
        })
        .then(res => res.json())
        .then(res_data => {
            setDetail(res_data.detail)
            return getEvents()
        })
    }

    const deleteOnetimeEvent = async() => {
        fetch('api/onetime_events', {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
                'Content-Type': 'application/json',
            },
            credentials:"same-origin",
            body: JSON.stringify({id: editedEvent.id})
        })
        .then(res => res.json()) 
        .then(res_data => {
            console.log(res_data)
            return getEvents()
        })
    }
    const deleteWeeklyEvent = async() => {
        fetch('api/weekly_events', {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
                'Content-Type': 'application/json',
            },
            credentials:"same-origin",
            body: JSON.stringify({id: editedEvent.id})
        })
        .then(res => res.json())
        .then(res_data => {
            console.log(res_data)
            return getEvents()
        })
    }
    const deleteDailyEvent = async() => {
        fetch('api/daily_events', {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
                'Content-Type': 'application/json',
            },
            credentials:"same-origin",
            body: JSON.stringify({id: editedEvent.id})
        })
        .then(res => res.json())
        .then(res_data => {
            console.log(res_data)
            return getEvents()
        })
    }

    return (
        <div className='bg-gray-900 min-h-screen'>
            <TopNavBar authorized={true}/>
            <div className="p-2 flex flex-row">
                <div className="relative">
                    <div className=" ml-7 relative flex flex-row">
                        <button className="mx-2 rounded-md font-bold text-xl transition-all bg-gray-800 text-white
                        hover:bg-gray-700"
                        onClick={() => {setOffsetDays(offsetDays-1)}}>
                            <span className="flex-col self-center">&lt;</span>
                        </button>
                        {Array.from({length:secNum}, (v, index) => index).map((num , index) => 
                            <div className={`text-center bg-gray-800 rounded-t-xl 
                            w-40 mr-3 h-16 text-white outline outline-2 ${DateTime.now().hasSame(DateTime.now().plus({days: num+offsetDays}), 'day') &&
                            DateTime.now().hasSame(DateTime.now().plus({days: num+offsetDays}), 'month') &&
                            DateTime.now().hasSame(DateTime.now().plus({days: num+offsetDays}), 'year')? 'outline-red-500':'outline-gray-700'}`}>
                                <p className="text-xl">{Info.weekdays('short')[DateTime.now().plus({days: num+offsetDays}).weekday-1]}</p>
                                <p className="text-gray-400">{DateTime.now().plus({days:num+offsetDays}).day}</p>
                            </div>
                        )}
                        <button className="mr-1 rounded-md font-bold text-xl transition-all bg-gray-800 text-white
                        hover:bg-gray-700 "
                        onClick={() => {setOffsetDays(offsetDays+1)}}>
                            <span className="flex-col self-center">&gt;</span>
                        </button>
                    </div>
                    <div className="relative overflow-y-scroll border-2 border-gray-700 bg-gray-800 rounded-xl" 
                    style={{height:window.innerHeight-130, width:secNum*172+75}}>
                        <div className="z-0 relative" style={{height:1440}}>
                            <svg width={secNum*172+50} height="1440" viewBox={`0 0 ${secNum*172+50} 1440`} fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute z-0">
                            <rect width={secNum*172+50} height="1440" fill="#1f2937" rx={8}/>
                            {Array.from({length: 24}, (v, index) => index).map((val, index) => 
                                <line y1={60*index} x2={secNum*172+65} y2={60*index} stroke="#374151" stroke-width="2"/>    
                            )}
                            {Array.from({length: secNum}, (v, index) => index).map((val, index) => {
                                if(DateTime.now().hasSame(DateTime.now().plus({days: index+offsetDays}), 'day') &&
                                DateTime.now().hasSame(DateTime.now().plus({days: index+offsetDays}), 'month') &&
                                DateTime.now().hasSame(DateTime.now().plus({days: index+offsetDays}), 'year')) {
                                    return (
                                        <><line x1={172*index+55} x2={172*index+55} y2={1440} stroke-width="2" stroke="#ef4444"/>
                                        <line x1={(0-offsetDays)*172+55} y1={(DateTime.now().hour)*60 + DateTime.now().minute} 
                                        x2={((0-offsetDays)+1)*172+55} y2={(DateTime.now().hour)*60 + DateTime.now().minute} 
                                        stroke-width="4" stroke="#ef4444"/></>)
                                } else {
                                    return (<line x1={172*index+55} x2={172*index+55} y2={1440} stroke-width="2" stroke="#374151"/>)
                                }
                            })}

                            <line y1={(DateTime.now().hour)*60 + DateTime.now().minute} x2={55} 
                            y2={(DateTime.now().hour)*60 + DateTime.now().minute} stroke="#ef4444" stroke-width="4"/>
                            
                            </svg>
                            {Array.from({length: 24}, (v, index) => index).map((val, index) => (
                                <text className="absolute text-gray-500 text-sm"
                                style={{left:4, top: 60*(index)}}>{DateTime.fromObject({hour:index}).hour}:00</text>    
                            ))}
                            <div className="absolute left-6">
                                {eventsData && Array.from({length: secNum}, (v, index) => index).map((num, index) => (
                                    <div className="relative float-left" key={index} style={{height:1440, width:172}}>
                                        {eventsData && eventsData[DateTime.now().plus({days: num+offsetDays}).weekday].map((timeEvent, index) => (
                                            <EventElement key={index}
                                            timeEvent={timeEvent} relToday={DateTime.now().plus({days: num+offsetDays})}  
                                            setSelectedEvent={setEditedEvent} index={index} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ml-auto w-96 text-white overflow-hidden"> 
                    <EditEventsSideBar editedEvent={editedEvent} setEditedEvent={setEditedEvent}
                    editOnetimeEvent={editOnetimeEvent} editWeeklyEvent={editWeeklyEvent} editDailyEvent={editDailyEvent}
                    deleteOnetimeEvent={deleteOnetimeEvent} deleteWeeklyEvent={deleteWeeklyEvent} deleteDailyEvent={deleteDailyEvent}/>                        

                    <CreateEventsSideBar newTimeEvent={newTimeEvent} setNewEvent={setNewTimeEvent} editedEvent={editedEvent}
                    submitOnetimeEvent={createOnetimeEvent} submitWeeklyEvent={createWeeklyEvent} submitDailyEvent={createDailyEvent}
                    setSecNum={setSecNum}/>
                </div>
                
            </div>
            
            <MyFooter text='AlphaFlow: Focus'/>
        </div>
        )
}




const EventElement = (props) => {   
    const checkEvent = () => {
        if(props.timeEvent.type=='onetimeEvent') {
            if(props.timeEvent.start.day == props.relToday.day &&
            props.timeEvent.start.month == props.relToday.month) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }
    }

    if(checkEvent()) return (
        <div className="w-40 text-center absolute rounded-xl left-9 overflow-hidden"
        onClick={() => {props.setSelectedEvent({
            id: props.timeEvent.id,
            type: props.timeEvent.type,
            date: props.timeEvent.start.toFormat('dd.MM.yyyy'),
            start: props.timeEvent.start.toFormat('HH:mm'),
            finish: props.timeEvent.finish.toFormat('HH:mm'),
            day: Info.weekdays('short')[props.timeEvent.start.weekday-1].toUpperCase(),
            description: props.timeEvent.description,
            color: props.timeEvent.color
        })}}
        style={{
            height: ((props.timeEvent.finish.hour*60+props.timeEvent.finish.minute) - (props.timeEvent.start.hour*60+props.timeEvent.start.minute)), 
            top: props.timeEvent.start.hour*60 + props.timeEvent.start.minute,
            background: props.timeEvent.color,
            opacity: 0.7
        }}>
            {props.timeEvent.description}
        </div>
    )
}



const CreateEventsSideBar = (props) => {
    const modes = ['dailyEvent', 'weeklyEvent', 'onetimeEvent']
    const [modeIndex, setModeIndex] = useState(0)
    const [show, setShow] = useState(true)
    if(!props.editedEvent ) return (<div className="relative">
        <div className={`absolute z-10 rounded-br-xl bg-gray-900 w-9 h-16 top-0 ${show? '': 'left-5'}`}>
            <button className="text-3xl text-center bg-gray-800 rounded-md h-14 w-7 hover:bg-gray-700 transition-all"
            onClick={() => {
                if(show) {
                    props.setSecNum(Math.round((window.innerWidth /216)))
                } else {
                    props.setSecNum(Math.round(((window.innerWidth - 384)/182)))
                }
                setShow(!show)
            }}>
                {show ? <MdKeyboardDoubleArrowRight /> : <MdKeyboardDoubleArrowLeft /> }
            </button>
        </div>
        <div className={`relative bg-gray-800 p-2 rounded-xl py-4 flex flex-row h-full transition-[left] duration-500 ${show? 'left-0': 'left-96'}`}>
            
            <button className="mr-1 rounded-md font-bold text-xl transition-all
            hover:bg-gray-700 hover:font-black"
            onClick={() => {modeIndex > 0 && setModeIndex(modeIndex-1)}}>
                <span className="flex-col self-center">&lt;</span>
            </button>

            <div className="flex flex-col gap-3">
                <div className="text-xl text-center">
                    Create new <span className="text-blue-500">
                        {modes[modeIndex]=='onetimeEvent' && 'onetime'}
                        {modes[modeIndex]=='weeklyEvent' && 'weekly'}
                        {modes[modeIndex]=='dailyEvent' && 'daily'}
                    </span> event
                </div>
                <div>
                    <LargeInputField placeholder="new content here" value={props.newTimeEvent.description}
                    changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, description: val})}}/>
                </div>
                <div style={{display: modes[modeIndex]=='weeklyEvent'? 'block' : 'none'}}>
                    <span className="text-gray-400">day of the week</span>
                    <div >
                        <Select defaultValue={Object.keys(weekDays)[0]} 
                        onChange={(val) => {props.setNewEvent({...props.newTimeEvent, day: val.value})}} 
                        options={Object.keys(weekDays).map((val, index) => {
                            return {label:val, value:val}    
                        })}
                        unstyled
                        classNames={{
                            control: (state) => `bg-gray-700 p-1 rounded-md text-gray-100 mt-1 ${state.isFocused ? 'outline-none ring-1 border-blue-300':''}`,
                            option: (state) => `bg-gray-700 ${state.isSelected?'bg-indigo-700':''}`
                        }}/>
                    </div>
                </div>
                <div style={{display: modes[modeIndex]=='onetimeEvent'? 'block' : 'none'}}>
                        <div className="text-gray-400">date</div>
                        <DateInputField value={props.newTimeEvent.date} 
                        changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, date: val})}}/>
                    </div>
                <div>
                    <div className="flex flex-row">
                        <div className="inline">
                            <div className="text-gray-400">time period</div>
                            <div>
                                <span className="inline-block"><TimeInputField value={props.newTimeEvent.start} 
                                changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, start: val})}}/></span>
                                <span className="mx-auto font-extrabold"> — </span>
                                <span className="inline-block"><TimeInputField value={props.newTimeEvent.finish} 
                                changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, finish: val})}}/></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="text-gray-400 flex flex-wrap gap-2 mb-2">
                        <div className="flex-col"> select collor </div>
                        <div className="w-16 h-4 mt-1 rounded-md flex-col" style={{background: props.newTimeEvent.color}}></div>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-2">
                    <CirclePicker width="220"
                        onChangeComplete={(val, ev) => {props.setNewEvent({...props.newTimeEvent, color:val.hex})}}/>
                    </div>
                </div>
                <div className="w-full">
                    <ButtonSubmit2 text="create new event" onClick={() => {
                        modes[modeIndex] == 'dailyEvent' && props.submitDailyEvent()
                        modes[modeIndex] == 'weeklyEvent' && props.submitWeeklyEvent()
                        modes[modeIndex] == 'onetimeEvent' && props.submitOnetimeEvent()
                    }}/>
                </div>
            </div>

            <button className="ml-1 rounded-md font-bold text-xl transition-all
            hover:bg-gray-700 hover:font-black"
            onClick={() => {modeIndex < modes.length-1 && setModeIndex(modeIndex+1)}}>
                <span className="flex-col self-center">&gt;</span>
            </button>
        </div>
    </div>)
}



const EditEventsSideBar = (props) => {
    if(props.editedEvent) { return (
        <div className="my-2 py-4 mx-1 bg-gray-800 flex flex-col gap-3 relative">
            <button className="absolute top-3 right-3 font-black bg-gray-800 hover:bg-gray-700 rounded-full "
            onClick={() => {props.setEditedEvent(null)}}>     
                ✖ 
            </button>
            <div className="text-xl mx-auto mt-2 text-center">
                <span className="text-blue-500">Edit</span> event
                
            </div>
            <div className="text-center">
                <LargeInputField placeholder="new content here" value={props.editedEvent.description}
                changeValue={(val) => {props.setEditedEvent({...props.editedEvent, description: val})}}/>
            </div>
            {props.editedEvent.type=='onetimeEvent' && (
                <div>
                    <span className="text-gray-400">date</span>
                    <DateInputField value={props.editedEvent.date} 
                    changeValue={(val) => {props.setEditedEvent({...props.editedEvent, date: val})}}/>
                </div>
            )}
            {props.editedEvent.type=='weeklyEvent' && (
                <div>
                    <span className="text-gray-400">day of the week</span>
                    <div >
                        <Select defaultValue={Object.keys(weekDays)[0]} 
                        onChange={(val) => {props.setEditedEvent({...props.editedEvent, day: val.value})}} 
                        options={Object.keys(weekDays).map((val, index) => {
                            return {label:val, value:val}    
                        })}
                        unstyled
                        classNames={{
                            control: (state) => `bg-gray-700 p-1 rounded-md text-gray-100 mt-1 ${state.isFocused ? 'outline-none ring-1 border-blue-300':''}`,
                            option: (state) => `bg-gray-700 ${state.isSelected?'bg-indigo-700':''}`
                        }}/>
                    </div>
                </div>
            )}
            <div>
                <div className="text-gray-400">time period</div>
                <div className="flex">
                    <div className="inline">
                        <div>
                            <span className="inline-block"><TimeInputField value={props.editedEvent.start} 
                            changeValue={(val) => {props.setEditedEvent({...props.newTimeEvent, start: val})}}/></span>
                            <span className="mx-auto font-extrabold"> — </span>
                            <span className="inline-block"><TimeInputField value={props.editedEvent.finish} 
                            changeValue={(val) => {props.setEditedEvent({...props.editedEvent, finish: val})}}/></span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="text-gray-400 flex flex-wrap gap-2 mb-2">
                    <div className="flex-col"> select collor </div>
                    <div className="w-16 h-4 mt-1 rounded-md flex-col" style={{background: props.editedEvent.color}}></div>
                </div>
                <div className="bg-gray-700 rounded-lg my-1 p-2">
                    <CirclePicker width="220"
                    onChangeComplete={(val, ev) => {props.setEditedEvent({...props.editedEvent, color:val.hex})}}/>
                </div>
            </div>
            <div>
                <ButtonSubmit2 text='edit event' onClick={() => {
                    props.editedEvent.type == 'dailyEvent' && props.editDailyEvent()
                    props.editedEvent.type == 'weeklyEvent' && props.editWeeklyEvent()
                    props.editedEvent.type == 'onetimeEvent' && props.editOnetimeEvent()
                }}/>    
                <ButtonSubmit2 text='close' onClick={() => {props.setEditedEvent(null)}}/>
                <ButtonSubmit2 text='delete event' onClick={() => {
                    props.editedEvent.type == 'dailyEvent' && props.deleteDailyEvent()
                    props.editedEvent.type == 'weeklyEvent' && props.deleteWeeklyEvent()
                    props.editedEvent.type == 'onetimeEvent' && props.deleteOnetimeEvent()
                }}/>
            </div>
        </div>
    )}
}


export default SchedulePage