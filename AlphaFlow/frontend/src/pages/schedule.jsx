import { useEffect, useState } from "react"

import TopNavBar from "../components/navbar"
import MyFooter from "../components/footer"
import { getAuth }from "../util" 
import { TimeInputField, LargeInputField, DateInputField, InputField} from "../components/inputfield"
import { ButtonSubmit1 } from "../components/buttons"
import Select from "react-select"

import { DateTime, Info } from "luxon"
import { CirclePicker } from 'react-color'

import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"
const cookies = new Cookies()

const weekDays = { 'MON':1, 'TUE':2, 'WED':3, 'THU':4, 'FRI':5, 'SAT':6, 'SUN':7}

const SchedulePage = () => {
    const [eventsData, setEventData] = useState(null)
    const [offsetHours, setOffsetHours] = useState(11)
    const [selectedEventIndex, setSelectedEventIndex] = useState([1,1])
    const [detail, setDetail] = useState('')
    const [newTimeEvent, setNewTimeEvent] = useState({
        type:'dailyEvent',
        date:'',
        start: '',
        finish: '',
        day:'',
        description: '',
        color:''
    })
    const [editedEvent, setEditedEvent] = useState(null)

    const secNum = Math.round((window.innerWidth - 336) / 214)
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
            setEventData(tempTimeEventsData)
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

    const editOneTimeEvent = async() => {
        fetch()
        .then()
        .then()
    }
    const editWeeklyEvent = async() => {
        fetch()
        .then()
        .then()
    }
    const editDailyEvent = async() => {
        fetch()
        .then()
        .then()
    }

    return (
        <div className='bg-gray-900 min-h-screen'>
            {
                detail && 
                <div className="absolute top-2 left-2 bg-gray-800 rounded-md text-slate-50 p-2">
                    <p>{detail}</p>
                </div>
            }

            <TopNavBar authorized={true}/>
            <div className='p-2'>
                <div className="flex">
                    <div className="relative">
                        {/* bg marks */}
                        <div className="z-0 absolute top-16" 
                            style={{height:700}}>

                                <svg width={secNum*204+40} height="700" viewBox={`0 0 ${secNum*204+40} 700`} fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute">
                                <rect width={secNum*204+40} height="700" fill="#1f2937" rx={8}/>
                                <line y1={0} x1={8} x2={secNum*204+32} y2={0} stroke="#374151" stroke-width="4"/>
                                {Array.from({length: 11}, (v, index) => index).map((val, index) => 
                                    <line y1={60*index+46} x2={secNum*204+40} y2={60*index+46} stroke="#374151" stroke-width="2"/>    
                                )}
                                {Array.from({length: secNum}, (v, index) => index).map((val, index) => 
                                    <line x1={204*index+47} x2={204*index+47} y2={700} stroke="#374151" stroke-width="2"></line>
                                )}
                                </svg>
                                {Array.from({length: 11}, (v, index) => index).map((val, index) => (
                                    <text className="absolute text-gray-500 text-sm"
                                    style={{left:4, top: 26+60*index}}>{DateTime.fromObject({hour:offsetHours}).plus({hour:index}).hour}:00</text>    
                                ))}
                        </div>
                        
                        <div className=" ml-12 relative flex">
                        {eventsData && Array.from({length: secNum}, (v, index) => index).map((num, index) => (
                            <EventsVisualizer key={index} offsetHours={offsetHours}
                            events={eventsData[DateTime.now().plus({days: num}).weekday]} 
                            weekDay={Info.weekdays('short')[DateTime.now().plus({days: num}).weekday-1]} 
                            monthDay={DateTime.now().plus({days:num}).day}
                            setSelectedEvent={setEditedEvent}/>
                        ))}
                        </div>
                    </div>

                    <div className="bg-gray-800 ml-auto w-80 p-2 rounded-xl divide-y divide-gray-600 text-white">
                        <EditEventsSideBar editedEvent={editedEvent} setEditedEvent={setEditedEvent}/>
                        
                        <CreateEventsSideBar newTimeEvent={newTimeEvent} setNewEvent={setNewTimeEvent}
                        submitOnetimeEvent={createOnetimeEvent} submitWeeklyEvent={createWeeklyEvent} submitDailyEvent={createDailyEvent}/>
                    </div>
                </div>
            </div>
            <MyFooter text='AlphaFlow: Focus'/>
        </div>
        )
}



const EventsVisualizer = (props) => {
    return (
        <div>
            <div className="text-center bg-gray-800 rounded-t-xl 
            w-48 mr-3 h-16 text-white outline outline-2 outline-gray-700">
                <p className="text-xl">{props.weekDay}</p>
                <p className="text-gray-400">{props.monthDay}</p>
            </div>
            <div className="relative float-left">
                {props.events && props.events.map((timeEvent, index) => (
                    <EventElement timeEvent={timeEvent} key={index} offset={props.offsetHours} 
                    setSelectedEvent={props.setSelectedEvent} index={index} day={props.weekDay.toUpperCase()}/>
                ))}
            </div>
        </div>
    )
}



const EventElement = (props) => {
    if(props.timeEvent.start.hour > props.offset) return (
        <div className="w-40 text-center absolute rounded-xl left-5"
        onClick={() => {props.setSelectedEvent({
            type: props.timeEvent.type,
            date: props.timeEvent.start.toFormat('dd.MM.yyyy'),
            start: props.timeEvent.start.toFormat('HH.mm'),
            finish: props.timeEvent.finish.toFormat('HH.mm'),
            day: Info.weekdays('short')[props.timeEvent.start.weekday].toUpperCase(),
            description: props.timeEvent.description,
            color: props.timeEvent.color
        })}}
        style={{
            height: ((props.timeEvent.finish.hour*60+props.timeEvent.finish.minute) - (props.timeEvent.start.hour*60+props.timeEvent.start.minute)), 
            top: (props.timeEvent.start.hour - props.offset)*60 + props.timeEvent.start.minute + 46,
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

    return (
        <div className="my-2 py-4 flex">
            <button className="mr-1 rounded-md font-bold text-xl transition-all
            hover:bg-gray-700 hover:font-black"
            onClick={() => {modeIndex > 0 && setModeIndex(modeIndex-1)}}>
                <span className="flex-col self-center">&lt;</span>
            </button>

            <div style={{display:modes[modeIndex]=="dailyEvent"?"flex":"none"}} 
            className="flex flex-wrap gap-3">
                <div className="text-xl">
                    Create new <span className="text-blue-500">daily</span> event
                </div>
                <div className="text-center">
                    <LargeInputField placeholder="new content here" value={props.newTimeEvent.description}
                    changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, description: val})}}/>
                </div>
                <div>
                    <span className="text-gray-400">time period</span>
                    <div className="flex" id="time-inputs">
                        <TimeInputField className="mr-auto" value={props.newTimeEvent.start} 
                        changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, start: val})}} />
                        <span className="mx-auto inline-block pt-1 text-3xl"> - </span>
                        <TimeInputField className="ml-auto" value={props.newTimeEvent.finish} 
                        changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, finish: val})}}/>
                    </div>
                </div>
                <div>
                    <span className="text-gray-400">select collor</span>
                    <div className="bg-gray-700 rounded-lg my-1 p-2">
                        <CirclePicker width="220"
                        onChangeComplete={(val, ev) => {props.setNewEvent({...props.newTimeEvent, color:val.hex})}}/>
                    </div>
                </div>
                <div>
                    <ButtonSubmit1 text="create daily event" onClick={props.submitDailyEvent}/>
                </div>
            </div>
            
            <div style={{display:modes[modeIndex]=="weeklyEvent"?"flex":"none"}}
            className="flex flex-wrap gap-3">
                <div className="text-xl">
                    Create new <span className="text-blue-500">weekly</span> event
                </div>
                <LargeInputField placeholder="new content here" value={props.newTimeEvent.description}
                changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, description: val})}}/>
                <div>
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
                <div>
                    <span className="text-gray-400">time period</span>
                    <div className="flex" id="time-inputs">
                        <TimeInputField className="mr-auto" value={props.newTimeEvent.start} 
                        changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, start: val})}} />
                        <span className="mx-auto inline-block pt-1 text-3xl"> - </span>
                        <TimeInputField className="ml-auto" value={props.newTimeEvent.finish} 
                        changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, finish: val})}}/>
                    </div>
                </div>
                <div className="flex">
                    <span className="text-gray-400">select collor </span>
                    <div className="bg-gray-700 rounded-lg p-2">
                    <CirclePicker circleSize={28} width="220"
                    onChangeComplete={(val, ev) => {props.setNewEvent({...props.newTimeEvent, color:val.hex})}}/>
                    </div>
                </div>
                <div>
                    <ButtonSubmit1 text="create weekly event" onClick={props.submitWeeklyEvent}/>
                </div>
            </div>

            <div style={{display:modes[modeIndex]=="onetimeEvent"?"flex":"none"}}
            className="flex flex-wrap gap-3">
                <div className="text-xl">
                    Create new <span className="text-blue-500">onetime</span> event
                </div>
                <LargeInputField placeholder="new content here" value={props.newTimeEvent.description}
                changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, description: val})}}/>
                <div>
                    <span className="text-gray-400">date</span>
                    <DateInputField value={props.newTimeEvent.date} 
                    changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, date: val})}}/>
                </div>
                <div>
                    <span className="text-gray-400">time period</span>
                    <div className="flex" id="time-inputs">
                        <TimeInputField className="mr-auto" value={props.newTimeEvent.start} 
                        changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, start: val})}}/>
                        <span className="mx-auto inline-block pt-1 text-3xl"> - </span>
                        <TimeInputField className="ml-auto" value={props.newTimeEvent.finish} 
                        changeValue={(val) => {props.setNewEvent({...props.newTimeEvent, finish: val})}}/>
                    </div>
                </div>
                <div>
                    <span className="text-gray-400">select collor</span>
                    <div className="bg-gray-700 rounded-lg p-2">
                    <CirclePicker width="220"
                        onChangeComplete={(val, ev) => {props.setNewEvent({...props.newTimeEvent, color:val.hex})}}/>
                    </div>
                </div>
                <div>
                    <ButtonSubmit1 text="create onetime event" onClick={props.submitOnetimeEvent}/>
                </div>
            </div>

            <button className="ml-1 rounded-md font-bold text-xl transition-all
            hover:bg-gray-700 hover:font-black"
            onClick={() => {modeIndex < modes.length-1 && setModeIndex(modeIndex+1)}}>
                <span className="flex-col self-center">&gt;</span>
            </button>
        </div>
    )
}



const EditEventsSideBar = (props) => {
    if(props.editedEvent) return (
        <div className="my-2 py-4 mx-1 bg-gray-800 rounded-lg">
            <div className="text-xl text-center">
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
                        onChange={(val) => {props.setNewEvent({...props.editedEvent, day: val.value})}} 
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
                <span className="text-gray-400">time period</span>
                <div className="flex" id="time-inputs">
                    <TimeInputField className="mr-auto" value={props.editedEvent.start} 
                    changeValue={(val) => {props.setNewEvent({...props.editedEvent, start: val})}} />
                    <span className="mx-auto inline-block pt-1 text-3xl"> - </span>
                    <TimeInputField className="ml-auto" value={props.editedEvent.finish} 
                    changeValue={(val) => {props.setNewEvent({...props.editedEvent, finish: val})}}/>
                </div>
            </div>
            <div>
                <span className="text-gray-400">
                    select collor 
                    <span className="w-16 h-4 rounded-md" style={{background: props.editedEvent.color}}></span>
                </span>
                
                <div className="bg-gray-700 rounded-lg my-1 p-2">
                    <CirclePicker width="220"
                    onChangeComplete={(val, ev) => {props.setNewEvent({...props.editedEvent, color:val.hex})}}/>
                </div>
            </div>
            <div>
                <ButtonSubmit1 text="edit event"/>
            </div>
        </div>
    )
}



const ChangeApearenceSideBar = (props) => {
    return (
        <div>

        </div>
    )
}

export default SchedulePage