import {serverApiUrl} from "../index"

export const getTodaysTotalPayout=(id,callback)=>
{
    
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"payouts/byIns/todaysTotal",
        {
            method: 'POST',  
            headers,
            body:JSON.stringify({id})
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}



export const getTotalPayout=(id, callback) => {
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"payouts/byIns/total",
        {
            method: 'POST',  
            headers,
            body:JSON.stringify({id})
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}


export const getPayoutByInstitute=(id, page, pageSize, callback) => {
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"payouts/byIns/"+page+"/"+pageSize,
        {
            method: 'POST',  
            headers,
            body:JSON.stringify({id})
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const getPayoutSumByInstituteMonthly=(id, callback) => {
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"payouts/month/total/ins/sum",
        {
            method: 'POST',  
            headers,
            body:JSON.stringify({id})
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}



export const getPayoutByInstituteMonthly=(id, page, pageSize, callback) => {
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"payouts/month/ins/"+page+"/"+pageSize,
        {
            method: 'POST',  
            headers,
            body:JSON.stringify({id})
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}
