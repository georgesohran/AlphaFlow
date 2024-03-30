import React, { useEffect, useState } from 'react'
import TopNavBar from '../components/navbar'
import {BigInfoContainer, ChesGridContainers, InfoContainerMain} from '../components/info_containers'
import MyFoter from '../components/footer'

import { getAuth } from "../util";

const LandingPage = () => {

    const [isAuthenticated, setIsAuthenticated] = useState()

    useEffect(async() => {
        const authorized = await getAuth()
        setIsAuthenticated(authorized)
    }, [])

    return (
        <div className='bg-gray-900 min-h-screen'>

            <div className='bg-gradient-to-t from-gray-900 to-indigo-800 '> 
                <TopNavBar authorized={isAuthenticated}/>                    
                <InfoContainerMain heading="Some Heading" text="some text" />
                <ChesGridContainers texts={["text1", "text2", "text3", "text4"]}/>
            </div>
            
            <BigInfoContainer text="Some text"/>
            
            <MyFoter text='some text'/>
        </div>
    )
}


export default LandingPage