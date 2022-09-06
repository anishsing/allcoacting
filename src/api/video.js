import {serverApiUrl} from "../index"


export const addVideo=(image,file, title, subTitle, courseId, playlistId, demoLenth, isDemo, callback,callbackProgress)=>
{
    var formData   = new FormData();  
    formData.append("file", file) 
    formData.append("name", title)     
    formData.append("description", subTitle)     
    formData.append("courseId", courseId)     
    formData.append("playlistId", playlistId)     
    formData.append("demoLength", demoLenth)     
    formData.append("isDemo", isDemo)     
    formData.append("thumb", image)     
    let headers = new Headers(); 
    // fetch(serverApiUrl+'institute/course/video/',
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
   
    xhr.open('POST', serverApiUrl+'/institute/course/video/');
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.responseType = 'json';
    xhr.onload = function() {
        
        callback({status: this.status,headers:{location:xhr.getResponseHeader("location")}})
      };
    xhr.send(formData);
    





}

export const addLiveVideo=(image, videoLocation,title, subTitle, courseId,  isDemo,liveClassDate,liveClassTime , id,callback,callbackProgress)=>
{
    var formData   = new FormData();  
    formData.append("liveClassTime",liveClassTime) 
    formData.append("videoLocation",videoLocation) 
    formData.append("liveClassDate",liveClassDate) 
    formData.append("name", title)     
    formData.append("description", subTitle)     
    formData.append("courseId", courseId)         
    if(id)
    {
        formData.append("id",id)
    }
    formData.append("isDemo", isDemo)      
    if(image&&typeof image =="object")
    {
        formData.append("thumbnail", image)       
    }

    // fetch(serverApiUrl+'institute/course/video/',
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
   
    xhr.open('POST', serverApiUrl+'/institute/course/video/saveLiveVideo');
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.responseType = 'json';
    xhr.onload = function() {
        
        callback({status: this.status,headers:{location:xhr.getResponseHeader("location")}})
      };
    xhr.send(formData); 
}

export const fetch_video_playlist=(courseId,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'/institute/course/video/playlists/'+courseId,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}


export const createVideoPlayList=(courseId, name, callback,id) => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

    fetch(serverApiUrl+'/institute/course/video/createPlaylist',{
        method: 'POST',
        headers,
        body:JSON.stringify({courseId, name,id})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}


export const deleteVideoPlayList=(playlistId, callback) => {
    let headers = new Headers();    

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
     
    fetch(serverApiUrl+'/institute/course/video/delete/playlist/'+playlistId,{
        method: 'DELETE',
        headers,
        // body:JSON.stringify({courseId, name})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const editVideoDetails=(courseId,description, id, name, playlistId, videoThumb, videoLocation,videoType, callback)=>{
    let headers = new Headers();    

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
     
    fetch(serverApiUrl+'institute/course/video/editVideoDetails',{
        method: 'PUT',
        headers,
        body:JSON.stringify({courseId,description,videoType, id, name, playlistId, videoThumb, videoLocation})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}


export const editVideoFile=(file, videoId, callback,callbackProgress)=>{
    var formData   = new FormData();  
    formData.append("file", file) 
    formData.append("videoId", videoId)        
    let headers = new Headers(); 
    // fetch(serverApiUrl+'institute/course/video/updateVideo',{
    //     method: 'PUT',
    //     headers,
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
   
    xhr.open('PUT', serverApiUrl+'institute/course/video/updateVideo');
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.responseType = 'json';
    xhr.onload = function() { 
        callback({status: this.status,headers:{location:xhr.getResponseHeader("location")}})
      };
    xhr.send(formData);
}

export const updateLiveVideoLink=(videoLink, videoId, callback,callbackProgress)=>{
          
    let headers = new Headers(); 
    // fetch(serverApiUrl+'institute/course/video/updateVideo',{
    //     method: 'PUT',
    //     headers,
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
   
    xhr.open('PUT', serverApiUrl+'institute/course/video/updateLiveVideoLink/'+videoId);
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.responseType = 'json';
    xhr.onload = function() { 
        callback({status: this.status,headers:{location:xhr.getResponseHeader("location")}})
      };
    xhr.send(videoLink);
}

export const editVideoThumb=(file, videoId, callback,callbackProgress)=>{
    var formData   = new FormData();  
    formData.append("file", file) 
    formData.append("videoId", videoId)        
    let headers = new Headers(); 
    // fetch(serverApiUrl+'institute/course/video/updateVideoThumb',{
    //     method: 'PUT',
    //     headers,
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
   
    xhr.open('PUT', serverApiUrl+'institute/course/video/updateVideoThumb');
    // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
    xhr.responseType = 'json';
    xhr.onload = function() {
        
        callback({status: this.status,headers:{location:xhr.getResponseHeader("location")}})
      };
    xhr.send(formData);
}

export const updateVideoStatus=(status, id, callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'institute/course/video/hidden/'+status+'/'+id,
    {
        method: 'PUT',  
        headers,
        // body:JSON.stringify({courseId,fileAddress,id, name, playlistId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const updateVideoDemoStatus=(status, id, callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'institute/course/video/demo/'+status+'/'+id,
    {
        method: 'PUT',  
        headers,
        // body:JSON.stringify({courseId,fileAddress,id, name, playlistId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}
export const updateVideoStreamingStatus=(status, id, callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'institute/course/video/streaming/'+status+'/'+id,
    {
        method: 'PUT',  
        headers,
        // body:JSON.stringify({courseId,fileAddress,id, name, playlistId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}