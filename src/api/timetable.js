import { serverApiUrl } from "..";

    export const fetch_courses_timetable=(courseId,offset,dataLimit,callback)=>
    {

         
                let headers = new Headers(); 
                headers.append('Content-Type', 'application/json'); 

                headers.append('Access-Control-Allow-Origin', serverApiUrl);
                headers.append('Access-Control-Allow-Credentials', 'true');

                headers.append('GET', 'POST', 'OPTIONS'); 
                let apiUrl = serverApiUrl+'institute/course/timetable/all/'+courseId+"/"+offset+"/"+dataLimit
                
                    console.log(apiUrl);
                fetch(apiUrl,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
    }


export const addSubject=(courseId ,name, callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/timetable/addsubject/',
        {
            method: 'POST',  
            headers,
            body:JSON.stringify({courseId, name})

        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}


export const deleteSubject=(id, callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/timetable/delete/subject/'+id,
        {
            method: 'DELETE',  
            headers,
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}

export const addSubjectItem=(date,time,subjectId,insId,subTitle,title, callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/timetable/addsubjectitem/',
        {
            method: 'POST',  
            headers,
            body:JSON.stringify({subjectId,insId,subTitle,title,time,date})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}

export const deleteSubjectItem=(id, callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/timetable/delete/subject/item/'+id,
        {
            method: 'DELETE',  
            headers,
            // body:JSON.stringify({id, review, rating})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}
