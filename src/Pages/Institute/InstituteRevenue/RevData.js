import React, { useState, useEffect } from 'react'
import { fetch_courseTransactions } from '../../../api/transaction'
import { dataLimit } from '../../../index'
import {getStudentCount } from '../../../api/Courses'

function RevData(props) {

    const {courseId, totalRevenue, todayRevenue}= props
    const [studentData, setStudentData] = useState([]) 
    const [offset, setOffset] = useState(0) 
    const [studentCount,setStudentCount] = useState('')

    const fetch_courseTransactionsCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                console.log("studentdata", data)
                setStudentData(data)
            })
        }
    }

    useEffect(() =>{
        fetch_courseTransactions(courseId, offset, dataLimit, fetch_courseTransactionsCallBack);
        getStudentCount(courseId, studentCountCallBack)
    },[courseId])

    const studentCountCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                setStudentCount(data)
                console.log("stu",data)
            })
        }
        else
        {
            console.log("student",response.status)
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-12 col-lg-4">
                    <div className="card radius-15">
                        <div className="card-body">
                            <div className="media align-items-center">
                                <div className="media-body">
                                    <h4 className="mb-0 font-weight-bold">{todayRevenue ? (todayRevenue) : (0)}</h4>
                                    <p className="mb-0">Today's Revenue</p>
                                </div>
                                <div className="widgets-icons bg-light-primary text-primary rounded-circle"><i className='bx bx-poll'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="card radius-15">
                        <div className="card-body">
                            <div className="media align-items-center">
                                <div className="media-body">
                                    <h4 className="mb-0 font-weight-bold">{totalRevenue ? (totalRevenue) : (0)}</h4>
                                    <p className="mb-0">Total Revenue</p>
                                </div>
                                <div className="widgets-icons bg-light-success text-success rounded-circle"><i className='bx bx-detail'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4">
                    <div className="card radius-15">
                        <div className="card-body">
                            <div className="media align-items-center">
                                <div className="media-body">
                                    <h4 className="mb-0 font-weight-bold">{studentCount ? (studentCount) : (0)}</h4>
                                    <p className="mb-0">Enrolled Students</p>
                                </div>
                                <div className="widgets-icons bg-light-danger text-danger rounded-circle"><i className='bx bx-user'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-bordered mb-0" id="table1">
                    <thead className="thead-dark">
                        <tr>
                            <th align="center">#</th>
                            <th align="center">Name</th>
                            <th align="center">Mobile</th>
                            <th align="center">Email</th>
                            <th align="center">Status</th>
                            <th align="center">Transaction Id</th>
                        </tr>
                    </thead>
                    {studentData && studentData.map((item, i) => (
                        <tbody>
                            <td>{i + 1}</td>
                            <td>{item.student.name}</td>
                            <td>{item.student.mobileNumber}</td>
                            <td>{item.student.email}</td>
                            <td>{item.transaction.status}</td>
                            <td>{item.transaction.gatewayTransactionId}</td>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>

    )
}

export default RevData