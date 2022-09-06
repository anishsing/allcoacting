import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateInstituteStreamingKey } from '../../../../api/institute'
import LockScreen from '../../../../components/LockScreen/LockScreen'
import { SET_INSTITUTE_DETAILS } from '../../../../Reducers/types'
import CourseLiveVideo from './CourseLiveVideo'

import Snackbar from '@material-ui/core/Snackbar';
import ClipLoader from "react-spinners/ClipLoader";
function YTStreamKeyUi({activeCourse,setLiveVideoCount,liveVideoCount}) {
        const [ytSecretKey,setYtSecretKey] = useState('')
        const [loading,setLoading] = useState(false)
        const insDetails = useSelector((state) => state.ins.insDetails)
        const dispatch = useDispatch()
        const [SnackBarMessage, setSnackBarMessage] = useState("")
        const [isSnackBarShow, setIsSnackBarShow] = useState(false)
        const closeSnack = () => {
            setIsSnackBarShow(false)
        }
        const onSubmitHandler = (e) =>
        {
                e.preventDefault();
                if(!loading) {
                    setLoading(true)
                    updateInstituteStreamingKey(insDetails.id,ytSecretKey,(response)=>{

                        if(response.status == 200)
                        {
                            dispatch({ type: SET_INSTITUTE_DETAILS,payload:{insDetails:{...insDetails,insStreamingSecretKey:ytSecretKey}}})
                            setSnackBarMessage("Key Updated Successfully")
                            setIsSnackBarShow(true)
                        }else{
                            setSnackBarMessage("Something Went Wrong. Please Try Again Later.")
                            setIsSnackBarShow(true)
                        }
                        setLoading(false)
                    })
                }
        }
    const getLockScreenUi = ()=>
    {
        return(
            <div className="react-lock-screen__ui row d-flex     " style={{position: 'absolute',top:"40%",left:"40%"}}>
                <div className="col-md-12 col-12">
                    <center>
                        <h6>YouTube Stream Secret Key is required to go live.</h6>
                        <p>Follow these steps to get your YouTube stream secret key <a target="_blank" href="https://www.streamscheme.com/where-to-find-your-youtube-stream-key/">Click Here</a></p>
                    </center>
                    <form onSubmit={onSubmitHandler}>
                        <div className="form-group">
                                <div className="row">
                                    <div className="col-12">
                                        <label>YouTube Stream Secret Key</label>
                                        <input type="text" className="form-control" required onChange={(e)=>setYtSecretKey(e.target.value)}/>
                                    </div>
                                </div>
                                <div className="row m-1">
                                    <div className="col-12">
                                       <center>     
                                           <button className="btn btn-primary">
                                                {loading ? (
                                                    <ClipLoader color={"#fff"} loading={loading} />
                                                ) : ('Submit')}
                                           </button>
                                        </center>
                                    </div>
                                </div>
                        </div>
                    </form>
                    
                </div>
            </div>
        )
    }
  return (
    <>
        <LockScreen
            // timeout={2000}
            ui={getLockScreenUi}
            isLocked={!insDetails.insStreamingSecretKey}
            >
                <h5 className="ml-1"  >Download Our Institute App to Go Live <a href="#" target="_blank">Click Here</a></h5>
                <CourseLiveVideo  activeCourse={activeCourse} setLiveVideoCount={setLiveVideoCount} liveVideoCount={liveVideoCount} />
        </LockScreen>
        <Snackbar
            open={isSnackBarShow}
            onClose={(e) => closeSnack(e)}
            TransitionComponent="TransitionUp"
            message={SnackBarMessage}
        />
     </>
  )
}

export default YTStreamKeyUi