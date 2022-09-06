import React, { useState, useEffect, useRef } from 'react';
import { dataLimit, serverApiUrl, theme } from '../../../../index'
import { fetchTestSeriesQuestions, addTestSeriesQuestion, createTestSeries, deleteQuestion, addMultipleQuestion, editTestSeriesData, getSeriesDataById, getTestSeriesPlaylist, editTestSeriesQuestion } from '../../../../api/TestSeries'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import SingleQuestion from './SingleQuestion';
import Snackbar from '@material-ui/core/Snackbar';
import CsvParser from './CsvParser';
import { Link, useHistory } from "react-router-dom"
import ClipLoader from "react-spinners/ClipLoader";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Shimmer } from 'react-shimmer'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build';
import moment from 'moment';
 
const TestSeriesAddEdit = props => {
    const [activeCourse, setActiveCourse] = useState(props.match.params.activeCourse);
    const [offset, setOffset] = useState(0);
    const [testSeries, setTestSeries] = useState([]);
    const [testSeriesData, setTestSeriesData] = useState({});
    const [addModal, setAddModal] = useState(false);
    const [addTestSeriesModal, setAddTestSeriesModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [category, setCategory] = useState(0);
    const [playlistId, setPlaylistId] = useState();
    const [showAddQuestion, setShowAddQuestion] = useState(false);
    const [time, setTime] = useState('');
    const [marks, setMarks] = useState('');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [isPractice, setIsPractice] = useState(true);
    const [timeDuration, setTimeDuration] = useState('');
    const [seriesId, setSeriesId] = useState(props.match.params.seriesId);
    const [questionType, setQuestionType] = useState('1'); //textwithouopt 1, imagewithoutopt 2  textwithopt 3 imagewithopt 4
    const [optionType, setOptionType] = useState('1'); // text      image 
    const [withOpt, setWithOpt] = useState(false)
    const [typeImage, setTypeImage] = useState(false)
    const [testseriesPlaylist, setTestseriesPlaylist] = useState([])
    const [optTypeImage, setOptTypeImage] = useState(false)
    const [optTypeSelectValue, setOptTypeSelectValue] = useState('1')
    const [mode, setMode] = useState('add')
    const [correctOpt, setCorrectOpt] = useState(1)
    const [correctMarks, setCorrectMarks] = useState('')
    const [wrongMarks, setWrongMarks] = useState('')
    const [explanation, setExplanation] = useState('')
    const [editQuestionData, setEditQuestionData] = useState({})
    const [questionId, setQuestionId] = useState('')
    const [index, setIndex] = useState('')
    const [opt1, setOpt1] = useState('')
    const [opt2, setOpt2] = useState('')
    const [opt3, setOpt3] = useState('')
    const [opt4, setOpt4] = useState('')
    const [optionAText, setOptionAText] = useState('')
    const [optionBText, setOptionBText] = useState('')
    const [optionCText, setOptionCText] = useState('')
    const [optionDText, setOptionDText] = useState('')
    const [optionAImage, setOptionAImage] = useState('')
    const [optionBImage, setOptionBImage] = useState('')
    const [optionCImage, setOptionCImage] = useState('')
    const [optionDImage, setOptionDImage] = useState('')
    const [questionImage, setQuestionImage] = useState('')
    const [questionText, setQuestionText] = useState('')
    const [image, setImage] = useState('')
    const [optImage, setOptImage] = useState('')
    const [csvLoader, setCsvLoader] = useState('')
    const [data, setData] = useState([])
    const addRef = useRef(false)
    const appendQue = useRef(false)
    const deleteRef = useRef(false)
    const [isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [createSeriesLoading, setCreateSeriesLoading] = useState(false)
    const [addQueLoading, setAddQueLoading] = useState(false)
    const [hideCreateBtn, setHideCreateBtn] = useState(false)
    const [SnackBarMessage, setSnackBarMessage] = useState("")
    const history = useHistory();
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showShimmer, setShowShimmer] = useState(true)
    const [totalMarks, setTotalMarks] = useState(0)
    const closeSnack = () => {
        setIsSnackBarShow(false)
    }

    const fetchQuestionCallBack = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                console.log("data", data)
                if (data.length > 0) {
                    setTestSeries([...testSeries, ...data])
                    setOffset(offset + 1)
                } else {
                    
                }
                setShowShimmer(false)
                setAllDataLoaded(true)
            })
        }
        else {
            console.log("error", response.status)
        }
    }

    const getSeriesDataByIdCallBack = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                console.log("data", data)
                setTestSeriesData(data)
                setMarks(data.maxMarks)
                setTitle(data.title)
                setDate(moment(data.date,"DD/MM/YYYY").format("YYYY-MM-DD"))
                setTime(data.time)
                setIsPractice(data.practice)
                setTimeDuration(data.timeDuration)
                setPlaylistId(data.playlistId)
                setCorrectMarks(data.correctMarks);
                setWrongMarks(data.wrongMarks)
            })
        }
        else {
            console.log("error", response.status)
        }
        console.log(testSeriesData)
    }

    useEffect(() => {
        if (props.match.params.type == "edit") {
            console.log("fetching")
            console.log(dataLimit)
            fetchTestSeriesQuestions(props.match.params.seriesId, offset, dataLimit, fetchQuestionCallBack)
            getSeriesDataById(props.match.params.seriesId, getSeriesDataByIdCallBack)
        }
        getTestSeriesPlaylist(activeCourse, getTestSeriesPlaylistCallback)
    }, [offset])

    const getTestSeriesPlaylistCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                console.log(data)
                setTestseriesPlaylist(data)
                console.log(data)
            })
        }
    }




    const checkData = () => {
        if (data.length == 0) {
            setAllDataLoaded(true)

        } else {

            setAllDataLoaded(false)
        }

    }

    const handleClose = () => {
        setAddModal(false)
        setEditModal(false)
        setAddTestSeriesModal(false)
    }

    const handleChange = () => {
        if (withOpt == false) {
            if (typeImage) {
                setWithOpt(!withOpt)
                setQuestionType(4)
                setOptionType(3)
            }
            else {
                setWithOpt(!withOpt)
                setQuestionType(3)
                setOptionType(3)
            }
        }
        else if (withOpt == true) {
            if (typeImage) {
                setWithOpt(!withOpt)
                setQuestionType(2)
            }
            else {
                setWithOpt(!withOpt)
                setQuestionType(1)
            }
        }
    }
    const handleTypeChange = () => {
        if (typeImage) {
            if (withOpt) {
                setTypeImage(!typeImage)
                setQuestionType(3)
                setOptionType(3)
            }
            else {
                setTypeImage(!typeImage)
                setQuestionType(1)
            }
        }
        else {
            if (withOpt) {
                setTypeImage(!typeImage)
                setQuestionType(4)
                setOptionType(3)
            }
            else {
                setTypeImage(!typeImage)
                setQuestionType(2)
            }
        }
    }

    console.log("optionType", optionType)

    const handleOptionTypeChange = () => {
        if (optTypeImage) {
            setOptTypeImage(!optTypeImage)
            setOptionType(1)
        }
        else {
            setOptTypeImage(!optTypeImage)
            setOptionType(2)
        }
    }

    const addQuestion = () => {
        if (!addQueLoading) {
            setAddQueLoading(true)
            if (optionType == '3') {
                console.log("type3")
                if (optTypeSelectValue == 1) {
                    add('A', 'B', 'C', 'D', '1', true)
                }
                else if (optTypeSelectValue == 2) {
                    add('1', '2', '3', '4', '1', true)
                }
                else if (optTypeSelectValue == 3) {
                    add('a', 'b', 'c', 'd', '1', true)
                }
                else if (optTypeSelectValue == 4) {
                    add('i', 'ii', 'iii', 'iv', '1', true)
                }
                else if (optTypeSelectValue == 5) {
                    add('I', 'II', 'III', 'IV', '1', true)
                }
            }
            else {
                add('I', 'II', 'III', 'IV', '1', false)
            }
        }

    }

    const addQuesCallback = (response) => {
        setAddQueLoading(false)
        console.log(response.status)
        if (response.status == 200) {

            response.json().then(data => {
                handleClose()
                appendQuestion(data)
                setSnackBarMessage("Question Added Successfully!")
                setIsSnackBarShow(true)
            })
            setQuestionType('1')
            setOptionType('1')
            setQuestionImage('')
            setQuestionText('')
            setCorrectOpt(1)
            setOptionAImage('')
            setOptionBImage('')
            setOptionCImage('')
            setOptionDImage('')
            setOptionAText('')
            setOptionBText('')
            setOptionCText('')
            setOptionDText('')
            setExplanation('')
            
            

        }
        else {
            console.log("error")
        }
    }

    const add = (opt1, opt2, opt3, opt4, optType, check) => {
        addTestSeriesQuestion(questionType == '4' || questionType == '2' ? (questionImage) : (null),
            optionType == '2' ? (optionAImage) : (null),
            optionType == '2' ? (optionBImage) : (null),
            optionType == '2' ? (optionCImage) : (null),
            optionType == '2' ? (optionDImage) : (null),
            questionType == '3' || questionType == '1' ? (questionText) : (null),
            optionType == '1' || optionType == '3' ? (check ? (opt1) : (optionAText)) : (null),
            optionType == '1' || optionType == '3' ? (check ? (opt2) : (optionBText)) : (null),
            optionType == '1' || optionType == '3' ? (check ? (opt3) : (optionCText)) : (null),
            optionType == '1' || optionType == '3' ? (check ? (opt4) : (optionDText)) : (null),
            correctOpt, explanation,  questionType, check ? (optType) : (optionType), seriesId, questionId, mode, seriesId, addQuesCallback)
    }



    const appendQuestion = (data) => {
        var arr = testSeries

        var obj = {
            question: data
        }
        console.log(obj)
        if (mode == "add") {
            obj.userResponse = null
            obj.status = null
            arr.unshift(obj)
            setTestSeries(arr)
        }
        else {
            arr[index] = obj;
            setTestSeries(arr)
        }
        setQuestionType('1')
        setOptionType('1')
        setTypeImage(false)
        setCorrectOpt('A')
        setOptTypeSelectValue('1')
        setOptTypeImage(false)
        setWithOpt(false)

    }

    const imageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]))
            setQuestionImage(event.target.files[0])
        }
    }

    const onOptionImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setOptImage(URL.createObjectURL(event.target.files[0]))
        }
    }

    const createSeriesCallback = (response) => {
        setCreateSeriesLoading(false)
        console.log(response)
        if (response.status == 201) {
            setShowAddQuestion(true)
            setSeriesId(response.headers.get('location'))
            setSnackBarMessage("Test Series Created successfully!!")
            setIsSnackBarShow(true)
        }
        else {
            console.log("error", response.status)
        }
    }

    const editSeriesCallback = (response) => {
        setAddQueLoading(false)
        if (response.status == 201) {
            setSnackBarMessage("Test Series Published Successfully!!")
            setIsSnackBarShow(true)
            setAddTestSeriesModal(false)
        }
        else {
            console.log("error", response.status)
        }
    }

    const saveChanges = () => {
        if (title) {
            if (window.confirm("Are You Sure You Want To Create Test Series?")) {
                setCreateSeriesLoading(true)
                var obj = time.split(":");
                createTestSeries(title, false,true, activeCourse, createSeriesCallback)
                setHideCreateBtn(false)
                // setShowShimmer(false)
            }
        }
        else {

            setSnackBarMessage("Please Fill All The Fields.")
            setIsSnackBarShow(true)
        }
    }

    // const publishTest = () => {
    //     if (title && timeDuration && time && date && marks) {
    //         if (window.confirm("Are You Sure You Want To Publish Test Series?")) {
    //             setCreateSeriesLoading(true)
    //             var obj = time.split(":");
    //             createTestSeries(title, timeDuration, time, date, isPractice, category, marks, false, activeCourse, playlistId, createSeriesCallback)
    //             setHideCreateBtn(true)
    //         }
    //     }
    //     else {

    //         setSnackBarMessage("Please Fill All The Fields.")
    //         setIsSnackBarShow(true)
    //     }
    // }

    const editSeriesData = (id) => {
        console.log("here")
        if (title && timeDuration && time && date && marks) {
            setAddQueLoading(true)
                var obj = time.split(":");
                editTestSeriesData(seriesId, title, timeDuration, time, date, isPractice, category, marks, false,false,activeCourse, testSeries.length,correctMarks, wrongMarks,editSeriesCallback)
                setHideCreateBtn(true)
        }
        else {
            console.log('Please Fill All The Fields.')
        }
    }




    const deleteCallBack = (response) => {
        if (response.status == 200) {
            // console.log("index", index)
            var arr = [...testSeries]
            arr.splice(index, 1)
            setTestSeries(arr)
            console.log("arr testseries", arr)
            setSnackBarMessage("Question Deleted successfully!!")
            setIsSnackBarShow(true)
        }
        else {
            console.log(response.status)
        }
    }

    useEffect(() => {
        if (deleteRef.current) {

            deleteRef.current = false;
        }
    }, [deleteRef.current])

    const deleteQue = (index, id) => {
        if (window.confirm("Are You Sure You Want To Delete?")) {
            setIndex(index)
            deleteRef.current = id
            deleteQuestion(id, (response) => deleteCallBack(response, index))
        }
    }

    const callbackLoader = (type) => {
        setCsvLoader(type)
    }

    const multipleQueCallBack = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                var arr = [...testSeries]
                arr = arr.concat(data)
                setTestSeries(arr)
            })
            setSnackBarMessage("Questions Added Successfully!!")
            setIsSnackBarShow(true)
        }
    }

    const callbackQuestion = (data) => {
        addMultipleQuestion(data, multipleQueCallBack)
    }

    const errorsCallback = (data) => {
        setSnackBarMessage("Something Went Wrong. Please Try Again Later!!")
        setIsSnackBarShow(true)
    }

    const setEditData = (questionData, index, id) => {
        setQuestionType(questionData.questionType)
        setQuestionImage(questionData.questionImage)
        setQuestionText(questionData.question)
        setOptionAText(questionData.optionA)
        setOptionBText(questionData.optionB)
        setOptionCText(questionData.optionC)
        setOptionDText(questionData.optionD)
        setOptionAImage(questionData.optionAImage)
        setOptionBImage(questionData.optionBImage)
        setOptionCImage(questionData.optionCImage)
        setOptionDImage(questionData.optionDImage)
        setOptionType(questionData.optionType)
        setCorrectMarks(questionData.correctMarks)
        setWrongMarks(questionData.wrongMarks)
        setCorrectOpt(questionData.correctOpt)
        setExplanation(questionData.explanation)
        setIndex(index)
        setEditModal(true)
        setQuestionId(id)
        setWithOpt(questionData.questionType == '3' && questionData.questionType == '4' ? true : false)
        setTypeImage(questionData.questionType == '2' || questionData.questionType == '4' ? true : false)
        setOptTypeImage(questionData.optionType == '2' ? true : false)
        setMode("edit")
    }

    // const editTestSeriesQuestionData = (TestSeriesQuestionData, index, id) => {
    //     console.log("here")
    //     setCorrectMarks(TestSeriesQuestionData.correctMarks)
    //     setCorrectOpt(TestSeriesQuestionData.correctOpt)
    //     setExplanation(TestSeriesQuestionData.explanation)
    //     setWrongMarks(TestSeriesQuestionData.wrongMarks)
    //     setQuestionId(id)

    // }

    // const downloadFile = () => {
    //     window.location.href = "https://yoursite.com/src/assets/files/exampleDoc.pdf"
    // }

    return (
        <div>
            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Series View</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="ml-auto">
                    <div class="btn-group">
                        {/* <button class="btn btn-primary" type="button" onClick={()=>downloadFile()}>
                                DOWNLOAD CSV TEMPLATE
                            </button> */}
                        {showAddQuestion || props.match.params.type == "publish" || props.match.params.type == "edit" ? (
                            <>
                                <div>
                                    <button class="btn btn-primary" style={{ marginRight: 5 }} type="button" onClick={() => setAddModal(true)}>
                                        + ADD QUESTION
                                    </button>
                                </div>
                                <div>
                                    <button class="btn btn-primary" style={{ marginRight: 5 }} type="button" onClick={() => {
                                        
                                        
                                          if(testSeries.length<=0)
                                        {
                                            setIsSnackBarShow(true)
                                            setSnackBarMessage("Please Add Questions To Publish Test")
                                        }else
                                        {
                                            setAddTestSeriesModal(true)
                                        } 
                                        
                                        }
                                        }>
                                        PUBLISH
                                    </button>
                                </div>
                            </>
                        ) : (null)}
                        <button type="button" class="btn btn-dark" onClick={() => history.goBack()}>Go Back</button>
                    </div>
                </div>
            </div>
            {/* {props.match.params.type=="add"?(  */}
           
                    {props.match.params.type == "add" && !showAddQuestion ? (
                        <>
                         <div class="card">
                            <div class="card-body">
                                <form class="needs-validation" >
                                    <div class="form-row">
                                        <div class="col-md-12 mb-3">
                                            <label for="validationCustom01">Title</label>
                                            <input type="text" class="form-control" id="validationCustom01" required onChange={(e) => setTitle(e.target.value)} value={title} />
                                         
                                        </div>
                                    </div>
                                    <button class="btn btn-primary" type="button" onClick={() => saveChanges()}>{createSeriesLoading ? (
                                        <ClipLoader color={theme.primaryColor} loading={createSeriesLoading} />
                                    ) : ("CREATE SERIES")}</button>
                                </form> 
                            </div>
                        </div>
                        </>
                    ) : (null)}
                    {/* props.match.params.type == "publish" && !showAddQuestion?(
                        <>
                            <form class="needs-validation" novalidate>
                                <div class="form-row">
                                    <div class="col-md-6 mb-3">
                                        <label for="validationCustom01">Title</label>
                                        <input type="text" class="form-control" id="validationCustom01" required onChange={(e) => setTitle(e.target.value)} value={title} />
                                        <div class="valid-feedback">Looks good!</div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="validationCustom02">Time Duration</label>
                                        <input type="text" class="form-control" id="validationCustom02" required onChange={(e) => setTimeDuration(e.target.value)} value={timeDuration} />
                                        <div class="valid-feedback">Looks good!</div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-md-6 mb-3">
                                        <label for="validationCustom01">Date</label>
                                        <input type="date" class="form-control" id="validationCustom01" required onChange={(e) => setDate(e.target.value)} value={date} />
                                        <div class="valid-feedback">Looks good!</div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="validationCustom02">Time</label>
                                        <input type="time" class="form-control" id="validationCustom02" required onChange={(e) => setTime(e.target.value)} value={time} />
                                        <div class="valid-feedback">Looks good!</div>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-md-6 mb-3">
                                        <label for="validationCustom01">Max Marks</label>
                                        <input type="text" class="form-control" id="validationCustom01" required onChange={(e) => setMarks(e.target.value)} value={marks} />
                                        <div class="valid-feedback">Looks good!</div>
                                    </div>
                                    <div class="col-md-6 mb-3">
                                        <label for="validationCustom04">Type</label>
                                        <select class="custom-select" id="validationCustom04" required onChange={(e) => setIsPractice(e.target.value)}>
                                            <option>Select Exam Type</option>
                                            <option value={true} selected={isPractice ? (true) : (false)}>Practice</option>
                                            <option value={false} selected={isPractice ? (false) : (true)}>Exam</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div class="col-md-6 mb-3">
                                        <label>Select Playlist</label>
                                        <select className="form-control" value={playlistId} onChange={(e) => setPlaylistId(e.target.value)}>
                                            <option>Select</option>
                                            {testseriesPlaylist.map((row, index) => (
                                                <option value={row.id} selected={playlistId == row.id ? (true) : (false)}>{row.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                               
                            <button class="btn btn-success" type="button" onClick={() => editSeriesData(testSeriesData.id)}>Publish</button>
                            </form>
                        </>
                        ):(
                            null
                        )
                    )} */}
              
            {/* ):(
                null
            )} */}
            {/* {showShimmer  ? (
                <div class="mt-3">
                    <Shimmer width={'100%'} height={100} />
                </div>
            ) : ( */}
                <>
                    {showAddQuestion || props.match.params.type == "edit" ? (
                        <>
                            <div className="d-flex justify-content-end" style={{marginBottom:10,marginRight:5}}>
                                <h6 >Total Number of Question : {testSeries.length}</h6>
                            </div>
                            <div>
                                <CsvParser callbackLoader={callbackLoader} callbackQuestion={callbackQuestion} testSeriesId={seriesId} errorsCallback={errorsCallback} />
                                <br />
                            </div>
                        </>
                    ) : (null)}
                </>
            {/* )} */}

            {showShimmer && props.match.params.type == "edit" ? (
                <div class="mt-3">
                    <Shimmer width={'100%'} height={300} />
                </div>
            ) : (
                <>

                    <InfiniteScroll
                        dataLength={testSeries.length} //This is important field to render the next data
                        next={() => fetchTestSeriesQuestions(props.match.params.seriesId, offset, dataLimit, fetchQuestionCallBack)}
                        hasMore={() => checkData()}
                        loader={!allDataLoaded && testSeries.length>0?<Shimmer width={'100%'} height={100} />:""}>
                        {testSeries.map((row, i) => (
                            <SingleQuestion data={row.question} index={i} deleteQue={deleteQue} setEditData={setEditData} />
                        ))}
                    </InfiniteScroll>
                </>
            )}

            {addTestSeriesModal ? (
                <Modal
                    size="lg"
                    show={addTestSeriesModal}
                    onHide={handleClose}
                    backdrop="static"
                    aria-labelledby="example-modal-sizes-title-lg"
                    style={{ zIndex: 10000 }}
                >

                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            ADD TEST SERIES DETAILS
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
                                    <select class="custom-select" id="validationCustom04" value={isPractice} required onChange={(e) => setIsPractice(e.target.value)}>
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
                                    <Form.Label>Select Playlist</Form.Label>
                                    <select class="custom-select" id="validationCustom04" required onChange={(e) => setPlaylistId(e.target.value)}>
                                        <option>Select Exam Playlist</option>
                                        {testseriesPlaylist.map((row, index) => (
                                            <option value={row.id} selected={playlistId == row.id ? (true) : (false)}>{row.name}</option>
                                        ))}
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
                           
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                            style={{ backgroundColor: theme.greyColor, color: theme.primaryColor }}
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            style={{ backgroundColor: theme.darkPurpleColor, marginLeft: 10, color: theme.primaryColor }}
                            onClick={() => window.confirm("Are You Sure You Want To Publish?") ? (editSeriesData(testSeriesData.id)) : (console.log("no"))}
                        >
                            {addQueLoading ? (
                                <ClipLoader color={theme.primaryColor} loading={addQueLoading} />
                            ) : ("Save changes")}
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) :(null)}

               {addModal ? (
                    <Modal
                        size="lg"
                        show={addModal}
                        onHide={handleClose}
                        aria-labelledby="example-modal-sizes-title-lg"
                        style={{ zIndex: 10000 }}
                        backdrop="static"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-lg">
                                ADD TEST SERIES QUESTION
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Modal.Body>
                                <Form>
                                    {/* <Row>
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            className="position-relative"
                                        >
                                            <Form.Label>Correct Marks</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="Correct Marks"
                                                onChange={(e) => setCorrectMarks(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group
                                            as={Col}
                                            md="6"
                                            className="position-relative"
                                        >
                                            <Form.Label>Wrong Marks</Form.Label>
                                            <Form.Control
                                                type="number"
                                                name="Wrong Marks"
                                                onChange={(e) => setWrongMarks(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                    </Row> */}
                                    <br />
                                    <div style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 2 }}>
                                        <Form.Label>Question</Form.Label>
                                        <Form.Group className="mb-3" id="formGridCheckbox">
                                            <Row>
                                                <Col md={6} className="ml-4" >
                                                    <Form.Check type="checkbox"   checked={withOpt ? (true) : (false)} onChange={handleChange} />
                                                    <label>With Option</label>
                                                </Col>
                                                <Col md={6}>
                                                    {/* <Form.Check type="checkbox" label={"Type Image"} checked={typeImage ? (true) : (false)} onChange={handleTypeChange} /> */}
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </div>
                                    {typeImage ? (
                                        <Form.Group className="mb-3">
                                            <Form.Label>Question</Form.Label>
                                            <Form.Control type="file" onChange={(e) => imageChange(e)} required />
                                        </Form.Group>
                                    ) : (
                                        // <Form.Control as="textarea" rows={3} onChange={(e) => setQuestionText(e.target.value)} required />
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={{
                                                ckfinder:
                                                {
                                                    uploadUrl:serverApiUrl+"files/uploadFileCkEditor"
                                                },
                                                fontFamily: {
                                                    options: [
                                                        'kruti_dev_010regular',
                                                        "kruti_dev_010bold",
                                                        "chanakyaregular",
                                                        'Ubuntu, Arial, sans-serif',
                                                        "walkman-chanakya-901bold",
                                                        "GreekMathSymbols" 
                                                    ]
                                                }

                                            }}
                                            // data={blogContent}
                                            onReady={editor => {

                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                // setBlogContent(data)
                                                setQuestionText(data)
                                            }}
                                            onBlur={(event, editor) => {
                                            }}
                                            onFocus={(event, editor) => {
                                            }}
                                        />
                                        
                                    )}
                                    <br />
                                    {
                                        withOpt ? (
                                            <>
                                                <Form.Label>Option Type</Form.Label>
                                                <select class="custom-select" id="validatedInputGroupSelect" required onChange={(e) => setOptTypeSelectValue(e.target.value)}>
                                                    <option value={1}>A, B, C, D</option>
                                                    <option value={2}>1, 2, 3, 4</option>
                                                    <option value={3}>a, b, c, d</option>
                                                    <option value={4}>i, ii, iii, iv</option>
                                                    <option value={5}>I, II, III, IV</option>
                                                </select>
                                                <br />
                                            </>
                                        ) : (

                                            <div>
                                                {/* <Row>
                                                    <Col md={9}>

                                                    </Col>
                                                    <Col md={3}>
                                                        <Form.Check type="checkbox" label={"Option Type Image"} checked={optTypeImage ? (true) : (false)} onChange={handleOptionTypeChange} />
                                                    </Col>
                                                </Row> */}
                                                {optTypeImage ? (
                                                    <>
                                                        <Row>
                                                            <Form.Group
                                                                as={Col}
                                                                md="6"
                                                                className="position-relative"
                                                            >
                                                                <Form.Label>Options 1</Form.Label>
                                                                <Form.Control type="file" onChange={(e) => setOptionAImage(e.target.files[0])} />
                                                            </Form.Group>
                                                            <Form.Group
                                                                as={Col}
                                                                md="6"
                                                                className="position-relative"
                                                            >
                                                                <Form.Label>Options 2</Form.Label>
                                                                <Form.Control type="file" onChange={(event) => setOptionBImage(event.target.files[0])} />
                                                            </Form.Group>
                                                        </Row>
                                                        <br />
                                                        <Row>
                                                            <Form.Group
                                                                as={Col}
                                                                md="6"
                                                                className="position-relative"
                                                            >
                                                                <Form.Label>Options 3</Form.Label>
                                                                <Form.Control type="file" onChange={(e) => setOptionCImage(e.target.files[0])} />
                                                            </Form.Group>
                                                            <Form.Group
                                                                as={Col}
                                                                md="6"
                                                                className="position-relative"
                                                            >
                                                                <Form.Label>Options 4</Form.Label>
                                                                <Form.Control type="file" onChange={(e) => setOptionDImage(e.target.files[0])} />
                                                            </Form.Group>
                                                        </Row>
                                                    </>
                                                ) : (
                                                    <>
                                                    <Row>
                                                        <Form.Group
                                                            as={Col}
                                                            md="6"
                                                            className="position-relative"
                                                        >
                                                            <Form.Label>Option 1</Form.Label>
                                                            {/* <Form.Control
                                                                type="text"
                                                                name="Option 1"
                                                                onChange={(e) => setOptionAText(e.target.value)}
                                                                required
                                                            /> */}
                                                             <CKEditor
                                                                editor={ClassicEditor}
                                                                config={{
                                                                    ckfinder:
                                                                    {
                                                                        uploadUrl: serverApiUrl + "files/uploadFileCkEditor"
                                                                    }
                                                                    ,
                                                                    fontFamily: {
                                                                        options: [
                                                                            'kruti_dev_010regular',
                                                                            "kruti_dev_010bold",
                                                                            "chanakyaregular",
                                                                            'Ubuntu, Arial, sans-serif',
                                                                            "walkman-chanakya-901bold",
                                                                            "GreekMathSymbols"
                                                                            
                                                                        ]
                                                                    },
                                                                }}
                                                                // data={blogContent}
                                                                onReady={editor => {
    
                                                                    console.log('Editor is ready to use!', editor);
                                                                }}
                                                                data={optionAText}
                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    // setBlogContent(data)
                                                                    setOptionAText(data)
                                                                }}
                                                                onBlur={(event, editor) => {
                                                                }}
                                                                onFocus={(event, editor) => {
                                                                }}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group
                                                            as={Col}
                                                            md="6"
                                                            className="position-relative"
                                                        >
                                                            <Form.Label>Option 2</Form.Label>
                                                            {/* <Form.Control
                                                                type="text"
                                                                name="Option 2"
                                                                onChange={(e) => setOptionBText(e.target.value)}
                                                                required
                                                            /> */}
                                                             <CKEditor
                                                                    editor={ClassicEditor}
                                                                    config={{
                                                                        ckfinder:
                                                                        {
                                                                            uploadUrl: serverApiUrl + "files/uploadFileCkEditor"
                                                                        }
                                                                        ,
                                                                        fontFamily: {
                                                                            options: [
                                                                                'kruti_dev_010regular',
                                                                                "kruti_dev_010bold",
                                                                                "chanakyaregular",
                                                                                'Ubuntu, Arial, sans-serif',
                                                                                "walkman-chanakya-901bold",
                                                                                "GreekMathSymbols"
                                                                                
                                                                            ]
                                                                        },
                                                                    }}
                                                                    data={optionBText}
                                                                    onReady={editor => {
    
                                                                        console.log('Editor is ready to use!', editor);
                                                                    }}
                                                                    onChange={(event, editor) => {
                                                                        const data = editor.getData();
                                                                        // setBlogContent(data)
                                                                        setOptionBText(data)
                                                                    }}
                                                                    onBlur={(event, editor) => {
                                                                    }}
                                                                    onFocus={(event, editor) => {
                                                                    }}
                                                                />
                                                        </Form.Group>
                                                    </Row>
                                                    <br />
                                                    <Row>
                                                        <Form.Group
                                                            as={Col}
                                                            md="6"
                                                            className="position-relative"
                                                        >
                                                            <Form.Label>Option 3</Form.Label>
                                                             
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                config={{
                                                                    ckfinder:
                                                                    {
                                                                        uploadUrl: serverApiUrl + "files/uploadFileCkEditor"
                                                                    }
                                                                    ,
                                                                    fontFamily: {
                                                                        options: [
                                                                            'kruti_dev_010regular',
                                                                            "kruti_dev_010bold",
                                                                            "chanakyaregular",
                                                                            'Ubuntu, Arial, sans-serif',
                                                                            "walkman-chanakya-901bold",
                                                                            "GreekMathSymbols"
                                                                            
                                                                        ]
                                                                    },
                                                                }}
                                                                data={optionCText}
                                                                onReady={editor => {
    
                                                                    console.log('Editor is ready to use!', editor);
                                                                }}
                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    // setBlogContent(data)
                                                                    setOptionCText(data)
                                                                }}
                                                                onBlur={(event, editor) => {
                                                                }}
                                                                onFocus={(event, editor) => {
                                                                }}
                                                                />
                                                        </Form.Group>
                                                        <Form.Group
                                                            as={Col}
                                                            md="6"
                                                            className="position-relative"
                                                        >
                                                            <Form.Label>Option 4</Form.Label>
                                                             
                                                            <CKEditor
                                                                    editor={ClassicEditor}
                                                                    config={{
                                                                        ckfinder:
                                                                        {
                                                                            uploadUrl: serverApiUrl + "files/uploadFileCkEditor"
                                                                        }
                                                                        ,
                                                                        fontFamily: {
                                                                            options: [
                                                                                'kruti_dev_010regular',
                                                                                "kruti_dev_010bold",
                                                                                "chanakyaregular",
                                                                                'Ubuntu, Arial, sans-serif',
                                                                                "walkman-chanakya-901bold",
                                                                                "GreekMathSymbols"
                                                                                
                                                                            ]
                                                                        },
                                                                    }}
                                                                    data={optionDText}
                                                                    onReady={editor => {
    
                                                                        console.log('Editor is ready to use!', editor);
                                                                    }}
                                                                    onChange={(event, editor) => {
                                                                        const data = editor.getData();
                                                                        // setBlogContent(data)
                                                                        setOptionDText(data)
                                                                    }}
                                                                    onBlur={(event, editor) => {
                                                                    }}
                                                                    onFocus={(event, editor) => {
                                                                    }}
                                                                />
                                                        </Form.Group>
                                                    </Row>
                                                </>
                                                )}
                                            </div>
                                        )
                                    }
                                    <br />
                                    <Form.Label>Correct Option</Form.Label>
                                    <ButtonToolbar aria-label="Toolbar with button groups">
                                        <ButtonGroup className="me-2" aria-label="First group" style={{ border: '1px solid #4630EB', backgroundColor: theme.blueColor }} >
                                            <Button
                                                onClick={() => setCorrectOpt('A')}
                                                style={{ backgroundColor: correctOpt == 'A' ? (theme.blueColor) : (theme.primaryColor), color: correctOpt == 'A' ? (theme.primaryColor) : (theme.secondaryColor), border: '1px solid #4630EB' }}
                                            >
                                                A
                                            </Button>

                                            <Button
                                                onClick={() => setCorrectOpt('B')}
                                                style={{ backgroundColor: correctOpt == 'B' ? (theme.blueColor) : (theme.primaryColor), color: correctOpt == 'B' ? (theme.primaryColor) : (theme.secondaryColor), border: '1px solid #4630EB' }}
                                            >
                                                B
                                            </Button>

                                            <Button
                                                onClick={() => setCorrectOpt('C')}
                                                style={{ backgroundColor: correctOpt == 'C' ? (theme.blueColor) : (theme.primaryColor), color: correctOpt == 'C' ? (theme.primaryColor) : (theme.secondaryColor), border: '1px solid #4630EB' }}
                                            >
                                                C
                                            </Button>

                                            <Button
                                                onClick={() => setCorrectOpt('D')}
                                                style={{ backgroundColor: correctOpt == 'D' ? (theme.blueColor) : (theme.primaryColor), color: correctOpt == 'D' ? (theme.primaryColor) : (theme.secondaryColor), border: '1px solid #4630EB' }}
                                            >
                                                D
                                            </Button>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                    <br />
                                    <Form.Group className="mb-3">
                                        <Form.Label>Explanation</Form.Label>
                                        {/* <Form.Control as="textarea" rows={2} onChange={(e) => setExplanation(e.target.value)} required /> */}
                                        <CKEditor
                                            editor={ClassicEditor}
                                            config={{
                                                ckfinder:
                                                {
                                                    uploadUrl: serverApiUrl + "files/uploadFileCkEditor"
                                                }
                                                ,
                                        fontFamily: {
                                            options: [
                                                'kruti_dev_010regular',
                                                "kruti_dev_010bold",
                                                "chanakyaregular",
                                                'Ubuntu, Arial, sans-serif',
                                                "walkman-chanakya-901bold",
                                                "GreekMathSymbols"
                                                
                                            ]
                                        },

                                            }}
                                            data={explanation}
                                            onReady={editor => {

                                                console.log('Editor is ready to use!', editor);
                                            }}
                                            onChange={(event, editor) => {
                                                const data = editor.getData();
                                                // setBlogContent(data)
                                                setExplanation(data)
                                            }}
                                            onBlur={(event, editor) => {
                                            }}
                                            onFocus={(event, editor) => {
                                            }}
                                        />
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={handleClose}
                                style={{ backgroundColor: theme.greyColor, color: theme.primaryColor }}
                            >
                                Close
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                style={{ backgroundColor: theme.darkPurpleColor, marginLeft: 10, color: theme.primaryColor }}
                                onClick={() => window.confirm("Are You Sure You Want To Add This Question?") ? (addQuestion()) : (console.log("no"))}
                            >
                                {addQueLoading ? (
                                    <ClipLoader color={theme.primaryColor} loading={addQueLoading} />
                                ) : ("Save changes")}
                            </Button>
                        </Modal.Footer>
                    </Modal>
                ) : (null)}

            <Snackbar
                open={isSnackBarShow}
                onClose={(e) => closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div>
    )
}
export default TestSeriesAddEdit
