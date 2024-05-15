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

    const [newEditedTask, setNewEditedTask] = useState({
        id: 1,
        contents: "",
        deadline: "",
        stage: ""
    })

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

    const addTask = async() => {

    }
    const editTask = async(id) => {
        console.log(id)
        fetch('api/tasks', {
            method:'PUT',
            headers: {
                
                'X-CSRFToken': cookies.get('csrftoken'),
            },
            credentials:'same-origin'
        })
        .then()
        .then()
    }

    return (
    <div className="bg-gray-900 min-h-screen">
        <TopNavBar />
        <div className="text-white mt-8 mb-36">
            {goals && goals.map((goal, index) => 
            <GoalContainer key={index} goal={goal} editTask={editTask} 
            newEditedTask={newEditedTask} setNewEditedTask={setNewEditedTask}/>
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
            <div className={`${opened?'max-h-96':'max-h-0'} overflow-hidden transition-[max-height] ease-in-out duration-500 mt-1`}>
                <div className="grid grid-cols-4 gap-1">
                    <TasksSection name="Delayed" tasks={props.goal.goal_tasks.filter((task) => task.stage == 'Delayed')}
                    newEditedTask={props.newEditedTask} setNewEditedTask={props.setNewEditedTask} editTask={props.editTask}/>
                    <TasksSection name="TODO" tasks={props.goal.goal_tasks.filter((task) => task.stage == 'TODO')}
                    newEditedTask={props.newEditedTask} setNewEditedTask={props.setNewEditedTask} editTask={props.editTask}/>
                    <TasksSection name="In progress" tasks={props.goal.goal_tasks.filter((task) => task.stage == 'In Progress')}
                    newEditedTask={props.newEditedTask} setNewEditedTask={props.setNewEditedTask} editTask={props.editTask}/>
                    <TasksSection name="Delayed" tasks={props.goal.goal_tasks.filter((task) => task.stage == 'Done')}
                    newEditedTask={props.newEditedTask} setNewEditedTask={props.setNewEditedTask} editTask={props.editTask}/>
                </div>   
            </div>
        </div>
    )
}

const TasksSection = (props) => {
    return (
        <div className="p-2 border-2 rounded-md border-gray-900"
        onDragOver={(ev) => {
            ev.preventDefault()
            ev.dataTransfer.dropEffect = "move"
        }}  
        onDrop={(ev) => {
            ev.preventDefault()
            props.editTask(ev.dataTransfer.getData("text/plain"))
        }}>
            <div className="flex flex-row justify-between"> 
                <div className="text-gray-100 text-xl">{props.name}</div>
                <button className="text-gray-500 hover:text-gray-300 transition-all">
                    <FaPlus />
                </button>
            </div>
            <div>
                {props.tasks && props.tasks.map((task, index) => <TaskBlock task={task}/>)}
            </div>
        </div>
    )
}

const TaskBlock = (props) => {
    return (
        <div className="text-left p-1 border-2 border-gray-900 rounded-md my-1"
        draggable onDragStart={(ev) => {
            ev.dataTransfer.setData("text/plain", props.task.id)
            ev.dataTransfer.dropEffect = 'move'
        }}>
            <div className="text-base text-gray-300">
                {props.task.contents}
            </div>
            <div className="text-gray-500">
                {props.task.deadline}
            </div>
        </div>
    )
}

export default GoalsPage