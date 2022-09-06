import { serverApiUrl } from "..";

export const fetch_messagesForIns=(insId,forAdmin,messageType,offset,dataLimit,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ;
    
    apiUrl = serverApiUrl+`studentMessage/getStudentMessagesWithMessageTypeForIns?insId=${insId}&forAdmin=${forAdmin}&messageType=${messageType}&page=${offset}&pageSize=${dataLimit}`;
     
    
        
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const getChatListForInstitute=(insId,courseId,offset,dataLimit,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ;
    
    apiUrl = serverApiUrl+`studentMessage/getChatListForInstitute?insId=${insId}&courseId=${courseId}&page=${offset}&pageSize=${dataLimit}`;
     
    
        
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}
 

 
export const getStudentChatMessagesForCourse=(insId,studentId,courseId,offset,dataLimit,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ;
    
    apiUrl = serverApiUrl+`studentMessage/getStudentChatForCourse?insId=${insId}&studentId=${studentId}&courseId=${courseId}&page=${offset}&pageSize=${dataLimit}`;
     
    
        
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const fetch_messagesWithRepliesAsForIns=(insId,replied,forAdmin,messageType,offset,dataLimit,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    
    let apiUrl ; 
    if(replied=="false")
    {
    
        apiUrl = serverApiUrl+`studentMessage/getStudentMessagesWithMessageTypeAndRepliedAsForIns?insId=${insId}&replied=${replied}&forAdmin=${forAdmin}&messageType=${messageType}&page=${offset}&pageSize=${dataLimit}`;
    }else
    {
        apiUrl = serverApiUrl+`studentMessage/getStudentMessagesWithMessageTypeForIns?insId=${insId}&forAdmin=${forAdmin}&messageType=${messageType}&page=${offset}&pageSize=${dataLimit}`;
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

export const addReply =(messageObj,callback,image=null) =>
{
    if(image)
    {
        messageObj['images']=image;
    }
    
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ; 
    apiUrl = serverApiUrl+`studentMessage/add`;
      
    fetch(apiUrl,
    {
        method: 'post',  
        headers, 
        body:JSON.stringify(messageObj)
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const getUnSeenMessagesCountForIns =(insId,callback) =>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ;
        
            apiUrl = serverApiUrl+`studentMessage/UnSeenStudentMessageCountForIns?insId=${insId}`;
      
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const updateMessagesSeenStatus =(messageId,status,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ; 
    apiUrl = serverApiUrl+`studentMessage/updateMessageSeenByInsStatus?messageId=${messageId}&status=${status}`;
      
    fetch(apiUrl,
    {
        method: 'PUT',  
        headers, 
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const deleteById =(id,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ; 
    apiUrl = serverApiUrl+`studentMessage/deleteById/${id}`;
      
    fetch(apiUrl,
    {
        method: 'DELETE',  
        headers, 
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}



export const addMessageReplyImage=(messageObj,image,callback)=>
{

    let uploadedImageCounter=0,counter=0;
    let uploadedImageArray=[];
    image.map(item=>{

        if(item.imageLink)
        {
            counter++;
            uploadedImageCounter++;
            uploadedImageArray.push({imageLink:item.imageLink,replyImage:true}) 
            
            if(counter>=image.length)
            {

                addReply(messageObj,callback,uploadedImageArray);
            }

        }else
        {
            uploadImage(item,(response)=>{
                counter++;
                if(response.status==201)
                {
                        uploadedImageCounter++;
                        uploadedImageArray.push({imageLink:response.headers.get('location'),replyImage:true}) 
                }
                if(counter>=image.length)
                {
    
                    addReply(messageObj,callback,uploadedImageArray);
                }
                
    
                 
            })
        }
       
    })
    

        // if(response.status==201)
        // {
            
        // }else
        // {
        //         callback(response);
        // }
     
}

export const uploadImage=(image,callback)=>
{
   
    var formData   = new FormData();  
  
    
        
    formData.append("file",image)
    
    let headers = new Headers(); 
    headers.append('Content-Type', 'multipart/form-data');  
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');  
    fetch(serverApiUrl+'files/upload',
    {
        method: 'POST',  
  
        body:formData
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)}) 
}

 