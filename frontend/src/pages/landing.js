import React from 'react'
import TopNavBar from '../components/navbar'
import {BigInfoContainer, ChesGridContainers, InfoContainerMain} from '../components/info_containers'

const LandingPage = () => {
    return (
        <div>
            <div className='bg-gray-900 min-h-screen'>

                <div className='bg-dudles bg-no-repeat bg-center bg-auto bg-fixed'> 
                    <TopNavBar />
                    <InfoContainerMain heading="Some Heading" text="some text" />
                    <ChesGridContainers texts={["text1", "text2", "text3", "text4"]}/>
                    <BigInfoContainer text="Some text"/>
                </div>
                    
                <br />
                <footer className='bg-gray-800 text-white w-auto py-8' >Something</footer>
            </div>
        </div>
    )
}


export default LandingPage