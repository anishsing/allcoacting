import {serverApiUrl} from "../index"

export const getInsDataCategoryWise=(catId,callback)=>
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

        fetch(serverApiUrl+"institute/course/reviews/course/admin/Revenue/ins/categorywise/"+catId,
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const getOverAllRevenueCount=(callback)=>
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

        fetch(serverApiUrl+"institute/course/reviews/course/admin/Revenue/count",
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const adminRevenueCategoryWise=(callback)=>
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

        fetch(serverApiUrl+"institute/course/reviews/course/admin/Revenue/categorywise",
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

