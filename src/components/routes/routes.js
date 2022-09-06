import React, { useEffect } from 'react';
  
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'  
import Dashboard from '../../Pages/Dashboard/Dashboard';
import InstituteView from '../../Pages/Institute/InstituteView';
import Student from '../../Pages/Student/Student';
import Login from '../../components/Login/Login';
import Signup from '../../Pages/signup/signup';
import CourseView from '../../Pages/Courses/CourseView/CourseView'
import TestSeriesAddEdit from '../../Pages/Courses/CourseView/CourseTestSeries/TestSeriesAddEdit'
import InstituteCourse from '../../Pages/Courses/InstituteCourse'
import Transactions from '../../Pages/Transactions/Transactions'
import Feeds from '../../Pages/Feeds/feeds'
import { Redirect } from "react-router-dom"
import { useSelector } from 'react-redux'
import InstituteEdit from '../../Pages/Institute/InstituteEdit';
import InstitutePayout from '../../Pages/Institute/InstitutePayout/InstitutePayout'
import StudentView from '../../Pages/Courses/CourseView/EnrolledStudents/StudentView'
import LeaderBoard from '../../Pages/Leaderboard/LeaderBoard';
import { useState } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch } from 'react-redux'
import { SET_AUTH_STATUS, SET_INSTITUTE_DETAILS } from '../../Reducers/types';
import Notification from '../../Pages/Notification/Notification';
import StudentChat from '../../Pages/Courses/CourseView/StudentChat/StudentChat';

import {validateLogin} from '../../api/login'
import ResetPassword from '../../Pages/ResetPassword/ResetPassword';
import ForgotPassword from '../../Pages/ForgotPassword/ForgotPassword';

import Header from '../header/header';
import Loader from '../Loader/Loader';
const routerSwitch = (authStatus)=>
{
  return(
      <>
          
{/*          
        <Route path="/institute/:type" component={Institute} />
        <Route path="/csv" component={CsvParser} />
        <Route path="/instituteCategory" component={InstituteCategory} />
        <Route exact path="/analytics/revenue/ins/:insId" component={CourseRevenueAnalytics} />    
        <Route exact path="/analytics/lead" component={Leads} /> 
        <Route exact path="/analytics/revenue" component={Revenue} /> 
        <Route exact path="/student" component={Student} />
        
        <Route path="/studentView/:id" render={(props) => (
                <>
                  <StudentView  {...props}/>
                </>
              )}>
        </Route>  
        <Route exact path="/blog" component={Blog} />   
        <Route exact path="/banner/:type" component={Banner} />   
        <Route exact path="/category/notification" component={Notification} />       
        <Route exact path="/ins/course/:id" component={CourseView}/>
        <Route exact path="/transactions/:status" component={Transactions}/>*/}
        <Route exact path="/" component={Login} /> 
        <Route exact path="/signup" authStatus={authStatus} component={Signup} /> 
        <Route exact path="/reset-password/:hash1/:hash2" authStatus={authStatus} component={ResetPassword} /> 
        <Route exact path="/forgot-password" authStatus={authStatus} component={ForgotPassword} /> 

        <PrivateRoute exact path="/dashboard" authStatus={authStatus} 
          render={(props) => (
            <>
             <Header/>
              <Dashboard  {...props}/>
            </>
          )}
         /> 
        <PrivateRoute exact path="/feeds/:type" authStatus={authStatus} 
          render={(props) => (
            <>
             <Header/>
              <Feeds  {...props}/>
            </>
            )}
        
        />
      
        <PrivateRoute exact path="/instituteProfile" authStatus={authStatus}  
            render={(props) => (
              <>
               <Header/>
                <InstituteView  {...props}/>
              </>
              )}
        />  
        <PrivateRoute exact path="/student/list" authStatus={authStatus} 
            render={(props) => (
              <>
               <Header/>
                <Student  {...props}/>
              </>
              )}
        />   
        <PrivateRoute exact path="/insCourses/:isDeleted" authStatus={authStatus} 
            render={(props) => (
                <>
                 <Header/>
                  <InstituteCourse  {...props}/>
                </>
                )}
        />     
      <PrivateRoute exact path="/notification/" authStatus={authStatus} 
            render={(props) => (
              <>
               <Header/>
                <Notification  {...props}/>
              </>
              )}
        />     
      <PrivateRoute exact path="/addTestSeries/:type/:seriesId/:activeCourse" authStatus={authStatus}
            render={(props) => (
              <>
               <Header/>
                <TestSeriesAddEdit  {...props}/>
              </>
              )}
        />
    <PrivateRoute exact path="/ins/course/courseview/:id/:name" authStatus={authStatus} 
            render={(props) => (
              <>
               <Header/>
                <CourseView  {...props}/>
              </>
              )}
        />
    <PrivateRoute exact path="/studentView/:id" authStatus={authStatus} 
              render={(props) => (
                <>
                 <Header/>
                  <StudentView  {...props}/>
                </>
                )}
        />
        <PrivateRoute exact path="/instituteEdit" authStatus={authStatus} 
            render={(props) => (
              <>
               <Header/>
                <InstituteEdit  {...props}/>
              </>
              )}
        
        />

        <PrivateRoute exact path="/transactions/:status" authStatus={authStatus}
            render={(props) => (
              <>
               <Header/>
                <Transactions  {...props}/>
              </>
              )}
        />

        <PrivateRoute exact path="/institutePayout" authStatus={authStatus} 
            render={(props) => (
              <>
               <Header/>
                <InstitutePayout  {...props}/>
              </>
              )}
        />
        <PrivateRoute exact path="/leaderboard/:id" authStatus={authStatus}
              render={(props) => (
                <>
                 <Header/>
                  <LeaderBoard  {...props}/>
                </>
              )}
            
        />
        <PrivateRoute exact path="/studentChat/:courseId" authStatus={authStatus}  
            render={(props) => (
              <>
               <Header/>
                <StudentChat  {...props}/>
              </>
              )}
        />
        <PrivateRoute exact path="/studentChat/:courseId/:studentId" authStatus={authStatus} 
            render={(props) => (
              <>
               <Header/>
                <StudentChat  {...props}/>
              </>
              )}
        />
 
      </>
         
  )
}
 
const PrivateRoute = ({render: Component, authStatus,...rest}) => {
  
  return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      <Route {...rest} render={props => (
        authStatus ?
            <Component {...props} />
        : <Redirect to="/" />
    )} />
  );
};
const Routes = props => {

  const authStatus = useSelector((state)=>state.ins.authStatus)
  const [loading,setLoading] =useState(true);
  const dispatch = useDispatch()
  useEffect(() => {

        const insDetails = localStorage.getItem("data")

        if(insDetails!=null)
        {
            const obj = JSON.parse(insDetails)
            if(obj.email&&obj.password)
            {
              validateLogin(obj.email, obj.password,(response)=>{

                
                if(response.status==200)
                {

                  response.json().then(data => { 
                      if(data)
                      {
                          dispatch({ type: SET_AUTH_STATUS,payload:{authStatus: true}})
                          dispatch({ type: SET_INSTITUTE_DETAILS,payload:{insDetails: data}})
                          localStorage.setItem('data', JSON.stringify(data)); 
                      }
                      
                      setLoading(false)
                  })
                 
                }
                
              })
            }else
            {
              setLoading(false)
            }
           
           

        }else
        {
          setLoading(false);
        }
        


  },[])









    return  (

      loading?(
        <div style={{display: 'flex',height:'100vh',flex:1,alignItems:"center",justifyContent:"center"}}> 
            {/* <ClipLoader color={"#673ab7"} loading={loading}   size={50} /> */}
            <Loader height={80} width={80}/>
        </div>

      ):(

          authStatus?(
            <div className="page-wrapper">
                <div className="page-content-wrapper">
                    <div className="page-content">
                        {routerSwitch(authStatus)}
                    </div>
                </div>
            </div> 
        ):(
          routerSwitch(authStatus)
        )
        
      )
        
                   
            
    );
};
 

export default  Routes ;