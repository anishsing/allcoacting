    import { serverApiUrl } from "../index"

    export const fetch_feeds = (insid,page, pagesize, callback) => {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS');
        console.log(page, pagesize)
        fetch(serverApiUrl + 'feed/ins/'+insid+"/" + page + '/' + pagesize,
            {
                method: 'GET',
                headers,
                // body:JSON.stringify({feedType})
            })
            .then((response) => callback(response))
            .catch((error) => { console.log(error) })
    }

    export const fetch_comments = (feedId, offset, dataLimit, callback) => {
        // var formData   = new FormData(); 
        // formData.append("fetch_banners",'true') 
        // formData.append("offset",offset) 
        // formData.append("data_limit",limit)  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS');

        fetch(serverApiUrl + 'feed/feed/comment/' + feedId + '/' + offset + '/' + dataLimit,
            {
                method: 'GET',
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response) => callback(response))
            .catch((error) => { console.log(error) })
    }


    export const add_comments = (comment,commenter,feedId,insId,callback) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS');

        fetch(serverApiUrl + 'feed/feed/comment',
            {
                method: 'POST',
                headers,
                body:JSON.stringify({comment,commenter,feedId,insId})
            })
            .then((response) => callback(response))
            .catch((error) => { console.log(error) })
    }


    export const like_feed = (feedId, likerType, likerId, callback) => {
        // var formData   = new FormData(); 
        // formData.append("fetch_banners",'true') 
        // formData.append("offset",offset) 
        // formData.append("data_limit",limit)  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS');
        console.log(feedId, serverApiUrl + "feed/like/feed/" + feedId + "/" + likerType + "/" + likerId)
        fetch(serverApiUrl + "feed/like/feed/" + feedId + "/" + likerType + "/" + likerId,
            {
                method: 'GET',
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response) => callback(response))
            .catch((error) => { console.log(error) })
    }
    export const unlike_feed = (feedId, likerType, likerId, callback) => {
        // var formData   = new FormData(); 
        // formData.append("fetch_banners",'true') 
        // formData.append("offset",offset) 
        // formData.append("data_limit",limit)  
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS');
        console.log(feedId, serverApiUrl + "feed/unlike/feed/" + feedId + "/" + likerType + "/" + likerId)
        fetch(serverApiUrl + "feed/like/feed/" + feedId + "/" + likerType + "/" + likerId,
            {
                method: 'GET',
                headers,
                // body:JSON.stringify({title,description,fees,instId})
            })
            .then((response) => callback(response))
            .catch((error) => { console.log(error) })
    }


    export   const saveFeed =(feed,callback,image=null)=>
    {
        console.log(feed);
        feed['feedImages']=image;
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json');  
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS');  
        console.log("saving feed",feed)
        fetch(serverApiUrl+'feed/add',
        {
            method: 'POST',  
            headers,
            body:JSON.stringify(feed)
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})       
    }
    export   const deleteFeed =(id,callback)=>
    {
        
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json');  
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true'); 
        headers.append('GET', 'POST', 'OPTIONS');   

        fetch(serverApiUrl+'feed/deleteFeedById/'+id,
        {
            method: 'DELETE',  
            headers,
          
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)})       
    }

    export const addImgeFeed=(feed,image,callback)=>
    {

        let uploadedImageCounter=0,counter=0;
        let uploadedImageArray=[];
        image.map(item=>{
            uploadFeedImage(item,(response)=>{
                counter++;
                if(response.status==201)
                {
                        uploadedImageCounter++;
                        uploadedImageArray.push(response.headers.get("location")) 
                }
                if(counter>=image.length)
                {
                
                    saveFeed(feed,callback,uploadedImageArray);
                }

                
            })
        })
        

            // if(response.status==201)
            // {
                
            // }else
            // {
            //         callback(response);
            // }
        
    }

    export const uploadFeedImage=(image,callback)=>
    {
        
        if(image instanceof File &&image.feedImage&&image.feedImage.startsWith("files/"))
        {
            callback({status:201,headers:{map:{location:image}}})
            return;
        } 
        var formData   = new FormData();  
        formData.append("image",image)  
        let headers = new Headers(); 
        headers.append('Content-Type', 'multipart/form-data');  
        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS');  
        fetch(serverApiUrl+'feed/uploadimage',
        {
            method: 'POST',  
            // headers,
            body:formData
        })
        .then((response)=>callback(response)) 
        .catch((error)=>{console.log(error)}) 
    }

    export const votePoll=(feedId,optionId,voterType,voterId,callback)=>
    {
        // var formData   = new FormData(); 
        // formData.append("fetch_banners",'true') 
        // formData.append("offset",offset) 
        // formData.append("data_limit",limit) 
        // console.log(serverApiUrl+"vote/feed/"+feedId+"/"+optionId+"/"+voterType+"/"+voterId) 
        let headers = new Headers(); 
        headers.append('Content-Type', 'application/json'); 

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS'); 

        fetch(serverApiUrl+"feed/vote/feed/"+feedId+"/"+optionId+"/"+voterType+"/"+voterId,
        {
            method: 'GET',  
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response)=>callback(response, optionId)) 
        .catch((error)=>{console.log(error)})
    }

