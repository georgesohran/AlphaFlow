import { useEffect, useState } from "react"

import TopNavBar from "../components/navbar"
import MyFooter from "../components/footer"
import { getAuth }from "../util" 

import { DateTime } from "luxon"


import Cookies from "universal-cookie"
const cookies = new Cookies()  


const SchedulePage = () => {
    const [eventsData, setEventData] = useState([])

    useEffect(() => {
        // getAuth().then((auth) => {
        //     if(auth) {
        //         getEvents()
        //     } else {
        //         navigate('/login')
        //     }
        // })
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
            <TopNavBar authorized={true}/>
            <div className='bg-gradient-to-t from-gray-900 to-indigo-800 p-2'>
                
                <EventsVisualizer />
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
        <div className="w-52 bg-no-repeat bg-time-marks
        flex-wrap relative z-0" 
        style={{height:1100}}>
        
            
        </div>
    )
}


const eventElement = (event) => {
    // somehow transform date time data into height and x cords
    return (
        <div className="w-36 bg-red-700/80 text-center absolute rounded-xl
        left-12 top-3"
        style={{height:100}}>
            hi
        </div>
    )
}


export default SchedulePage