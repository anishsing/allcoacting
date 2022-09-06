import {serverApiUrl} from "../index"

export const addBlog=(body, title, image, callback)=>
{
    var formData   = new FormData();  
    formData.append("featureImage", image) 
    formData.append("blogBody", body) 
    formData.append("blogTitle", title) 
    
    let headers = new Headers(); 
    // headers.append('Content-Type', 'multipart/form-data');  
    // headers.append('Access-Control-Allow-Origin', serverApiUrl);
    // headers.append('Access-Control-Allow-Credentials', 'true');

    // headers.append('GET', 'POST', 'OPTIONS'); 
    fetch(serverApiUrl+'admin/blog/',
    {
        method: 'POST',  
        // headers,
        body:formData
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const fetch_blogs=(offset,limit,callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'admin/blog/all/'+offset+'/'+limit,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}

export const fetch_blog_by_id=(id,callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+'admin/blog/byId/'+id,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}


export const editBlog=(title, body, image, id, callback)=>
{
    var formData   = new FormData();  
    formData.append("featureImage", image) 
    formData.append("blogBody", body) 
    formData.append("blogTitle", title) 
    formData.append("id",id)
    
    let headers = new Headers(); 

    fetch(serverApiUrl+'admin/blog/withimage',
    {
        method: 'PUT',  
        body:formData
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const editBlogWithoutImage=(blogFeatureImage, title, blogBody, id, callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

    fetch(serverApiUrl+'admin/blog/withoutimage',
    {
        method: 'PUT',  
        headers,
        body:JSON.stringify({blogFeatureImage, title,blogBody,id})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const deleteBlog=(id, callback)=>
{

        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 
        fetch(serverApiUrl+'admin/blog/'+id,
        {
            method: 'DELETE',  
            headers,
            // body:JSON.stringify({id})
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})
}

export const insertImage=(image, callback)=>
{
    var formData   = new FormData();  
    formData.append("file", image) 
    
    let headers = new Headers(); 
    // headers.append('Content-Type', 'multipart/form-data');  
    // headers.append('Access-Control-Allow-Origin', serverApiUrl);
    // headers.append('Access-Control-Allow-Credentials', 'true');

    // headers.append('GET', 'POST', 'OPTIONS'); 
    fetch(serverApiUrl+'files/upload',
    {
        method: 'POST',  
        // headers,
        body:formData
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

// export const insertImage = (imageName, callback)=>
// {

//         let headers = new Headers(); 
//         headers.append('Content-Type', 'application/json'); 

//         headers.append('Access-Control-Allow-Origin', serverApiUrl);
//         headers.append('Access-Control-Allow-Credentials', 'true');

//         headers.append('GET', 'POST', 'OPTIONS'); 
//         fetch(serverApiUrl+'files/upload',
//         {
//             method: 'POST',  
//             headers,
//             body:JSON.stringify({imageName})
//         })
//         .then((response)=>callback(response)) 
//         .catch((error)=>{console.log(error)})
// }