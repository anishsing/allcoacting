import {serverApiUrl} from "../index"

export const getExpoId=(category,page,offset,callback)=>
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

        fetch(serverApiUrl+"institute/category/expo/"+category+"/"+offset+"/"+page,
        {
            method: 'GET',  
            headers,
             
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}



export const sendNotification=(data, title, url, body,targetGroup,targetGroupType,targetEmail,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true'); 
    headers.append('GET', 'POST', 'OPTIONS'); 


    let group = parseInt(targetGroup);
    if(!group)
    {
        group=0;
    }
        fetch(serverApiUrl+"notification/send/notification",
        {
            method: 'POST',  
            headers,
            body:JSON.stringify({data,body,targetGroup:group,targetGroupType,targetEmail, title, url})
        })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}