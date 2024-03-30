import { MultiContainer } from "../components/info_containers";
import TopNavBar from "../components/navbar";
import MyFooter from "../components/footer";

import { getAuth } from "../util";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();


const Dashboard = () => {
    let [notes, setNotes] = useState([])
    let [goals, setGoals] = useState([])

    const navigate = useNavigate()

    //protection
    useEffect(() => {
        getAuth().then((auth) => {
            if(auth) {
                getNotes()
                getGoals()
            } else {
                navigate('/login')
            }
        })
    }, [])

    const getNotes = async() => {
        fetch('api/notes', {
            method:'GET',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials:'same-origin'
        })
        .then(res => {
            if(res.status == 200) {
                return res.json()
            } else {
                return null
            }
        })
        .then(res_data => {
            if(res_data != null) {
                setNotes(res_data)
            } else {
                console.log('unauthorized')
            }
        })
    }
    const getGoals = async() => {
        fetch('api/goals', {
            method:'GET',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials:'same-origin'
        })
        .then(res => {
            if(res.status == 200) {
                return res.json()
            } else {
                return null
            }
        })
        .then(res_data => {
            if(res_data != null) {
                setGoals(res_data)
            } else {
                console.log('unauthorized')
            }
        })
    }

    return (
        <div className='bg-gray-900 min-h-screen'>

            <div className='bg-gradient-to-t from-gray-900 to-indigo-800'>
                <TopNavBar authorized={true}/>
                <div className='mx-auto justify-center md:flex mb-56'>
                    <MultiContainer title='Notes' description='All of your notes' items={notes}/>
                    <br/>
                    <MultiContainer title='Goals' description='All of your goals' items={goals}/>  
                </div> 
                
            </div>
            <MyFooter text='something'/>
        </div>
    )
}


export default Dashboard