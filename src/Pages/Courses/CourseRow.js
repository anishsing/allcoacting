import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import {theme } from '../../index'
import ClipLoader from "react-spinners/ClipLoader";
import { getStudentCount } from '../../api/Courses';

function CourseRow(props) {
    const { row, index, delCourse, editCourse, setIsCourseModalVisible, setMode, setEditCourseId ,setEditDetails} = props
    const [title, setTitle] = useState(row.title);
    const [description, setDescription] = useState(row.description);
    const [fees, setFees] = useState(row.fees);
    const [leads, setLeads] = useState(row.leads);
    const [courseId, setCourseId] = useState(row.id);
    const [delLoading, setDelLoading] = useState(false);
    const [studentCount,setStudentCount] = useState(0);
    const cardBackgroundClasses = ["bg-rose","bg-primary","bg-info"];
    const currentCourseCardColor = cardBackgroundClasses[index%cardBackgroundClasses.length];
    useEffect(()=>{
        setDelLoading(props.delLoading)
    },[props.delLoading])

    useEffect(()=>{
        getStudentCount(row.id,response=>{
            if(response.status == 200)
            {
                response.json().then(data=>{
                    console.log(data," student Count of course")
                    setStudentCount(data)
                })
            }
        })
    },[row])
    const editHandler=(index)=>
    {
        setMode("edit"); 
        setIsCourseModalVisible(true); 
        setEditDetails(title,description,fees, index, row.id)
    }
    
    return (
        <div className="col-10 col-lg-3 col-md-3 col-sm-3 d-flex align-items-center mb-3" style={{flexDirection:'column'}}>

                <div  className={"m-1 w-100 py-2 "+currentCourseCardColor}style={{borderRadius:15,alignItems: 'center',justifyContent: 'center',display: 'flex',flexDirection: 'column'}}>
                    <h3 style={{color:'white'}}>{row.title}</h3>
                    <p style={{color:'white',fontWeight:'bold'}}>Fee - {row.fees}</p>
                    <p style={{color:'white',fontWeight:'bold'}}>Enrolled - {studentCount}</p> 
                </div>
                <div className="d-flex row align-items-center justify-content-between">
                    {row.deleted?(
                        <>
                        <div className="col-3">
                            <button aria-label="delete" onClick={() => {delCourse(courseId,false, index,'temporary',()=>setDelLoading("temporary"))}} className="btn btn-success ">
                            {delLoading=="temporary"?(
                                <ClipLoader color={theme.primaryColor}   loading={delLoading}     />
                            ):("Recover")}
                            </button>
                        </div> 
                         <div className="col-3" style={{display: "flex",justifyContent: "center"}}>
                         <button aria-label="delete" onClick={() => {delCourse(courseId,true, index,'permanently',()=>setDelLoading("permanently"))}} className="btn btn-danger">
                             {delLoading=="permanently"?(
                                 <ClipLoader color={theme.primaryColor}   loading={delLoading}     />
                             ):("Delete")}
                         </button>
                        </div>
                     </>
                    ):(
                        <>
                            <div className="col-3" style={{display: "flex",justifyContent: "flex-start"}}>
                                <button aria-label="edit" onClick={() => editHandler(index)}className="btn btn-success  px-2 py-0">
                                    EDIT
                                </button>
                            </div>
                            <div className="col-3" style={{display: "flex",justifyContent: "center"}}>
                                <button aria-label="delete" onClick={() => {setDelLoading(true); delCourse(courseId,true, index)}} className="btn btn-danger  px-2 py-0">
                                    {delLoading?(
                                        <ClipLoader color={theme.primaryColor}   loading={delLoading}     />
                                    ):("Delete")}
                                </button>
                            </div>
                            <div className="col-3" style={{display: "flex",justifyContent: "flex-end"}}>
                                <Link to={"/ins/course/courseview/"+courseId+"/"+encodeURIComponent(title)} aria-label="view" className="btn btn-primary px-2 py-0">
                                    VIEW
                                </Link>
                            </div>
                        </> 
                    )}
                    
                </div>












            {/* <td>{index + 1}</td>
            <td>{row.title}</td>
            <td>{row.fees}</td>
            <td>{studentCount}</td>
            <td>
                
                {row.deleted?(
                    <button aria-label="delete" onClick={() => {setDelLoading(true); delCourse(courseId,false, index)}} className="btn btn-success mr-1">
                        {delLoading?(
                            <ClipLoader color={theme.primaryColor}   loading={delLoading}     />
                        ):("Recover")}
                    </button>
                ):(
                    <>
                        <button aria-label="edit" onClick={() => editHandler(index)}className="btn btn-success mr-1">
                            EDIT
                        </button>
                        <button aria-label="delete" onClick={() => {setDelLoading(true); delCourse(courseId,true, index)}} className="btn btn-danger mr-1">
                            {delLoading?(
                                <ClipLoader color={theme.primaryColor}   loading={delLoading}     />
                            ):("Delete")}
                        </button>
                        <Link to={"/ins/course/courseview/"+courseId+"/"+title} aria-label="view" className="btn btn-primary">
                            VIEW
                        </Link>
                    </>

                )}
                
                
            </td> */}
        </div>
    )
}

export default CourseRow
