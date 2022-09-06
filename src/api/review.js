import {serverApiUrl} from "../index"


export const fetch_institute_reviews=(insId,offset,dataLimit,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/reviews/'+offset+'/'+dataLimit+'/id/'+insId,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({insId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const updateReview=(id, reply, callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/reviews/',
        {
            method: 'PUT',  
            headers,
            body:JSON.stringify({id, reply})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}


export const reply=(id, reply, rating,review,courseId, studentId, insId,callback)=>
{
    console.log(id, reply, rating, review, courseId, studentId, insId)
    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'institute/course/reviews/',
    {
        method: 'PUT',  
        headers,
        body:JSON.stringify({id, reply})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}
