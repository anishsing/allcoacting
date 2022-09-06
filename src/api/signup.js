import {serverApiUrl} from "../index"

export const signUp=(file,name,directorName,email,phone,password,address,city,state,category,about, status=0, callback)=>
{
    var formData   = new FormData();  
    formData.append("file", file) 
    formData.append("name", name) 
    formData.append("directorName", directorName) 
    formData.append("email", email) 
    formData.append("phone", phone) 
    formData.append("password", password) 
    formData.append("address", address) 
    formData.append("city", city) 
    formData.append("state", state) 
    formData.append("category", category) 
    formData.append("about", about) 
    formData.append("status",status)
    
    let headers = new Headers(); 

    fetch(serverApiUrl+'institute/',
    {
        method: 'POST',  
        body:formData
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
} 
