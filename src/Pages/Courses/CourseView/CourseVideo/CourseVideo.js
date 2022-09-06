import React from 'react'
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { dataLimit, theme } from '../../../..';
import { deleteVideo, fetch_courses_videos } from '../../../../api/Courses';
import { fetch_video_playlist, addVideo,
        createVideoPlayList, 
        deleteVideoPlayList, editVideoDetails, editVideoFile, editVideoThumb} from '../../../../api/video';
import CourseVideoRow from './CourseVideoRow'
import { Image, Shimmer } from 'react-shimmer'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../../components/modal/modal';
import ClipLoader from "react-spinners/ClipLoader";

import CourseVideoPlaylistRow from './CourseVideoPlaylistRow'
import userEvent from '@testing-library/user-event';
import Snackbar from '@material-ui/core/Snackbar';


function CourseVideo(props) {
    const { activeCourse,setVideoCount,videoCount,setAllowRedirect,setProcessingInParent,setProgressInParent } = props;
    const [videos, setVideos] = useState([])
    const [courseVideoLoaded, setCourseVideoLoaded] = useState(false);
    const [isCourseVideoLoading, setIsCourseVideoLoading] = useState(true);
    const [offset, setOffset] = useState(0)
    const [mode, setMode]= useState('')
    const [showShimmer, setShowShimmer] = useState(true)
    const [videoFile, setVideoFile] = useState('')
    const [videoPreview, setVideoPreview] = useState('')
    const [imageFile, setImageFile] = useState('')
    const [id, setId] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [index, setIndex] = useState('')
    const [title, setTitle] = useState('')
    const [subTitle, setSubTitle] = useState('')
    const [playlistId, setPlaylistId] = useState(0)
    const [courseVideoPlaylist, setCourseVideoPlaylist] = useState([])
    const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
    const [editDetail, setEditDetail] = useState(false);
    const [editVideo, setEditVideo] = useState(false);
    const [editThumb, setEditThumb] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(-1)
    const [selectedPlaylistName, setSelectedPlaylistName] = useState("All")
    const [addPlayListLoading, setAddPlayListLoading] = useState(false)
    let fileRef = useRef(null);
    let imageFileRef = useRef(null);


    const [playlistName, setPlaylistName] = useState('')
    const [playlistEditIndex,setPlaylistEditIndex] = useState(-1);
    const [playlistEditId,setPlaylistEditId] = useState(-1);
    const [isShowPlaylist, setIsShowPlaylist] = useState(false);
    const [playlistMode,setPlaylistMode] = useState("Add");
    const [allDataLoaded,setAllDataLoaded]=useState(false)
    const [showNextButton, setShowNextButton]=useState()
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [progress, setProgress] = useState()
    const [delLoading, setDelLoading] = useState(false);


    useEffect(()=>
    {
        if(!playlistId)
        {
            setPlaylistId(0)
        } 
    },[playlistId])
    useEffect(() => {
        if(!allDataLoaded)
        {
            if(selectedPlaylistId!=-1)
            {
                fetch_courses_videos(activeCourse, offset, dataLimit, courseVideoCallback, selectedPlaylistId);
            }
            else
            {
                fetch_courses_videos(activeCourse, offset, dataLimit, courseVideoCallback);
            }
        }
    }, [activeCourse, offset, selectedPlaylistId])


    useEffect(() => {
        fetch_video_playlist(activeCourse,courseVideoPlaylistCallback);
    }, [activeCourse])

    const courseVideoPlaylistCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                var playlist={"courseId": activeCourse, "id": -1, "name": "All"}
                data.unshift(playlist)
                setCourseVideoPlaylist(data)   
                setSelectedPlaylistId(data[0].id)
                setSelectedPlaylistName(data[0].name)             
            })
        }
    }

    const nextPageHandler=()=>
    {
        if(!allDataLoaded)
        {
            setOffset(offset+1)
        }else {
            window.alert("No more data available")
        }
        
    }
    const prePageHandler=()=>
    {
        if(offset>0)
        {
            setOffset(offset-1)
        }
        else if(offset==0)
        {
            setOffset(0)
            setShowNextButton(true)
        }
        setAllDataLoaded(false)
        
    }

    const courseVideoCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setVideos(data)
                    setShowNextButton(true)
                } 
                else if(data.length<dataLimit) 
                {
                    if(data.length==0) 
                    {
                        if(offset==0)
                        {
                            setOffset(0)
                        }else
                        {
                            setOffset(offset-1)
                        }
                    }
                    else if(data.length!=0)
                    {     
                        setVideos(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                setCourseVideoLoaded(true)
                setIsCourseVideoLoading(false)
                setShowShimmer(false)
            })
        }
    }

    const deleteCourseVideo = (id, index) => {
        if (window.confirm("Are you sure you want to delete?")) {
            setDelLoading(id)
            deleteVideo(id, (response) => deleteCallBack(response, index))
        }
    }

    const deleteCallBack = (response, index) => {
        setDelLoading(false)
        if (response.status == 200) {
            
            setVideoCount(videoCount-1)
            const arr = [...videos]
            arr.splice(index, 1)
            setVideos(arr)
            setSnackBarMessage("Video Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else { 
                setSnackBarMessage("Something went wrong")
                setIsSnackBarShow(true) 
        }
    }

    const addVideoCallBack=(response)=>{
        setAllowRedirect(true)
        setProcessingInParent(false)
        setProgressInParent(0)
        if(response.status == 201)
        {
            setVideoCount(videoCount+1)
            var details = response.headers.location.split('*')
            var obj ={
                id: details[0],
                courseId: activeCourse,
                description: subTitle,
                name: title,
                playlistId: playlistId,
                videoLocation: details[1],
                videoThumb: imagePreview,
            }
            var arr=[...videos]
            arr.push(obj)
            setVideos(arr)
            setSnackBarMessage("Video Added Successfully")
            setIsSnackBarShow(true)
        }
        else
        {
                setSnackBarMessage("Something went wrong")
                setIsSnackBarShow(true)
        }
        setProcessing(false)
        setIsAddEditModalVisible(false)
    }

    const onAddSubmitHandler = (e) => {
        e.preventDefault();
        if(imageFile)
        {
            if(window.confirm("Are you sure you want to add this video?")) 
            {
                setProcessing(true)
                setAllowRedirect(false)
                setProcessingInParent(true)
                addVideo(imageFile, videoFile, title, subTitle, activeCourse, playlistId, '0', false, addVideoCallBack,addVideoCallBackProgress)
            }
        }else
        {
            setSnackBarMessage("Choose Video Thumbnail")
            setIsSnackBarShow(true)
        }
        
    }

    const addVideoCallBackProgress = (progress)=>
    {
        
        
        setProgressInParent(progress)
        setProgress(progress)
            // console.log(progress)
    }
    const onEditSubmitHandler = (e) => {
        e.preventDefault();
        if(window.confirm("Are You Sure You Want To Edit?"))
        {
            setProcessing(true)
            if(editDetail)
            {
                editVideoDetails(activeCourse, subTitle, id, title, playlistId, imageFile, videoFile, "offline",editDetailsCallBack)
            }
            else if(editVideo)
            {
                editVideoFile(videoFile, id, editVideoFileCallBack,addVideoCallBackProgress)
            }
            else if(editThumb)
            {
                editVideoThumb(imageFile, id, editVideoThumbCallBack,addVideoCallBackProgress)
            }
        }
    }

    const editVideoThumbCallBack=(response)=>{
        if(response.status == 201)
        {
            var arr = [...videos]
            arr[index].videoThumb=response.headers.location;
            setVideos(arr)
            setSnackBarMessage("Video Thumbnail Updated Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
        setIsAddEditModalVisible(false)
        setProcessing(false)
    }

    const editVideoFileCallBack=(response)=>{
        if(response.status == 201)
        {
            var arr = [...videos]
            arr[index].videoLocation=response.headers.location;
            setVideos(arr)
            setSnackBarMessage("Video File Updated Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
        setIsAddEditModalVisible(false)
        setProcessing(false)
    }

    const editDetailsCallBack=(response) => {
        if(response.status == 200)
        {
            var arr = [...videos]
            arr[index].name=title;
            arr[index].description=subTitle;
            arr[index].playlistId=playlistId;
            setVideos(arr)
            setSnackBarMessage("Video Details Updated Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
        setIsAddEditModalVisible(false)
        setProcessing(false)
    }

    const setEditDetails=(index,id, title, description, imageLink, link, playlistId, details, video, thumb)=>{
        setId(id)
        setTitle(title);
        setIndex(index);
        setSubTitle(description); 
        setImagePreview(imageLink);
        setVideoFile(link);
        setImageFile(imageLink);
        setPlaylistId(playlistId)
        setVideoPreview(link); 
        setMode('edit'); 
        setIsAddEditModalVisible(true);
        setEditDetail(details); 
        setEditVideo(video); 
        setEditThumb(thumb);
    }
    const setAddDetails=()=>{
        setId('')
        setTitle('');
        setIndex('');
        setSubTitle(''); 
        setImagePreview('');
        setVideoFile('');
        setImageFile('');
        setPlaylistId('')
        setVideoPreview(''); 
        setMode('add'); 
        setIsAddEditModalVisible(true);
        setEditDetail(false); 
        setEditVideo(false); 
        setEditThumb(false); 
    }

    const tiggerClickOnFile = () => {
        fileRef.click();
    }

    const fileOnChange = (event) => {
        var url = event.target.files[0]?(URL.createObjectURL(event.target.files[0])):('');
        setVideoPreview(url)
        setVideoFile(event.target.files[0])
    }
    const tiggerClickOnImageFile = () => {
        imageFileRef.click();
    }

    const imageFileOnChange = (event) => {
        var url = event.target.files[0]?(URL.createObjectURL(event.target.files[0])):('');
        setImagePreview(url)
        setImageFile(event.target.files[0])
    }



    const addVideoPlaylistCallback=(response)=>{
        setAddPlayListLoading(false)
        if(response.status == 201)
        {
            
            let playlistId = response.headers.get('location')
            document.getElementById('addPlaylistCloseBtn').click();
            let videoPlaylist  = [...courseVideoPlaylist]
            videoPlaylist.push({
                id:playlistId,
                name:playlistName,
                courseId:activeCourse
            })
            setCourseVideoPlaylist(videoPlaylist)
            setSnackBarMessage("Video Playlist Added Successfully")
            setIsSnackBarShow(true)
        }
        else
        {
                setSnackBarMessage("Something went wrong")
                setIsSnackBarShow(true)
        }
    }


    const action4addPlaylist=()=>{
        setAddPlayListLoading(true)
        createVideoPlayList(activeCourse, playlistName, addVideoPlaylistCallback)
    }
    const action4EditPlaylist=()=>{
        setAddPlayListLoading(true)
        createVideoPlayList(activeCourse, playlistName,editVideoPlaylistCallback,playlistEditId)
    }
    const editVideoPlaylistCallback=(response)=>
    {
        setAddPlayListLoading(false)
        if(response.status == 201)
        {
            let playlistId = response.headers.get('location')
            document.getElementById('addPlaylistCloseBtn').click();
            let videoPlaylist  = [...courseVideoPlaylist]
            videoPlaylist[playlistEditIndex]={
                id:playlistId,
                name:playlistName,
                courseId:activeCourse
            }
            setCourseVideoPlaylist(videoPlaylist)
            setSnackBarMessage("Video Playlist Updated Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }
    const deleteVideoPlaylistHandler=(playlistId,index)=>
    {
        deleteVideoPlayList(playlistId,(response)=>deletePlaylistCallback(response,index))
    }
    const deletePlaylistCallback=(response,index)=>
    {
            if(response.status == 200)
            {
                let playlistArr = [...courseVideoPlaylist]
                playlistArr.splice(index,1)
                setCourseVideoPlaylist(playlistArr);
                setSnackBarMessage("Video Playlist Deleted Successfully")
                setIsSnackBarShow(true)
            }else{
                setSnackBarMessage("Something went wrong")
                setIsSnackBarShow(true)
            }
    }
    const setEditValues = (name,id, index)=>
    {
        setPlaylistName(name);
        setPlaylistEditId(id);
        setPlaylistEditIndex(index) 
        setPlaylistMode("edit");
    }


    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }

    return (
        <div>
            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="btn-group">
                    <button type="button" class="btn btn-primary">{selectedPlaylistName}</button>
                    <button type="button" class="btn btn-primary bg-split-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">	<span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
                        {courseVideoPlaylist.map((row, i) => (
                            <a class="dropdown-item" href="javascript:;" onClick={() => {setAllDataLoaded(false); setSelectedPlaylistId(row.id); setOffset(0);setSelectedPlaylistName(row.name); setVideos([]); setShowShimmer(true)}}>{row.name}</a>
                        ))}

                        {/* <a class="dropdown-item" href="javascript:;">Another action</a>
                        <a class="dropdown-item" href="javascript:;">Something else here</a>
                        <div class="dropdown-divider"></div>	<a class="dropdown-item" href="javascript:;">Separated link</a> */}
                    </div>
                </div>
                <div class="ml-auto">
                    <br/>
                    <div class="btn-group">
                        {isShowPlaylist ?(
                            <div>
                                <button class="btn btn-info mr-3" onClick={()=> setIsShowPlaylist(false)}>View Videos</button>
                            </div>
                        ):(
                            <button type="button" class="btn btn-info mr-3" onClick={() =>setIsShowPlaylist(true)}>View Playlist</button>
                        )}
                        <button type="button" class="btn btn-success mr-3" data-toggle="modal" data-target="#addPlayListModal" onClick={()=>setPlaylistMode("add")}>Add Video Playlist</button>
                        <button type="button" onClick={setAddDetails} class="btn btn-danger" style={{ marginRight: 5 }}>Upload Video</button>
                    </div>
                </div>
            </div>
            

            {isShowPlaylist ?(
                <div className="mt-3">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered mb-0" id="table1">
                            <thead class="thead-dark">
                                <tr>
                                    <th align="center">#</th>
                                    <th align="center">Title</th>
                                    <th align="center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showShimmer ? (
                                    <td colspan="4">
                                        <Shimmer width={'100%'} height={40} />
                                    </td>
                                ) : (
                                    <>
                                        {courseVideoPlaylist.map((row, i) => (
                                            <CourseVideoPlaylistRow setEditValues={setEditValues} deleteVideoPlaylistHandler={deleteVideoPlaylistHandler} row={row} index={i} delVideo={deleteCourseVideo} setEditDetails={setEditDetails}/>
                                        ))}
                                    </>

                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            ):(
                <div className="mt-3">
                {/* <div class="table-responsive">
                    <table class="table table-striped table-bordered mb-0" id="table1">
                        <thead class="thead-dark">
                            <tr>
                                <th align="center">#</th>
                                <th align="center">Title</th>
                                <th align="center">Description</th>
                                <th align="center">Actions</th>
                            </tr>
                        </thead>
                        <tbody> */}

                            {showShimmer ? (
                                <div className="row">
                                    <div className="col-12">
                                        <Shimmer width={'100%'} height={40} />          
                                    </div>
                                     <div className="col-12">
                                        <Shimmer width={'100%'} height={40} />          
                                    </div>  
                                </div>
                            ) : (
                                <>
                                    {videos.map((row, i) => (
                                        <CourseVideoRow row={row} index={i} delVideo={deleteCourseVideo} setEditDetails={setEditDetails} delLoading={delLoading==row.id}/>
                                    ))}
                                </>

                            )}

                        {/* </tbody>
                    </table>
                </div> */}
            </div>
            )}


            <Modal
            visible={isAddEditModalVisible} 
            setModalVisible={setIsAddEditModalVisible} 
            modalId={"testAddEditModal"} 
            >
                <form onSubmit={mode== "add"?(onAddSubmitHandler):(onEditSubmitHandler)}>
                    <ModalHeader>
                        <h5 className="modal-title">{mode== "add"?("Add Video"):("Edit Video")}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>   
                    <ModalBody> 
                        {mode=="add"?(
                            <div>
                                <div className="form-row">
                                    <label>Title</label>
                                    <input className="form-control" value={title} placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
                                </div>
                                {/* <div className="form-row">
                                    <label>Description</label>
                                    <input className="form-control" value={subTitle} placeholder="Title" onChange={(e)=>setSubTitle(e.target.value)} />
                                </div>                 */}
                                <div className="form-row">
                                    <label>Select Playlist</label>
                                    <select className="form-control" onChange={(e)=>{console.log(e.target.value);setPlaylistId(e.target.value)}}>
                                        {courseVideoPlaylist.map((row, index)=>(
                                            <option value={row.id} selected={playlistId==row.id?(true):(false)}>{row.name}</option>
                                        ))}
                                    </select>
                                </div> 
                                 
                                <div className="col-12"> 
                                        {videoPreview?(
                                            <div className="col-12 mt-1 mb-1 pb-2" style={{border:"1px solid grey",borderRadius:15,alignItems: "center",justifyContent: "center",display: "flex",flexDirection: "column",}}> 
                                                <div style={{alignSelf:"flex-end"}}>
                                                    <a href="javascript:;" onClick={()=>{setVideoPreview("");setVideoFile("")}}><i className="lni lni-cross-circle" style={{color:"red"}} ></i></a>
                                                    
                                                </div>
                                                <video src={videoPreview} width="100%" height="100%" controls style={{marginTop: 20}}/>
                                            </div>
                                        ):(
                                            <>
                                                <div className="col-12 mt-1 mb-1 pb-2" style={{border:"1px solid grey",borderRadius:15,alignItems: "center",justifyContent: "center",display: "flex",flexDirection: "column",}}>
                                                    <input className="form-control"  type="file" ref={ref =>fileRef=ref} onChange={(e)=>{fileOnChange(e)}} style={{visibility:'hidden'}}/>
                                                    <i className="lni lni-cloud-upload" style={{fontSize:100}}></i>
                                                    <button type="button" className="btn btn-primary" onClick={tiggerClickOnFile} >Choose File</button>
                                                </div>
                                            </>
                                        )}
                                    
                                </div>

                                <div className="form-row">
                                    <div className="col-12 mt-2">
                                        {/* <label>Thumbnail Image </label> */} 
                                        <button type="button" className="btn btn-primary" onClick={tiggerClickOnImageFile} >Choose Thumbnail</button>
                                        <input className="form-control"  type="file" ref={ref =>imageFileRef=ref} onChange={(e)=>{imageFileOnChange(e)}} style={{visibility:'hidden'}}/>
                                    </div>
                                    {imagePreview?( 
                                        <div className="col-6 col-lg-6"> 
                                            <img src={imagePreview} className="img-responsive w-100 h-100" />
                                        </div>
                                    ):(null)}
                                    
                                </div>
                            </div>
                        ):(null)}
                        
                        {mode=="edit"?(
                            <>
                            {editDetail?(
                            <div>
                                <div className="form-row">
                                    <label>Title</label>
                                    <input className="form-control" value={title} placeholder="Title" onChange={(e)=>setTitle(e.target.value)} />
                                </div>                                
                                {/* <div className="form-row">
                                    <label>Description</label>
                                    <input className="form-control" value={subTitle} placeholder="Description" onChange={(e)=>setSubTitle(e.target.value)} />
                                </div>                 */}
                                <div className="form-row">
                                    <label>Select Playlist</label>
                                    <select className="form-control" onChange={(e)=>setPlaylistId(e.target.value)}>
                                        {courseVideoPlaylist.map((row, index)=>(
                                            <option value={row.id} selected={playlistId==row.id?(true):(false)}>{row.name}</option>
                                        ))}
                                    </select>
                                </div> 
                            </div>
                        ):(null)}               
                        {editVideo?(<div className="form-row">
                            
                            <div className="col-6 col-lg-6"    >
                                <label>Video</label>
                                <input className="form-control"  type="file" ref={ref =>fileRef=ref} onChange={(e)=>{fileOnChange(e)}} style={{visibility:'hidden'}}/>
                                <button type="button" className="btn btn-primary" onClick={tiggerClickOnFile} >Choose Video</button>
                            </div>
                            <div className="col-6 col-lg-6">
                                
                                <video src={videoPreview?videoPreview:"http://placehold.it/200/200"} width="200" height="200" controls style={{marginTop: 20}}/>
                            </div>
                            
                        </div>):(null)}
                        {editThumb?(<div className="form-row">
                            <div className="col-6 col-lg-6"    >
                                <label>Thumbnail Image </label>
                                <input className="form-control"  type="file" ref={ref =>imageFileRef=ref} onChange={(e)=>{imageFileOnChange(e)}} style={{visibility:'hidden'}}/>
                                <button type="button" className="btn btn-primary" onClick={tiggerClickOnImageFile} >Choose Thumbnail</button>
                            </div>
                            <div className="col-6 col-lg-6">
                                
                                <img src={imagePreview?imagePreview:"http://placehold.it/200/200"} className="img-responsive w-100 h-100" />
                            </div>
                            
                        </div>):(null)}
                        </>
                        ):(null)}
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button className="btn btn-primary" disabled={processing}>
                            {processing?(
                                <ClipLoader color="white" loading={processing} size={20} />
                            ):(mode == "add" ? ("Add Video") : ("Edit Video"))}
                        </button>
                        {processing ? (
                            <div className="progress mt-3 w-100" style={{ height: 30 }}> 
                                <div className="progress-bar bg-success"
                                            role="progressbar" style={{ width: progress+"%" }}
                                             
                                            aria-valuenow={progress} aria-valuemin="0"
                                            aria-valuemax="100">
                                </div>
                                <span style={{color:'black',position:"absolute",left:'48%' , marginTop: 12}}>{progress} %</span>
                                 
                            </div>
                         ):(
                            null
                        )}  
                    </ModalFooter> 
                 </form>
            </Modal>



            {/* Video PlayList Modal */}

            <div class="modal fade" data-backdrop="static" data-keyboard="false" id="addPlayListModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Video Playlist</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                            <label>Playlist name</label>
                            <input className="form-control" value={playlistName} placeholder="playlist name" onChange={(e)=>setPlaylistName(e.target.value)} />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" id="addPlaylistCloseBtn">Close</button>
                        <button type="button" class="btn btn-primary" onClick={()=>playlistMode=="edit"?action4EditPlaylist():action4addPlaylist()}>
                            {addPlayListLoading?(
                                <ClipLoader color={theme.primaryColor}   loading={addPlayListLoading}     />
                            ):("Save changes")}</button>
                    </div>
                    </div>
                </div>
            </div> 
            <div class="modal-footer">
            {offset>0?(

                <button type="button" class="btn btn-primary" onClick={()=>prePageHandler()}>Previous</button>
            ):(null)}
               {!allDataLoaded&&showNextButton?( 
                    <button type="button" class="btn btn-primary "  onClick={()=>nextPageHandler()}>Next</button>
               ):(null)}
                
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

export default CourseVideo
