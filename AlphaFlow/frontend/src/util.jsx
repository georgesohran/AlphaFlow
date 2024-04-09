const getAuth = async() => {
    return fetch('/api/session',{
        credentials:'same-origin'
    })
    .then(res => res.json())
    .then(res_data => {
        console.log(res_data)
        return res_data.isauthenticated
    })    
  }

export {getAuth}