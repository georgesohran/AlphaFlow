import { useEffect, useState } from "react"
import MyFooter from "../components/footer"
import TopNavBar from "../components/navbar"
import { getAuth } from "../util"
import { useNavigate } from "react-router-dom"

import { FaPlus } from "react-icons/fa6";


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
            <div className="flex flex-row">
                <div className="text-2xl"> {props.goal.contents} </div>
                <button onClick={setOpened(true)}> <FaPlus/> </button>
            </div>
            <div>
                <TasksSection />
                <TasksSection />
                <TasksSection />
                <TasksSection />
            </div>
        </div>
    )
}

const TasksSection = (props) => {
    return (
        <div>
            <div> Task Section</div>
            <TaskBlock/>
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