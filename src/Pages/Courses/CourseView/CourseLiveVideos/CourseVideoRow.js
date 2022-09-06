import React,{ useState, useEffect} from 'react'
import { serverBaseUrl, theme } from '../../../..';
import {updateVideoDemoStatus, updateVideoStreamingStatus} from '../../../../api/video'
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
import Menu from '../../../../components/Menu/Menu';
function CourseVideoRow(props) {
    const {row,index,delVideo,setEditDetails}=props 
      
    const [ title,setTitle] = useState(row.name);
    const [description,setDescription] = useState(row.description)
    const [video,setVideo] = useState(serverBaseUrl+row.videoLocation)
    const [videoId,setVideoId] = useState(row.id);
    const [hiddenStatus,setHiddenStatus] = useState(row.hidden);
    const [delLoading, setDelLoading] = useState(false);
    const [demo ,setDemo] = useState(row.demo)
    const [streaming,setStreaming] = useState(row.streaming)
    useEffect(() =>{

        setDemo(row.demo);
        setStreaming(row.streaming)
    },[row])
    useEffect(()=>{
        setDelLoading(props.delLoading)
    },[props.delLoading])


    const updateStatusCallBack=(response, status)=>{
        if(response.status==200)
        {
            setHiddenStatus(status)
        }
        else
        {
            console.log(response.status)
        }
    }

    const updateDemoStatusCallBack=(response, status)=>{
        console.log(response.status)
        if(response.status==200)
        {
            setDemo(status)
        }
        else
        {
            console.log(response.status)
        }
    }
    const updateStreamingStatus=(status)=>
    {
        updateVideoStreamingStatus(status,videoId,(response)=>{
            if(response.status==200)
            {
                setStreaming(status)
            }
        })
        
    }
 
    return (



        <div className="col-12 mb-3" style={{flexDirection:'column'}}>
            <div className="row">
                <div className="col-1 align-items-center justify-content-center d-flex" >
                    <h4>{index+1}.</h4>
                </div>
                <div className="col-4">
                     
                    <img 
                     src={row.videoThumb.includes("http://")?row.videoThumb:serverBaseUrl+row.videoThumb} 
                    className="w-50 h-95" style={{borderRadius:15,border: '1px solid grey'}} 
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="/assets/images/videoPlaceHolder.png";
                      }}
                    
                    />
                     
                </div>  
                <div className="col-3 align-items-center justify-content-center d-flex " style={{flexDirection: 'column'}}>
                        <h4>
                            {row.name?.length>20?(
                                row.name?.slice(0,20)+"..."
                            ):(
                                row.name
                            )}
                            
                        </h4>
                        <h6 className="align-items-center   d-flex"><i className="lni lni-eye  mr-1"></i>{row.views } <i className="lni lni-calendar ml-1 mr-1"></i> {moment(row.liveClassDate).format("D/M/Y") +" "+ row.liveClassTime }</h6>
                </div>
                <div class="col-4 justify-content-between ml-auto" >
                    <a className="btn btn-info mr-1"  href="https://studio.youtube.com/channel/" target="_blank" >
                        Go Live
                    </a>      
                    <button aria-label="delete" onClick={()=>{delVideo(videoId,index)}} className="btn btn-danger mr-1">
                        {delLoading?(
                            <ClipLoader color={theme.primaryColor}   loading={delLoading}     />
                        ):("DELETE")}
                    </button>
                    
                       
                   
                   
                    
                    {/* {hiddenStatus?(
                        <button aria-label="delete" onClick={()=>updateVideoStatus(false,videoId,(response) => updateStatusCallBack(response, false))} className="btn btn-warning mr-1">
                            PUBLISH
                        </button> 
                    ):(
                        <button aria-label="delete" onClick={()=>updateVideoStatus(true,videoId,(response) => updateStatusCallBack(response, true))} className="btn btn-warning mr-1">
                            HIDE
                        </button> 
                    )} */}
                     <Menu>
                        <nav>
                        <ul class="nav">
                            <li> 
                                {!streaming?(
                                    <a href="javascript:;" onClick={()=>{updateStreamingStatus(true)}} > 
                                        MARK AS STREAMING
                                    </a> 
                                ):( 
                                    <a href="javascript:;" onClick={()=>{updateStreamingStatus(false)}} > 
                                        MARK AS OFFLINE
                                    </a>
                                )}
                                 
                            </li>
                            <li> 
                           
                                <a href="javascript:;" onClick={()=>{setEditDetails(props.index,row.id,row.name, row.description, serverBaseUrl+row.videoThumb, row.videoLocation, row.playlistId, true, false, false,row.liveClassDate,row.liveClassTime)}}>EDIT DETAILS</a>
                            </li>
                            <li> 
                                 <a href="javascript:;" onClick={()=>{setEditDetails(props.index,row.id,row.name, row.description, serverBaseUrl+row.videoThumb, row.videoLocation, row.playlistId, false, true, false,row.liveClassDate,row.liveClassTime)}}>EDIT Video Link</a> 
                            </li>
                            <li>
                                <a href="javascript:;" onClick={()=>{setEditDetails(props.index,row.id,row.name, row.description, serverBaseUrl+row.videoThumb, row.videoLocation, row.playlistId, false, false, true,row.liveClassDate,row.liveClassTime)}}>EDIT THUMBNAIL</a> 
                            </li>
                            <li> 
                                {demo?(

                                    <a href="javascript:;" onClick={()=>{updateVideoDemoStatus(false,videoId,(response) => updateDemoStatusCallBack(response, false))}}>Close For Non Paid Users</a>
                                ):(

                                    <a href="javascript:;" onClick={()=>{updateVideoDemoStatus(true,videoId,(response) => updateDemoStatusCallBack(response, true))}}>Open For All (Free)</a>
                                )} 
                            </li>
                          
                        </ul>
                        </nav>
                    </Menu>
            
                </div>
                
            </div>
             
 












 
    </div>
    )
}

export default CourseVideoRow
