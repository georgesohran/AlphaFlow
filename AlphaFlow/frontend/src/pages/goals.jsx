import { useEffect } from "react"
import MyFooter from "../components/footer"
import TopNavBar from "../components/navbar"
import { getAuth } from "../util"
import { useNavigate } from "react-router-dom"


const GoalsPage = () => {
    
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
        <div className="text-center text-xl text-white">
            Goals page
        </div>
        <MyFooter text="AlphaFlow"/>
    </div>
    )
}

export default GoalsPage