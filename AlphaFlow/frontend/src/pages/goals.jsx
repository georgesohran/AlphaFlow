import { useEffect, useState } from "react"
import MyFooter from "../components/footer"
import TopNavBar from "../components/navbar"
import { getAuth } from "../util"
import { useNavigate } from "react-router-dom"

import { FaMinus, FaPlus } from "react-icons/fa";


const GoalsPage = () => {
    const [goals, setGoals] = useState([
        {
            "contents": "another goal",
            "id": 2,
            "goal_tasks": [
                {
                    "id": 1,
                    "contents": "task n1",
                    "deadline": "2024-05-16",
                    "stage": "TODO"
                },
                {
                    "id": 2,
                    "contents": "clean bedroom",
                    "deadline": "2024-05-17",
                    "stage": "TODO"
                }
            ]
        }
    ])

    const navigate = useNavigate()
    
    // useEffect(() => {
    //     getAuth().then((auth) => {
    //         if(auth) {
    //             getGoals()
    //         } else {
    //             navigate('/login')
    //         }
    //     })
    // }, [])

    const getGoals = async() => {
        fetch('api/goals', {
            method: 'GET',
            headers: {
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials:'same-origin'
        })
        .then(res => res.json())
        .then(res_data => {
            console.log(res_data)
        })
    }


    return (
    <div className="bg-gray-900 min-h-screen">
        <TopNavBar />
        <div className="text-center text-xl text-white mt-8 mb-36">
            {goals && goals.map((goal, index) => 
            <GoalContainer key={index} goal={goal} />
            )}
        </div>
        <MyFooter text="AlphaFlow"/>
    </div>
    )
}

const GoalContainer = (props) => {
    const [opened, setOpened] = useState(false)

    return (
        <div className="bg-gray-800 rounded-md  
        mx-2 my-2 p-2 xl:w-3/4 xl:mx-auto">
            <div className="flex flex-row justify-between">
                <div className="text-2xl"> {props.goal.contents} </div>
                <button className="p-2 text-2xl mr-2 rounded-full text-gray-500
                hover:bg-gray-700 hover:text-gray-300 transition-all"
                onClick={() => {setOpened(!opened)}}> {opened? <FaMinus /> :<FaPlus/>}  </button>
            </div>
            <div className={`${opened?'max-h-96':'max-h-0'} overflow-hidden transition-[max-height] ease-in-out duration-500`}>
                <TasksSection tasks={props.goal.tasks}/>
                <TasksSection tasks={props.goal.tasks}/>
                <TasksSection tasks={props.goal.tasks}/>
                <TasksSection tasks={props.goal.tasks}/>
            </div>
        </div>
    )
}

const TasksSection = (props) => {
    return (
        <div>
            <div> Task Section</div>
            {props.tasks && props.tasks.map((task, index) => <TaskBlock task={task}/>)}
        </div>
    )
}

const TaskBlock = (props) => {
    return (
        <div>
            <div>
                {props.task.contents}
            </div>
        </div>
    )
}

export default GoalsPage