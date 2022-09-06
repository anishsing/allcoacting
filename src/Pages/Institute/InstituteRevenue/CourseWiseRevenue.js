import React, { useState, useEffect }from 'react'
import {getInsRevenueCourseData} from '../../../api/revenue'
import ExportToExcel from '../../Dashboard/ExportToExcel'
import RevData from './RevData'

import ClipLoader from "react-spinners/ClipLoader";
function CourseWiseRevenue(props) {
    const {insId} = props   
    const [courseData, setCourseData] = useState([]) 
    const [studentData, setStudentData] = useState([]) 
    const [offset, setOffset] = useState(0) 
    
    const [exportLoading,setExportLoading]= useState(false)
    
    useEffect(() => {getInsRevenueCourseData(insId,getInsRevenueCourseDataCallBack)},[insId])

    const getInsRevenueCourseDataCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                console.log("course rev data", data)
                setCourseData(data)
            })
        }
    }

    

    return(
        <div className="card">
          <div className="card-body">
              <div className="row">
                  <div className="ml-3 ">
                      <h5>Course Wise Revenue</h5>
                  </div>
                  {courseData.length?(<div className="ml-auto mr-1">
                    <button className="btn btn-primary" onClick={()=>setExportLoading(true)}> 
                        {exportLoading?(
                            <ClipLoader size={20} loading={exportLoading} color="#fff"/>
                        ):("Export Enrolled Students")}
                        </button>
                    </div>):(null)}
                  {exportLoading?(
                      <ExportToExcel 
                        stopLoadingInParent={setExportLoading}
                      />
                  ):(null)}
              </div>
            {courseData&&courseData.map((row, index) => (
              <div id="accordion1" class="accordion">
                  <div className="card-header collapsed" data-toggle="collapse" href={"#collapse"+index}>	
                      <a className="card-title">
                          {row.course.title}
                      </a>
                  </div>
                  <div id={"collapse"+index} className="card-body collapse" data-parent="#accordion1">
                      <RevData courseId={row.course.id} todayRevenue={row.todayRevenue} totalRevenue={row.totalRevenue}/>
                  </div>
                </div>
            ))}
          </div>
        </div>
    )
}
export default CourseWiseRevenue
