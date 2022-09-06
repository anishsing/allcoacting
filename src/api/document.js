import {serverApiUrl} from "../index"


export const addDocument=(file, name, courseId, playlistId, callback,callbackProgress)=>
{
    var formData   = new FormData();  
    formData.append("file", file) 
    formData.append("name", name)          
    formData.append("courseId", courseId)     
    formData.append("playlistId", playlistId)      
    let headers = new Headers(); 
    // fetch(serverApiUrl+'institute/course/document/',
    // {
    //     method: 'POST', 
    //     body:formData
    // })
    // .then((response)=>callback(response)) 
    // .catch((error)=>{console.log(error)})

    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (e) => {
        //handle progress here, you can use progressEvent.loaded, progressEvent.total to calculate the progress
        var percentComplete = Math.ceil((e.loaded / e.total) * 100);
            
        if(callbackProgress)
        callbackProgress(percentComplete)
    };
   
    xhr.open('POST', serverApiUrl+'institute/course/document/');
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.responseType = 'json';
    xhr.onload = function() {
        
        callback({status: this.status,headers:{location:xhr.getResponseHeader("location")}})
      };
    xhr.send(formData);
}

export const editDocumentFile=(file, documentId, callback,callbackProgress)=>
{
    var formData   = new FormData();  
    formData.append("file", file)         
    formData.append("documentId", documentId)          
    let headers = new Headers(); 
    // fetch(serverApiUrl+'institute/course/document/updateDocument',
    // {
    //     method: 'PUT', 
    //     body:formData
    // })
    // .then((response)=>callback(response)) 
    // .catch((error)=>{console.log(error)})

    const xhr = new XMLHttpRequest();
    xhr.upload.onprogress = (e) => {
        //handle progress here, you can use progressEvent.loaded, progressEvent.total to calculate the progress
        var percentComplete = Math.ceil((e.loaded / e.total) * 100);
            
        if(callbackProgress)
        callbackProgress(percentComplete)
    };
   
    xhr.open('POST', serverApiUrl+'institute/course/document/updateDocument');
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.responseType = 'json';
    xhr.onload = function() {
        
        callback({status: this.status,headers:{location:xhr.getResponseHeader("location")}})
      };
    xhr.send(formData);
}

export const fetch_document_playlist=(courseId,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'/institute/course/document/playlists/'+courseId,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const editDocumentDetails=(courseId,fileAddress,id, name, playlistId,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'institute/course/document/updateDocumentDetails',
    {
        method: 'PUT',  
        headers,
        body:JSON.stringify({courseId,fileAddress,id, name, playlistId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const updateDocumentStatus=(status, id, callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'institute/course/document/hidden/'+status+'/'+id,
    {
        method: 'PUT',  
        headers,
        // body:JSON.stringify({courseId,fileAddress,id, name, playlistId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})

}
export const updateDocumentDemoStatus=(status, id, callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'institute/course/document/demo/'+status+'/'+id,
    {
        method: 'PUT',  
        headers,
        // body:JSON.stringify({courseId,fileAddress,id, name, playlistId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}