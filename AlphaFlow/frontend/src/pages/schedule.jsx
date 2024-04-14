import { useEffect, useState } from "react"

import TopNavBar from "../components/navbar"
import MyFooter from "../components/footer"
import { getAuth }from "../util" 

import { DateTime } from "luxon"
import { Info } from "luxon"


import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"
const cookies = new Cookies()  
const weekDays = { 'MON':1, 'TUE':2, 'WED':3, 'THU':4, 'FRI':5, 'SAT':6, 'SUN':7}


const SchedulePage = () => {
    const [eventsData, setEventData] = useState({})

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
                    start: DateTime.fromISO(timeEvent.start),
                    finish: DateTime.fromISO(timeEvent.finish),
                    color: timeEvent.color,
                    description: timeEvent.description
                }
                tempTimeEventsData[weekDays[timeEvent.day]].push(dateTimeEvent)
            }

            for(let timeEvent of res_data['daily_events']) {
                let dateTimeEvent = {
                    start: DateTime.fromISO(timeEvent.start),
                    finish: DateTime.fromISO(timeEvent.finish),
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

    return (
        <div className='bg-gray-900 min-h-screen'>
            <TopNavBar authorized={true}/>
            <div className='bg-gradient-to-t from-gray-900 to-indigo-800 p-2'>
                <div className="flex overflow-x-scroll">
                    {
                    [0,1,2,3,4,5,6].map((num, index) => (
                        <EventsVisualizer key={index} 
                        events={eventsData[DateTime.now().plus({days: num}).weekday]} 
                        day={Info.weekdays('short')[DateTime.now().plus({days: num}).weekday-1]} />
                    ))
                    }
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
                    <EventElement timeEvent={timeEvent} key={index}/>
                ))}
            </div>
        </div>
    )
}



const EventElement = (props) => {
    // somehow transform date time data into height and x cords
    return (
        <div className="w-36 bg-red-700/80 text-center absolute rounded-xl left-12 "
        style={{height:100, top: props.timeEvent.start.minutes}}>
            {props.timeEvent.description}
        </div>
    )
}


export default SchedulePage