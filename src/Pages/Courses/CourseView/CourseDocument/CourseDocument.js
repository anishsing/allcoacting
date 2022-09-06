import React from 'react'
import { useEffect } from 'react';
import { useState, useRef } from 'react';
import { dataLimit, theme } from '../../../..';
import {
    deleteDocument, fetch_courses_documents,
    getDocumentPlaylist, createDocumentPlaylist, deleteDocuentPlayList
} from '../../../../api/Courses';
import { fetch_document_playlist, addDocument, editDocumentDetails, editDocumentFile } from '../../../../api/document';
import CourseDocumentRow from './CourseDocumentRow';
import { Image, Shimmer } from 'react-shimmer'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../../components/modal/modal';
import CourseVideoPlaylistRow from '../CourseVideo/CourseVideoPlaylistRow';
import CourseDocumentPlaylistRow from './CourseDocumentPlaylistRow';
import ClipLoader from "react-spinners/ClipLoader";
import { max } from 'moment';
import Snackbar from '@material-ui/core/Snackbar';

function CourseDocument(props) {
    const { activeCourse,setDocCount,docCount,setAllowRedirect,setProcessingInParent,setProgressInParent } = props
    const [courseDocuments, setCourseDocuments] = useState([])
    const [courseDocumentLoaded, setCourseDocumentLoaded] = useState(false);
    const [isCourseDocumentLoading, setIsCourseDocumentLoading] = useState(true);
    const [offset, setOffset] = useState(0)
    const [showShimmer, setShowShimmer] = useState(true)
    const [mode, setMode] = useState('')
    const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
    const [id, setId] = useState();
    const [index, setIndex] = useState();
    const [title, setTitle] = useState();
    const [docFile, setDocFile] = useState();
    const [playlistId, setPlaylistId] = useState(-1)
    const [editDetail, setEditDetail] = useState(false);
    const [editDocFile, setEditDocFile] = useState(false);
    const [courseDocPlaylist, setCourseDocPlaylist] = useState([])
    let fileRef = useRef(null);
    const [selectedDocument,setSelectedDocument] = useState(null)
    const [isShowPlaylist, setIsShowPlaylist] = useState(false);
    const [documentPlaylistData, setDocumentPlaylistData] = useState([]);
    const [playlistName, setPlaylistName] = useState('')
    const [playlistEditIndex, setPlaylistEditIndex] = useState(-1);
    const [playlistEditId, setPlaylistEditId] = useState(-1);
    const [playlistMode, setPlaylistMode] = useState("Add");
    const [processing, setProcessing] = useState(false)
    const [allDataLoaded,setAllDataLoaded]=useState(false)
    const [showNextButton, setShowNextButton]=useState()
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(-1)
    const [selectedPlaylistName, setSelectedPlaylistName] = useState("All")
    const [SnackBarMessage ,setSnackBarMessage]=useState()
    const [isSnackBarShow, setIsSnackBarShow]=useState(false)
    const [addPlayListLoading, setAddPlayListLoading] = useState(false)
    const [progress, setProgress] = useState()
    const [showProgress, setShowProgress] = useState(false)
    const [delLoading, setDelLoading] = useState(false);


    useEffect(() => {
        if(selectedPlaylistId!=-1)
        {
            fetch_courses_documents(activeCourse,offset,dataLimit,courseDocumentCallback, selectedPlaylistId);
        }
        else
        {
            fetch_courses_documents(activeCourse,offset,dataLimit,courseDocumentCallback);
        }
    }, [activeCourse, offset, selectedPlaylistId])

    useEffect(() => {
        fetch_document_playlist(activeCourse,courseDocumentPlaylistCallback);
    }, [activeCourse])


    const courseDocumentPlaylistCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                
                var playlist={"courseId": activeCourse, "id": -1, "name": "All"}
                data.unshift(playlist)
                setCourseDocPlaylist(data)
                // setSelectedPlaylistId(data[0].id)
                // setSelectedPlaylistName(data[0].name)
            })
        }
    }
    
    const courseDocumentCallback=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data => {
                if (data.length == dataLimit) 
                {
                    setCourseDocuments(data)
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
                        setCourseDocuments(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                setCourseDocumentLoaded(true)
                setIsCourseDocumentLoading(false)
                setShowShimmer(false)
            })
        }
    }

    const nextPageHandler = () => {
        if (!allDataLoaded) {
            setOffset(offset + 1)
        } else {
            window.alert("No more data available")

        }

    }
    
    const prePageHandler = () => {
        if (offset > 0) {
            setOffset(offset - 1)
        }
        else if (offset == 0) {
            setOffset(0)
            setShowNextButton(true)
        }
        setAllDataLoaded(false)

    }

    const deleteCourseDocument = (id, index) => {
        if (window.confirm("Are you sure you want to delete?")) {
            setDelLoading(id)
            deleteDocument(id, (response) => deleteCallBack(response, index))
        }
    }

    const deleteCallBack = (response, index) => {
        setDelLoading(false)
        if (response.status == 200) {
            setDocCount(docCount - 1)
            const arr = [...courseDocuments]
            arr.splice(index, 1)
            setCourseDocuments(arr)
            setSnackBarMessage("Document Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else {
            console.log("unable to delete");
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }
const addDocumentUploadProgressCallback=(progress) => {

    // upload progress 
    setProgress(progress)
    setShowProgress(true)
    
    
    setProgressInParent(progress)
}
    const onAddSubmitHandler = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to add this document?")) {
            setProcessing(true)
            setAllowRedirect(false)
            setProcessingInParent(true)
            addDocument(docFile, title, activeCourse, playlistId, addDocCallback,addDocumentUploadProgressCallback)
        }
    }

    const addDocCallback = (response) => {
        setAllowRedirect(true)
        
        setProcessingInParent(false)
        setProgressInParent(0)
        if (response.status == 201) {
            setDocCount(docCount + 1)
            console.log(response.headers.location)
            var arr=response.headers.location.split('*')
            var obj = {
                id: arr[0],
                name: title,
                courseId: activeCourse,
                playlistId: playlistId,
                file: arr[1]
            }
            var docArr = [...courseDocuments]
            docArr.push(obj)
            setCourseDocuments(docArr)
            setSnackBarMessage("Document Added Successfully")
            setIsSnackBarShow(true)
        }
        else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
        setIsAddEditModalVisible(false)
        setProcessing(false)
    }

    const onEditSubmitHandler = (e) => {
        e.preventDefault();
        if ("Are You Sure You Want To Save Changes?") {
            setProcessing(true)
            if (editDetail) {
                editDocumentDetails(activeCourse,docFile,id, title, playlistId,editDetailsCallback)
            }
            else if (editDocFile) {
                editDocumentFile(docFile, id,  editDocumentFileCallback, addDocumentUploadProgressCallback)
            }
        }
    }

    const editDetailsCallback = (response) => {
        console.log(response.status)
        if (response.status == 200) {
            var arr = [...courseDocuments]
            arr[index].name = title
            arr[index].playlistId = playlistId
            setCourseDocuments(arr)
            setSnackBarMessage("Document Updated Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
        setIsAddEditModalVisible(false)
        setProcessing(false)
    }

    const editDocumentFileCallback = (response) => {
        if (response.status == 201) {
            var arr = [...courseDocuments]
            arr[index].fileAddress = response.headers.get('location')
            setCourseDocuments(arr)
            setSnackBarMessage("Document Updated Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
        setIsAddEditModalVisible(false)
        setProcessing(false)
    }

    const setEditDetails = (title, id, index, playlist, file, detail, link) => {
        setMode('edit');
        setTitle(title);
        setId(id);
        setPlaylistId(playlist);
        setIndex(index);
        setEditDetail(detail);
        setEditDocFile(file);
        setDocFile(link);
        setIsAddEditModalVisible(true)

    }
    const setAddDetails = () => {
        setMode('add'); setTitle(''); setIsAddEditModalVisible(true)
    }

    const tiggerClickOnFile = () => {
        fileRef.click();
    }

    const fileOnChange = (event) => {
        var url = event.target.files[0] ? (URL.createObjectURL(event.target.files[0])) : ('');
        setDocFile(event.target.files[0]) 
    }

    const getDocumentPlaylistCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                console.log('getting document playlist', data)
                setDocumentPlaylistData(data)
            })
        }
    }

    const action4viewDocumentPlaylist = () => {
        setIsShowPlaylist(true)
        if (documentPlaylistData.length <= 0) {
            getDocumentPlaylist(activeCourse, getDocumentPlaylistCallback)
        }

    }


    const addPlaylistCallback = (response) => {
        setAddPlayListLoading(false)
        if (response.status == 201) {
            console.log('document playlist has been created')
            document.getElementById('addPlaylistCloseBtn').click();
            let playlistId = response.headers.get('location')
            let playlistArr = [...documentPlaylistData]
            playlistArr.push({
                id: playlistId,
                name: playlistName,
                courseId: activeCourse
            })
            setDocumentPlaylistData(playlistArr)
            setSnackBarMessage("Playlist added Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }

    const action4EditPlaylist = () => {
        setAddPlayListLoading(true)
        createDocumentPlaylist(activeCourse, playlistName, editDocumentPlaylistCallback, playlistEditId)
    }
    const editDocumentPlaylistCallback = (response) => {
        setAddPlayListLoading(false)
        if (response.status == 201) {
            let playlistId = response.headers.get('location')
            console.log("video playlist added successfully", playlistId, playlistEditIndex)
            document.getElementById('addPlaylistCloseBtn').click();
            let documentPlaylistArr = [...documentPlaylistData]

            documentPlaylistArr[playlistEditIndex] = {
                id: playlistId,
                name: playlistName,
                courseId: activeCourse
            }
            console.log(documentPlaylistArr, documentPlaylistData)
            setDocumentPlaylistData(documentPlaylistArr)
            setSnackBarMessage("Playlist Document Updated Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }
    const action4addPlaylist = () => {
        setAddPlayListLoading(true)
        createDocumentPlaylist(activeCourse, playlistName, addPlaylistCallback)
    }
    const deletePlaylistCallback = (response, index) => {
        if (response.status == 200) {
            let playlistArr = [...documentPlaylistData]
            playlistArr.splice(index, 1);
            setDocumentPlaylistData(playlistArr)
            setSnackBarMessage("Playlist deleted Successfully")
            setIsSnackBarShow(true)
        }
    }
    const deletePlaylistHandler = (id, index) => {
        //    deleteDocuentPlayList(id,(response)=>deletePlaylistCallback(response,index))
    }

    const setEditValues = (name, id, index) => {
        setPlaylistName(name);
        setPlaylistEditId(id);
        setPlaylistEditIndex(index)
        setPlaylistMode("edit");
        console.log("running")
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
                        {courseDocPlaylist.map((row, i) => (
                            <a class="dropdown-item" href="javascript:;" onClick={() => {setAllDataLoaded(false); setSelectedPlaylistId(row.id); setOffset(0); setSelectedPlaylistName(row.name); setCourseDocuments([]); setShowShimmer(true)}}>{row.name}</a>
                        ))}
                    </div>
                </div>
                <div class="ml-auto">
                <br/>
                    <div class="btn-group">
                        {isShowPlaylist ? (
                            <div>
                                <button class="btn btn-info mr-3" onClick={() => setIsShowPlaylist(false)}>View Documents</button>
                            </div>
                        ) : (
                            <button type="button" class="btn btn-info mr-3" onClick={() => action4viewDocumentPlaylist()}>View Playlist</button>
                        )}

                        <button type="button" class="btn btn-success mr-3" data-toggle="modal" data-target="#addPlayListModal" onClick={() => setPlaylistMode("add")}>Add Document Playlist</button>
                        <button type="button" class="btn btn-danger" onClick={() => setAddDetails()} style={{ marginRight: 5 }}>Upload Document</button>
                    </div>
                </div>
            </div>





            <div className="mt-3"> 
                {isShowPlaylist ?(
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
                                        {documentPlaylistData.map((row, i) => (
                                                <CourseDocumentPlaylistRow setEditValues={setEditValues} deletePlaylistHandler={deletePlaylistHandler} row={row} index={i} />
                                            ))}
                                    </>

                                )}

                            </tbody>
                        </table>
                    </div>
                ):(
            
                    showShimmer ? (
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
                           
                                    {courseDocuments.map((row, i) => (
                                        <CourseDocumentRow row={row} index={i} delDocument={deleteCourseDocument} setEditDetails={setEditDetails} delLoading={delLoading==row.id} />
                                    ))}
                            


                        </>
                    )
                     
            
                )}
            </div>
            <Modal
                visible={isAddEditModalVisible}
                setModalVisible={setIsAddEditModalVisible}
                modalId={"testAddEditModal"}
            >
                <form onSubmit={mode == "add" ? (onAddSubmitHandler) : (onEditSubmitHandler)}>
                    <ModalHeader>
                        <h5 className="modal-title">{mode == "add" ? ("Upload Document") : ("Edit Document")}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        {mode == "add" ? (
                            <div>
                                <div className="form-row">
                                    <label>Title</label>
                                    <input className="form-control" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                                </div>
                                <div className="form-row">
                                    <label>Select Playlist</label>
                                    <select className="form-control" onChange={(e) => setPlaylistId(e.target.value)}>
                                        {courseDocPlaylist.map((row, index) => (
                                            <option value={row.id} selected={playlistId == row.id ? (true) : (false)}>{row.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-row">

                                    <div className="col-6 col-lg-6">
                                        <label>Document</label>
                                        <label>{docFile?.name}</label>
                                        <input className="form-control" type="file" ref={ref => fileRef = ref} onChange={(e) => { fileOnChange(e) }} style={{ visibility: 'hidden' }} />
                                        <button type="button" className="btn btn-primary" onClick={tiggerClickOnFile} >Choose Document</button>
                                    </div>
                                </div>
                            </div>
                        ) : (null)}
                        {mode == "edit" ? (
                            <div>
                                {editDetail ? (
                                    <div>
                                        <div className="form-row">
                                            <label>Title</label>
                                            <input className="form-control" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                                        </div>
                                        <div className="form-row">
                                            <label>Select Playlist</label>
                                            <select className="form-control" onChange={(e) => setPlaylistId(e.target.value)}>
                                                {courseDocPlaylist.map((row, index) => (
                                                    <option value={row.id} selected={playlistId == row.id ? (true) : (false)}>{row.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                ) : (
                                    null
                                )}
                                {editDocFile ? (
                                    <div className="form-row">
                                        <div className="col-6 col-lg-6">
                                            <label>Document</label>
                                            <input className="form-control" type="file" ref={ref => fileRef = ref} onChange={(e) => { fileOnChange(e) }} style={{ visibility: 'hidden' }} />
                                            <button type="button" className="btn btn-primary" onClick={tiggerClickOnFile} >Choose Document</button>
                                        </div>
                                    </div>
                                ) : (null)}
                            </div>
                        ) : (null)}
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button className="btn btn-primary" disabled={processing}>{processing?(
                            <ClipLoader color="white" loading={processing} size={20} />
                        ):(mode == "add" ? ("Add Document") : ("Edit Document"))}</button>
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


            {/* document PlayList Modal */}

            <div class="modal fade" data-backdrop="static" data-keyboard="false" id="addPlayListModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Document Playlist</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <label>Playlist name</label>
                            <input className="form-control" value={playlistName} placeholder="playlist name" onChange={(e) => setPlaylistName(e.target.value)} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="addPlaylistCloseBtn">Close</button>
                                <button type="button" class="btn btn-primary" onClick={() => playlistMode == "edit" ? action4EditPlaylist() : action4addPlaylist()}>{addPlayListLoading?(
                                    <ClipLoader color={theme.primaryColor}   loading={addPlayListLoading}     />
                                ):("Save changes")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                {offset > 0 ? (

                    <button type="button" class="btn btn-primary" onClick={() => prePageHandler()}>Previous</button>
                ) : (null)}
                {!allDataLoaded && showNextButton ? (
                    <button type="button" class="btn btn-primary " onClick={() => nextPageHandler()}>Next</button>
                ) : (null)}

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

export default CourseDocument
