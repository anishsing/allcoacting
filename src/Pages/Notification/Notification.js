import React, { useState, useEffect, useRef }from 'react' 
import {sendNotification} from '../../api/notification'
import { dataLimit } from '../../index'
import Snackbar from '@material-ui/core/Snackbar';
import { fetch_institute_courses } from '../../api/Courses';
import { useSelector } from 'react-redux';

export default function Notification() {
     

    const [message, setMessage]= useState("")
    const [url, setUrl]= useState("")
    const [title, setTitle]= useState("")
    const [offset, setOffset] = useState(0)
    const [courses, setCourses] = useState("")
    const [selectedCourse, setSelectedCourse] = useState("")
    const [selectedCourseId, setSelectedCourseId] = useState("")
    const [targetEmail,setTargetEmail] = useState("")
    const [targetUserId, setTargetUserId] = useState("")
    const [targetUserType,setTargetUserType] = useState("courseStudents")
    const insDetails = useSelector((state) => state.ins.insDetails)

    const [showProcessing, setShowProcessing] = useState("")
    const[SnackBarMessage, setSnackBarMessage] = useState(null)
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)

    const handleCourseCallback=(response)=>
    {
         
        if(response.status === 200)
        {
            response.json().then(data=>
            { 
                setCourses(data)
                
            })
                
        }else
        {
            setIsSnackBarShow(true)
            setSnackBarMessage("Something Went Wrong. Please Try Again Later.")
        }
        
    }

    useEffect(() =>{
        fetch_institute_courses(insDetails.id,false,handleCourseCallback)
    },[])


    const setSelectedCourseData=(label, key)=>{
        setSelectedCourseId(key)
        setSelectedCourse(label)
    }

    // const sendNotificationCallBack=(response)=>{
    //     if(response.status === 200)
    //     {
    //         getExpoId(selectedCourseId, dataLimit, offset+1, getExpoIdCallBack)
    //     }
    // }

    // const getExpoIdCallBack=(response)=>{
    //     setIsSnackBarShow(true)
    //     if(response.status === 200)
    //     {
    //         response.json().then(data=>{
    //             if(data.length>0)
    //             {
    //                 sendNotification(message, title, url, data, sendNotificationCallBack)
    //             }
    //             else
    //             {
    //                 setShowProcessing(false)
    //                 setSnackBarMessage("Notification Sent To All!!")
                    
    //             }
    //         })
    //     }
    //     else
    //     {
    //         setSnackBarMessage("Something Went Wrong. Please Try Again Later.")
    //     }
    // }

    const send=()=>{
        if(title&&message&&(selectedCourseId||targetUserId||targetEmail)&&targetUserType)
        {
            setShowProcessing(true) 
            sendNotification("", title, url, message,selectedCourseId||targetUserId,targetUserType,targetEmail, sendNotificationCallBack)
        }
        else
        { 
            setSnackBarMessage("Please Fill All The Fields And Make Sure You Have Selected A Category and Target Users!!")
            setIsSnackBarShow(true)
        }
    }
    const sendNotificationCallBack=(response)=>
    {
            if(response.status==200)
            {
                setSnackBarMessage("Notifications Sent Successfully")
                setIsSnackBarShow(true)
            }else
            {
                setSnackBarMessage("Something went wrong")
                setIsSnackBarShow(true)
            }
            setShowProcessing(false) 
    }
    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }
  
    return (
        <div>   
            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Send Notification</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="ml-auto">
                    <div class="btn-group mr-1">
                        <button type="button" class="btn btn-primary">{selectedCourse||"Select Course"}</button>
                        <button type="button" class="btn btn-primary bg-split-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">	<span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">	
                            {courses&&courses.map((row, i) => (
                                <a class="dropdown-item" href="javascript:;" onClick={()=>{setSelectedCourseData(row.title, row.id)}}>{row.title}</a>
                            ))}
                        </div>
                    </div>
                    {/* <div class="btn-group">
                        <button type="button" class="btn btn-primary">{targetUserType||"Select target Users"}</button>
                        <button type="button" class="btn btn-primary bg-split-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">	<span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">	
                           
                            <a class="dropdown-item" href="javascript:;" onClick={()=>{setTargetUserType("studentsEnrolledInCategory")}}>Student Enrolled in Selected Category</a>
                            <a class="dropdown-item" href="javascript:;" onClick={()=>{setTargetUserType("allUsers")}}>All Students</a>
                            <a class="dropdown-item" href="javascript:;" onClick={()=>{setTargetUserType("allInstitutes")}}>All Institutes</a>
                            <a class="dropdown-item" href="javascript:;" onClick={()=>{setTargetUserType("institutesOfCategory")}}>Institutes of Selected Category</a>
                            <a class="dropdown-item" href="javascript:;" onClick={()=>{setTargetUserType("singleUser")}}>Single Student</a>
                            <a class="dropdown-item" href="javascript:;" onClick={()=>{setTargetUserType("singleInstitute")}}>Single Institue</a>
                          
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="card">
                <div className="card-body">

                    <div className="row">
{/* 
                        {targetUserType=="singleInstitute"||targetUserType=="singleUser"?(
                            <>
                                <div className="col-6">
                                    <label>Enter Target Email:</label>
                                    <input type="text" class="form-control" onChange={(e)=>setTargetEmail(e.target.value)}/>
                                </div>
                                <div className="col-6">
                                    <label>or Target Unique Id: </label>
                                    <input type="text" class="form-control" onChange={(e)=>setTargetUserId(e.target.value)}/>
                                </div>
                            </>
                        ):(null)} */}
                    </div>
                    <div class="form-group">
                        <label>Title:</label>
                        <input type="text" class="form-control" onChange={(e)=>setTitle(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>URL:</label>
                        <input type="link" class="form-control" onChange={(e)=>setUrl(e.target.value)}/>
                    </div>
                    <div class="mb-3">
                        <label for="validationTextarea">Message</label>
                        <textarea class="form-control" id="validationTextarea" required onChange={(e)=>setMessage(e.target.value)}></textarea>
                    </div>
                    {showProcessing?(
                        <button className="btn btn-dark" disabled>Processing...</button>
                    ):(
                        <button className="btn btn-dark" onClick={()=>send()}>Send</button>
                    )}
                    
                </div>
            </div>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div>
            
    )
}
