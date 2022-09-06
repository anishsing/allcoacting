import React, { useRef } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { dataLimit, theme } from '../../../..';
import { fetch_testSeries } from '../../../../api/Courses';
import CourseTestSeriesRow from './CourseTestSeriesRow';
import { Link } from "react-router-dom"
import { Image, Shimmer } from 'react-shimmer'
import { createTestSeriesPlaylist, deleteTestSeries, deleteTestSeriesPlayList, editTestSeriesData, getTestSeriesPlaylist } from '../../../../api/TestSeries';
import CourseTestSeriesPlaylistRow from './CourseTestSeriesPlaylistRow';
import Snackbar from '@material-ui/core/Snackbar';
import ClipLoader from "react-spinners/ClipLoader";
import Modal from 'react-bootstrap/Modal' 
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import moment from 'moment';

function CourseTestSeries(props) {
    const { activeCourse } = props
    const [seriesList, setSeriesList] = useState([])

    const [publishTestSeriesModal, setPublishTestSeriesModal] = useState(false);
    const [courseSeriesListLoaded, setCourseSeriesListLoaded] = useState(false);
    const [isCourseSeriesListLoading, setIsCourseSeriesListLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const [showShimmer, setShowShimmer] = useState(true) 
    const [isShowPlaylist, setIsShowPlaylist] = useState(false);
    const [testseriesPlaylist, setTestseriesPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState('')
    const [playlistEditIndex, setPlaylistEditIndex] = useState(-1);
    const [playlistEditId, setPlaylistEditId] = useState(-1);
    const [playlistMode, setPlaylistMode] = useState("Add");
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()
    const [selectedPlaylistId, setSelectedPlaylistId] = useState(-1)
    const [selectedPlaylistName, setSelectedPlaylistName] = useState("All")
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [addPlayListLoading, setAddPlayListLoading] = useState(false)
    const [delLoading, setDelLoading] = useState(false); 
    const [category, setCategory] = useState(0);
    const [playlistId, setPlaylistId] = useState(); 
    const [time, setTime] = useState('');
    const [marks, setMarks] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [isPractice, setIsPractice] = useState(true);
    const [timeDuration, setTimeDuration] = useState('');
    const [seriesId, setSeriesId] = useState();
    const [seriesQuestionCount, setSeriesQuestionCount] = useState(0)
    let publishingSeriesCallBack = useRef(null)
    const [loadingPublicationsCall,setLoadingPublicationsCallBack] = useState(false)
    const [seriesIndex,setSeriesIndex] = useState(-1)
    
    const [correctMarks,setCorrectMarks] = useState(0)
    const [wrongMarks,setWrongMarks] = useState(0)

    const setPublishingSeriesDetails=(series,callback,index)=>{
            setPlaylistId(series.playlistId);
            setTime(series.time);
            setTimeDuration(series.timeDuration);
            setMarks(series.maxMarks);
            setTitle(series.title);
            setDate(moment(series.date,"DD/MM/YYYY").format("YYYY-MM-DD"))
            setIsPractice(series.isPractice);
            setSeriesId(series.id);
            
            setCorrectMarks(series.correctMarks);
            setWrongMarks(series.wrongMarks)
            setSeriesQuestionCount(series.questionCount);
            console.log(callback,index)
            publishingSeriesCallBack.current = callback;
            setSeriesIndex(index)

    }
    const editSeriesData = () => {
       
        if (title && timeDuration && time && date && marks) {
            if(!loadingPublicationsCall)
            {
                setLoadingPublicationsCallBack(true);
                editTestSeriesData(seriesId, title, timeDuration, time, date, isPractice, 0, marks, false,false,activeCourse, seriesQuestionCount,correctMarks,wrongMarks,editSeriesCallback)
            }      
        }
        else {
            console.log('Please Fill All The Fields.')
        }
    }
    const editSeriesCallback = (response) => {
        if (response.status == 201) {
            setSnackBarMessage("Changes Saved Successfully!!")
            setIsSnackBarShow(true)
            console.log(publishingSeriesCallBack.current,seriesIndex)
            if(publishingSeriesCallBack.current)
            {
                publishingSeriesCallBack.current()
            }
            let arr = [...seriesList]
            arr[seriesIndex]['title'] = title;
            arr[seriesIndex]['maxMarks'] = marks;
            arr[seriesIndex]['timeDuration'] = timeDuration;
            setSeriesList(arr);
            setPublishTestSeriesModal(false)
            
        }
        else {
            console.log("error", response.status)
        }
        setLoadingPublicationsCallBack(false)
    }
    useEffect(() => {
        if(selectedPlaylistId!=-1)
        {
            fetch_testSeries(activeCourse, offset, dataLimit, courseTestseriesCallback, selectedPlaylistId);
        }
        else
        {
            fetch_testSeries(activeCourse, offset, dataLimit, courseTestseriesCallback);
        }
    }, [activeCourse, offset, selectedPlaylistId])

    useEffect(() => {
        getTestSeriesPlaylist(activeCourse, getTestSeriesPlaylistCallback)
    }, [activeCourse])

    const courseTestseriesCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    console.log(data)
                    setSeriesList(data)
                    setShowNextButton(true)
                } 
                else if(data.length<dataLimit) 
                {
                    console.log("else")
                    console.log(data.length)
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
                        setSeriesList(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                setCourseSeriesListLoaded(true)
                setIsCourseSeriesListLoading(false)
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

    const action4viewTestSeriesPlaylist = () => {
        setIsShowPlaylist(true)
        if (testseriesPlaylist.length <= 0) {
            getTestSeriesPlaylist(activeCourse, getTestSeriesPlaylistCallback)
        }

    }

    const getTestSeriesPlaylistCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                var playlist={"courseId": activeCourse, "id": -1, "name": "All"}
                data.unshift(playlist)
                setTestseriesPlaylist(data)
                setSelectedPlaylistId(data[0].id)
                setSelectedPlaylistName(data[0].name)  
            })
        }
    }
    const action4addPlaylist = () => {
        if(!addPlayListLoading){
            setAddPlayListLoading(true)
            createTestSeriesPlaylist(activeCourse, playlistName, addPlaylistCallback)
        }
    }
    const addPlaylistCallback = (response) => {
        setAddPlayListLoading(false)
        if (response.status == 201) {
            console.log('document playlist has been created')
            document.getElementById('addPlaylistCloseBtn').click();
            let playlistId = response.headers.get('location')
            let playlistArr = [...testseriesPlaylist]
            playlistArr.push({
                id: playlistId,
                name: playlistName,
                courseId: activeCourse
            })
            setTestseriesPlaylist(playlistArr)
            setSnackBarMessage("Playlist Added Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }

    const action4EditPlaylist = () => {
        if(!addPlayListLoading){
            setAddPlayListLoading(true)
            createTestSeriesPlaylist(activeCourse, playlistName, editDocumentPlaylistCallback, playlistEditId)
        }
    }
    const editDocumentPlaylistCallback = (response) => {
        setAddPlayListLoading(false)
        if (response.status == 201) {
            let playlistId = response.headers.get('location')
            console.log("video playlist added successfully", playlistId, playlistEditIndex)
            document.getElementById('addPlaylistCloseBtn').click();
            let testSeriesPlaylistArr = [...testseriesPlaylist]

            testSeriesPlaylistArr[playlistEditIndex] = {
                id: playlistId,
                name: playlistName,
                courseId: activeCourse
            }
            console.log(testSeriesPlaylistArr, testseriesPlaylist)
            setTestseriesPlaylist(testSeriesPlaylistArr)
            setSnackBarMessage("Playlist Updated Successfully")
            setIsSnackBarShow(true)
        }
        else
        {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }
    const deletePlaylistHandler = (id, index) => {
        deleteTestSeriesPlayList(id, (response) => deletePlaylistCallback(response, index))

    }
    const deletePlaylistCallback = (response, index) => {
        setDelLoading(false)
        if (response.status == 200) {
            let playlistArr = [...testseriesPlaylist]
            playlistArr.splice(index, 1);
            setTestseriesPlaylist(playlistArr)
            setSnackBarMessage("Playlist Deleted Successfully")
            setIsSnackBarShow(true)
        }
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
   
    const deleteCourseTestSeries = (id, index) => {
        if (window.confirm("Are you sure you want to delete?")) {
            deleteTestSeries(id, (response) => deleteCallBack(response, index))
        }
    }

    const deleteCallBack = (response, index) => {
        setDelLoading(false)
        if (response.status == 200) {
            const arr = [...seriesList]
            arr.splice(index, 1)
            setSeriesList(arr)
            setSnackBarMessage("Test Series Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else { 
                setSnackBarMessage("Something went wrong")
                setIsSnackBarShow(true) 
        }
    }
    return (
        <div>
            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="btn-group">
                    <button type="button" class="btn btn-primary">{selectedPlaylistName}</button>
                    <button type="button" class="btn btn-primary bg-split-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">	<span class="sr-only">Toggle Dropdown</span>
                    </button>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
                        {testseriesPlaylist.map((row, i) => (
                            <a class="dropdown-item" href="javascript:;" onClick={() => {setAllDataLoaded(false); setSelectedPlaylistId(row.id); setOffset(0); setSelectedPlaylistName(row.name); setSeriesList([]); setShowShimmer(true)}}>{row.name}</a>
                        ))}
                    </div>
                </div>
                <div class="ml-auto">
                <br/>
                    <div class="btn-group">
                        {isShowPlaylist ? (
                            <div>
                                <button class="btn btn-info mr-3" onClick={() => setIsShowPlaylist(false)}>View Series List</button>
                            </div>
                        ) : (
                            <button type="button" class="btn btn-info mr-3" onClick={() => { action4viewTestSeriesPlaylist() }}>View Playlist</button>
                        )}

                        <button type="button" class="btn btn-success mr-3" data-toggle="modal" data-target="#addPlayListModal" onClick={() => setPlaylistMode("add")}>Add Test Series Playlist</button>
                        <Link to={"/addTestSeries/add/0/" + activeCourse}>
                            <button type="button" class="btn btn-danger" style={{ marginRight: 5 }}>Add</button>
                        </Link>

                    </div>
                </div>

            </div>


            <div className="mt-3">
                <div class="table-responsive">

                    

                        {isShowPlaylist ? (
                            <>
                                <table class="table table-striped table-bordered mb-0" id="table1">
                                    <thead class="thead-dark">
                                        <tr>
                                            <th align="center">#</th>
                                            <th align="center">Name</th>
                                            <th align="center">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {showShimmer ? (
                                        <td colspan="5">
                                            <Shimmer width={'100%'} height={40} />
                                        </td>
                                    ):( 
                                        testseriesPlaylist.map((row, i) => (
                                            <CourseTestSeriesPlaylistRow 
                                                setEditValues={setEditValues} 
                                                deletePlaylistHandler={deletePlaylistHandler} 
                                                row={row} 
                                                index={i} 
                                                />
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </>
                        ) : (


                            <table class="table table-striped table-bordered mb-0" id="table1">
                                <thead class="thead-dark">
                                    <tr>
                                        <th align="center">#</th>
                                        <th align="center">Title</th>
                                        <th align="center">Duration(mins)</th>
                                        <th align="center">Max Marks</th>
                                        <th align="center">Total Question</th>
                                        <th align="center">Attempt Counts </th>
                                        <th align="center">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {showShimmer ? (
                                        <td colspan="5">
                                            <Shimmer width={'100%'} height={40} />
                                        </td>
                                    ):(
                                        seriesList.map((row, i) => (
                                            <CourseTestSeriesRow 
                                            row={row} index={i} 
                                            activeCourse={activeCourse}
                                             delLoading={delLoading}
                                             deleteCourseTestSeries={deleteCourseTestSeries}
                                             setSeriesDetails={setPublishingSeriesDetails}
                                             setPublishModal={setPublishTestSeriesModal}   
                                             />
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}


                </div>
            </div>


            {/* TestSeries PlayList Modal */}

            <div class="modal fade" data-backdrop="static" data-keyboard="false" id="addPlayListModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Test Series Playlist</h5>
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
                            <button type="button" class="btn btn-primary" onClick={() => playlistMode == "edit" ? action4EditPlaylist() : action4addPlaylist()}>
                                {addPlayListLoading?(
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

            
            
            {publishTestSeriesModal ? (
                <Modal
                    size="lg"
                    show={publishTestSeriesModal}
                    onHide={()=>setPublishTestSeriesModal(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    style={{ zIndex: 10000 }}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Publish Test Series
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Title"
                                        onChange={(e) => setTitle(e.target.value)}
                                        value={title}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Time Duration</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Time Duration"
                                        onChange={(e) => setTimeDuration(e.target.value)}
                                        value={timeDuration}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        name="date"
                                        onChange={(e) => setDate(e.target.value)} value={date}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Time</Form.Label>
                                    <Form.Control
                                        type="time"
                                        step="1"
                                        name="Time"
                                        onChange={(e) => setTime(e.target.value)}
                                        value={time}
                                        required
                                    />
                                </Form.Group>

                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Max Marks</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Max Marks"
                                        onChange={(e) => setMarks(e.target.value)}
                                        value={marks}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Type</Form.Label>
                                    <select class="custom-select" id="validationCustom04" required onChange={(e) => setIsPractice(e.target.value)}>
                                        <option>Select Exam Type</option>
                                        <option value={true} selected={isPractice ? (true) : (false)}>Practice</option>
                                        <option value={false} selected={isPractice ? (false) : (true)}>Exam</option>
                                    </select>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Question Correct Marks</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Correct Marks"
                                        onChange={(e) => setCorrectMarks(e.target.value)}
                                        value={correctMarks}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Question Wrong Marks</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="Question Marks"
                                        onChange={(e) => setWrongMarks(e.target.value)}
                                        value={wrongMarks}
                                        required
                                    />
                                </Form.Group>
                            </Row>
                           
                            <Row>
                                <Form.Group
                                    as={Col}
                                    md="6"
                                    className="position-relative"
                                >
                                    <Form.Label>Select Playlist</Form.Label>
                                    <select class="custom-select" id="validationCustom04" required onChange={(e) => setPlaylistId(e.target.value)}>
                                        <option>Select Exam Type</option>
                                        {testseriesPlaylist.map((row, index) => (
                                            <option value={row.id} selected={playlistId == row.id ? (true) : (false)}>{row.name}</option>
                                        ))}
                                    </select>
                                </Form.Group>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={()=>setPublishTestSeriesModal(false)}
                            style={{ backgroundColor: theme.greyColor, color: theme.primaryColor }}
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            style={{ backgroundColor: theme.darkPurpleColor, marginLeft: 10, color: theme.primaryColor }}
                            onClick={() => window.confirm("Are You Sure You Want To Publish?") ? (editSeriesData()) : (console.log("no"))}
                        >
                            {loadingPublicationsCall ? (
                                <ClipLoader color={theme.primaryColor} loading={loadingPublicationsCall} />
                            ) : ("Save changes")}
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) :(null)}

            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />

        </div>

    )
}

export default CourseTestSeries
