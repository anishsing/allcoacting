import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import { serverBaseUrl, theme } from '../../../..';
import {updateTestSeriesDemoStatus, updateTestSeriesStatus,getStudentCount} from '../../../../api/TestSeries'

import Snackbar from '@material-ui/core/Snackbar';
function CourseTestSeriesRow(props) {
    const {row,index,activeCourse,setPublishModal,setSeriesDetails,deleteCourseTestSeries}=props    
     
    const [hiddenStatus,setHiddenStatus] = useState(row.hidden);
    const [demo ,setDemo] = useState(row.demo)

    const [attempCount,setAttempCount] = useState(0)
    const [SnackBarMessage, setSnackBarMessage] = useState("")
    const [isSnackBarShow, setIsSnackBarShow] = useState(false)
    useEffect(() =>{

        setDemo(row.demo);
        if(row.id)
        {
            getStudentCount(row.id,response=>{
                if(response.status==200)
                {
                    response.json().then(data=>{
                        setAttempCount(data);
                    })
                }
            })
        }
    },[row])

    const updateDemoStatusCallBack=(response, status)=>{
        if(response.status==200)
        {
            setDemo(status)
        }
        else
        {
            console.log(response.status)
        }
    }
    // const [title, setTitle] = useState(row.title);
    // const [maxMarks, setMaxMarks] = useState(row.maxMarks)
    // const [duration, setDuration] = useState(row.timeDuration)
    // const [questionCount, setQuestionCount] = useState(row.questionCount)
    // const [seriesId, setSeriesId] = useState(row.id);
    // const [hiddenStatus, setHiddenStatus] = useState(row.hidden);
    const closeSnack = () => {
        setIsSnackBarShow(false)
    }

    const publishBtnHandler = ()=>
    {
            
        if(row.questionCount<=0)
        {
            setIsSnackBarShow(true)
            setSnackBarMessage("Please Add Questions To publish Test")
        }else
        {
            setPublishModal(true);
            setSeriesDetails(row,publishModelCallBack,index)
        }
    }
    const publishModelCallBack=()=>
    {
        setHiddenStatus(false)
    }
    const updateStatusCallBack = (response, status) => {
        if (response.status == 200) {
            setHiddenStatus(status)
        }
        else {
            console.log(response.status)
        }
    }

    return (
        <tr>
            <td align="center">{index + 1}</td>
            <td align="center">{row.title}</td>
            <td align="center">{row.timeDuration}</td>
            <td align="center">{row.maxMarks}</td>
            <td align="center">{row.questionCount}</td>
            <td align="center">{attempCount}</td>
            <td align="center">
                <Link to={"/addTestSeries/edit/" + row.id + "/" + activeCourse}>
                    <button aria-label="delete" className="btn btn-success mr-1">
                        EDIT
                    </button>
                </Link>
                <Link to={"/leaderboard/"+row.id}>
                    <button aria-label="delete" className="btn btn-success mr-1">
                    leaderboard
                    </button>
                </Link>
                 
                    <button aria-label="delete"  onClick={()=>deleteCourseTestSeries(row.id,index)} className="btn btn-danger mr-1">
                        Delete
                    </button>
                 
                    
                {hiddenStatus ? (
                    // <button aria-label="delete" onClick={() => updateTestSeriesStatus(false, seriesId, (response) => updateStatusCallBack(response, false))} className="btn btn-warning mr-1">
                    //     PUBLISH
                    // </button>
                    <button aria-label="delete" onClick={() => publishBtnHandler()} className="btn btn-warning mr-1">
                        PUBLISH
                    </button>
                ) : (
                    <button aria-label="delete" onClick={() => updateTestSeriesStatus(true, row.id, (response) => updateStatusCallBack(response, true))} className="btn btn-warning mr-1">
                        HIDE
                    </button>
                )}

                {demo?(

                    <button href="javascript:;" className="btn btn-info" onClick={()=>{updateTestSeriesDemoStatus(false,row.id,(response) => updateDemoStatusCallBack(response, false))}}>Close For Non Paid Users</button>
                ):(

                    <button href="javascript:;" className="btn btn-info" onClick={()=>{updateTestSeriesDemoStatus(true,row.id,(response) => updateDemoStatusCallBack(response, true))}}>Open For All (Free)</button>
                )} 
            </td>
            <Snackbar
            open={isSnackBarShow}
            onClose={(e) => closeSnack(e)}
            TransitionComponent="TransitionUp"
            message={SnackBarMessage}
            />
        </tr>
    )
}

export default CourseTestSeriesRow
