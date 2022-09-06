import React, { useState, useEffect } from 'react'
import {deleteStudent, updateStudentStatus} from '../../../../api/Student'

import {Link} from 'react-router-dom'
import { imageProvider } from '../../../..'

export default function RenderSingleStudent(props) {

    const {row,index}=props
    const [isBlock, setBlockstatus] = useState(row.blocked)

    


    // const deleteStudentCallback=(response,index) =>{
    //     if(response.status==200){
    //         console.log('data has been delete for student')
    //         // response.json().then(data=>{
    //         //     console.log('deleting Student data', data)
    //         // })
    //         props.deleteAtIndex(index)
    //     } else {
    //         console.log('Ooops! Something went wrong while deleting!')
    //     }
    // }

    // const action4DeleteStudent=(e, name,index)=>{
    //     console.log('yeh id for delete', e)

    //     if(window.confirm('Are you sure to Delete data for '+ name)){
           
    //         deleteStudent(e, (response)=>deleteStudentCallback(response,index))
            
    //     } else{
    //         console.log('cancel mission del')
    //     }
        
    // }


    const updateStudentStatusCallback=(response,status)=>{
        console.log(response.status)
        if(response.status==200){
                setBlockstatus(status)
        } else {
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
 
    return (
        <>

        <tr>
            <td>{index+1}</td> 
            <td><img className="image-responsive" style={{height: 30,width:30,borderRadius:15 }} src={imageProvider(row.studentImage)}/> {row.studentName}</td> 
            <td>{row.studentEmail}</td>
            <td>{row.studentMobile}</td>
             

        </tr>

        </>
    )
}
