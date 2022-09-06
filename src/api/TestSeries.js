import moment from "moment";
import { serverApiUrl } from "../index"

export const fetch_testSeries_category = (offset, dataLimit, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "admintestseries/testseriesdata/" + offset + "/" + dataLimit,
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}
export const addTestSeriesCategory = (image, name, sortOrder, callback) => {


    let formData = new FormData();
    formData.append("file", image);
    formData.append("name", name);
    formData.append("sortOrder", sortOrder);
    fetch(serverApiUrl + "admintestseries/addCategory",
        {
            method: 'POST',
            // headers,
            body: formData,
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}
export const editTestSeriesCategory = (id, image, name, sortOrder, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + "admintestseries/editCategory",
        {
            method: 'PUT',
            headers,
            body: JSON.stringify({ image, name, sortOrder, id })
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}
export const addTestSeriesSubCategory = (image, name, sortOrder, categoryId, callback) => {


    let formData = new FormData();
    formData.append("file", image);
    formData.append("name", name);
    formData.append("sortOrder", sortOrder);
    formData.append("categoryId", categoryId);
    fetch(serverApiUrl + "admintestseries/subcategory/add",
        {
            method: 'POST',
            // headers,
            body: formData,
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}
export const editTestSeriesSubCategory = (id, image, name, sortOrder, categoryId, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + "admintestseries/subcategory/edit",
        {
            method: 'PUT',
            headers,
            body: JSON.stringify({ image, name, sortOrder, id, categoryId })
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}
export const fetchTestSeriesByCategoryId = (id, offset, dataLimit, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "admintestseries/testSubCategoryByCategoryId/" + id + "/" + offset + "/" + dataLimit,
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}
export const addTestSeriesContent = (image, name, sortOrder, subcategoryId, callback) => {


    let formData = new FormData();
    formData.append("file", image);
    formData.append("name", name);
    formData.append("sortOrder", sortOrder);
    formData.append("subcategoryId", subcategoryId);
    fetch(serverApiUrl + "admintestseries/subcategory/content/add",
        {
            method: 'POST',
            // headers,
            body: formData,
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}
export const editTestSeriesContent = (id, image, name, sortOrder, testSeriesSubCategoryId, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + "admintestseries/subcategory/content/edit",
        {
            method: 'PUT',
            headers,
            body: JSON.stringify({ image, name, sortOrder, id, testSeriesSubCategoryId })
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}
export const fetchTestSeriesBySubCategory = (subId, offset, dataLimit, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "admintestseries/subcategory/content/bysubcategory/" + offset + "/" + dataLimit + "/" + subId,
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const seriesList = (subId, offset, dataLimit, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + "admintestseries/subcategory/content/testseries/" + offset + "/" + dataLimit + "/" + subId,
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
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
    fetch(serverApiUrl + 'admintestseries/category/delete/' + id,
        {
            method: 'DELETE',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const deleteSubCategory = (id, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + '/admintestseries/subCategory/delete/' + id,
        {
            method: 'DELETE',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const deleteSubCategoryContent = (id, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'admintestseries/subCategoryContent/delete/' + id,
        {
            method: 'DELETE',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const deleteTestSeries = (id, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/course/testseries/delete/series/' + id,
        {
            method: 'DELETE',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const deleteQuestion = (id, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/course/testseries/delete/series/question/' + id,
        {
            method: 'DELETE',
            headers,
            // body:JSON.stringify({title,description,fees,instId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const createTestSeries = (title, admin, hidden, courseId, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/course/testseries/save/testseries',
        {
            method: 'POST',
            headers,
            body: JSON.stringify({ title, admin, hidden,courseId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const editTestSeriesData = (id, title, timeDuration, time, date, practice, category, maxMarks, admin,hidden,courseId,questionCount, correctMarks,wrongMarks,callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/course/testseries/save/testseries',
        {
            method: 'POST',
            headers,
            body: JSON.stringify({ id, title,wrongMarks,correctMarks, timeDuration,questionCount, time:time, date:moment(new Date(date)).format("DD/MM/YYYY"),practice, category, maxMarks, admin,hidden,courseId })
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const fetchTestSeriesQuestions = (seriesId, offset, dataLimit, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/course/testseries/questions/' + seriesId + '/' + offset + '/' + dataLimit,
        {
            method: 'GET',
            headers,
            // body:JSON.stringify({title, timeDuration, practice, category, maxMarks, admin})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}


export const addTestSeriesQuestion = (questionImage, optionAImage, optionBImage, optionCImage, optionDImage, questionText, optionAText, optionBText, optionCText, optionDText, correctOpt, explanation,  questionType, optionType, testSeriesId, questionId, mode, seriesId, callback) => {
    var formData = new FormData();
    formData.append("questionType", questionType)
    formData.append("optionType", optionType)
    switch (optionType) {
        case "1":
        case 1:
            formData.append("optionAText", optionAText)
            formData.append("optionBText", optionBText)
            formData.append("optionCText", optionCText)
            formData.append("optionDText", optionDText)
            break;

        case "2":
        case 2:
            formData.append("optionAImage", optionAImage)
            formData.append("optionBImage", optionBImage)
            formData.append("optionCImage", optionCImage)
            formData.append("optionDImage", optionDImage)
            break;
    }

    switch (questionType) {
        case "1":
        case 1:
        case "3":
        case 3:
            formData.append("questionText", questionText)
            break;
        case "2":
        case 2:
        case "4":
        case 4:
            formData.append("questionImage", questionImage)
            break;

    }

    formData.append("correctOpt", correctOpt)
    formData.append("explanation", explanation)
    // formData.append("correctMarks", correctMarks)
    // formData.append("wrongMarks", wrongMarks)
    formData.append("testSeriesId", testSeriesId)
    formData.append("mode", mode)
    if (mode == "edit") {
        formData.append("questionId", questionId)
    }
    formData.append("seriesId", seriesId)
    let headers = new Headers();
    fetch(serverApiUrl + 'institute/course/testseries/series/addquestion/' + seriesId,
        {
            method: 'POST',
            body: formData,
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const editTestSeriesQuestion = (correctMarks, correctOpt, explanation, wrongMarks, id, callback) => {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // headers.append('Access-Control-Allow-Origin', serverApiUrl);
    // headers.append('Access-Control-Allow-Credentials', 'true');

    // headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/course/testseries/update/series/question/details/' + id,
        {
            method: 'PUT',
            headers,
            body: JSON.stringify({ correctMarks, correctOpt, explanation, wrongMarks, id }),
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}


export const addMultipleQuestion = (insTestSeriesQuestions, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/course/testseries/savequestion',
        {
            method: 'POST',
            headers,
            body: JSON.stringify(insTestSeriesQuestions)
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}


export const getSeriesDataById = (id, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/course/testseries/byid/' + id,
        {
            method: 'GET',
            headers,
            // body:JSON.stringify(insTestSeriesQuestions)
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}




export const updateQuestion = (type, fieldName, questionId, text, file, fieldDbType, callback) => {
    // console.log(type, fieldName, questionId, text, file, fieldDbType)

    var formData = new FormData();
    formData.append("type", type)
    formData.append("fieldName", fieldName)
    formData.append("questionId", questionId)
    formData.append("fieldDbType", fieldDbType)
    if (type == "file") {
        formData.append("file", file)
    }
    else if (type == "text") {
        formData.append("text", text)
    }
    // formData.append("qId", questionId) 
    let headers = new Headers();
    fetch(serverApiUrl + 'institute/course/testseries/series/updatequestiondata/',
        {
            method: 'PUT',
            headers,
            body: formData,
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}



export const getTestSeriesPlaylist = (courseId, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/course/testseries/all/playlists/' + courseId,
        {
            method: 'GET',
            headers,
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const createTestSeriesPlaylist = (courseId, name, callback, id) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    fetch(serverApiUrl + 'institute/course/testseries/createplaylist',
        {
            method: 'POST',
            headers,
            body: JSON.stringify({ courseId, name, id })
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}


export const deleteTestSeriesPlayList = (playlistId, callback) => {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + 'institute/course/testseries/delete/series/playlist/' + playlistId, {
        method: 'DELETE',
        headers,
        // body:JSON.stringify({courseId, name})
    })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}


export const updateTestSeriesStatus = (status, id, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');

    fetch(serverApiUrl + 'institute/course/testseries/hidden/' + status + '/' + id,
        {
            method: 'PUT',
            headers,
            // body:JSON.stringify({courseId,fileAddress,id, name, playlistId})
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const getTestSeriesStudentResponse = (id, offset, datalimit, callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    let apiUrl = serverApiUrl + '/testSeries/get-testseries-student-response/' + id + "/" + offset + "/" + datalimit;
    fetch(apiUrl,
        {
            method: 'GET',
            headers,
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const getStudentCount = (id,  callback) => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    let apiUrl = serverApiUrl + 'testSeries/get-studentCount/' + id +"/";
    fetch(apiUrl,
        {
            method: 'GET',
            headers,
        })
        .then((response) => callback(response))
        .catch((error) => { console.log(error) })
}

export const updateTestSeriesDemoStatus=(status, id, callback)=>
{
    let headers = new Headers(); 
    headers.append('Content-Type', 'application/json'); 

    headers.append('Access-Control-Allow-Origin', serverApiUrl);
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS'); 

     fetch(serverApiUrl+'institute/course/testseries/demo/'+status+'/'+id,
    {
        method: 'PUT',  
        headers,
        // body:JSON.stringify({courseId,fileAddress,id, name, playlistId})
    })
    .then((response)=>callback(response)) 
    .catch((error)=>{console.log(error)})
}