import { useEffect, useState } from "react"
import MyFooter from "../components/footer"
import TopNavBar from "../components/navbar"
import { DateInputField, InputField, LargeInputField } from "../components/inputfield"
import { getAuth } from "../util"
import { useNavigate } from "react-router-dom"

import { FaMinus, FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

import { ButtonSubmit1, ButtonSubmit2 } from "../components/buttons"

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
        goal_id: 0,
        contents: "",
        deadline: "01.01.2001",
        stage: ""
    })
    const [newEditedGoal, setnewEditedGoal] = useState({
        contents:'',
        color: ''
    })
    const [mode, setMode] = useState('default')

    
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

    const addGoal = async() => {

    }
    const editGoal = async() => {

    }
    const deleteGoal = async(id) => {

    }

    const addTask = async() => {

    }
    const editTask = async() => {
        console.log(newEditedTask)
    }
    const deleteTask = async(id) => {
        
    }

    return (
    <div className="bg-gray-900 min-h-screen">
        <TopNavBar />
        <div className="text-white mt-8 mb-36">
            {goals && goals.map((goal, index) => 
            <GoalContainer key={index} goal={goal} 
            editTask={editTask} deleteTask={deleteTask} 
            newEditedTask={newEditedTask} setNewEditedTask={setNewEditedTask}/>
            )}

            <div className="relative rounded-md border-2 border-gray-700 border-dashed
            mx-2 my-2 p-2 xl:w-3/4 xl:mx-auto">
                <button className="absolute top-1 right-3 p-2 text-2xl rounded-full text-gray-500
                hover:bg-gray-700 hover:text-gray-300 transition-all"
                onClick={() => {mode!='addGoal'? setMode('addGoal'): setMode('default')}}> {mode!='addGoal'? <FaPlus/>: <FaMinus/>} </button>
                <div>
                    {mode == 'addGoal'?
                    <div className="mr-12">
                        <LargeInputField placeholder="new goal here" value={newEditedGoal.contents}
                        changeValue={(val) => {setnewEditedGoal({...newEditedGoal, contents:val})}}/>
                        <div className="flex flex-row">
                            <ButtonSubmit1 text="Cancel" onClick={() => {setMode('default')}}/>
                            <div>
                                <ButtonSubmit2 text="Add Goal" onClick={editGoal} />
                            </div>
                        </div>
                    </div>:
                    <div className="text-2xl"> New Goal </div>}
                    
                </div>
            </div>

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
                    newEditedTask={props.newEditedTask} setNewEditedTask={props.setNewEditedTask} 
                    editTask={props.editTask} deleteTask={props.deleteTask}/>
                    <TasksSection name="TODO" tasks={props.goal.goal_tasks.filter((task) => task.stage == 'TODO')}
                    newEditedTask={props.newEditedTask} setNewEditedTask={props.setNewEditedTask} 
                    editTask={props.editTask} deleteTask={props.deleteTask}/>
                    <TasksSection name="In progress" tasks={props.goal.goal_tasks.filter((task) => task.stage == 'In Progress')}
                    newEditedTask={props.newEditedTask} setNewEditedTask={props.setNewEditedTask} 
                    editTask={props.editTask} deleteTask={props.deleteTask}/>
                    <TasksSection name="Delayed" tasks={props.goal.goal_tasks.filter((task) => task.stage == 'Done')}
                    newEditedTask={props.newEditedTask} setNewEditedTask={props.setNewEditedTask} 
                    editTask={props.editTask} deleteTask={props.deleteTask}/>
                </div>   
            </div>
        </div>
    )
}

const TasksSection = (props) => {
    const [creatingTask, setCreatingTask] = useState(false)
    return (
        <div className="p-2 border-2 rounded-md border-gray-900"
        onDragOver={(ev) => {
            ev.preventDefault()
            ev.dataTransfer.dropEffect = "move"
        }}  
        onDrop={(ev) => {
            ev.preventDefault()
            console.log(props.name)
            props.setNewEditedTask({...JSON.parse(ev.dataTransfer.getData("text/plain")), stage: props.name,})
            props.editTask()
        }}>
            <div className="flex flex-row justify-between"> 
                <div className="text-gray-100 text-xl">{props.name}</div>
                <button className="text-gray-500 hover:text-gray-300 transition-all"
                onClick={() => {setCreatingTask(!creatingTask)}}>
                    {!creatingTask && <FaPlus />}
                </button>
            </div>
            <div>
                <div className={`border-2 rounded-md border-dashed border-gray-900 p-1 ${creatingTask? 'block animate-appearnotice':'hidden'}`}>
                    <div className="flex flex-row justify-between">
                        <input placeholder="new task here"
                        className="rounded-md p-1 w-28 md:w-32 xl:w-44
                        text-gray-200 bg-gray-700 
                        hover:bg-gray-600
                        focus:outline-none focus:ring focus:border-blue-300 focus:bg-gray-600"/>     
                        <button className="text-xl text-gray-400 hover:text-gray-300" 
                        onClick={() => {setCreatingTask(false)}}>
                            <RxCross2 />
                        </button>
                    </div>
                    <div className="mt-1 text-gray-400">deadline:</div>
                    <div>
                        <DateInputField value={props.newEditedTask.deadline}/>     
                    </div>
                </div>
                {props.tasks && props.tasks.map((task, index) => <TaskBlock task={task} deleteTask={props.deleteTask}/>)}
            </div>
        </div>
    )
}

const TaskBlock = (props) => {
    return (
        <div className="flex flex-row justify-between p-1 border-2 border-gray-900 rounded-md my-1"
        draggable onDragStart={(ev) => {
            ev.dataTransfer.setData("text/plain", JSON.stringify(props.task))
            ev.dataTransfer.dropEffect = 'move'
        }}>
            <div className="text-left">
                <div className="text-base text-gray-300">
                    {props.task.contents}
                </div>
                <div className="text-gray-500">
                    {props.task.deadline}
                </div>
            </div>
            <div className="text-gray-400 text-xl hover:text-gray-100">
                <button onClick={() => {props.deleteTask(props.task.id)}}><RxCross2 /></button>
            </div>
        </div>
    )
}

export default GoalsPage