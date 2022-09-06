import React,{useEffect, useState} from "react";
import { deleteFeed, fetch_feeds } from '../../api/feed'
import { ImageResolver, serverBaseUrl } from "../..";
import moment from 'moment'
import Snackbar from '@material-ui/core/Snackbar';

import ClipLoader from "react-spinners/ClipLoader";
const FeedTop = props => {
    
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)     
    const { feed,setFeedToEdit,index,removeFeedFromState } = props
    const [creationTime, setCreationTime] = useState(feed.feed.feed.creationTime)
    const [logo, setLogo] = useState(feed.posterObject.logo)
    const [deleteLoader,setDeleteLoader] = useState(false)
    const [name, setName] = useState(feed.posterObject.name)
    
    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }
    useEffect(() => {
        setCreationTime(feed.feed.feed.creationTime)
    },[feed])
    const deleteFeedBtnHandler=()=>
    {
        if(!deleteLoader)
        {
            setDeleteLoader(true);
            deleteFeed(feed?.feed?.feed?.id,(response)=>{
                console.log("delete feed ",response.status)
                if(response.status == 200)
                {
                    removeFeedFromState(index)
                }else
                {
                    setSnackBarMessage("Something went wrong")
                    setIsSnackBarShow(true)
                }
                setDeleteLoader(false)
            })
        }
        
    }
     
    return (
        <div className="mt-4">
            <div className="d-md-flex align-items-center">
                <div className="mb-md-0 mb-3" style={{ marginLeft: 20 }}>
                    <img src={ImageResolver(logo)} className="rounded-circle shadow" width="50" height="50" alt="" id="userImage" />
                </div>
                <div className="ml-md-4 flex-grow-1">
                    <div className="d-flex align-items-center mb-1">
                        <h5 className="mb-0" id="username">{name}</h5>
                        <button type="button" className="btn" onClick={()=>{window.scrollTo(0, 0);setFeedToEdit({...feed,index})}}><i className="bx bx-edit"></i></button>
                        <button type="button" className="btn" onClick={()=>deleteFeedBtnHandler()}>{deleteLoader?(<ClipLoader  color={"black"}   loading={deleteLoader}  size={20}   />):(<i className="bx bx-trash"></i>)}</button>
                    </div>
                    <p className="mb-0 text-muted" id="userStatus">{moment(creationTime).fromNow()}</p>
                </div>
            </div>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div>
    );
}

export default FeedTop;