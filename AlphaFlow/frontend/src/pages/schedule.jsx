import { useEffect, useState } from "react"

import { DateTime } from "luxon"

import Cookies from "universal-cookie"
const cookies = new Cookies()  


const SchedulePage = () => {
    const [eventsData, setEventData] = useState({})

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
    let used_events

    if(window.screen.width >= 768) {
        // aply some filter
        used_events = props.events
    } else {

    }

    return (
        <div>
            <div class=" h-40 bg-gray-800 w-auto rounded-md relative border-2 border-gray-400">
                <div class="h-32 bg-red-500 w-16 absolute rounded-md top-4">{}</div>
                <div class="h-32 bg-red-500 w-16 absolute rounded-md top-4">{}</div>
                <div class="h-32 bg-red-500 w-16 absolute rounded-md top-4">{}</div>
            </div>
        </div>
    )
}

export default SchedulePage