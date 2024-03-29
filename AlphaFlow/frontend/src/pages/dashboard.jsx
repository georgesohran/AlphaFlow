import { MultiContainer } from "../components/info_containers";
import TopNavBar from "../components/navbar";
import MyFooter from "../components/footer";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import Cookies from "universal-cookie";
const cookies = new Cookies();


const Dashboard = () => {

    let [notes, setNotes] = useState([])

    const getNotes = async() => {
        fetch('api/notes', {
            method:'GET',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials:'same-origin'
        })
        .then(res => {console.log(res); return res.json()})
        .then(res_data => {
            console.log(res_data)
            setNotes(res_data)
        })
    }
    useEffect(() => {
        getNotes()
    }, [])

    return (
        <div className='bg-gray-900 min-h-screen'>

            <div className='bg-gradient-to-t from-gray-900 to-indigo-800'>
                <TopNavBar authorized={true}/>
                <div className='mx-auto justify-center md:flex mb-56'>
                    <MultiContainer title='Notes' description='All of your notes' items={notes}/>
                    <br/>
                    <MultiContainer title='Goals' description='All of your goals' items={notes}/>  
                </div> 
                
            </div>
            <MyFooter text='something'/>
        </div>
    )
}


export default Dashboard