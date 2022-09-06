import React,{useState, useEffect} from 'react'
import CourseBanners from './CourseBanners/CourseBanners'
import CourseDocument from './CourseDocument/CourseDocument'
import CourseTestSeries from './CourseTestSeries/CourseTestSeries'
import CourseTimeTable from './CourseTimeTable/CourseTimeTable'
import CourseTransaction from './CourseTransactions/CourseTransaction'
import CourseVideo from './CourseVideo/CourseVideo'
import EnrolledStudents from './EnrolledStudents/EnrolledStudents'
import { getDocumentCount, getVideoCount, getTestSeriesCount, getBannerCount,getStudentCount, getTimeTableCount } from '../../../api/Courses'
import { Link, useHistory } from "react-router-dom"
import { Shimmer } from 'react-shimmer'
import CourseLiveVideo from './CourseLiveVideos/CourseLiveVideo'
import YTStreamKeyUi from './CourseLiveVideos/YTStreamKeyUi'

import { Prompt } from 'react-router'


function CourseView(props) {
    let activeCourse = props.match.params.id
    let courseName = decodeURIComponent(props.match.params.name)
    const [activeTab,setActiveTab] = useState(null)
    const [docCount,setDocCount] = useState('')
    const [videoCount,setVideoCount] = useState('')
    const [tsCount,setTsCount] = useState('')
    const [bannerCount,setBannerCount] = useState('')
    const [studentCount,setStudentCount] = useState('')
    const [docCountLoading,setDocCountLoading] = useState(true)
    const [studentCountLoading,setStudentCountLoading] = useState(true)
    const [vidCountLoading,setVidCountLoading] = useState(true)
    const [tsCountLoading,setTsCountLoading] = useState(true)
    const [timeTableCountLoading,setTimeTableCountLoading] = useState(true)
    const [timeTableCount,setTimeTableCount] = useState(0)
    const [allowRedirect,setAllowRedirect] = useState(true)
    const [processing, setProcessing] = useState(false)
    const [progress, setProgress] = useState(0)
    const [testseriesCountingLoading,setTestseriesCountingLoading] = useState(true)
    const history = useHistory();
    const [liveVideoCount,setLiveVideoCount] = useState(0)
    useEffect(() => {
        getDocumentCount(activeCourse, docCountCallBack)
        getVideoCount(activeCourse,"offline", videoCountCallBack)
        getVideoCount(activeCourse,"live", liveVideoCountCallBack)
        getTestSeriesCount(activeCourse, tsCountCallBack)
        getBannerCount(activeCourse, bannerCountCallBack)
        getStudentCount(activeCourse, studentCountCallBack)
        getTimeTableCount(activeCourse, timeTableCallBack)
    },[activeCourse])

    const timeTableCallBack=(response)=>
    {
        setTimeTableCountLoading(false)
        if(response.status==200)
        {
            response.json().then(data=>{

                setTimeTableCount(data)
            })
            
        }
    }

    const docCountCallBack=(response)=>{
        setDocCountLoading(false)
        if(response.status==200)
        {
            response.json().then(data=>{
                setDocCount(data)
            })
        }
        else
        {
            console.log(response.status)
        }
    }

    const videoCountCallBack=(response)=>{
        setVidCountLoading(false)
        if(response.status==200)
        {
            response.json().then(data=>{
                setVideoCount(data)
            })
        }
        else
        {
            console.log(response.status)
        }
    }
    const liveVideoCountCallBack=(response)=>{
        setVidCountLoading(false)
        if(response.status==200)
        {
            response.json().then(data=>{
                setLiveVideoCount(data)
            })
        }
        else
        {
            console.log(response.status)
        }
    }

    const tsCountCallBack=(response)=>{
        setTsCountLoading(false)
        if(response.status==200)
        {
            response.json().then(data=>{
                setTsCount(data)
            })
        }
        else
        {
            console.log(response.status)
        }
    }
    const bannerCountCallBack=(response)=>{
        setTestseriesCountingLoading(false)
        if(response.status==200)
        {
            response.json().then(data=>{
                setBannerCount(data)
            })
        }
        else
        {
            console.log(response.status)
        }
    }
    const studentCountCallBack=(response)=>{
        setStudentCountLoading(false)
        if(response.status==200)
        {
            response.json().then(data=>{
                setStudentCount(data)
            })
        }
        else
        {
            console.log("student",response.status)
        }
    }

    useEffect(()=>{
            if(activeTab)
            {
                localStorage.setItem(activeCourse+"activeTab",activeTab)
            }
            
    },[activeTab])

    useEffect(()=>{
        const tab = localStorage.getItem(activeCourse+"activeTab")
        console.log(tab," tab value")
        if(tab&&tab!="null")
        {
            setActiveTab(tab)
        }else
        {
            setActiveTab("videos")
        }
    },[])

    const renderTabContent=(activeTab ,activeCourse) => {
        console.log(activeTab)
        switch(activeTab)
        {
            case 'banners':
                    return(<CourseBanners setAllowRedirect={setAllowRedirect} activeCourse={activeCourse}/>)
     
            case 'videos':
                return(<CourseVideo activeCourse={activeCourse} setProgressInParent={setProgress} setProcessingInParent={setProcessing} setAllowRedirect={setAllowRedirect} setVideoCount={setVideoCount} videoCount={videoCount} />)
            case 'liveVideos':
                return(<YTStreamKeyUi activeCourse={activeCourse} setAllowRedirect={setAllowRedirect} setLiveVideoCount={setLiveVideoCount} liveVideoCount={liveVideoCount}/>)
              
            case 'documents':
                console.log("doc")
                return(
                    <CourseDocument setProgressInParent={setProgress} setProcessingInParent={setProcessing} activeCourse={activeCourse} setAllowRedirect={setAllowRedirect} setDocCount={setDocCount} docCount={docCount}  />
                )
                break;
            case 'testseries':
                return <CourseTestSeries setAllowRedirect={setAllowRedirect} activeCourse={activeCourse}  />
                break;
            case 'timetable':
                return(<CourseTimeTable setAllowRedirect={setAllowRedirect} activeCourse={activeCourse} setTimeTableCount={setTimeTableCount} timeTableCount={timeTableCount}/>)
            case 'enrolledStudents':
                return(<EnrolledStudents setAllowRedirect={setAllowRedirect} activeCourse={activeCourse} />)
        }
    }
    return (
        <div>
              <Prompt
                when={!allowRedirect}
                message='You have unsaved changes, are you sure you want to leave?'
                />
            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">{courseName}</div>
                <div class=" breadcrumb-title breadcrum-button pr-1 pl-1">
                    <nav aria-label="breadcrumb">
                        {/* <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                             <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol> */}
                        <a href="javascript:;" style={activeTab=="enrolledStudents"?{color:"#0056b3"}:null} onClick={()=>{setActiveTab('enrolledStudents')}}> Enrolled Students</a>
                       
                    </nav>
                </div>
                <div class="breadcrumb-title breadcrum-button pr-1 pl-1">
                    
                  <nav aria-label="breadcrumb"> 
                    <a href="javascript:;" style={activeTab=="banners"?{color:"#0056b3"}:null} onClick={()=>{setActiveTab('banners')}}> About Course & Banner</a>     
                    </nav>
                </div>
                {/* <div class="breadcrumb-title breadcrum-button pr-1 pl-1"> 
                    <nav aria-label="breadcrumb"> 
                        <a href="javascript:;"  style={activeTab=="videos"?{color:"#0056b3"}:null} onClick={()=>{setActiveTab('videos')}}> Videos</a> 
                    </nav>
                </div>
                 <div class="breadcrumb-title breadcrum-button pr-1 pl-1"> 
                    <nav aria-label="breadcrumb"> 
                     <a href="javascript:;" style={activeTab=="documents"?{color:"#0056b3"}:null} onClick={()=>{setActiveTab('documents')}}> Document</a>
                        
                    </nav>
                </div>
                <div class="breadcrumb-title breadcrum-button pr-1 pl-1"> 
                    <nav aria-label="breadcrumb"> 
                        
                        <a href="javascript:;" style={activeTab=="testseries"?{color:"#0056b3"}:null} onClick={()=>{setActiveTab('testseries')}}> Test Series</a>
                    </nav>
                </div>
                <div class="breadcrumb-title breadcrum-button pr-1 pl-1"> 
                    <nav aria-label="breadcrumb">  
                        
                        <a href="javascript:;" style={activeTab=="timetable"?{color:"#0056b3"}:null} onClick={()=>{setActiveTab('timetable')}}>  Time Table</a>
                    </nav>
                </div> */}
                <div class="breadcrumb-title breadcrum-button pr-1 pl-1"> 
                    <nav aria-label="breadcrumb">   
                        <Link to={"/studentChat/"+activeCourse} onClick={()=>{setActiveTab('timetable')}}>  Chat</Link>
                    </nav>
                </div>
                <div class="ml-auto">
                    <div class="btn-group">
                        <button type="button" class="btn btn-dark" style={{marginRight:0}} onClick={() => history.goBack()}>Go Back</button>
                    </div>
                </div>
            </div>
            <div className="row">
            {processing ? (
                            <div className="progress mt-3 w-100" style={{ height: 30 }}> 
                                <div className="progress-bar bg-success"
                                            role="progressbar" style={{ width: progress+"%" }}
                                             
                                            aria-valuenow={progress} aria-valuemin="0"
                                            aria-valuemax="100">
                                </div>
                                <span style={{color:'black',position:"absolute",left:'48%' , marginTop: 12}}>{progress} %</span>
                                 
                            </div>
                         ):(
                            null
                        )} 
                <div className="col-12 col-lg-2 pr-0 pl-0 m-2">
                    <div className="card radius-15">
                        <div className="card-body" style={activeTab=='liveVideos'?{borderWidth:1,borderColor:'#673ab7',borderStyle:'solid',borderRadius:15}:{}}>
                            {vidCountLoading?(
                                <Shimmer width={'100%'} height={40} />
                            ):( 
                                
                                <a href="javascript:;" onClick={()=>{setActiveTab('liveVideos')}} className="media align-items-center">
                                    <div className="media-body">
                                        <h4 className="mb-0 font-weight-bold">{liveVideoCount}</h4>
                                        <p className="mb-0">Live Video</p>
                                    </div>
                                    <div className="widgets-icons bg-light-success text-success rounded-circle"><i className='bx bx-video-plus'></i>
                                    </div>
                                </a> 
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-2 pr-0 pl-0 m-2">
                    <div className="card radius-15">
                        <div className="card-body" style={activeTab=='videos'?{borderWidth:1,borderColor:'#673ab7',borderStyle:'solid',borderRadius:15}:{}}>
                            {vidCountLoading?(
                                <Shimmer width={'100%'} height={40} />
                            ):( 
                                
                                <a href="javascript:;"  onClick={()=>{setActiveTab('videos')}} className="media align-items-center">
                                    <div className="media-body">
                                        <h4 className="mb-0 font-weight-bold">{videoCount}</h4>
                                        <p className="mb-0">Video</p>
                                    </div>
                                    <div className="widgets-icons bg-light-success text-success rounded-circle"><i className='bx bx-video-plus'></i>
                                    </div>
                                </a> 
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-2 pr-0 pl-0 m-2">
                    <div className="card radius-15">
                        <div className="card-body" style={activeTab=='documents'?{borderWidth:1,borderColor:'#673ab7',borderStyle:'solid',borderRadius:15}:{}}>
                            {docCountLoading?(
                                <Shimmer width={'100%'} height={40} />
                            ):( 
                                <a onClick={()=>{setActiveTab('documents')}} href="javascript:;"  className="media align-items-center">
                                    <div className="media-body">
                                        <h4 className="mb-0 font-weight-bold">{docCount}</h4>
                                        <p className="mb-0">Document</p>
                                    </div>
                                    <div className="widgets-icons bg-light-danger text-danger rounded-circle"><i className='bx bx-file-blank'></i>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-2 pr-0 pl-0 m-2">
                    <div className="card radius-15">
                        <div className="card-body" style={activeTab=='testseries'?{borderWidth:1,borderColor:'#673ab7',borderStyle:'solid',borderRadius:15}:{}}>
                            {tsCountLoading?(
                                <Shimmer width={'100%'} height={40} />
                            ):( 
                                <a href="javascript:;" onClick={()=>{setActiveTab('testseries')}} className="media align-items-center">
                                    <div className="media-body">
                                        <h4 className="mb-0 font-weight-bold">{tsCount}</h4>
                                        <p className="mb-0">Test Series</p>
                                    </div>
                                    <div className="widgets-icons bg-light-primary text-primary rounded-circle"><i className='bx bx-carousel'></i>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-2 pr-0 pl-0 m-2">
                    <div className="card radius-15">
                        <div className="card-body" style={activeTab=='timetable'?{borderWidth:1,borderColor:'#673ab7',borderStyle:'solid',borderRadius:15}:{}}>
                            {timeTableCountLoading?(
                                <Shimmer width={'100%'} height={40} />
                            ):( 
                                <a href="javascript:;" onClick={()=>{setActiveTab('timetable')}} className="media align-items-center">
                                    <div className="media-body">
                                        <h4 className="mb-0 font-weight-bold">{timeTableCount}</h4>
                                        <p className="mb-0">Time Table</p>
                                    </div>
                                    <div className="widgets-icons bg-light-primary text-primary rounded-circle"><i className='bx bx-carousel'></i>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                {/* <div className="col-12 col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            {tsCountLoading?(
                                <Shimmer width={'100%'} height={40} />
                            ):( 
                                <div className="media align-items-center">
                                    <div className="media-body">
                                        <h4 className="mb-0 font-weight-bold">{tsCount}</h4>
                                        <p className="mb-0">Test Series</p>
                                    </div>
                                    <div className="widgets-icons bg-light-info text-info rounded-circle"><i className='bx bx-pencil'></i>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            {studentCountLoading?(
                                <Shimmer width={'100%'} height={40} />
                            ):( 
                                <div className="media align-items-center">
                                    <div className="media-body">
                                        <h4 className="mb-0 font-weight-bold">{studentCount}</h4>
                                        <p className="mb-0">Enrolled Students</p>
                                    </div>
                                    <div className="widgets-icons bg-light-warning text-warning rounded-circle"><i className='bx bx-user'></i>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div> */}
            </div>
            {/* <div className="row">
                <button type="button" className={activeTab=="videos"?"btn btn-success mr-1":"btn btn-primary mr-1" } onClick={()=>{setActiveTab('videos')}}>
                    Videos
                </button>
             
                <button  type="button" className={activeTab=="documents"?"btn btn-success mr-1":"btn btn-primary mr-1" } onClick={()=>{setActiveTab('documents')}}>
                    Documents
                </button>
                <button  type="button" className={activeTab=="testseries"?"btn btn-success mr-1":"btn btn-primary mr-1" } onClick={()=>{setActiveTab('testseries')}}>
                    Test Series
                </button>
                <button type="button" className={activeTab=="timetable"?"btn btn-success mr-1":"btn btn-primary mr-1" } onClick={()=>{setActiveTab('timetable')}}>
                    Time Table
                </button>
                <button type="button" className={activeTab=="enrolledStudents"?"btn btn-success mr-1":"btn btn-primary mr-1" } onClick={()=>{setActiveTab('enrolledStudents')}}>
                    Enrolled Students
                </button>
                <button type="button" className={activeTab=="banners"?"btn btn-success mr-1":"btn btn-primary mr-1"} onClick={()=>{setActiveTab('banners')}}>
                    Banners
                </button>
            </div> */}
            {renderTabContent(activeTab,activeCourse)}
        </div>
    )
}

export default CourseView
