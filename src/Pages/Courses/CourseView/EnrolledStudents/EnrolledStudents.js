import React, { useState, useEffect } from 'react'
import { dataLimit,theme } from '../../../../index'
import {fetch_studentList, findStudentByName, findStudentByEmail} from '../../../../api/Student'
import ClipLoader from "react-spinners/ClipLoader";

import Snackbar from '@material-ui/core/Snackbar';
import RenderSingleStudent from './RenderSingleStudent'
import {Image,  Shimmer } from 'react-shimmer'
import ExportToExcel from '../../../Dashboard/ExportToExcel';


export default function EnrolledStudents(props) {
    const { activeCourse } = props;
    const [studentData, setStudentData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [showShimmer, setShowShimmer] = useState(true)
    const [blockStatus,setBlockStatus] = useState(-1);
    const [studentSearchBy, setStudentSearchBy] = useState("ByName")
    const [studentSearchValue, setStudentSearchValue] = useState("")
    const [studentDataSearchBy, setStudentDataSearchBy] = useState([])
    const [showDataSearchBy, setShowDataSearchBy] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [exportLoading,setExportLoading]= useState(false)
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
 

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }

    const fetchStudentCallback=(response) =>{
        if(response.status==200){
            response.json().then(data=>{
                console.log('getting all student data', data)
                setStudentData(data)
                setShowShimmer(false)
            })
        }
    }

    useEffect(()=>{
        fetch_studentList(activeCourse, offset, dataLimit, fetchStudentCallback)
    
    },[offset,blockStatus])
   
    const deleteAtIndex=(index)=>
    {
        let studentData_local = [...studentData] 
        studentData_local.splice(index, 1); 
        setStudentData(studentData_local)
    }

    useEffect(()=>{console.log("updated student data",studentData)},[studentData])

    const findStudentByCallback=(response)=>{
        if(response.status==200){
            response.json().then(data => {
                console.log("getting search data", data)
                setStudentDataSearchBy(data)
               
            })
        }
        setShowDataSearchBy(true)
        setShowShimmer(false)
        setLoading(false)
    }

    const action4SearchStudent=()=>{

        if(studentSearchValue!='')
        {
            setShowShimmer(true)
            setLoading(true)
    
            // if(studentSearchBy == "ByName"){
                // alert('Search by name')
                setStudentDataSearchBy(studentData.filter(student=>student.studentName.toLowerCase().includes(studentSearchValue.toLowerCase())))
                // findStudentByName(studentSearchValue, offset, dataLimit, findStudentByCallback)
            // } else if(studentSearchBy == "ByEmail"){
                // alert('Seach by Email')
                // findStudentByEmail(studentSearchValue, offset, dataLimit, findStudentByCallback)
            // }
            setShowDataSearchBy(true)
            setShowShimmer(false)
            setLoading(false)
        }else
        {
            setSnackBarMessage("Please Type A word to search")
            setIsSnackBarShow(true);
        }
        
    }


    return (
        <>
            <br/>
            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Enrolled Students</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item">
                                <a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="ml-auto">
                    <button type="button" class="btn btn-primary" onClick={(e)=>setExportLoading(true)}>Export</button>
                    {exportLoading?(
                      <ExportToExcel
                        stopLoadingInParent={setExportLoading}
                        mode={"course"}
                        courseId={activeCourse}
                      />
                  ):(null)}
                </div>
            </div>

            <div>
                <div className="row mt-3">
                    <div className="col-lg-4 col-md-6 col-12 d-flex mb-4">
                        <input type="text" className="form-control mr-3" onChange={(e)=> setStudentSearchValue(e.target.value)} placeholder="Search Student" />
                   
                        <div class="btn-group">
                            {isLoading?(
                                 <button type="button" class="btn btn-primary px-5">
                                     <ClipLoader color={"white"} size={18} />
                                 </button>
                            ):(
                                <button type="button" class="btn btn-primary" onClick={(e)=>action4SearchStudent()} >Search  </button>
                            )}
                            
                            {/* <button type="button" class="btn btn-primary bg-split-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">
                            	<span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
                                <a class="dropdown-item" href="javascript:;" onClick={() => setStudentSearchBy("ByName")}>Name</a>
                                <a class="dropdown-item" href="javascript:;" onClick={() => setStudentSearchBy("ByEmail")}>Email</a>
                            </div> */}
                        </div>

                    </div>
                   
                      
                </div>
                        {showDataSearchBy?(
                            <div className="mb-2">
                            <button className="btn btn-light" style={{cursor: 'pointer'}} onClick={()=>setShowDataSearchBy(false)}>Clear Search x</button>
                            </div>
                        ):(null)}
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
					    <table class="table table-striped table-bordered mb-0" id="table1">
							<thead class="thead-dark">
                                <tr>
                                    <th>#</th>   
                                    <th>Name</th>
                                    <th>Email</th> 
                                    <th>Phone</th> 
                                    {/* <th align="center">Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>

                            {showShimmer?(
                                <td colspan="6">
                                  <Shimmer width={'100%'} height={40} /> 
                                </td>
                            ):(
                            <>
                            {showDataSearchBy ?(
                                <>
                                {studentDataSearchBy&&studentDataSearchBy.map((row, i) => (
                                    <RenderSingleStudent row={row} index={i} deleteAtIndex={deleteAtIndex}/>
                                ))}
                                {studentDataSearchBy <= 0?(
                                    <td align="center" colspan="6">
                                        No data found, Try with another keyword.
                                    </td>
                                ):(null)}
                                </>
                            ):(
                                <>
                                {studentData&&studentData.map((row, i) => (
                                    <RenderSingleStudent row={row} index={i} deleteAtIndex={deleteAtIndex}/>
                                ))}
                                </>
                            )}
                            
                            </>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </>
    )
}
