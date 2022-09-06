import React from 'react'
import { useState, useEffect } from 'react'
import { deleteCourse, editCourses, fetch_institute_courses, add_institute_courses, deleteCoursePermanently } from '../../api/Courses'
import {theme } from '../../index'
import CourseRow from './CourseRow'
import { Image, Shimmer } from 'react-shimmer'
import { useSelector } from 'react-redux'
import { Link, useHistory } from "react-router-dom"
import Modal, { ModalBody, ModalHeader, ModalFooter } from '../../components/modal/modal'
import Snackbar from '@material-ui/core/Snackbar';
import {useParams} from 'react-router'
import ClipLoader from "react-spinners/ClipLoader";
import { addStudent, enrollStudent } from '../../api/Student'
function InstitueCourse(props) {


    const [courses, setCourses] = useState([])
    const [addCourses, setAddCourses] = useState([])
    const [showShimmer, setShowShimmer] = useState(true)
    const [isCourseModalVisible, setIsCourseModalVisible] = useState(false);
    const [title, setTitle] = useState();
    const [fees, setFees] = useState();
    const [description, setDescription] = useState();
    const [index, setIndex] = useState();
    const [id, setId] = useState();
    const [courseId, setCourseId] = useState();
    const [mode, setMode] = useState('');
    const insDetails = useSelector((state) => state.ins.insDetails)
    let insId = insDetails.id
    const {isDeleted}=useParams();
    const history = useHistory();
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const[delLoading, setDelLoading] = useState(false)
    const[addLoading, setAddLoading] = useState(false)
    const [addStudentModalVisible,setAddStudentModalVisible]  = useState(false);
    const [studentName,setStudentName] = useState("")
    const [studentEmail, setStudentEmail]= useState("")
    const [studentMobileNumber, setStudentMobileNumber]= useState("")
    const [stateOfStudent, setStateOfStudent]= useState("")
    const [addStudentLoading,setAddStudentLoading] = useState(false)
    const [studentCourse, setStudentCourse] = useState(null)
    const indianStates = [ 
        "Andaman and Nicobar Islands",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Ladakh",
        "Lakshadweep",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Puducherry",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ]

    const addCoursesCallback = (response) => {
        setAddLoading(false)
        if (response.status === 201) {
            let courseId = response.headers.get('location')
            console.log(courseId)
            var obj = {
                description: description,
                fees: fees,
                id: courseId,
                instId: insId,
                leads: 0,
                title: title,
            }
            let coursesLocal = [...courses];
            coursesLocal.push(obj)
            setIsCourseModalVisible(false);
            setCourses(coursesLocal);
            setSnackBarMessage("Course Added Successfully")
            setIsSnackBarShow(true)

        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
        setIsCourseModalVisible(false)
    }
    const addCourse = () => {
        if (window.confirm("Are You Sure You Want To Add?")) {
            setAddLoading(true)
            add_institute_courses(insId, title, fees, description, addCoursesCallback)
        }
    }


    useEffect(() => {
        setShowShimmer(true)
        fetch_institute_courses(insId, isDeleted,coursesCallBack)
    }, [insId,isDeleted])

    const coursesCallBack = (response) => {
        setShowShimmer(false)
        if (response.status === 200) {
            response.json().then((data) => {
                
                    console.log("courses data")
                    console.log(data)
                    setCourses(data) 
            })
        }
    }

    const delCourse = (id,status, index,mode,loaderFun) => { 
        if (window.confirm("Are you sure you want to delete?")) {
            if(loaderFun)
            {
                loaderFun();
            }
            
            if(mode=="permanently")
            {
                deleteCoursePermanently(id, (response) => deleteCourseCallBack(response, index))
            }else
            {
                deleteCourse(id,status, (response) => deleteCourseCallBack(response, index))
            }
            
        }
    }

    const deleteCourseCallBack = (response, index) => {
        setDelLoading(false)
        if (response.status === 200) {
            let arr = [...courses]
            arr.splice(index, 1)
            setCourses(arr)
            setSnackBarMessage("Course Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else {
                setSnackBarMessage("Something went wrong")
                setIsSnackBarShow(true)
            
            console.log("unable to delete");
        }
    }

    const editCourseDetails = () => {
        if (window.confirm("Are You Sure You Want To Edit?")) {
            setAddLoading(true)
            editCourses(insId, title, fees, description, courseId, editCourseCallBack)
        }
    }

    const editCourseCallBack = (response) => {
        setAddLoading(false)
        if (response.status === 201) {
            let arr = [...courses]
            arr[index] = {
                description: description,
                fees: fees,
                id: courseId,
                instId: insId,
                leads: 0,
                title: title,
            }
            setCourses(arr)
            setSnackBarMessage("Course Details Updated Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
        setIsCourseModalVisible(false)
    }

    const setEditValues=(id, title, description, fees, index)=>{
        setMode('edit'); setTitle(title); setDescription(description); setFees(fees); setCourseId(id); setIndex(index); setIsCourseModalVisible(true)
    }

    const setAddValues=()=>{
        setMode('add'); setTitle(''); setDescription(''); setFees(''); setCourseId(''); setIndex(''); setIsCourseModalVisible(true)
    }
const setEditDetails=(title,description,fees, index, id)=>
{
        setTitle(title)
        setDescription(description)
        setFees(fees)
        setIndex(index)
        setCourseId(id)
}
const editHandler =()=>
{
    mode == "add" ? (addCourse()) : (editCourseDetails())
}

const closeSnack=()=>{
    setIsSnackBarShow(false)
}

const addStudentBtnHandler=(e)=>
{
    e.preventDefault()
        setAddStudentLoading(true)
    addStudent(studentEmail,studentName,stateOfStudent,studentMobileNumber,(response)=>{

        if(response.status == 201)
        {
            if(studentCourse)
            {
                const studentId = response.headers.get('location')

                enrollStudent(studentId,studentCourse,insDetails.id,(response)=>{
                    if(response.status == 201)
                    {
                        setAddStudentModalVisible(false)
                        setIsSnackBarShow(true)
                        setSnackBarMessage("Student Added Successfully")    
                        setStudentName("")
                        setStudentEmail("")
                        setStateOfStudent("")
                        setStudentCourse("")
                        setStudentMobileNumber("")
                    }
                })
            }else
            {
                setIsSnackBarShow(true)
                setSnackBarMessage("Student Added Successfully But Failed To Add Course")    
            }
            setAddStudentLoading(false)


        }else
        {

            response.json().then(data =>{
                if(data.message?.includes("ConstraintViolationException"))
                {
                    setSnackBarMessage("Email or Mobile Number Already Exists")
                }else
                {
                    setSnackBarMessage("Something went wrong")
                }
                setAddStudentLoading(false)
                setIsSnackBarShow(true) 
            })
            
        }
    })
     
}

    return (
        <div>
            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="ml-auto">
                    <div class="btn-group">
                        <button type="button" class="btn btn-dark" style={{ marginRight: 5 }} onClick={() => history.goBack()}>Go Back</button>
                        {isDeleted!="true"?( 
                                <button type="button" class="btn btn-danger" style={{ marginRight: 5 }} onClick={() => setAddValues()}>Add Course</button>
                        ):(null)}
                        {isDeleted!="true"?( 
                                <button type="button" class="btn btn-danger" style={{ marginRight: 5 }} onClick={() => setAddStudentModalVisible(true)}>Add Student</button>
                        ):(null)}
                        
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                {/* <div class="table-responsive">

                    <table class="table table-striped table-bordered mb-0" id="table1">
                        <thead class="thead-dark">
                            <tr>
                                <th align="center">#</th>
                                <th align="center">Title</th>
                                <th align="center">Fees</th>
                                <th align="center">Students Enrolled</th>
                                <th align="center">Actions</th>
                            </tr>
                        </thead>
                        <tbody> */}
                            {showShimmer ? (
                                <>
                                    <div className="col-12 col-lg-4 col-md-4 col-sm-4" style={{width: '100%'}}>
                                        <Shimmer width={'100%'} height={40} />
                                    </div>
                                    <div className="col-12 col-lg-4 col-md-4 col-sm-4" style={{width: '100%'}}>
                                        <Shimmer width={'100%'} height={40} />
                                    </div>
                                </>
                            ) : (
                                <>
                                    {courses.map((row, i) => (
                                        <CourseRow row={row} index={i} setEditDetails={setEditDetails} delCourse={delCourse} setIsCourseModalVisible={setIsCourseModalVisible} setMode={setMode} setEditCourseId={setCourseId} delLoading={delLoading}/>
                                    ))}
                                </>
                            )}

                        {/* </tbody>
                    </table> 
                </div>*/}
            </div>

            <Modal
                visible={isCourseModalVisible}
                setModalVisible={setIsCourseModalVisible}
                modalId={"courseModal"}
            >
                <ModalHeader>
                    <h5 className="modal-title">{mode=="add"?("Add Course"):("Edit Course")}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <form >
                        <div className="form-row">
                            <label>Title</label>
                            <input className="form-control" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-row">
                            <label>Fees (To make course available to all put fees as 0 INR)</label>
                            <input className="form-control" value={fees} placeholder="Fees" onChange={(e) => setFees(e.target.value)} />
                        </div>
                        {/* <div className="form-row">
                            <label>Description</label>
                            <input className="form-control" value={description} placeholder="Description " onChange={(e) => setDescription(e.target.value)} />
                        </div> */}
                    </form>
                </ModalBody>
                <ModalFooter>

                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={() =>editHandler()}>{addLoading?(<ClipLoader color={theme.primaryColor}   loading={addLoading}     />):(mode == "add" ? ("Add Course") : ("Edit Course"))}</button>

                </ModalFooter>
            </Modal>
            
            <Modal
                visible={addStudentModalVisible}
                setModalVisible={setAddStudentModalVisible}
                modalId={"addStudentModal"}
            >
            <form  onSubmit={addStudentBtnHandler}>
                <ModalHeader>
                    <h5 className="modal-title">{"Add Student"}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>
                   
                        <div className="form-row">
                            <label>Name of Student</label>
                            <input required  className="form-control" value={studentName} placeholder="Name" onChange={(e) => setStudentName(e.target.value)} />
                        </div>
                        <div className="form-row">
                            <label>Email of Student</label>
                            <input required className="form-control" value={studentEmail} placeholder="email" onChange={(e) => setStudentEmail(e.target.value)} />
                        </div>
                        <div className="form-row">
                            <label>Mobile Number of Student</label>
                            <input required className="form-control" value={studentMobileNumber} placeholder="Mobile Number" onChange={(e) => setStudentMobileNumber(e.target.value)} />
                        </div>
                        <div className="form-row">
                            <label>State of Student</label>
                            <select required class=" form-control" onChange={(e) => setStateOfStudent(e.target.value)} value={stateOfStudent}>
                                <option value={-1}>Select State</option>
                                {indianStates.map((item) => (
                                    <option value={item}>{item}</option>
                                ))}
                            </select>
                        </div> 
                        <div className="form-row">
                            <label>Select Course to Enroll</label>
                            <select required class=" form-control" onChange={(e) => setStudentCourse(e.target.value)} value={studentCourse}>
                                <option value={-1}>Select Course</option>
                                {courses.map((item) => (
                                    <option value={item.id}>{item.title}</option>
                                ))}
                            </select>
                        </div> 
                        {/* <div className="form-row">
                            <label>Description</label>
                            <input className="form-control" value={description} placeholder="Description " onChange={(e) => setDescription(e.target.value)} />
                        </div> */}
                    
                </ModalBody>
                <ModalFooter>

                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button  className="btn btn-primary" >{addStudentLoading?(<ClipLoader color={theme.primaryColor}   loading={addStudentLoading}     />):( "Add Student")}</button>

                </ModalFooter>
                </form>
            </Modal>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div>
    )
}

export default InstitueCourse
