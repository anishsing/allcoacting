import {serverApiUrl} from "../index"

export const fetch_studentList=(courseId,offset,dataLimit,callback)=>
{
    // var formData   = new FormData(); 
    // formData.append("fetch_banners",'true') 
    // formData.append("offset",offset) 
    // formData.append("data_limit",limit)  
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"institute/revenue/getStudentList/"+courseId+"/"+offset+"/"+dataLimit,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}


export const fetch_studentById=(id, callback)=>{

    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"student/"+id,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const deleteStudent=(id, callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'student/delete/'+id,
        {
            method: 'DELETE',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}




export const updateStudentStatus=(status, studentId, callback)=>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
 
    fetch(serverApiUrl+'student/status/'+status+"/"+studentId,{
        method: 'PUT',
        headers,
    })
    .then((response)=>callback(response))
    .catch((error)=>{console.log(error)})
}



export const findStudentHistory=(StudentId, offset, dataLimit, type, callback)=>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl+'student/history/fetch/'+StudentId+'/'+type+'/'+offset+'/'+dataLimit,{
        method: 'GET',
        headers,
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})

}

export const fetch_student_feed=(studentId,offset,dataLimit,callback)=>
{
    // var formData   = new FormData(); 
    // formData.append("fetch_banners",'true') 
    // formData.append("offset",offset) 
    // formData.append("data_limit",limit)  
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

    fetch(serverApiUrl+"feed/student/"+studentId+"/"+offset+"/"+dataLimit,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const fetch_student_purchase=(studentId,offset,dataLimit,callback)=>
{ 

    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"institute/course/reviews/purchaseList/"+studentId+"/"+offset+"/"+dataLimit,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
    
}

export const findStudentByMobile =(mobile,callback)=>
{
    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'student/bymobile/'+mobile,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({studentId, courseId, insId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})     
}



export const findStudentByName=(byName, offset, dataLimit, callback)=>{

    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'search/student/'+byName+"/"+offset+"/"+"/"+dataLimit,
    {
        method: 'GET',  
        headers,
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})

}


export const findStudentByEmail=(byEmail, offset, dataLimit, callback)=>{

    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'search/student/searchbyemail/'+byEmail+"/"+offset+"/"+"/"+dataLimit,
    {
        method: 'GET',  
        headers,
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})

}

export const addStudent=(email,name,stateOfResidence,mobileNumber,callback)=>
{
    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'student/',
    {
        method: 'POST',  
        headers,
        body:JSON.stringify({email, name, stateOfResidence,mobileNumber,blocked:false})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})    

}


export   const enrollStudent=(studentId,courseId,insId,callback)=>
{

    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'institute/course/reviews/',
    {
        method: 'POST',  
        headers,
        body:JSON.stringify({studentId, courseId, insId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})     
} 