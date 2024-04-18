import { useEffect, useState } from "react"

import TopNavBar from "../components/navbar"
import MyFooter from "../components/footer"
import { getAuth }from "../util" 
import { TimeInputField, LargeInputField, OptionsInputField, DateInputField} from "../components/inputfield"

import { DateTime, Info } from "luxon"

import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"
const cookies = new Cookies()  
const weekDays = { 'MON':1, 'TUE':2, 'WED':3, 'THU':4, 'FRI':5, 'SAT':6, 'SUN':7}


const SchedulePage = () => {
    const [eventsData, setEventData] = useState({})
    const [offsetHours, setOffsetHours] = useState(11)
    const [selectedEventIndex, setSelectedEventIndex] = useState(0)
    const [newUTCTimeCreate, setNewUTCTimeCreate] = useState('')    

    const secNum = (window.innerWidth - 300) / 210
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
        fetch('api/get_upcoming_events',{
            method:'GET',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials:'same-origin'
        })
        .then(res => res.json())
        .then(res_data => {
            console.log(res_data)

            let tempTimeEventsData = {
                1:[],
                2:[],
                3:[],
                4:[],
                5:[],
                6:[],
                7:[],
            }

            for(let timeEvent of res_data['onetime_events']) {
                let dateTimeEvent = {
                    start: DateTime.fromISO(timeEvent.start),
                    finish: DateTime.fromISO(timeEvent.finish),
                    color: timeEvent.color,
                    description: timeEvent.description
                }
                tempTimeEventsData[dateTimeEvent.start.weekday].push(dateTimeEvent)
            }

            for(let timeEvent of res_data['weekly_events']) {
                let dateTimeEvent = {
                    start: DateTime.fromISO(timeEvent.start, {zone:'UTC'}).toLocal(),
                    finish: DateTime.fromISO(timeEvent.finish, {zone:'UTC'}).toLocal(),
                    color: timeEvent.color,
                    description: timeEvent.description
                }
                tempTimeEventsData[weekDays[timeEvent.day]].push(dateTimeEvent)
            }

            for(let timeEvent of res_data['daily_events']) {
                let dateTimeEvent = {
                    start: DateTime.fromISO(timeEvent.start, {zone:'UTC'}).toLocal(),
                    finish: DateTime.fromISO(timeEvent.finish, {zone:'UTC'}).toLocal(),
                    color: timeEvent.color,
                    description: timeEvent.description,
                }
                for(let i = 1; i < 8; i++) {
                    tempTimeEventsData[i].push(dateTimeEvent)
                }
            }
            console.log(tempTimeEventsData)

            setEventData(tempTimeEventsData)
        })
    }

    const createOnetimeEvent = async() => {
        
    }
    const createWeaklyEvent = async() => {

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
                start:'12:30',
                finish:'13:00',
                description:'fetch creating event'
            })
        })
        .then(res => res.json())
        .then(res_data => {
            console.log(res_data)
        })
    }

    return (
        <div className='bg-gray-900 min-h-screen'>
            <TopNavBar authorized={true}/>
            <div className='bg-gradient-to-t from-gray-900 to-indigo-800 p-2'>
                <div className="flex">
                    {
                    Array.from({length: secNum}, (v, index) => index).map((num, index) => (
                        <EventsVisualizer key={index} offsetHours={offsetHours}
                        events={eventsData[DateTime.now().plus({days: num}).weekday]} 
                        day={Info.weekdays('short')[DateTime.now().plus({days: num}).weekday-1]} />
                    ))
                    }

                    <EventsSettingSideBar />
                </div>

            </div>
            <MyFooter text='something'/>
        </div>
        )
}



const EventsVisualizer = (props) => {
    return (
        <div className="relative">
            <p className="text-xl text-center bg-gray-800 rounded-t-xl 
            w-48 h-16 mx-auto text-white">{props.day}</p>
            <div className="w-52 bg-no-repeat 
            flex-wrap relative -top-6 z-0" 
            style={{height:900}}>
                {props.events && props.events.filter((timeEvent) => timeEvent.start.hour > props.offsetHours).map((timeEvent, index) => (
                    <EventElement timeEvent={timeEvent} key={index} offset={props.offsetHours}/>
                ))}


                {/* background marks */}
                {Array.from({length: 11}, (v, index) => index).map((val, index) => (
                    <text className="absolute text-gray-500 text-sm"
                    style={{left:4, top: 26+76*index}}>{DateTime.fromObject({hour:props.offsetHours}).plus({hour:index}).hour}:00</text>    
                ))}
                <svg width="200" height="1000" viewBox="0 0 200 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="900" rx="30" fill="#111827"/>
                <line y1="46" x2="200" y2="46" stroke="#1F2937" stroke-width="2"/>
                <line y1="122" x2="200" y2="122" stroke="#1F2937" stroke-width="2"/>
                <line y1="198" x2="200" y2="198" stroke="#1F2937" stroke-width="2"/>
                <line y1="274" x2="200" y2="274" stroke="#1F2937" stroke-width="2"/>
                <line y1="350" x2="200" y2="350" stroke="#1F2937" stroke-width="2"/>
                <line y1="426" x2="200" y2="426" stroke="#1F2937" stroke-width="2"/>
                <line y1="502" x2="200" y2="502" stroke="#1F2937" stroke-width="2"/>
                <line y1="578" x2="200" y2="578" stroke="#1F2937" stroke-width="2"/>
                <line y1="654" x2="200" y2="654" stroke="#1F2937" stroke-width="2"/>
                <line y1="730" x2="200" y2="730" stroke="#1F2937" stroke-width="2"/>
                <line y1="806" x2="200" y2="806" stroke="#1F2937" stroke-width="2"/>
                </svg>
            </div>
        </div>
    )
}



const EventElement = (props) => {
    return (
        <div className="w-36 bg-red-700/80 text-center absolute rounded-xl left-12 "
        style={{
            height: (props.timeEvent.finish.hour-props.timeEvent.start.hour)*76 + (props.timeEvent.finish.minute-props.timeEvent.start.minute) , 
            top: (props.timeEvent.start.hour - props.offset)*76 + props.timeEvent.start.minute + 46
            
        }}>
            {props.timeEvent.description}
        </div>
    )
}


const EventsSettingSideBar = (props) => {
    const modes = ['dailyEvent', 'weeklyEvent', 'onetimeEvent']
    
    const [modeIndex, setModeIndex] = useState(0)

    return (
        <div className="bg-gray-800 ml-auto w-72 md:w-92 p-2 rounded-xl divide-y divide-gray-600 text-white">
            <div className="py-4 mx-1 flex flex-wrap gap-4">
                No event selected {/* edit it later */}
            </div>
            {/* new dayly event */}
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
                        <LargeInputField placeholder="new content here"/>
                    </div>
                    <div>
                        <span className="text-gray-400">time period</span>
                        <div className="flex" id="time-inputs">
                            <TimeInputField className="mr-auto"/><span className="mx-auto inline-block pt-1 text-3xl"> - </span><TimeInputField className="ml-auto"/>
                        </div>
                    </div>
                </div>
                
                <div style={{display:modes[modeIndex]=="weeklyEvent"?"flex":"none"}}
                className="flex flex-wrap gap-3">
                    <div className="text-xl">
                        Create new <span className="text-blue-500">weekly</span> event
                    </div>
                    <LargeInputField placeholder="new content here"/>
                    <div>
                        <span className="text-gray-400"> day of the week</span>
                        <div >
                            <OptionsInputField options={Object.keys(weekDays)}/>
                        </div>
                    </div>
                    <div>
                        <span className="text-gray-400">time period</span>
                        <div className="flex" id="time-inputs">
                            <TimeInputField className="mr-auto"/><span className="mx-auto inline-block pt-1 text-3xl"> - </span><TimeInputField className="ml-auto"/>
                        </div>
                    </div>
                </div>

                <div style={{display:modes[modeIndex]=="onetimeEvent"?"flex":"none"}}
                className="flex flex-wrap gap-3">
                    <div className="text-xl">
                        Create new <span className="text-blue-500">onetime</span> event
                    </div>
                    <LargeInputField placeholder="new content here"/>
                    <div>
                        <span className="text-gray-400">date</span>
                        <DateInputField />
                    </div>
                    <div>
                        <span className="text-gray-400">time period</span>
                        <div className="flex" id="time-inputs">
                            <TimeInputField className="mr-auto"/><span className="mx-auto inline-block pt-1 text-3xl"> - </span><TimeInputField className="ml-auto"/>
                        </div>
                    </div>
                </div>

                <button className="ml-1 rounded-md font-bold text-xl transition-all
                hover:bg-gray-700 hover:font-black"
                onClick={() => {modeIndex < modes.length-1 && setModeIndex(modeIndex+1)}}>
                    <span className="flex-col self-center">&gt;</span>
                </button>
            </div>
            {/* new weekly event */}
            <div className="py-4 my-2 mx-2 flex flex-wrap gap-3">
                something
            </div>
    
        </div>
    )
}


export default SchedulePage