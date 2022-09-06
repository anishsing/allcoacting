import React, { useState, useEffect } from 'react'
import { dataLimit } from '../../../..';
import { deleteSubject, deleteSubjectItem, fetch_courses_timetable, addSubject, addSubjectItem } from '../../../../api/timetable';
import Modal, { ModalBody, ModalHeader, ModalFooter } from '../../../../components/modal/modal'
import { useSelector } from 'react-redux'
import CourseTimeTableRow from './CourseTimeTableRow';
import { Image, Shimmer } from 'react-shimmer'
import Snackbar from '@material-ui/core/Snackbar';
import moment from 'moment';

function CourseTimeTable(props) {


    const { activeCourse,timeTableCount,setTimeTableCount } = props;
    const [timeTable, setTimeTable] = useState([])
    const [mode, setMode] = useState();
    const [name, setName] = useState();
    const [index, setIndex] = useState();
    const [title, setTitle] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [subTitle, setSubTitle] = useState();
    const [subjectId, setSubjectId] = useState();
    const [isCourseTimeTableModalVisible, setIsCourseTimeTableModalVisible] = useState(false);
    const [isCourseTableModalVisible, setIsCourseTableModalVisible] = useState(false);
    const [courseTimeTableListLoaded, setCourseTimeTableListLoaded] = useState(false);
    const [isCourseTimeTableListLoading, setIsCourseTimeTableListLoading] = useState(true);
    const [offset, setOffset] = useState(0)
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()
    const [showShimmer, setShowShimmer] = useState(true)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [delLoading, setDelLoading] = useState(false);
    const insDetails = useSelector((state) => state.ins.insDetails)
    let insId = insDetails.id

    useEffect(() => {
        fetch_courses_timetable(activeCourse, offset, dataLimit, courseTimeTableCallback)
    }, [activeCourse])

    useEffect(() => {
        if (!allDataLoaded) {
            fetch_courses_timetable(activeCourse, offset, dataLimit, courseTimeTableCallback)
        }
        console.log("offset",offset)
    }, [offset])

    const courseTimeTableCallback = (response) => {
        console.log(response.status)
        if (response.status == 200) {
            response.json().then(data => {

                if (data.length == dataLimit) {
                    setTimeTable(data)
                    setShowNextButton(true)
                }
                else if (data.length < dataLimit) {
                    console.log("else")
                    console.log(data.length)
                    if (data.length == 0) {
                        if(offset==0)
                        {
                            setOffset(0)
                        }else
                        {
                            setOffset(offset-1)
                        }
                    }
                    else if (data.length != 0) {
                        setTimeTable(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                setTimeTable(data)
                console.log(data)
                setIsCourseTimeTableListLoading(false)
                setCourseTimeTableListLoaded(true)
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


    const courseTimeTableSubjectCallback = (response) => {
        if (response.status === 201) {
            setTimeTableCount(timeTableCount+1)
            var arr = [...timeTable]    
            var obj = {
                id: response.headers.get('location'),
                courseId: activeCourse,
                name: name,
                courseTimeTableItem: []
            }
            arr.push(obj)
            setTimeTable(arr)
            setSnackBarMessage("Subject Added Successfully")
            setIsSnackBarShow(true)
        } else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
        setIsCourseTableModalVisible(false)
    }

    const addCourseSubject = () => {
        if (window.confirm("Are You Sure You Want To Add?")) {
            addSubject(activeCourse, name, courseTimeTableSubjectCallback)
        }
    }

    const courseTimeTableSubjectItemCallback = (response) => {
        console.log(response.status)
        if (response.status === 201) {
            console.log(response.headers.get('location'))
            var arr = [...timeTable]
            var obj = {
                insId: insId,
                title: title,
                subTitle: subTitle,
                date: date,
                time: time,
                subjectId: subjectId,
            }
            arr[index].courseTimeTableItem.push(obj)
            setTimeTable(arr)
            setSnackBarMessage("Subject Item Added Successfully")
            setIsSnackBarShow(true)
        }
        setIsCourseTimeTableModalVisible(false)
    }

    const addCourseSubjectItem = () => {
        if (window.confirm("Are You Sure You Want To Add?")) {
            console.log(time," time table time")
            addSubjectItem(date, time, subjectId, insId, subTitle, title, courseTimeTableSubjectItemCallback)
        }
    }

    const deleteCourseTimeTableSubject = (id, index, parentIndex, type) => {
        if (window.confirm("Are you sure you want to delete?")) {
            setDelLoading(id)
            if (type == "item") {
                deleteSubjectItem(id, (response) => deleteItemCallBack(response, index, parentIndex))
            }
            else {
                deleteSubject(id, (response) => deleteSubjectCallBack(response, index))
            }
        }
    }

    const deleteItemCallBack = (response, index, parentIndex) => {
        if (response.status == 200) {
            const arr = [...timeTable]
            delete arr[parentIndex].courseTimeTableItem[index];
            setTimeTable(arr)
            setSnackBarMessage("Subject Item Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
        setDelLoading(false)
    }

    const deleteSubjectCallBack = (response, index) => {
        if (response.status == 200) {
            setTimeTableCount(timeTableCount-1)
            const arr = timeTable.slice()
            delete arr[index];
            setTimeTable(arr)
            setSnackBarMessage("Subject Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log("unable to delete", response.status);
        }
        setDelLoading(false)
    }

    const editHandler = () => {
        (addCourseSubjectItem())
    }

    const closeSnack = () => {
        setIsSnackBarShow(false)
    }

    return (
        <div>
            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="ml-auto">
                    <div class="btn-group">
                        <button type="button" class="btn btn-danger" style={{ marginRight: 5 }} onClick={() => { console.log("Clicked", isCourseTableModalVisible); setIsCourseTableModalVisible(true) }}>Add</button>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                {timeTable.map((item, index) => (
                    <div id="accordion1" class="accordion">
                        <div className="card-header collapsed" data-toggle="collapse" href={"#collapse" + index}>
                            <a className="card-title">
                                {item.name}
                            </a>
                        </div>
                        <div id={"collapse" + index} className="card-body collapse" data-parent="#accordion1">
                            <div className="table-responsive">
                                <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                                    <div class="ml-auto">
                                        <div class="btn-group">
                                            <button type="button" class="btn btn-dark" style={{ marginRight: 5 }} onClick={() => deleteCourseTimeTableSubject(item.id, index, 0, "subject")}>DELETE SUBJECT</button>
                                            <button type="button" class="btn btn-danger" style={{ marginRight: 5 }} onClick={() => { setMode("add"); setIndex(index); setIsCourseTimeTableModalVisible(true); setSubjectId(item.id) }}>ADD</button>
                                        </div>
                                    </div>
                                </div>
                                <table className="table table-striped table-bordered mb-0" id="table1">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th align="center">#</th>
                                            <th align="center">Chapter</th>
                                            <th align="center">Teacher Name</th>
                                            <th align="center">Date</th>
                                            <th align="center">Time</th>
                                            <th align="center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {showShimmer ? (
                                            <td colspan="6">
                                                <Shimmer width={'100%'} height={40} />
                                            </td>
                                        ) : (
                                            <>
                                                {item.courseTimeTableItem.map((row, i) => (
                                                    <CourseTimeTableRow delSubject={deleteCourseTimeTableSubject} parentIndex={index} row={row} index={i} setIsCourseTimeTableModalVisible={setIsCourseTimeTableModalVisible} setMode={setMode}delLoading={delLoading==row.id}/>
                                                ))}
                                            </>
                                        )}

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                ))}
                <Modal
                    visible={isCourseTimeTableModalVisible}
                    setModalVisible={setIsCourseTimeTableModalVisible}
                    modalId={"courseTimeTableModal"}
                >
                    <ModalHeader>
                        <h5 className="modal-title">{mode == "add" ? ("Add Chapter") : ("Edit Chapter")}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <form >
                            <div className="form-row">
                                <label>Chapter</label>
                                <input className="form-control" placeholder="Chapter" onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="form-row">
                                <label>Teacher Name</label>
                                <input className="form-control" placeholder="Teacher Name" onChange={(e) => setSubTitle(e.target.value)} />
                            </div>
                            <div className="form-row">
                                <label>Date</label>
                                <input type="date" className="form-control" placeholder="Date" onChange={(e) => setDate(e.target.value)} />
                            </div>
                            <div className="form-row">
                                <label>Time</label>
                                <input type="time" className="form-control" placeholder="Time" onChange={(e) => setTime(moment(e.target.value,"H:m").format("h:m A"))} />
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>

                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => editHandler()}>{mode == "add" ? ("Add Subject") : ("Edit Subject")}</button>

                    </ModalFooter>
                </Modal>


                <Modal
                    visible={isCourseTableModalVisible}
                    setModalVisible={setIsCourseTableModalVisible}
                    modalId={"courseTableModal"}
                >
                    <ModalHeader>
                        <h5 className="modal-title">Add Subject</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>
                    <ModalBody>
                        <form >
                            <div className="form-row">
                                <label>Title</label>
                                <input className="form-control" placeholder="Title" onChange={(e) => setName(e.target.value)} />
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>

                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => addCourseSubject()}>Add</button>

                    </ModalFooter>
                </Modal>
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
                onClose={(e) => closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div>
    )
}

export default CourseTimeTable
