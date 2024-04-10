import { useEffect, useState } from "react"

import TopNavBar from "../components/navbar"
import MyFooter from "../components/footer"
import { getAuth }from "../util" 

import { DateTime } from "luxon"
import { Stage, Layer, Text, Line} from 'react-konva';
import {Html} from 'react-konva-utils'

import Cookies from "universal-cookie"
const cookies = new Cookies()  


const SchedulePage = () => {
    const [eventsData, setEventData] = useState([])

    useEffect(() => {
        getAuth().then((auth) => {
            if(auth) {
                getEvents()
            } else {
                navigate('/login')
            }
        })
    }, [])


    const getEvents = () => {
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
            const event1start = DateTime.fromISO(res_data.onetime_events[0].start)
            const event1finish = DateTime.fromISO(res_data.onetime_events[0].end)
            const now = DateTime.now()
            console.log(event1start, event1finish, now)
        })
    } 
    
    return (
        <div className='bg-gray-900 min-h-screen'>

        <div className='bg-gradient-to-t from-gray-900 to-indigo-800'>
            <TopNavBar authorized={true}/>
            <div>
            <EventsVisualizer/>
            </div>
        </div>
        <MyFooter text='something'/>
    </div>
        )
}

const addEventBar = () => {
    return (
        <div>

        </div>
    )
}



const EventsVisualizer = (props) => {
    
    return (
        <div className="h-96 flex-wrap">
            <div className="size-36 bg-black text-white text-center mb-4">
                hi
            </div>
            <div className="size-36 bg-black text-white text-center">
                hi 2
            </div>
        </div>
    )
}

export default SchedulePage