import {serverApiUrl} from "../index"
    
export const fetch_courses_banners=(courseId,callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'/institute/course/banners/all/'+courseId,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}


export const addBanner=(file, courseId, callback)=>
{
    var formData   = new FormData();  
    formData.append("file", file) 
    formData.append("courseId", courseId)     
    let headers = new Headers(); 
    fetch(serverApiUrl+'institute/course/banners/upload/',
    {
        method: 'POST', 
        body:formData
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const deleteBanner=(id, callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/banners/delete/'+id,
        {
            method: 'DELETE',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}