import { useEffect, useState } from "react"

import TopNavBar from "../components/navbar"
import MyFooter from "../components/footer"
import { getAuth }from "../util" 

import { DateTime } from "luxon"
import { Stage, Layer, Text, Line } from 'react-konva';
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
    const startX = 10
    const offX = 80

    let used_events

    let time_period

    return (
        <div className="my-20 mx-8">
            <div class=" h-40 bg-gray-800 w-auto rounded-md relative border-2 border-red-600">
                <Stage width={window.innerWidth-64} height={props.height}>    
                    <Layer >
                        <Line x={startX} y={0} points={[0,0, 0,props.height]} stroke={'black'} />
                        <Line x={startX+offX} y={0} points={[0,0, 0,props.height]} stroke={'black'} />
                    </Layer>
                    <Layer>
                        <Html>
                            <div className="bg-red-600 ">hi</div>
                        </Html>
                    </Layer>
                </Stage>
            </div>
        </div>
    )
}



const TimeMarksCanvas = (props) => {
    let startX = 10
    let offX = 80
    
    let lines = [
        <Line x={startX} y={0} points={[0,0, 0,40]} stroke='black'></Line>,
        <Line x={startX + offX} y={0} points={[0,0, 0,40]}></Line>,
        <Line x={startX + offX*2} y={0} points={[0,0, 0,40]}></Line>,
        <Line x={startX + offX*3} y={0} points={[0,0, 0,40]}></Line>,
        <Line x={startX + offX*4} y={0} points={[0,0, 0,40]}></Line>,
    ]

    
    return (
        <Stage width={window.innerWidth-64} height={props.height}>    
            <Layer>
                <Line x={startX} y={0} points={[0,0, 0,props.height]} stroke={'black'} />
                <Line x={startX+offX} y={0} points={[0,0, 0,props.height]} stroke={'black'} />
            </Layer>
        </Stage>
    )
}

export default SchedulePage