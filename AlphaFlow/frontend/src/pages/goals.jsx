import { useEffect, useState } from "react"
import MyFooter from "../components/footer"
import TopNavBar from "../components/navbar"
import { DateInputField, InputField, LargeInputField } from "../components/inputfield"
import { getAuth } from "../util"
import { useNavigate } from "react-router-dom"

import { FaEdit, FaMinus, FaPlus } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdDeleteForever } from "react-icons/md";

import { ButtonSubmit1, ButtonSubmit2 } from "../components/buttons"

import Cookies from "universal-cookie"
import { DateTime } from "luxon"
const cookies = new Cookies()


const GoalsPage = () => {
    const [goals, setGoals] = useState([])

    const [newEditedTask, setNewEditedTask] = useState({
        id: 0,
        goal_id: 0,
        contents: "",
        deadline: DateTime.now().plus({days:1}).toFormat('dd.MM.yyyy')
    })
    const [newEditedGoal, setNewEditedGoal] = useState({
        contents:''
    })
    const [mode, setMode] = useState('default')

    
    const navigate = useNavigate()
    useEffect(() => {
        getAuth().then((auth) => {
            if(auth) {
                getGoals()
            } else {
                navigate('/login')
            }
        })
    }, [])

    useEffect(() => {
        if(mode == 'addGoal') {
            setNewEditedGoal({contents:''})
        }
    }, [mode])


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
            setGoals(res_data)
        })
    }

    const addGoal = async() => {
        console.log(newEditedGoal)
        fetch('api/goals', {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            credentials:'same-origin',
            body: JSON.stringify(newEditedGoal)
        })
        .then(res => res.json())
        .then(res_data => {
            if('detail' in res_data) {
                console.log(res_data.detail)
            } else {
                setGoals(res_data)
            }
        })
    }
    const editGoal = async(id) => {
        fetch('api/goals', {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            credentials:'same-origin',
            body: JSON.stringify({...newEditedGoal, id:id})
        })
        .then(res => res.json())
        .then(res_data => {
            if('detail' in res_data) {
                console.log(res_data.detail)
            } else {
                setGoals(res_data)
            }
        })
    }
    const deleteGoal = async(id) => {
        fetch('api/goals', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            credentials:'same-origin',
            body: JSON.stringify({id: id})
        })
        .then(res => res.json())
        .then(res_data => {
            if('detail' in res_data) {
                console.log(res_data.detail)
            } else {
                setGoals(res_data)
            }
        })
    }


    const addTask = async(stage) => {
        fetch('api/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            credentials: 'same-origin',
            body: JSON.stringify({...newEditedTask, stage:stage})
        })
        .then(res => res.json())
        .then(res_data => {
            if ('detail' in res_data) {
                console.log(res_data.detail)
            }
            return getGoals()
        })
    }
    const editTask = async(task) => {
        fetch('api/tasks', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            credentials: 'same-origin',
            body: JSON.stringify(task)
        })
        .then(res => res.json())
        .then(res_data => {
            return getGoals()
        })
    }
    const deleteTask = async(id) => {
        fetch('api/tasks', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': cookies.get('csrftoken')
            },
            credentials:'same-origin',
            body: JSON.stringify({id:id})
        })
        .then(res => res.json())
        .then(res_data => {
            if ('detail' in res_data) {
                console.log(res_data.detail)
            }
            return getGoals()
        })
    }

    return (
    <div className="bg-gray-900 min-h-screen">
        <TopNavBar authorized={true}/>
        <div className="text-white mt-8 min-h-screen">
            {goals && goals.map((goal, index) => 
            <GoalContainer key={index} goal={goal}
            addGoal={addGoal} editGoal={editGoal} deleteGoal={deleteGoal}
            newEditedGoal={newEditedGoal} setNewEditedGoal={setNewEditedGoal}
            addTask={addTask} editTask={editTask} deleteTask={deleteTask} 
            newEditedTask={newEditedTask} setNewEditedTask={setNewEditedTask}/>
            )}

            <div className="relative rounded-md border-2 border-gray-700 border-dashed
            mx-2 my-2 p-2 xl:w-3/4 xl:mx-auto">
                <div className="grid grid-cols-2 ">
                {mode=='addGoal' && goals ?
                    <div className="col-span-1 mt-1">
                        <input className="ml-2 rounded-md p-1 text-gray-200 bg-gray-700 
                        hover:bg-gray-600 text-2xl w-full
                        focus:outline-none focus:ring focus:border-blue-300 focus:bg-gray-600"
                        value={newEditedGoal.contents}
                        onChange={(ev) => {setNewEditedGoal({contents:ev.target.value})}}/>
                        <div className="md:grid md:grid-cols-2 md:gap-2 flex flex-col ml-2">
                            <div className="mt-2 md:mt-3 ">
                                <ButtonSubmit1 text="Add Goal" onClick={() => {setMode('default'); addGoal()}}/>
                            </div>
                            <div className="mt-2 ">
                                <ButtonSubmit2 text="Cancel" onClick={() => {setMode('default')}} />
                            </div>
                        </div>
                    </div>:
                    <div className="text-2xl col-span-1"> Add New Goal </div>}
                    
                    
                    <div className="text-right">
                        <button className="p-2 text-2xl mr-2 rounded-full text-gray-500
                        hover:bg-gray-700 hover:text-gray-300 transition-all"
                        onClick={() => {mode=='default'?setMode('addGoal'):setMode('default')}}> <FaPlus/> </button>
                    </div>
                </div>
            </div>

        </div>
        <MyFooter text="AlphaFlow"/>
    </div>
    )
}

const GoalContainer = (props) => {
    const [opened, setOpened] = useState(false)
    const [editing, setEditing] = useState(false)

    useEffect(() => {
        props.setNewEditedGoal(props.goal)
    }, [editing])
    
    return (
        <div className="bg-gray-800 rounded-md  
        mx-2 my-2 p-2 xl:w-3/4 xl:mx-auto">
            <div className="grid grid-cols-2 ">
                {editing? 
                <div className="col-span-1 mt-2">
                    <input className="ml-2 rounded-md p-1 text-gray-200 bg-gray-700 
                    hover:bg-gray-600 text-2xl w-full
                    focus:outline-none focus:ring focus:border-blue-300 focus:bg-gray-600"
                    value={props.newEditedGoal.contents}
                    onChange={(ev) => {props.setNewEditedGoal({contents:ev.target.value})}}/>
                    <div className="md:grid md:grid-cols-2 md:gap-2 flex flex-col ml-2 ">
                        <div className="mt-2 md:mt-3 ">
                            <ButtonSubmit1 text="Edit Goal" onClick={() => {setEditing(false); props.editGoal(props.goal.id)}}/>
                        </div>
                        <div className="mt-3">
                            <ButtonSubmit2 text="Cancel" onClick={() => {setEditing(false)}} />
                        </div>
                    </div>
                </div>:
                <div className="text-2xl col-span-1"> {props.goal.contents} </div>}
                
                
                <div className="text-right">
                    <button className="p-2 text-2xl mr-2 rounded-full text-gray-500
                    hover:bg-gray-700 hover:text-gray-300 transition-all"
                    onClick={() => {setEditing(!editing)}}><FaEdit/></button>
                    <button className="p-2 text-2xl mr-2 rounded-full text-gray-500
                    hover:bg-gray-700 hover:text-gray-300 transition-all"
                    onClick={() => {setOpened(!opened)}}> {opened? <FaMinus /> :<FaPlus/>}  </button>
                    <button className="p-2 text-2xl mr-2 rounded-full text-gray-500
                    hover:bg-gray-700 hover:text-red-600 transition-all"
                    onClick={() => {props.deleteGoal(props.goal.id)}}> <MdDeleteForever /> </button>
                </div>
            </div>
            <div className={`${opened?'max-h-96':'max-h-0'} overflow-hidden transition-[max-height] ease-in-out duration-500 mt-1`}>
                <div className="grid grid-cols-4 gap-1">
                    <TasksSection name="Delayed" tasks={props.goal.goal_tasks.filter((task) => task.stage == 'Delayed')}
                    newEditedTask={props.newEditedTask} setNewEditedTask={props.setNewEditedTask} goalId={props.goal.id}
                    addTask={props.addTask} editTask={props.editTask} deleteTask={props.deleteTask}/>
                    <TasksSection name="TODO" tasks={props.goal.goal_tasks.filter((task) => task.stage == 'TODO')}
                    newEditedTask={props.newEditedTask} setNewEditedTask={props.setNewEditedTask} goalId={props.goal.id}
                    addTask={props.addTask} editTask={props.editTask} deleteTask={props.deleteTask}/>
                    <TasksSection name="In Progress" tasks={props.goal.goal_tasks.filter((task) => task.stage == 'In Progress')}
                    newEditedTask={props.newEditedTask} setNewEditedTask={props.setNewEditedTask} goalId={props.goal.id}
                    addTask={props.addTask} editTask={props.editTask} deleteTask={props.deleteTask}/>
                    <TasksSection name="Done" tasks={props.goal.goal_tasks.filter((task) => task.stage == 'Done')}
                    newEditedTask={props.newEditedTask} setNewEditedTask={props.setNewEditedTask} goalId={props.goal.id}
                    addTask={props.addTask} editTask={props.editTask} deleteTask={props.deleteTask}/>
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
            props.editTask({...JSON.parse(ev.dataTransfer.getData("text/plain")), stage:props.name, goal_id:props.goalId})
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
                        value={props.newEditedTask.contents} 
                        onChange={(ev) => {props.setNewEditedTask({...props.newEditedTask, contents:ev.target.value, goal_id: props.goalId})}}
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
                    <div className="relative">
                        <DateInputField value={props.newEditedTask.deadline} 
                        changeValue={(val) => {props.setNewEditedTask({...props.newEditedTask, deadline:val})}}/>     
                    </div>
                    {<ButtonSubmit2 text="add task" onClick={() => {
                        props.addTask(props.name)
                        setCreatingTask(false)
                    }}/>}
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