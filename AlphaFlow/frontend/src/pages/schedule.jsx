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
    return (
        <div>
            <div class="p-4 bg-gray-500">
                <div class=" h-40 p-4 bg-gray-800 w-auto rounded-md relative">
                    {/* give here some js logic later */}
                    <div class="h-32 bg-red-500 absolute w-16 left-0 top-0">aaa1</div>
                    <div class="h-32 bg-red-500 absolute w-16 left-64 top-0">aaa2</div>
                    <div class="h-32 bg-red-500 absolute w-16 left-32 top-0">aaa3</div>
                </div>
            </div>
        </div>
    )
}

export default SchedulePage