import { useEffect, useState } from "react"

import TopNavBar from "../components/navbar"
import MyFooter from "../components/footer"
import { getAuth }from "../util" 
import { TimeInputField, LargeInputField, OptionsInputField} from "../components/inputfield"

import { DateTime } from "luxon"

import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"
const cookies = new Cookies()  
const weekDays = { 'MON':1, 'TUE':2, 'WED':3, 'THU':4, 'FRI':5, 'SAT':6, 'SUN':7}


const SchedulePage = () => {
    const [eventsData, setEventData] = useState({})
    const [offsetHours, setOffsetHours] = useState(11)
    const secNum = (window.innerWidth - 300) / 210

    const [selectedEventIndex, setSelectedEventIndex] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        getAuth().then((auth) => {
            if(auth) {
                // getEvents()
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

    return (
        <div className='bg-gray-900 min-h-screen'>
            <TopNavBar authorized={true}/>
            <div className='bg-gradient-to-t from-gray-900 to-indigo-800 p-2'>
                <div className="flex">
                    {/* {
                    Array.from({length: secNum}, (v, index) => index).map((num, index) => (
                        <EventsVisualizer key={index} offset={offsetHours}
                        events={eventsData[DateTime.now().plus({days: num}).weekday]} 
                        day={Info.weekdays('short')[DateTime.now().plus({days: num}).weekday-1]} />
                    ))
                    } */}
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
            <div className="w-52 bg-no-repeat bg-time-marks 
            flex-wrap relative -top-6 z-0" 
            style={{height:950}}>
                {props.events && props.events.map((timeEvent, index) => (
                    <EventElement timeEvent={timeEvent} key={index} offset={props.offset}/>
                ))}
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


const EventsSettingSideBar = () => {
    return (
        <div className="bg-gray-800 ml-auto w-64 md:w-72 p-2 rounded-xl divide-y divide-gray-600 text-white"
        style={{height:950}}>
            <div className="py-4 mx-1 flex flex-wrap gap-4">
                No event selected
            </div>
            {/* new dayly event */}
            <div className="my-2 py-4 mx-2 flex flex-wrap gap-3">
                <div className="text-xl">
                    Create new daily event
                </div>
                <LargeInputField placeholder="new content here"/>
                <div>
                    <span className="text-gray-400">time period</span>
                    <div className="flex" id="time-inputs">
                        <TimeInputField className="mr-auto"/><span className="mx-auto inline-block pt-1 text-3xl"> - </span><TimeInputField className="ml-auto"/>
                    </div>
                </div>
            </div>
            {/* new weekly event */}
            <div className="py-4 my-2 mx-2 flex flex-wrap gap-3">
                <div className="text-xl">
                    Create new weekly event
                </div>
                <LargeInputField placeholder="new content here"/>
                <div>
                    <OptionsInputField options={['mon', 'tue', 'wed']}/>
                </div>
                <div>
                    <span className="text-gray-400">time period</span>
                    <div className="flex" id="time-inputs">
                        <TimeInputField className="mr-auto"/><span className="mx-auto inline-block pt-1 text-3xl"> - </span><TimeInputField className="ml-auto"/>
                    </div>
                </div>
            </div>
            {/* new onetime event */}
            <div className="py-4 my-2 mx-2 flex flex-wrap gap-3">
                <div className="text-xl">
                    Create new onetime event
                </div>
                
                <LargeInputField placeholder="new content here"/>
                <div>
                    <span className="text-gray-400">time period</span>
                    <div className="flex" id="time-inputs">
                        <TimeInputField className="mr-auto"/><span className="mx-auto inline-block pt-1 text-3xl"> - </span><TimeInputField className="ml-auto"/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SchedulePage