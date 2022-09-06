import React, { useState, useEffect } from 'react';
import { boostInstitute } from '../../api/institute'
import { dataLimit,theme } from '../../index'
import { fetch_instituteList, deleteInstitute, updateStatus } from '../../api/institute'
import { Link } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';


const RenderSingleInstitute = props => {

    const [status, setStatus] = useState(props.row.status);
    const {index} = props;
    const {state,city,phone,email,directorName,name,id} = props.row
    const [boostValue,setBoostValue] = useState(props.row.boostValue) 
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)

    const updateCallback=(response, status)=>{
        if(response.status==200)
        {
            console.log("done")
            setStatus(status)
            props.update(index, status)
            setSnackBarMessage("Institute Details Updated Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }

    const deleteIns=()=>{
        if(window.confirm('Are you sure you want to delete?'))
        {
            deleteInstitute(id, index, props.deleteCallback)
        }
    }

    const changeStatus=(status)=>{
        if(window.confirm('Are you sure you want to change the status?'))
        {
            updateStatus(id, status, updateCallback)
        }
    }

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }

    return(
        <tr>
            <td align="center">{index+1}</td>
            <td align="center">{name}</td>
            <td align="center">{directorName}</td>
            <td align="center">{email}</td>
            <td align="center">{phone}</td>
            <td align="center">{city}</td>
            <td align="center">{state}</td>
            <td align="center" id={"boost"+props.row.id}>{boostValue}</td>
            <td align="center">
                <button type="button" class="btn btn-danger m-1 px-2" onClick={() => deleteIns()}>
                    Delete
                </button>
                <Link  to={"/insview/"+props.row.id} class="btn btn-primary m-0 px-2">
                    View
                </Link>
                <button type="button" class="btn btn-primary m-0 px-2" onClick={()=>{props.setIsBoostModalVisible(true);props.setBoostValue(boostValue);props.setBoostInsId(id)}}>
                    Boost
                </button>
                {status==0?(
                    <button type="button" class="btn btn-success m-1 px-2" onClick={()=>changeStatus(1)}>
                        Approve
                    </button>
                ):(
                    status==1?(
                        <button type="button" class="btn btn-success m-1 px-2" onClick={()=>changeStatus(2)}>
                            Block
                        </button>
                    ):(
                        status==2?(
                            <button type="button" class="btn btn-success m-1 px-2" onClick={()=>changeStatus(1)}>
                                Unblock
                            </button>
                        ):(null)
                    )
                )

                }
            </td>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </tr>
        
    )
}
export default RenderSingleInstitute