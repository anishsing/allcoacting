import React, { useState, useEffect, useRef } from 'react';
import { dataLimit, serverBaseUrl, theme,serverApiUrl } from '../../../../index'
import { Link } from "react-router-dom"
import { editTestSeriesQuestion, updateQuestion } from '../../../../api/TestSeries'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from "react-bootstrap/Button";
import ClipLoader from "react-spinners/ClipLoader";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build';
import { ButtonGroup, ButtonToolbar } from 'react-bootstrap';
const SingleQuestion = props => {
    // console.log(props)
    const [questionData, setQuestionData] = useState(props.data)
    // const [editTestSeriesQuestionData, setEditTestSeriesQuestionData] = useState(props.data)
    const [withOpt, setWithOpt] = useState(false)
    const [typeImage, setTypeImage] = useState(false)
    const [question, setQuestion] = useState()
    const [optTypeImage, setOptTypeImage] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [id, setId] = useState(props.data.id)
    const [option, setOption] = useState("")
    const [editQuestion, setEditQuestion] = useState(false)
    const [editOption, setEditOption] = useState(false)
    const [editQuestionDetails, seteditQuestionDetails] = useState(false)
    const [correctOpt, setCorrectOpt] = useState()
    const [explanation, setExplanation] = useState()
    const [wrongMarks, setWrongMarks] = useState()
    const [correctMarks, setCorrectMarks] = useState()
    const [optionNum, setOptionNum] = useState(false)
    const [editOpt1, setEditOpt1] = useState()
    const [editOpt2, setEditOpt2] = useState()
    const [editOpt3, setEditOpt3] = useState()
    const [editOpt4, setEditOpt4] = useState()
    const [opt1, setOpt1] = useState()
    const [opt2, setOpt2] = useState()
    const [opt3, setOpt3] = useState()
    const [opt4, setOpt4] = useState()
    const [editLoading, setEditLoading] = useState(false)
    const [optionAText, setOptionAText] = useState("")
    
    useEffect(() => {

        if(props.data)
        {
            setQuestionData(props.data)
            setId(props.data.id)
        }
    },[props.data])

    const handleClose = () => {
        setEditModal(false);
        setEditQuestion(false);
        setEditOption(false);
        seteditQuestionDetails(false)
    }
 

    const submitCallback = (response) => {
        if (response.status == 200) {
            response.text().then(data => {
                console.log(data)
                var obj = questionData
                     obj.question = data
                    obj.questionType = typeImage?"2":"1"
          
                 
                setQuestionData(obj)
                setEditLoading(false)
                handleClose()
            })
        }
        else {
            console.log("error", response.status)
        }
    }

    const submitOpt1Callback = (response) => {
        if (response.status == 200) {
            response.text().then(data => {
                var obj = questionData
                obj.optionA = data
                obj.optionType=optTypeImage?"2":"1"
                setQuestionData(obj)
                if (optTypeImage) {
                    updateQuestion('file', 'optionB', id, null, editOpt2, '2', submitOpt2Callback);
                }
                else {
                    updateQuestion('text', 'optionB', id, editOpt2, null, '1', submitOpt2Callback);
                }
            })
        }
        else {
            console.log("error", response.status)
        }
    }

    const submitOpt2Callback = (response) => {
        if (response.status == 200) {
            response.text().then(data => {
                var obj = questionData
                obj.optionB = data
                obj.optionType=optTypeImage?"2":"1"
                setQuestionData(obj)
                if (optTypeImage) {
                    updateQuestion('file', 'optionC', id, null, editOpt3, '2', submitOpt3Callback);
                }
                else {
                    updateQuestion('text', 'optionC', id, editOpt3, null, '1', submitOpt3Callback);
                }
            })
        }
        else {
            console.log("error", response.status)
        }
    }
    const submitOpt3Callback = (response) => {
        if (response.status == 200) {
            response.text().then(data => {
                var obj = questionData
                obj.optionC = data
                obj.optionType=optTypeImage?"2":"1"
                
                setQuestionData(obj)
                if (optTypeImage) {
                    updateQuestion('file', 'optionD', id, null, editOpt4, '2', submitOpt4Callback)
                }
                else {
                    updateQuestion('text', 'optionD', id, editOpt4, null, '1', submitOpt4Callback);
                }
            })
        }
        else {
            console.log("error", response.status)
        }
    }
    const submitOpt4Callback = (response) => {
        if (response.status == 200) {
            response.text().then(data => {
                console.log(data)
                var obj = questionData
                obj.optionD = data
                obj.optionType=optTypeImage?"2":"1"
                setQuestionData(obj)
                setEditLoading(false)
                handleClose()
            })
            setEditLoading(false)
        }
        else {
            console.log("error", response.status)
        }
    }


    const handleSubmit = () => {
        if(!editLoading){
            setEditLoading(true)
            if (editQuestion) {
                if (typeImage) {
                    updateQuestion('file', 'question', id, null, question, '2', submitCallback)
                }
                else {
                    updateQuestion('text', 'question', id, question, null, '1', submitCallback)
                }
            }
            else if (editOption) {
                if (optTypeImage) {
                    updateQuestion('file', 'optionA', id, null, editOpt1, '2', submitOpt1Callback);
                }
                else {
                    updateQuestion('text', 'optionA', id, editOpt1, null, '1', submitOpt1Callback);
                }
            } else if (editQuestionDetails) {
                editTestSeriesQuestion(correctMarks, correctOpt, explanation, wrongMarks, id, submitTestSeriesCallback)
            }
        }
    }

    const submitTestSeriesCallback = (response) => {
        console.log(response);
        if (response.status == 200) {
            response.text().then(data => {
                var obj = questionData
                console.log(data)
                setQuestionData(obj)
                handleClose()
            })
        }
        else {
            console.log("error", response.status)
        }
    }

    


    // console.log(props.index)
    return (
        <div>
            <div className="card">
                <div className="card-body">
                    <div class="card-title">
                        <div className="form-row">
                            <div className="col-md-8">
                                <h6>Question {props.index + 1}</h6>
                            </div>
                            <div className="col-md-6">

                                <button className="btn btn-dark" style={{ margin: 2 }}
                                    onClick={() => { setEditModal(true); setEditQuestion(true); setQuestion(questionData.question); setTypeImage(questionData.questionType == '1' || questionData.questionType == '3' ? false : true) }}>
                                    QUESTION
                                </button>

                                <button className="btn btn-dark" style={{ margin: 2 }}
                                    onClick={() => { setEditModal(true); setEditOption(true); setOptTypeImage(questionData.optionType == '1' ? false : true); setEditOpt1(questionData.optionA); setEditOpt2(questionData.optionB); setEditOpt3(questionData.optionC); setEditOpt4(questionData.optionD); }}>
                                    OPTION
                                </button>

                                {/* <button className="btn btn-dark" style={{ margin: 2 }}
                                    onClick={() => { setEditModal(true); setEditCorrectOpt(true); setCorrectOpt(editTestSeriesQuestionData.correctOpt) }}>
                                    CORRECT OPTION
                                </button> */}

                                <button className="btn btn-dark" style={{ margin: 2 }}
                                    onClick={() => { setEditModal(true); setCorrectOpt(questionData.correctOpt); seteditQuestionDetails(true); setExplanation(questionData.explanation); setCorrectMarks(questionData.correctMarks); setWrongMarks(questionData.wrongMarks) }}>
                                    Question Details
                                </button>

                                {/* <button className="btn btn-dark" style={{ margin: 2 }}
                                    onClick={() => { setEditModal(true); setEditWrongMarks(true); setWrongMarks(editTestSeriesQuestionData.wrongMarks) }}>
                                    WRONG MARKS
                                </button>

                                <button className="btn btn-dark" style={{ margin: 2 }}
                                    onClick={() => { setEditModal(true); setEditExplanation(true); setExplanation(editTestSeriesQuestionData.explanation) }}>
                                    EXPLANATION
                                </button>*/}

                                <button className="btn btn-danger" style={{ margin: 2 }}
                                    onClick={() => props.deleteQue(props.index, questionData.id)}>
                                    DELETE
                                </button> 
                            </div>
                        </div>
                    </div>
                    <hr />
                    {questionData.questionType == '2' || questionData.questionType == '4' ? (
                        <div className="form-row">
                            <img src={serverBaseUrl + questionData.question} style={{ height: 200, width: 600 }} />
                        </div>
                    ) : (
                        questionData.questionType == '1' || questionData.questionType == '3' ? (
                            <div class="form-group row">
                                <div class="col-sm-12">
                                    <label>Question</label>
                                    {/* <textarea class="form-control" rows="3" cols="3" value={questionData.question} ></textarea> */}
                                    <div dangerouslySetInnerHTML={{__html :questionData.question}}/>
                                </div>
                            </div>
                        ) : (null)
                    )}
                    {questionData.optionType == '2' ? (
                        <div>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <label>Option A</label>
                                    <br />
                                    <img src={serverBaseUrl + questionData.optionA} style={{ height: 150, width: 400 }} />
                                </div>
                                <div className="col-md-6">
                                    <label>Option B</label>
                                    <br />
                                    <img src={serverBaseUrl + questionData.optionB} style={{ height: 150, width: 400 }} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-6">
                                    <label>Option C</label>
                                    <br />
                                    <img src={serverBaseUrl + questionData.optionC} style={{ height: 150, width: 400 }} />
                                </div>
                                <div className="col-md-6">
                                    <label>Option D</label>
                                    <br />
                                    <img src={serverBaseUrl + questionData.optionD} style={{ height: 150, width: 400 }} />
                                </div>
                            </div>
                            <br />
                        </div>
                    ) : (
                        <div>
                            <div class="form-row">
                                <div class="col-md-6 mb-3">
                                    <label for="validationCustom01">Option A</label>
                                    {/* <input type="text" class="form-control" id="validationCustom01" required value={questionData.optionA} /> */}
                                    <div dangerouslySetInnerHTML={{__html :questionData.optionA}}></div>
                                    
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="validationCustom02">Option B</label>
                                    {/* <input type="text" class="form-control" id="validationCustom02" required value={questionData.optionB} /> */}
                                    <div dangerouslySetInnerHTML={{__html :questionData.optionB}}></div>
                                    
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-md-6 mb-3">
                                    <label for="validationCustom01">Option C</label>
                                    {/* <input type="text" class="form-control" id="validationCustom01" required value={questionData.optionC} /> */}
                                    <div dangerouslySetInnerHTML={{__html :questionData.optionC}}></div>
                                    
                                </div>
                                <div class="col-md-6 mb-3">
                                    <label for="validationCustom02">Option D</label>
                                    {/* <input type="text" class="form-control" id="validationCustom02" required value={questionData.optionD} /> */}
                                    <div dangerouslySetInnerHTML={{__html :questionData.optionD}}></div>
                                    
                                </div>
                            </div>
                        </div>
                    )}

                    {/* <div class="form-row">
                        <div class="col-md-6 mb-3">
                            <label for="validationCustom01">Correct Marks</label>
                            <input type="text" class="form-control" id="validationCustom01" required value={questionData.correctMarks} />
                            <div class="valid-feedback">Looks good!</div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <label for="validationCustom02">Wrong Marks</label>
                            <input type="text" class="form-control" id="validationCustom02" required value={questionData.wrongMarks} />
                            <div class="valid-feedback">Looks good!</div>
                        </div>
                    </div> */}
                    <div class="form-row">
                    <div class="col-md-6 mb-3">
                            <label for="validationCustom01">Correct Option  </label>  {questionData.correctOpt}
                            {/* <input type="text" class="form-control" id="validationCustom01" required value={questionData.correctOpt} /> */}
                            
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-sm-12">
                            <label>Explanation</label>
                            <div dangerouslySetInnerHTML={{__html :questionData.explanation}}></div>
                        </div>
                    </div>
                </div>
            </div>
            {editModal ? (
                <Modal
                    size="lg"
                    show={editModal}
                    onHide={handleClose}
                    aria-labelledby="example-modal-sizes-title-lg"
                    style={{ zIndex: 10000 }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            {editOption ? ("EDIT OPTION") : ("EDIT QUESTION")}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Modal.Body>
                            {editQuestion ? (
                                <Form>
                                    <Form.Label className="mb-1">Question</Form.Label>
                                    {/* <Form.Group className="mb-3" id="formGridCheckbox">
                                        <Row>
                                            <Col md={6}>
                                                <Form.Check type="checkbox" label={"Question Type Image"} checked={typeImage ? (true) : (false)} onChange={() => setTypeImage(!typeImage)} />
                                            </Col>
                                        </Row>
                                    </Form.Group> */}
                                    {typeImage ? (
                                        <Form.Group className="mb-3">
                                            <Form.Control type="file" onChange={(e) => setQuestion(e.target.files[0])} required />
                                        </Form.Group>
                                    ) : (
                                        // <Form.Control as="textarea" rows={3} onChange={(e) => setQuestion(e.target.value)} defaultValue={question} required />
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
                                        data={question}
                                        onReady={editor => {
    
                                            console.log('Editor is ready to use!', editor);
                                        }}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            // setBlogContent(data)
                                            setQuestion(data)
                                        }}
                                        onBlur={(event, editor) => {
                                        }}
                                        onFocus={(event, editor) => {
                                        }}
                                    />
                                    )}
                                </Form>
                            ) : (
                                editOption ? (
                                    <div>
                                        
                                        {/* <Form.Group className="mb-3" id="formGridCheckbox">
                                            <Row>
                                                <Col md={6}>
                                                    <Form.Check type="checkbox" label={"Option Type Image"} checked={optTypeImage ? (true) : (false)} onChange={() => setOptTypeImage(!optTypeImage)} />
                                                </Col>
                                            </Row>
                                        </Form.Group> */}
                                        {optTypeImage ? (
                                            <>
                                                <Row>
                                                    <Form.Group
                                                        as={Col}
                                                        md="12"
                                                        className="position-relative"
                                                    >
                                                        <Form.Control 
                                                            required  type="file" 
                                                            onChange={(e) => {
                                                            setEditOpt1(e.target.files[0])
                                                            
                                                        }} />
                                                    </Form.Group>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Form.Group
                                                        as={Col}
                                                        md="12"
                                                        className="position-relative"
                                                    >
                                                        <Form.Control type="file" onChange={(e) => {
                                                            setEditOpt2(e.target.files[0])
                                                        }} />
                                                    </Form.Group>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Form.Group
                                                        as={Col}
                                                        md="12"
                                                        className="position-relative"
                                                    >
                                                        <Form.Control type="file" onChange={(e) => {
                                                            setEditOpt3(e.target.files[0])
                                                        }} />
                                                    </Form.Group>
                                                </Row>
                                                <br />
                                                <Row>
                                                    <Form.Group
                                                        as={Col}
                                                        md="12"
                                                        className="position-relative"
                                                    >
                                                        <Form.Control type="file" onChange={(e) => {
                                                            setEditOpt4(e.target.files[0])
                                                        }} />
                                                    </Form.Group>
                                                </Row>
                                                <br />
                                            </>
                                        ) : (
                                            <>
                                                <Row>
                                                    
                                                   <Form.Group
                                                        as={Col}
                                                        md="12"
                                                        className="position-relative"
                                                    >
                                                        <Form.Label className="mb-1">Option A</Form.Label>   
                                                    {/*      <Form.Control
                                                            type="text"
                                                            placeholder="Option 1"
                                                            onChange={(e) => setEditOpt1(e.target.value)}
                                                            defaultValue={editOpt1}
                                                            required
                                                        /> */}
                                                        
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
                                                                data={editOpt1}
                                                                onReady={editor => { 
                                                                    console.log('Editor is ready to use!', editor);
                                                                }}
                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    // setBlogContent(data)
                                                                    setEditOpt1(data)
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
                                                        md="12"
                                                        className="position-relative"
                                                    >
                                                        {/* <Form.Control
                                                            type="text"
                                                            placeholder="Option 2"
                                                            onChange={(e) => setEditOpt2(e.target.value)}
                                                            defaultValue={editOpt2}
                                                            required
                                                        /> */}
                                                        <Form.Label className="mb-1">Option B</Form.Label>   

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
                                                                data={editOpt2}
                                                                onReady={editor => { 
                                                                    console.log('Editor is ready to use!', editor);
                                                                }}
                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    // setBlogContent(data)
                                                                    setEditOpt2(data)
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
                                                        md="12"
                                                        className="position-relative"
                                                    >
                                                        {/* <Form.Control
                                                            type="text"
                                                            placeholder="Option 3"
                                                            onChange={(e) => setEditOpt3(e.target.value)}
                                                            defaultValue={editOpt3}
                                                            required
                                                        /> */}
                                                        <Form.Label className="mb-1">Option C</Form.Label>   
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
                                                                data={editOpt3}
                                                                onReady={editor => { 
                                                                    console.log('Editor is ready to use!', editor);
                                                                }}
                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    // setBlogContent(data)
                                                                    setEditOpt3(data)
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
                                                        md="12"
                                                        className="position-relative"
                                                    >
                                                        {/* <Form.Control
                                                            type="text"
                                                            placeholder="Option 4"
                                                            onChange={(e) => setEditOpt4(e.target.value)}
                                                            defaultValue={editOpt4}
                                                            required
                                                        /> */}
                                                        <Form.Label className="mb-1">Option D</Form.Label>   
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
                                                                data={editOpt4}
                                                                onReady={editor => { 
                                                                    console.log('Editor is ready to use!', editor);
                                                                }}
                                                                onChange={(event, editor) => {
                                                                    const data = editor.getData();
                                                                    // setBlogContent(data)
                                                                    setEditOpt4(data)
                                                                }}
                                                                onBlur={(event, editor) => {
                                                                }}
                                                                onFocus={(event, editor) => {
                                                                }}
                                                            />
                                                    </Form.Group>
                                                </Row>
                                                <br />
                                            </>
                                        )}
                                    </div>
                                ) : (

                                    editQuestionDetails ? (
                                        <Form>
                                            <Form.Label className="mb-1">Correct Option</Form.Label>
                                            <ButtonToolbar aria-label="Toolbar with button groups">
                                                <ButtonGroup className="me-2" aria-label="First group" style={{ border: '1px solid #4630EB', backgroundColor: theme.blueColor }} >
                                                    <Button
                                                        onClick={() => setCorrectOpt('A')}
                                                        style={{ backgroundColor: correctOpt == 'A' ? (theme.blueColor) : (theme.primaryColor), color: correctOpt == 'A' ? (theme.primaryColor) : (theme.secondaryColor), border: '1px solid #4630EB' }}
                                                    >
                                                        1
                                                    </Button>

                                                    <Button
                                                        onClick={() => setCorrectOpt('B')}
                                                        style={{ backgroundColor: correctOpt == 'B' ? (theme.blueColor) : (theme.primaryColor), color: correctOpt == 'B' ? (theme.primaryColor) : (theme.secondaryColor), border: '1px solid #4630EB' }}
                                                    >
                                                        2
                                                    </Button>

                                                    <Button
                                                        onClick={() => setCorrectOpt('C')}
                                                        style={{ backgroundColor: correctOpt == 'C' ? (theme.blueColor) : (theme.primaryColor), color: correctOpt == 'C' ? (theme.primaryColor) : (theme.secondaryColor), border: '1px solid #4630EB' }}
                                                    >
                                                        3
                                                    </Button>

                                                    <Button
                                                        onClick={() => setCorrectOpt('D')}
                                                        style={{ backgroundColor: correctOpt == 'D' ? (theme.blueColor) : (theme.primaryColor), color: correctOpt == 'D' ? (theme.primaryColor) : (theme.secondaryColor), border: '1px solid #4630EB' }}
                                                    >
                                                        4
                                                    </Button>
                                                </ButtonGroup>
                                            </ButtonToolbar>
                                            <br />
                                            <Row>
                                                
                                                <Form.Group
                                                    as={Col}
                                                    md="12"
                                                    className="position-relative"
                                                >
                                                    <Form.Label className="mb-1">Wrong Marks</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Wrong Marks"
                                                        onChange={(e) => { setWrongMarks(e.target.value) }}
                                                        defaultValue={wrongMarks}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <br />
                                            <Row>
                                                
                                                <Form.Group
                                                    as={Col}
                                                    md="12"
                                                    className="position-relative"
                                                >
                                                    <Form.Label className="mb-1">Correct Marks</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Correct Marks"
                                                        onChange={(e) => { setCorrectMarks(e.target.value) }}
                                                        defaultValue={correctMarks}
                                                        required
                                                    />
                                                </Form.Group>
                                            </Row>
                                            <br />
                                            <Row>
                                            <Form.Group className="mb-3" as={Col}
                                                    md="12" id="formGridCheckbox">
                                                <Form.Label className="mb-1">Explanation</Form.Label>
                                            
                                              {/*        <Form.Control as="textarea" defaultValue={explanation}
                                                        required onChange={(e) => { setExplanation(e.target.value) }} /> */}

                                                
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
                                            </Row>
                                        </Form>

                                    ) : (null)
                                ))}
                        </Modal.Body>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                            style={{ backgroundColor: theme.greyColor, color: theme.primaryColor }}
                            onClick={() => handleClose()}
                        >
                            Close
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            style={{ backgroundColor: theme.darkPurpleColor, marginLeft: 10, color: theme.primaryColor }}
                            onClick={() => handleSubmit()}
                        >
                            {editLoading ? (
                                <ClipLoader color="white" loading={editLoading} size={20} />
                            ) : ("Save Changes")}
                        </Button>
                    </Modal.Footer>
                </Modal>
            ) : (null)}


                                



        </div>
    )


}

export default SingleQuestion