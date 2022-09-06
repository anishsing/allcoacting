import React ,{useState, useEffect }from 'react' 
import { ImageResolver, serverBaseUrl } from '../..'
import { fetch_instituteDetails } from '../../api/institute'
import { fetchRevenueOverview } from '../../api/revenue';
import InstituteAccountDetails from './InstituteAccountDetails/InstituteAccountDetails'

// import InstituteCourse from './InstituteCourses/InstituteCourse'
import InstituteReviews from './InstituteReviews/InstituteReviews'
import InstituteLeads from './InstituteLeads/InstituteLeads'
import InstituteRevenue from './InstituteRevenue/InstituteRevenue'
import CourseRevenueAnalytics from './InstituteRevenue/CourseRevenueAnalytics';
import RevenueModeWiseGraph from './InstituteRevenue/RevenueModeWiseGraph';
import RevenueCount from './InstituteRevenue/RevenueCount';
import CourseWiseRevenue from './InstituteRevenue/CourseWiseRevenue';
import LeadsCount from './InstituteLeads/LeadsCount';
import LeadsGraph from './InstituteLeads/LeadsGraph';
import { Link, useHistory } from "react-router-dom"

import {Image,  Shimmer } from 'react-shimmer'

import { useSelector } from 'react-redux'


function InstituteView(props) {

    const insDetails = useSelector((state) => state.ins.insDetails)
    let instituteId = insDetails.id
    const [institute,setInstitute] = useState({})
    const [activeTab,setActiveTab] = useState('reviews')
    const history = useHistory();
    const [revenue, setRevenue] = useState({})
    const [showShimmer, setShowShimmer] = useState(true)

    useEffect(() =>{
        fetch_instituteDetails(instituteId,(response)=>
        {
            if(response.status==200)   
            {
                 response.json().then(data=>{
                     setInstitute(data);
                     setShowShimmer(false)
                 })
            }
        })
    },[instituteId])

    

    const renderTabContent=(activeTab ,insId) => {

        switch(activeTab)
        {
            case 'courses':
                    // return(<InstituteCourse insId={insId}/>)
     
            case 'reviews':
                return(<InstituteReviews insId={insId}/>)
              
            case 'leads':
                return(
                <div>
                    <br />
                    <LeadsCount insId={insId}/>
                    <LeadsGraph insId={insId}/>
                    <InstituteLeads insId={insId}/>
                </div>)
                break;
            case 'analytics':
                return(<div>
                    <br/>
                    <RevenueCount insId={insId}/>
                    <CourseWiseRevenue insId={insId}/>
                    <CourseRevenueAnalytics insId={insId} />
                    <RevenueModeWiseGraph insId={insId}/>
                    <InstituteRevenue insId={insId}/>
    
                </div>)
                break;
            case 'acc_details':
                return(<InstituteAccountDetails insId={insId}/>)
                break;
    
    
        }
    }
    
    return (
        <div> 
            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                {/* <div class="breadcrumb-title pr-3">Institute View</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div> */}
                <div class="ml-auto">
                    <div class="btn-group">
                        <Link to="/InstituteEdit" class="btn btn-info mr-1">Change Institute Details</Link>
                        <button type="button" class="btn btn-dark" style={{marginRight: 5}} onClick={() => history.goBack()}>Go Back</button>
                    </div>
                </div>
            </div>  
            <div className="user-profile-page">
                <div className="card radius-15">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-lg-7 border-right">
                                <div className="d-md-flex align-items-center">
                                    <div className="mb-md-0 mb-3">
                                        <img src={ImageResolver(institute.logo)} className="rounded-circle shadow" width="130" height="130" alt="" id="userImage"/>
                                    </div>
                                    <div className="ml-md-4 flex-grow-1" style={{marginLeft: 20}}>
                                        <div className="d-flex align-items-center mb-1">
                                            <h4 className="mb-0" id="username">{institute.name}</h4>
                                        </div>
                                        <p className="mb-0 text-muted" id="userStatus">{institute.directorName} {institute.uniqueUserId?"@"+institute.uniqueUserId:""}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-5">
                                <table className="table table-sm table-borderless mt-md-0 mt-3">
                                    <tbody>
                                        <tr>
                                            <th>Phone:</th>
                                            <td id="likes">
                                                {showShimmer?(
                                                    <Shimmer width={200} height={20} /> 
                                                ):(
                                                    <>
                                                    {institute.phone}
                                                    </>
                                                )}
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Email:</th>
                                            <td id="comments">
                                            {showShimmer?(
                                                <Shimmer width={'40%'} height={20} /> 
                                            ):(
                                                <>
                                                {institute.email}
                                                </>
                                            )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Address:</th>
                                            <td id="postedOn">
                                                {showShimmer?(
                                                    <Shimmer width={'100%'} height={40} />
                                                ):(
                                                    <>
                                                    {institute.address}
                                                    </>
                                                )}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>About:</th>
                                            <td id="postedOn">
                                            {showShimmer?(
                                                <Shimmer width={'100%'} height={80} />
                                            ):(
                                              <>
                                              {institute.about}
                                              </>
                                            )}
                                            </td>  
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <button type="button" className={activeTab=="reviews"?"btn btn-success mr-1":"btn btn-primary mr-1" } onClick={()=>{setActiveTab('reviews')}}>
                    Reviews
                </button>
                <button  type="button" className={activeTab=="acc_details"?"btn btn-success mr-1":"btn btn-primary mr-1" } onClick={()=>{setActiveTab('acc_details')}}>
                    Account Details
                </button>
                <button  type="button" className={activeTab=="leads"?"btn btn-success mr-1":"btn btn-primary mr-1" } onClick={()=>{setActiveTab('leads')}}>
                    Leads
                </button>
                <button type="button" className={activeTab=="analytics"?"btn btn-success mr-1":"btn btn-primary mr-1" } onClick={()=>{setActiveTab('analytics')}}>
                    Revenue
                </button>

            </div>
            {renderTabContent(activeTab,instituteId)}

        </div>
    )
}

export default InstituteView
