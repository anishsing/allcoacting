import {serverApiUrl} from "../index"

export const fetchLeadsOverView_admin=(mode,dataTime,callback)=>
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

        fetch(serverApiUrl+"institute/leads/course/admin/lead/graphdata/"+mode+"/"+dataTime,
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const fetchLeadsOverView_institutewise=(insId, mode, dataTime,callback)=>
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

        fetch(serverApiUrl+"institute/leads/course/lead/graphdata/"+mode+"/"+insId+"/"+dataTime,
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const fetchLeads=(insId,offset,dataLimit,callback)=>
{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json');  
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true'); 
        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"institute/leads/"+insId+"/"+offset+"/"+dataLimit,
        {
            method: 'GET', 
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}

export const getLeadCount=(insId,callback)=>
{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json');  
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true'); 
        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"institute/leads/leadcount/"+insId,
        {
            method: 'GET', 
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}

export const getCourseCount=(insId,callback)=>
{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json');  
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true'); 
        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"institute/countcourse/"+insId,
        {
            method: 'GET', 
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}