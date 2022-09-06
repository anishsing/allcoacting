import { serverApiUrl } from "../index"

export const fetchAllInstitute = (offset, dataLimit, callback) => {
    // var formData   = new FormData(); 
    // formData.append("fetch_banners",'true') 
    // formData.append("offset",offset) 
    // formData.append("data_limit",limit)  
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "institute//" + offset + "/" + dataLimit + "/id",
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const fetchInstituteByStatus = (status, offset, dataLimit, callback) => {
    // var formData   = new FormData(); 
    // formData.append("fetch_banners",'true') 
    // formData.append("offset",offset) 
    // formData.append("data_limit",limit)  
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "institute/findAllByStatus/" + status + "/" + offset + "/" + dataLimit + "/id"
        ,
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}
export const fetchInstituteByCategory = (category, offset, dataLimit, callback) => {
    // var formData   = new FormData(); 
    // formData.append("fetch_banners",'true') 
    // formData.append("offset",offset) 
    // formData.append("data_limit",limit)  
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "institute/category/" + category + "/" + offset + "/" + dataLimit
        ,
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const fetch_instituteDetails = (instId, callback) => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + '/institute/' + instId,
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })

}


export const fetchInstituteByStatusAndCategory = (status, category, offset, dataLimit, callback) => {
    // var formData   = new FormData(); 
    // formData.append("fetch_banners",'true') 
    // formData.append("offset",offset) 
    // formData.append("data_limit",limit)  
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "institute/byCategoryAndStatus/" + category + "/" + status + "/" + offset + "/" + dataLimit
        ,
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const fetch_categories = (callback) => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + '/category/dropDownMode/',
        {
            method: 'GET',
            headers
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const fetch_categoriesAll = (callback) => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + '/category/',
        {
            method: 'GET',
            headers
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}


export const deleteCategory = (id, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'category/' + id,
        {
            method: 'DELETE',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}


//add category
export const addCategory = (icon, name, sortOrder, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Expose-Headers', 'Location');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    let request = fetch(serverApiUrl + 'category/',
        {
            method: 'POST',
            headers,
            body: JSON.stringify({ icon, name, sortOrder })
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}


//edit category
export const editCategory = (id, icon, name, sortOrder, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'category/',
        {
            method: 'PUT',
            headers,
            body: JSON.stringify({ id, icon, name, sortOrder })
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}



export const boostInstitute = (insId, boostvalue, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/boost/' + boostvalue + '/' + insId,
        {
            method: 'PUT',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const updateStatus = (insId, status, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/status/' + status + '/' + insId,
        {
            method: 'PUT',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response, status))
        .catch((error) => { console.log(error) })
}

export const deleteInstitute = (id, i, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/delete/' + id,
        {
            method: 'DELETE',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response, i))
        .catch((error) => { console.log(error) })
}

export const fetchLeads = (insId, offset, dataLimit, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "institute/leads/" + insId + "/" + offset + "/" + dataLimit,
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const accountDetails = (insId, callback) => {
    console.log(insId)
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/ins/' + insId + '/account',
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}


// Search Institute ByName
export const instituteSearchByName = (byName, offset, dataLimit, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'search/ins/' + byName + "/" + offset + "/" + dataLimit, {
        method: 'GET',
        headers,
    })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })

}


// Search Institute ByEmail
export const instituteSearchByEmail = (byEmail, offset, dataLimit, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'search/ins/searchbyemail/' + byEmail + "/" + offset + "/" + dataLimit, {
        method: 'GET',
        headers,
    })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })

}


//Edit Institute Details
export const editInstituteDetails = (id, name, directorName, phone, email, password, address, city, state, about, category, logo, accountHolderName, accountNumber, bankName, ifsc, leads, expoToken, boostValue, fiveStarCount, followersCount,  fourStarCount, oneStarCount, status, threeStarCount, totalRating, totalRatingCount, totalRevenue, twoStarCount, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/editInstitute', {
        method: 'PUT',
        headers,
        body: JSON.stringify({ id, name, directorName, phone, email, password, address, city, state, about, category, logo, accountHolderName, accountNumber, bankName, ifsc, leads, expoToken, boostValue, fiveStarCount, followersCount, fourStarCount, oneStarCount, status, threeStarCount, totalRating, totalRatingCount, totalRevenue, twoStarCount})
    })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
    }
    
//Edit Institute Details
export const updateInstituteStreamingKey = (id, instituteStreamingKey, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/ins/updateStreamKey/'+instituteStreamingKey+"/"+id, {
        method: 'PUT',
        headers,
        // body: JSON.stringify({ id, name, directorName, phone, email, password, address, city, state, about, category, logo, accountHolderName, accountNumber, bankName, ifsc, leads, expoToken, boostValue, fiveStarCount, followersCount, fourStarCount, oneStarCount, status, threeStarCount, totalRating, totalRatingCount, totalRevenue, twoStarCount})
    })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
    }
    
    export const updateAccountDetails = (accountHolderName, accountNumber, bankName, ifsc, upi,insId, callback) => {
        console.log(insId)
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        headers.append('Access-Control-Allow-Origin', serverApiUrl);
        headers.append('Access-Control-Allow-Credentials', 'true');

        headers.append('GET', 'POST', 'OPTIONS');
        fetch(serverApiUrl + 'institute/ins/account',
            {
                method: 'PUT',
                headers,
                body: JSON.stringify({ accountHolderName, accountNumber, bankName, ifsc,upi, insId })
            })
            .then((response) => callback(response))
            .catch((error) => { console.log(error) })
    }
