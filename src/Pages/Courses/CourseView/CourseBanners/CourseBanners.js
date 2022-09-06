import React from 'react'
import { useState } from 'react'
import { useEffect, useRef } from 'react'
import { fetch_courses_banners, addBanner, deleteBanner } from '../../../../api/banners';
import { getCourseDetailsById, editCourses } from '../../../../api/Courses';
import CourseBannerRow from './CourseBannerRow';
import {Image,  Shimmer } from 'react-shimmer'
import {serverApiUrl, theme} from '../../../../index'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../../components/modal/modal';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build';
import Snackbar from '@material-ui/core/Snackbar';
import ClipLoader from "react-spinners/ClipLoader";
 
function CourseBanners(props) {
    const {activeCourse,setAllowRedirect} = props
    const [courseBaneers,setCourseBanners] = useState([]);
    const [courseDetails,setCourseDetails] = useState({});
    const [loadingBanners,setLoadingBanners] = useState(true)
    const [imageFile,setImageFile] = useState('')
    const [imagePreview, setImagePreview] = useState('')
    const [aboutCourse, setAboutCourse] = useState('')
    const [editAboutCourse, setEditAboutCourse] = useState('')
    const [mode, setMode] = useState('')
    const [showShimmer, setShowShimmer] = useState(true)
    const [isAddEditModalVisible,setIsAddEditModalVisible] = useState(false);
    const [isAboutCourseModalVisible,setIsAboutCourseModalVisible] = useState(false);
    let fileRef= useRef(null);
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [addLoading, setAddLoading] = useState(false)
    const [addCourseLoading, setAddCourseLoading] = useState(false)
    const [delLoading, setDelLoading] = useState(false);


 useEffect(() => {
    fetch_courses_banners(activeCourse, courseBannerCallback)
    getCourseDetailsById(activeCourse, courseDetailsCallback)
 },[activeCourse])
     


    const courseDetailsCallback=(response) => {
        if(response.status==200)
        {
            response.json().then(data=>{
                console.log(data)
                setCourseDetails(data)
                setAboutCourse(data.description)
            })
        }
    }

    const courseBannerCallback=(response)=>
    {
        if(response.status==200)
        {
                response.json().then(data=>
            { 
                console.log(data)
                    setCourseBanners(data)
                    setLoadingBanners(false)
                    setShowShimmer(false)
            })
            
        }
    }

    const delBanner=(id, index)=>{     
        if(window.confirm("Are you sure you want to delete?"))
        {
            setDelLoading(id)
           deleteBanner(id, (response)=>deleteCallBack(response,index))
        }
    }

    const deleteCallBack=(response,index)=>{
        setDelLoading(false)
        if(response.status==200)
        { 
            const arr = [...courseBaneers]
            arr.splice(index,1)
            setCourseBanners(arr)
            setSnackBarMessage("Banner Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else
        {
            console.log("unable to delete");
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
    }

    const onAddSubmitHandler=(e) => {
        if(!addLoading){
            e.preventDefault(); 
            setAddLoading(true)
            setAllowRedirect(false)
            addBanner(imageFile, activeCourse, addBannerCallBack)
        }
    }
    const onEditSubmitHandler=(e) => {
        if(!addLoading){
            e.preventDefault(); 
            console.log("gee")
            setAddLoading(true)
            // addBanner(imageFile, activeCourse, addBannerCallBack)
        }
    }

    const addBannerCallBack=(response)=>{
        setAddLoading(false)
        setAllowRedirect(true)
        if(response.status==201)
        {
            var arr=response.headers.get('location').split('*')
            var obj={
                id: arr[0],
                bannerImageLink: arr[1],
                courseId: activeCourse
            }
            var bannerArr=[...courseBaneers]
            bannerArr.push(obj)
            setCourseBanners(bannerArr)
            setSnackBarMessage("Added Successfully")
            setIsSnackBarShow(true)
        }
        else
        {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log(response.status)
        }
        setIsAddEditModalVisible(false)
    }

    const tiggerClickOnFile=()=>
    {
            fileRef.click();
    }

    const fileOnChange=(event)=>
    {
        var url = URL.createObjectURL(event.target.files[0]);
        setImagePreview(url)
        setImageFile(event.target.files[0])
    }

    const setEditDetails=(link)=>{
        setImagePreview(link); setMode('edit'); setIsAddEditModalVisible(true)
    }
    const setAddDetails=()=>{
        setImagePreview(''); setMode('add'); setIsAddEditModalVisible(true)
    }

    const onAboutCourseSubmitHandler=(e)=>{
        e.preventDefault()
        if(!addCourseLoading){
           
            if (window.confirm("Are You Sure You Want To Edit?")) {
                setAddCourseLoading(true)
                editCourses(courseDetails.instId, courseDetails.title, courseDetails.fees, editAboutCourse, courseDetails.id, editCourseCallBack)
            }
        }
    }

    const editCourseCallBack = (response) => {
        setAddCourseLoading(false)
        if (response.status === 201) {
            var obj = editAboutCourse
            setAboutCourse(obj)
            setSnackBarMessage("Updated Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
        setIsAboutCourseModalVisible(false)
    }


    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }

    return ( 
        <div>

            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="ml-auto">
                    <div class="btn-group">
                        <button type="button" class="btn btn-danger" style={{marginRight: 5}} onClick={()=>setAddDetails()}>Add</button>
                    </div>
                </div>
            </div> 
            <div className="mt-3">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered mb-0" id="table1">
                        <thead class="thead-dark">
                            <tr>
                                <th align="center">#</th>
                                <th align="center">Banner</th> 
                                <th align="center">Actions</th> 
                            </tr>
                        </thead>
                        <tbody>
                        {showShimmer?(
                                <td colspan="3">
                                    <Shimmer width={'100%'} height={40} /> 
                                </td>
                            ):(
                                <>
                            {courseBaneers.map((row, i) => (
                                    <CourseBannerRow row={row} index={i} delBanner={delBanner} setEditDetails={setEditDetails} delLoading={delLoading==row.id}/>
                            ))}
                            </>
                            )}

                        </tbody>
                    </table>
                </div>
                <br/>
                <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                    <div class="breadcrumb-title pr-3">About Course</div>
                    <div class="pl-3">
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb mb-0 p-0">
                                <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    
                </div> 
                <div className="card">
                    <div className="card-body">
                        <div className="col-12 col-lg-12">
                            <form onSubmit={onAboutCourseSubmitHandler}>  
                                <label>Course Description</label>
                                <CKEditor
                                    editor={ ClassicEditor }
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
                                    data={aboutCourse}
                                    onReady={ editor => {
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        setEditAboutCourse(data)
                                    }}
                                    onBlur={ ( event, editor ) => { 
                                    } }
                                    onFocus={ ( event, editor ) => { 
                                    } }
                                />
                                <br/>
                                <button    className="btn btn-primary">
                                    {addCourseLoading?(
                                        <ClipLoader color={theme.primaryColor}   loading={addCourseLoading} />
                                    ):("Save Changes")}
                                </button>
                            </form>                       
                        </div>
                    </div>
                </div>
            </div> 
            <Modal
            visible={isAddEditModalVisible} 
            setModalVisible={setIsAddEditModalVisible} 
            modalId={"testAddEditModal"} 
            >
                <form onSubmit={mode== "add"?(onAddSubmitHandler):(onEditSubmitHandler)}>
                    <ModalHeader>
                        <h5 className="modal-title">{mode== "add"?("Add Banner"):("Edit Banner")}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>   
                    <ModalBody> 
                    
                                        
                        <div className="form-row">
                            <div className="col-6 col-lg-6"    >
                                <label>Banner Image </label>
                                <input className="form-control"  type="file" ref={ref =>fileRef=ref} onChange={(e)=>{fileOnChange(e)}} style={{visibility:'hidden'}}/>
                                <button type="button" className="btn btn-primary" onClick={tiggerClickOnFile} >Choose Image</button>
                            </div>
                            <div className="col-6 col-lg-6">                                
                                <img src={imagePreview?imagePreview:"http://placehold.it/200/200"} className="img-responsive w-25 h-25" />
                            </div>                            
                        </div>
                        
                        
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button   className="btn btn-primary">
                            {addLoading?(
                                <ClipLoader color={theme.primaryColor} loading={addLoading}     />
                            ):(mode== "add"?("Add Banner"):("Edit Banner"))}
                        </button>
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

export default CourseBanners
