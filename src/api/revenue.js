import {serverApiUrl} from "../index"    

export const fetchRevenueOverview=(insId,callback)=>
{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json');  
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true'); 
        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"institute/revenue/getSalesOverview/"+insId,
        {
            method: 'GET', 
            headers, 
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}

export const fetchRevenueOverView_institutewise=(insId, mode,dataTime,callback)=>
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

        fetch(serverApiUrl+"institute/course/reviews/course/Revenue/graphdata/"+mode+"/"+insId+"/"+dataTime,
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}


export const fetchRevenueOverView_admin=(mode,dataTime,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"institute/course/reviews/course/admin/Revenue/graphdata/"+mode+"/"+dataTime,
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const fetchRevenueCountInstituteWise=(insId,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"institute/course/reviews/course/admin/Revenue/count/ins/"+insId,
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const getInsRevenueCourseData=(insId,callback)=>{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"institute/course/reviews/course/admin/Revenue/inscourse/"+insId,
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}