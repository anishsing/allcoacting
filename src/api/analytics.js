import {serverApiUrl} from "../index"

export const fetch_instituteSalesOverView=(insId,callback)=>
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

        fetch(serverApiUrl+"institute/revenue/getSalesOverview/"+insId,
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const findEnrolledStudentsByCategoryId=(id, offset, dataLimit, callback)=>
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

        fetch(serverApiUrl+"analytics/category/"+id+"/"+offset+"/"+dataLimit,
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}
export const insCountCategoryWise=(callback)=>
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

        fetch(serverApiUrl+"analytics/category/insCount",
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const studentCountCategoryWise=(callback)=>
{ 
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"analytics/category/studentCount",
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}