import React, { useState, useEffect } from 'react';
import { adminRevenueCategoryWise, getOverAllRevenueCount, getInsDataCategoryWise } from '../../api/dashboard'
import { fetchRevenueCountInstituteWise } from '../../api/revenue'
import {Image,  Shimmer } from 'react-shimmer'
import Leads from '../Analytics/Leads'
import Revenue from '../Analytics/Revenue'
import { useSelector } from 'react-redux'
import CourseWiseRevenue from '../Institute/InstituteRevenue/CourseWiseRevenue'
import RevenueModeWiseGraph from '../Institute/InstituteRevenue/RevenueModeWiseGraph'
 const Dashboard = props => {

  const [todayCount, setTodayCount]= useState("")
  const [totalCount, setTotalCount]= useState("")
  const [categoryData, setCategoryData]= useState([])
  const [insData, setInsData]= useState([])
  const [showInsShimmer, setShowInsShimmer]= useState(true)
  const [showCategoryShimmer, setShowCategorySimmer]= useState(true)
  const [showCountShimmer, setshowCountShimmer]= useState(true)
  const insDetails = useSelector((state) => state.ins.insDetails)
  let insId = insDetails.id

  useEffect(()=>{
    fetchRevenueCountInstituteWise(insId, fetchRevenueCountInstituteWiseCallBack)
  },[])

  const fetchRevenueCountInstituteWiseCallBack=(response) => {
    if(response.status==200)
    {
      response.json().then(data =>{
        setTodayCount(data.today)
        setTotalCount(data.total)
        setshowCountShimmer(false)
      })
    }
    else
    {
      console.log("rev count", response.status)
    }
  }

  const getInsDataCategoryWiseCallBack=(response) => {
    if(response.status==200)
    {
      response.json().then(data =>{
        setShowInsShimmer(false)
        setInsData(data)
      })
    }
    else
    {
      console.log("insdataCategory", response.status)
    }
  }

    return(
      <div>
        {showCountShimmer?(
          <Shimmer width={'100%'} height={'10%'}/>
        ):(<div className="row">
          <div className="col-12 col-lg-6">
            <div className="card radius-15">
              <div className="card-body">
                <div className="media align-items-center">
                  <div className="media-body">
                    <h4 className="mb-0 font-weight-bold">{todayCount?(todayCount):(0)}</h4>
                    <p className="mb-0">Today's Revenue</p>
                  </div>
                  <div className="widgets-icons bg-light-primary text-primary rounded-circle"><i className='bx bx-poll'></i>
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
                    <h4 className="mb-0 font-weight-bold">{totalCount?(totalCount):(0)}</h4>
                    <p className="mb-0">Total Revenue</p>
                  </div>
                  <div className="widgets-icons bg-light-success text-success rounded-circle"><i className='bx bx-detail'></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>)}

        <Leads />
        <CourseWiseRevenue insId={insId}/>
        <RevenueModeWiseGraph insId={insId}/>
      </div>)
      
    }
export default Dashboard  