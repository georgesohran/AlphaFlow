import React, { useEffect, useState } from 'react'
import TopNavBar from '../components/navbar'
import MyFoter from '../components/footer'

import { getAuth } from "../util";

import { useNavigate } from 'react-router-dom';
import { MdDisplaySettings } from 'react-icons/md';

const LandingPage = () => {
    const navigate = useNavigate()
    const titleText = 'Alpha Flow'

    const [effectPos, setEffectPos] = useState({x:0, y:0})

    useEffect(() => {
        getAuth().then((auth) => {
            if(auth) {
                navigate('/dashboard')
            }
        })
    }, [])

    onmousemove = (ev) => {setEffectPos({x:ev.clientX, y:ev.clientY+window.scrollY})}


    return (
        <div className='bg-gray-900 min-h-screen '>
            <TopNavBar authorized={false}/>
            
            <div className=' relative text-white px-2  overflow-hidden'>
                <div className='absolute size-96 outer-radial-gradient' style={{
                    top:effectPos.y-264,
                    left:effectPos.x-192
                }}></div>
                <div className='relative rounded-md bg-gray-800 w-3/4 mx-auto text-center my-40 py-8 md:w-1/2'>    
                    <div className='relative text-3xl mb-2 flex flex-row justify-center transition-all gap-0 hover:gap-5'>                
                        {titleText.split('').map((c) => 
                        <span>
                            {c}
                        </span>    
                        )}
                    </div>
                    <div className='relative text-gray-300'>Your productivity workspace</div>
                </div>
                <div className='grid grid-cols-2 md:w-2/3 mx-auto'>
                    <TextCard num='1' title="Make a schedule" effectPos={effectPos} setEffectPos={setEffectPos}
                    text="Intarractive schedule, for planning and sticking to your habits"/>
                    
                    <div className='rounded-md p-2 relative'>
                            picture here
                    </div>
                    <div className='rounded-md p-2 relative'>
                            picture here
                    </div>

                    <TextCard num='2' title="Set your Goals" effectPos={effectPos}
                    text="Set your goals and add tasks to them to achive them faster"/>

                    <TextCard num='3' title="Take notes" effectPos={effectPos}
                    text="Take notes aboute everything important"/>

                    <div className='rounded-md p-2 relative'>
                            picture here
                    </div>
                </div>
                <div className='text-center mt-4 mb-10' >
                    <button className='rounded-md bg-indigo-800 w-1/2 p-2 text-lg text-center 
                    hover:bg-indigo-700 hover: transition-all mr-4 relative'
                    onClick={() => {window.scroll(0,0);navigate('/login')}}>Sign up right now</button>
                </div>
            </div>
            <MyFoter text='AlphaFlow: Focus'/>
        </div>
    )
}

const TextCard = (props) => {

    return (
        <div className='relative overflow-hidden rounded-md p-2 my-4 bg-gray-800'>
            <div id={`rect-el-${props.num}`} className='absolute z-10 size-full '></div>
            <BackGroundEffect pos={props.effectPos} num={props.num}/>
            <div className='relative text-2xl flex flex-row'>{props.title}</div>
            <div className='relative mt-2 text-gray-300'>
                {props.text}
            </div>
        </div>
    )
}

const BackGroundEffect = (props) => {
    const [rect, setRect] = useState(null)
    useEffect(() => {
        const temprect = document.getElementById(`rect-el-${props.num}`).getBoundingClientRect()
        setRect(temprect)
    }, [])

    return (
        <div className={`hover-gradient-element size-96 transition-opacity duration-500`} 
        style={{
            top: rect && props.pos.y-rect.y-198,
            left: rect && props.pos.x-rect.x-198
        }}></div>
    )
}




export default LandingPage