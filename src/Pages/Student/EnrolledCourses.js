import React, { useState, useEffect } from 'react'
import {fetch_student_purchase} from '../../api/student'
import {dataLimit, serverBaseUrl} from '../../index'

    

export default function EnrolledCourses(props) {


    const [offset, setOffset] = useState(0)
    const [purchase, setPurchase] = useState([])

    const purchaseCallback =(response)=>{
        if(response.status==200){
            response.json().then(data => {
                console.log('getting purchage history...')
                setPurchase(data)
            })
        }
    }

    useEffect(()=>{
        fetch_student_purchase(props.userId, offset, dataLimit, purchaseCallback)
    },[offset])



    return (
        <>
           <div className="mt-4">
                <h2>Enrollments Courses</h2>

                {purchase.map((row, i) => (
                    
                    <div className="row align-items-center justify-content-center mt-4 p-3 bg-light">
                        <div className="col-lg-5">
                            <div className="text-center">
                                <img src={serverBaseUrl+row.insImage} className="img-fluid" alt="" style={{maxHeight:200}}/>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <h4>{row.insName}</h4>
                            <div>
                                <button className="btn btn-outline-success">{row.courseName}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div> 
        </>
    )
}
