import React, { useEffect, useRef, useState } from "react";
import ReactExport from "react-export-excel";
import { useSelector } from "react-redux";
import { getInstituteCourseWiseStudentEnrolled, getStudentEnrolledInCourse } from "../../api/Courses";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
 

function ExportToExcel({stopLoadingInParent,mode,courseId}) {

    const insDetails = useSelector((state) => state.ins.insDetails)
   

    const calledStopLoadingInParent = useRef(false)

    const [loading,setLoading] = useState(true)
    const [data,setData] = useState([])
    useEffect(() =>{ 
        setLoading(true)
        if(mode=="course")
        {
          getStudentEnrolledInCourse(courseId,(response)=>{
            if(response.status==200)
            {
              response.json().then(data=>{ 
                setData(data)
              })
            }
          })

        }else
        {
            getInstituteCourseWiseStudentEnrolled(insDetails.id,(response)=>{
              if(response.status == 200)
              {
                response.json().then(data=>{
                  console.log(data) 
                  setData(data)
                })
              }
            })
        }
        
    },[])

    useEffect(() =>{
        if(data.length > 0)
        {
            setLoading(false) 
            startLoaderTimeout()
        }
    },[data])


    
    const startLoaderTimeout=()=>
    {
      setTimeout(() => {
          if(stopLoadingInParent&&!calledStopLoadingInParent.current)
          {
              calledStopLoadingInParent.current=true

              console.log("called stop")
              stopLoadingInParent(false)
          }
          
          // setError("")
      },2000)
    }
  return (
      loading?(<></>):(

        <ExcelFile hideElement>
            <ExcelSheet data={data} name="students">
                <ExcelColumn label="Student Name" value="name"/>
                <ExcelColumn label="Email" value="email"/>
                <ExcelColumn label="Mobile Number" value="mobileNumber"/> 
                <ExcelColumn label="Course Name" value="courseName"/> 
            </ExcelSheet> 
        </ExcelFile>
      )
  
  )
}

export default ExportToExcel