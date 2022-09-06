import {serverApiUrl} from "../index"

    export const add_institute_courses=(instId,title,fees,description,callback)=>
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 

                fetch(serverApiUrl+'institute/course/',
        {
            method: 'POST',  
            headers,
            body: JSON.stringify({instId,title,fees,description})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

    
    export const fetch_institute_courses=(instId,isDeleted,callback)=>
    {
         
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'institute/'+instId+"/course?isDeleted="+isDeleted,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }
    
    export const getCourseDetailsById=(id,callback)=>
    {
        console.log("fetchong")
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'institute/coursebyId/'+id,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

    export const fetch_courses_banners=(courseId,callback)=>
    {

         
                let headers = new Headers(); 
                headers.append('Content-Type', 'application/json'); 

                headers.append('Access-Control-Allow-Origin', serverApiUrl);
                headers.append('Access-Control-Allow-Credentials', 'true');

                headers.append('GET', 'POST', 'OPTIONS'); 

                fetch(serverApiUrl+'/institute/course/banners/all/'+courseId,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
    }

    export const fetch_courses_videos=(courseId=-1,offset,dataLimit,callback,playlistId=-1)=>
    {

          
                let headers = new Headers(); 
                headers.append('Content-Type', 'application/json'); 

                headers.append('Access-Control-Allow-Origin', serverApiUrl);
                headers.append('Access-Control-Allow-Credentials', 'true');

                headers.append('GET', 'POST', 'OPTIONS'); 
                let apiUrl;
                if(playlistId == -1)
                {
                    apiUrl = serverApiUrl+'institute/course/video/all/'+courseId+"/"+offset+"/"+dataLimit
                }else
                {
                    apiUrl = serverApiUrl+'institute/course/video/playlist/'+playlistId+"/"+offset+"/"+dataLimit
                }
                    
                fetch(apiUrl,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
    }
    export const fetch_courses_live_videos=(courseId,offset, dataLimit, callback)=>
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
            let apiUrl;
           
            apiUrl = serverApiUrl+'institute/course/video/liveVideosOfCourse/'+courseId+'/'+offset+'/'+dataLimit
             
     

             fetch(apiUrl,
            {
                method: 'GET',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
}

    export const fetch_courses_documents=(courseId=-1,offset,dataLimit,callback,playlistId=-1)=>
    {

                let headers = new Headers(); 
                headers.append('Content-Type', 'application/json'); 

                headers.append('Access-Control-Allow-Origin', serverApiUrl);
                headers.append('Access-Control-Allow-Credentials', 'true');

                headers.append('GET', 'POST', 'OPTIONS'); 
                let apiUrl;
                if(playlistId == -1)
                {
                    apiUrl = serverApiUrl+'/institute/course/document/all/'+courseId+"/"+offset+"/"+dataLimit
                }else
                {
                    apiUrl = serverApiUrl+'/institute/course/document/playlist/'+playlistId+"/"+offset+"/"+dataLimit
                }
                    
                fetch(apiUrl,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
    }



    export const fetch_testSeries = (courseId,offset,dataLimit,callback)=>
    {

                let headers = new Headers(); 
                headers.append('Content-Type', 'application/json'); 

                headers.append('Access-Control-Allow-Origin', serverApiUrl);
                headers.append('Access-Control-Allow-Credentials', 'true');

                headers.append('GET', 'POST', 'OPTIONS'); 
                let apiUrl = serverApiUrl+'/institute/course/testseries/all/'+courseId+"/"+offset+"/"+dataLimit
                
                    
                fetch(apiUrl,
                {
                    method: 'GET',  
                    headers,
                    // body:JSON.stringify({title,description,fees,instId})
                })
                .then((response)=>callback(response)) 
                .catch((error)=>{console.log(error)})
    }

    export const editCourses=(instId,title,fees,description,id,callback)=>
    {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 

        
        fetch(serverApiUrl+'institute/course/',
        {
            method: 'POST',  
            headers,
            body: JSON.stringify({id, title, fees, description, instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

    export const deleteCourse=(id, status,callback)=>
    {

            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            fetch(serverApiUrl+'institute/'+id+"?deleteCourse="+status,
            {
                method: 'DELETE',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }
    
    
    export const deleteCoursePermanently=(id, callback)=>
    {

            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            fetch(serverApiUrl+'institute/deleteCoursePermanently/'+id,
            {
                method: 'DELETE',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }

   

    export const deleteVideo=(id, callback)=>
    {

            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            fetch(serverApiUrl+'institute/course/video/delete/'+id,
            {
                method: 'DELETE',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }
    
    export const deleteDocument=(id, callback)=>
    {

            let headers = new Headers(); 
            headers.append('Content-Type', 'application/json'); 

            headers.append('Access-Control-Allow-Origin', serverApiUrl);
            headers.append('Access-Control-Allow-Credentials', 'true');

            headers.append('GET', 'POST', 'OPTIONS'); 
            fetch(serverApiUrl+'institute/course/document/delete/'+id,
            {
                method: 'DELETE',  
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})
    }

    export const getDocumentCount=(id, callback)=>{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/document/count/'+id,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

    export const getVideoCount=(id, videoType,callback)=>{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/video/count/'+id+"/"+videoType,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

    export const getTestSeriesCount=(id, callback)=>{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/testseries/count/'+id,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

    export const getBannerCount=(id, callback)=>{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/banners/countbyCoureId/'+id,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }
    
    export const getTimeTableCount=(id, callback)=>{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/timetable/count/'+id,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }

    export const getStudentCount=(id, callback)=>{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/reviews/count/course/'+id,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }



    export const getDocumentPlaylist=(courseId, callback)=>{
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/document/playlists/'+courseId,
        {
            method: 'GET',  
            headers,
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}


    export const createDocumentPlaylist=(courseId, name, callback,id) => {
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'institute/course/document/createPlaylist',
        {
            method: 'POST',  
            headers,
            body:JSON.stringify({courseId,name,id})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
    }


    
export const deleteDocuentPlayList=(playlistId, callback) => {
    let headers = new Headers();    

    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
     
    fetch(serverApiUrl+'institute/course/document/delete/playlist/'+playlistId,{
        method: 'DELETE',
        headers,
        // body:JSON.stringify({courseId, name})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}
    

  export const getInstituteCourseWiseStudentEnrolled=(insId,callback)=>
  {
        let headers = new Headers();    

        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        
        fetch(serverApiUrl+'institute/getInstituteCourseWiseStudentEnrolled/'+insId,{
            method: 'GET',
            headers,
            // body:JSON.stringify({courseId, name})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
  }


  export const getStudentEnrolledInCourse=(courseId,callback)=>
  {
        let headers = new Headers();    

        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        
        fetch(serverApiUrl+'institute/getStudentEnrolledInCourse/'+courseId,{
            method: 'GET',
            headers,
            // body:JSON.stringify({courseId, name})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
  }
