import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { MultiContainer } from "../components/info_containers";
import TopNavBar from "../components/navbar";
import MyFooter from "../components/footer";



const Dashboard = () => {

    let [notes, setNotes] = useState([])

    const getNotes = async() => {
        fetch('api/get_notes')
    }
    useEffect(() => {
        getNotes()
    }, [])

    return (
        <div className='bg-gray-900 min-h-screen'>

            <div className='bg-gradient-to-t from-gray-900 to-indigo-800'>
                <TopNavBar />
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