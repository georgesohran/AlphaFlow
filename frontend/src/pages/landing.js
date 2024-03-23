import React from 'react'
import TopNavBar from '../components/navbar'
import {ChesGridContainers, InfoContainerMain} from '../components/info_containers'

const LandingPage = () => {
    return (
        <div>
            <div className='bg-gray-900 min-h-screen'>
                <TopNavBar />
                <InfoContainerMain heading="Some Heading" text="some text" />
                <ChesGridContainers texts={["text1", "text2", "text3", "text4"]}/>
            </div>
        </div>
    )
}

export default LandingPage