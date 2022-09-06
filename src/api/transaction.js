import { serverApiUrl } from "..";

export const fetch_allTransactions=(offset,dataLimit,callback,status=-1)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ;
        if(status==-1)
        {
            apiUrl = serverApiUrl+'transaction/all/'+offset+"/"+dataLimit;
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


export const fetch_courseTransactions=(id, page, pageSize, callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl = serverApiUrl+"transaction/bycourseId/"+id+"/"+page+"/"+pageSize;
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const fetchInsTransactions=(id, page, pageSize, callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl = serverApiUrl+"transaction/byinsId/"+id+"/"+page+"/"+pageSize;
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const fetchInsTransactionsAnsStatusSuccess=(id, page, pageSize, callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl = serverApiUrl+"transaction/byinsIdAnsStatusSuccess/"+id+"/"+page+"/"+pageSize;
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}



export const getUnSeenTransactionsCount =(insId,callback) =>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ;
        
            apiUrl = serverApiUrl+"transaction/UnSeenTransactionCountForIns?insId="+insId;
      
    fetch(apiUrl,
    {
        method: 'GET',  
        headers,
        // body:JSON.stringify({title,description,fees,instId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const updateTransactionSeenStatus =(transactionId,status,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ; 
    apiUrl = serverApiUrl+`transaction/updateTransactionSeenStatusForIns?transactionId=${transactionId}&status=${status}`;
      
    fetch(apiUrl,
    {
        method: 'PUT',  
        headers, 
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const todayIncomeSumIns=(insId,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ; 
    apiUrl = serverApiUrl+`transaction/getTodayIncomeSumIns/${insId}`;
      
    fetch(apiUrl,
    {
        method: 'GET',  
        headers, 
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}

export const currentMonthIncomeSumIns=(insId,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ; 
    apiUrl = serverApiUrl+`transaction/getCurrentMonthIncomeIns/${insId}`;
      
    fetch(apiUrl,
    {
        method: 'GET',  
        headers, 
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}
export const totalIncomeSumIns=(insId,callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 
    let apiUrl ; 
    apiUrl = serverApiUrl+`transaction/getTotalIncomeIns/${insId}`;
      
    fetch(apiUrl,
    {
        method: 'GET',  
        headers, 
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}
