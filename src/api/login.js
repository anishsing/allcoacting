import {serverApiUrl} from "../index"

export   const validateLogin=(email,password,callback,passMode='hashed')=>
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
                // console.log(serverApiUrl+'institute/validate/',JSON.stringify({email,password}))
             fetch(serverApiUrl+'/institute/validate/',
            {
                method: 'POST',  
                headers,
                body:JSON.stringify({email,password})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})         
} 

export   const passwordReset=(password,hash1,hash2,callback)=>
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
                // console.log(serverApiUrl+'institute/validate/',JSON.stringify({email,password}))
             fetch(serverApiUrl+'institute/resetPassword',
            {
                method: 'POST',  
                headers,
                body:JSON.stringify({hash1,hash2,password})
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})         
} 


export   const forgotPassword=(email,callback)=>
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
                // console.log(serverApiUrl+'institute/validate/',JSON.stringify({email,password}))
             fetch(serverApiUrl+'institute/forgotPassword?email='+email,
            {
                method: 'GET',  
                headers,
              
            })
            .then((response)=>callback(response)) 
            .catch((error)=>{console.log(error)})         
} 
