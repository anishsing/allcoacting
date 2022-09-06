import React, { useState, useEffect } from 'react'
import {deleteStudent, updateStudentStatus} from '../../api/Student'

import {Link} from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';

export default function RenderSingleStudent(props) {

    const [isBlock, setBlockstatus] = useState(props.row.blocked)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)

    


    const deleteStudentCallback=(response,index) =>{
        if(response.status==200){
            console.log('data has been delete for student')
            // response.json().then(data=>{
            //     console.log('deleting Student data', data)
            // })
            props.deleteAtIndex(index)
            setSnackBarMessage("Student Deleted Successfully")
            setIsSnackBarShow(true)
        } else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log('Ooops! Something went wrong while deleting!')
        }
    }

    const action4DeleteStudent=(e, name,index)=>{
        console.log('yeh id for delete', e)

        if(window.confirm('Are you sure to Delete data for '+ name)){
           
            deleteStudent(e, (response)=>deleteStudentCallback(response,index))
            
        } else{
            console.log('cancel mission del')
        }
        
    }


    const updateStudentStatusCallback=(response,status)=>{
        console.log(response.status)
        if(response.status==200){
                setBlockstatus(status)
                setSnackBarMessage("Status Updated Successfully")
            setIsSnackBarShow(true)
        } else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log('Oops!, something went wrong while change the student status')
        }
    }


    const action4ChangeStudentStatus=(id, name, status)=>{
        // value 1 hai to approved hai aur,  0 hai toh block hai
        
        if(window.confirm('Are you sure to Change the Status for '+ name)){
            updateStudentStatus( status, id,(response)=>updateStudentStatusCallback(response,status))
        } else {
            console.log('cancel mission 4 update student status')
        }

    }

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }
    
    return (
        <>

        <tr>
            <td align="center">{props.index+1}</td>
            <td align="center">{props.row.name}</td>
            <td align="center">{props.row.email}</td>
            <td align="center">{props.row.mobileNumber}</td>
           
            <td align="center">{props.row.stateOfResidence}</td>
            <td align="center">


                <button className="btn btn-danger m-1" onClick={(e)=>action4DeleteStudent(props.row.id, props.row.name, props.index)}>Delete</button>

                <Link to={"/studentView/"+props.row.id} className="btn btn-info m-1">View</Link>

                {!isBlock ?(
                    <>
                    <button className="btn btn-success m-1" onClick={(e)=>action4ChangeStudentStatus(props.row.id, props.row.name, true)}>UnBlock</button>
                    </>
                ):(
                    <>
                    <button className="btn btn-success m-1" onClick={(e)=>action4ChangeStudentStatus(props.row.id, props.row.name, false)}>Block</button>
                    </>
                )}

                


                {/*
                delete
                view */}
            </td>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />

        </tr>

        </>
    )
}
