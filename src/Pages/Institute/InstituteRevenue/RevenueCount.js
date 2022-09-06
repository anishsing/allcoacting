import React, { useState, useEffect }from 'react'
import {fetchRevenueCountInstituteWise, getInsRevenueCourseData} from '../../../api/revenue'
import { Shimmer } from 'react-shimmer'

function RevenueCount(props) {
    const {insId,revenue} = props   
    const [todayCount, setTodayCount] = useState("") 
    const [totalCount, setTotalCount] = useState("") 
    const [loading, setLoading]=useState(true)
    
    useEffect(() => {
            fetchRevenueCountInstituteWise(insId, fetchRevenueCountInstituteWiseCallBack);
            getInsRevenueCourseData(insId, getInsRevenueCourseDataCallBack)
    },[insId])

    const fetchRevenueCountInstituteWiseCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                setTotalCount(data.total)
                setTodayCount(data.today)
            })
        }
        else
        {
            
        }
    }
    const getInsRevenueCourseDataCallBack=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>{
                console.log("course rev data", data)
            })
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-12 col-lg-6">
                    <div className="card radius-15">
                        <div className="card-body">
                            <div className="media align-items-center">
                                <div className="media-body">
                                    <h4 className="mb-0 font-weight-bold">{totalCount?(totalCount):(0)}</h4>
                                    <p className="mb-0">Total<br/>Revenue</p>
                                </div>
                                <div className="widgets-icons bg-light-success text-success rounded-circle"><i className='bx bx-detail'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="card radius-15">
                        <div className="card-body">
                            <div className="media align-items-center">
                                <div className="media-body">
                                    <h4 className="mb-0 font-weight-bold">{todayCount?(todayCount):(0)}</h4>
                                    <p className="mb-0">Today's<br/>Revenue</p>
                                </div>
                                <div className="widgets-icons bg-light-primary text-primary rounded-circle"><i className='bx bx-poll'></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RevenueCount
