import { DateTime } from "luxon"

const getAuth = async() => {
    return fetch('/api/session',{
        credentials:'same-origin'
    })
    .then(res => res.json())
    .then(res_data => {
        return res_data.isauthenticated
    })    
}

const getDaysInMonth = (month) => {
    let date = month==12? DateTime.fromObject({month:1, day:1}).minus({day:1}) : DateTime.fromObject({month:month+1, day:1}).minus({day:1})
    return date.day
}

const formatTwoDigits = (num) => {
    if(num.toString().length == 1) {
        return '0'+num.toString()
    } else {
        return num.toString()
    }
}
export {
    getAuth,
    getDaysInMonth,
    formatTwoDigits
}