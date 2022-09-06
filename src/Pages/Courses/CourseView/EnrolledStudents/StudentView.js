import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {serverBaseUrl} from '../../../../index'

import {fetch_studentById} from '../../../../api/Student'

// import EnrolledCourses from './EnrolledCourses'
// import StudentHistory from './StudentHistory'
import Feed from './Feed'
import { Link, useHistory } from "react-router-dom"
import {Image,  Shimmer } from 'react-shimmer'

export default function StudentView(props) {

    const [name, setName] = useState('Shivam')
    const [username, setUsername] = useState('shivamkumar06952')
    const [email, setEmail] = useState('shivamkumar06952@gmail.com')
    const [mobile, setMobile] = useState('8750303030')
    const [value, setValue] = useState('Enrollments')
    const [studentID, setStudentID] = useState('8')
    const [historyData, setHistoryData] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const history = useHistory();
    const [showShimmer, setShowShimmer] = useState(true)
    

    const fetchStudentCallback=(response) => {
        if(response.status==200){
            response.json().then(data => {
                console.log('fetching data for student', data)
                setUserInfo(data)
                setShowShimmer(false)
            })
        }
    }


    useEffect(() =>{
        fetch_studentById(props.match.params.id, fetchStudentCallback)
    },[name])


    const handleChange = (_, value) => {
        
        setValue(value)
        console.log('value changed after tab', value)
      };

     
    
    return (
        <>

        <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
            <div class="breadcrumb-title pr-3">Student Data</div>
            <div class="pl-3">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0 p-0">
                        <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                        </li>
                    </ol>
                </nav>
            </div>
            <div class="ml-auto">
                <div class="btn-group">
                    <button type="button" class="btn btn-dark" style={{marginRight: 5}} onClick={() => history.goBack()}>Go Back</button>
                </div>
            </div>
        </div>


					<hr />
					<div class="row">
						<div class="col-12 col-lg-4 col-xl-4">
							<div class="card radius-15">
								<div class="card-body">
                                    <div className="text-center" style={{maxHeight:240, maxWidth:230, margin: '0 auto', overflow: 'hidden', borderRadius: '50%'}} >
                                       {showShimmer ?(
                                           <Shimmer circle width={'100%'} height={240} />
                                       ):(
                                            <img src={serverBaseUrl+userInfo.studentImage} onError={(e)=> e.target.src='/assets/images/icons/user-gradient.png'} className="img-fluid" alt="No profile image" />
                                       )}
                                    </div>
                                    
                                        <h4 className="mt-3 mb-1 text-center">
                                            {showShimmer?(
                                                <Shimmer width={'100%'} height={30} />
                                            ):(
                                                <>
                                                {userInfo.name}
                                                </>
                                            )}
                                        </h4>
                                
								</div>
							</div>
						</div>
						<div class="col-12 col-lg-8 col-xl-8">
							<div class="card radius-15">
								<div class="card-body">
                                    
                                        <h3>
                                            User Information
                                        </h3>
                                        <div className="row">
                                            <div className="col-lg-6 mt-4">
                                                {showShimmer?(
                                                    <Shimmer width={'90%'} height={30} />
                                                ):(
                                                    <TextField id="standard-basic-name" value={userInfo.name} style={{width: '90%'}} />
                                                )}
                                                
                                            </div>
                                            <div className="col-lg-6 mt-4">
                                                {showShimmer ?(
                                                    <Shimmer width={'90%'} height={30} />
                                                ):(
                                                    <TextField id="standard-basic-email" value={userInfo.email} style={{width: '90%'}} /> 
                                                )}
                                               
                                            </div>
                                            <div className="col-lg-6 mt-4">
                                                {showShimmer ?(
                                                    <Shimmer width={'90%'} height={30} />
                                                ):(
                                                    <TextField id="standard-basic-number"  value={userInfo.mobileNumber} style={{width: '90%'}} />
                                                )}
                                            </div>
                                        </div>
                                   
								</div>
							</div>
						</div>
						
						
						
					</div>




                <div className="container mt-5">

                    <div className="mb-5">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered="true"
                        >
                
                        {/* <Tab label="Enrollments" value="Enrollments" />
                        <Tab label="Recents" value="Recents" /> */}
                        <Tab label="Feed" value="Feed" />
                        </Tabs>
                        
                       {value == "Enrollments" ?(
                        //    <EnrolledCourses userId={props.match.params.id} />
                        null
                       ):(false)}


                        {value == "Recents" ?(
                        //    <StudentHistory userId={props.match.params.id}/>
                        null
                        ):(false)}


                        {value == "Feed" ?(
                            <Feed userId={props.match.params.id} />
                        ):(false)}

                    </div>

                </div>

            
        </>
    )
}
