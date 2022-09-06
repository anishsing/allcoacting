import React,{useEffect,useState} from 'react';
import { useDispatch, useSelector } from "react-redux"
import { serverBaseUrl } from '../..';
import {  fetch_messagesForIns,  getUnSeenMessagesCountForIns } from '../../api/message';
import { fetchInsTransactions, fetchInsTransactionsAnsStatusSuccess, getUnSeenTransactionsCount } from '../../api/transaction';
import useStateRef from 'react-usestateref'
import HeaderMessages from './HeaderMessages'; 
import SingleNotification from './SingleNotification'; 
import { getInstituteCourseWiseStudentEnrolled } from '../../api/Courses';
import { SET_AUTH_STATUS, SET_INSTITUTE_DETAILS } from '../../Reducers/types';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
const Header = () => {
  
  
  const insDetails = useSelector((state) => state.ins.insDetails)
   

  console.log(insDetails.id)
  const [transactions,setTransactions,transactionsRef] = useStateRef([])
  const [transactionCount,setTransactionsCount,transactionCountRef] = useStateRef(0)

  const [messages,setMessages] = useState([])
  const [messageCount,setMessageCount] = useState(0)

  const [feedReportCount,setFeedReportCount] = useState(0)
  const [feedReports ,setFeedReports] = useState([])

  const [fetchedTransactions,setFetchedTransactions] = useState(false);
  const [fetchedReports,setFetchedReports] = useState(false);

  const [transactionsVisible,setTransactionsVisible] = useState(false);
  
  const dispatch = useDispatch()
  const history = useHistory();

  useEffect(() =>{

    
    if(insDetails.id)
    {

        
        //getting messages data from database
      

        getUnSeenMessagesCountForIns(insDetails.id,(response) => {

          if(response.status==200)
          {
            response.json().then(data => {
              console.log(data);
              setMessageCount(data)
            })
          }
        })


        fetch_messagesForIns(insDetails.id,false,"instituteCourseRelated",0,20,(response) =>{

          if(response.status == 200)
          {
            response.json().then(data=>{
              setMessages(data)
              console.log(data)
            })
          }
        })

        //Getting transaction data from database
        //transactions count which are not seen by admin
        getUnSeenTransactionsCount(insDetails.id,(response)=>{

          if(response.status == 200)
          {
            response.json().then(data=>{
              setTransactionsCount(transactionCountRef.current + data)
            })
          }
        })

        //geting first 20 transaction to diplay as notification
        fetchInsTransactionsAnsStatusSuccess(insDetails.id,0,20,(response)=>{
          if(response.status == 200)
          {
              response.json().then(data=>{  
                setTransactions([...data,...transactionsRef.current])
                setFetchedTransactions(true)
              })
          }
        })


        //getting feedReport

        // getUnSeenReportCount((response)=>{
        //   response.json().then(data=>{
        //     setTransactionsCount(transactionCountRef.current + data)
        //   })
        // })

        // fetch_report(0,20,(response)=>{
        //   if(response.status == 200)
        //   {
        //       response.json().then(data=>{  
        //         setTransactions([...data,...transactionsRef.current])
        //         console.log(data)
        //         setFetchedReports(true)
        //       })
        //   }
        // })
    }
  },[insDetails])

  const $ = window.$
  useEffect(()=>{ 

    $(".toggle-btn").unbind("click")
    $(".toggle-btn-mobile").unbind("click")
    $(function () {
      $('.metismenu-card').metisMenu({
        toggle: false,
        triggerElement: '.card-header',
        parentTrigger: '.card',
        subMenu: '.card-body'
      });
    });
    // Metishmenu card collapse
    $(function () {
      $('.card-collapse').metisMenu({
        toggle: false,
        triggerElement: '.card-header',
        parentTrigger: '.card',
        subMenu: '.card-body'
      });
    
    // toggle menu button
      $(".toggle-btn").click(function () {
          console.log("sdb ",$(".wrapper").hasClass("toggled"))
        if ($(".wrapper").hasClass("toggled")) {
          // unpin sidebar when hovered
          $(".wrapper").removeClass("toggled");
          $(".sidebar-wrapper").unbind("hover");
          console.log("removed toggled")
        } else {
          $(".wrapper").addClass("toggled");
          console.log("added toggled")
          $(".sidebar-wrapper").hover(function () {
            $(".wrapper").addClass("sidebar-hovered");
          }, function () {
            $(".wrapper").removeClass("sidebar-hovered");
          })
        }
      });
  });
    $(".toggle-btn-mobile").on("click", function () {
      $(".wrapper").removeClass("toggled");
    });

    // metismenu
    $(function () {
      $('#menu').metisMenu(); 
      console.log("dfkbh" , $('#menu'))
    });


    $(function () {
      for (var i = window.location, o = $(".metismenu li a").filter(function () {
        return this.href == i;
      }).addClass("").parent().addClass("mm-active");;) {
        if (!o.is("li")) break;
        o = o.parent("").addClass("mm-show").parent("").addClass("mm-active");
      }
    })
    
  },[])

  const logout=()=>
  {
    dispatch({ type: SET_AUTH_STATUS,payload:{authStatus: false}})
    dispatch({ type: SET_INSTITUTE_DETAILS,payload:{insDetails: null}})
    localStorage.removeItem('data'); 
    history.push("/dashboard");
  }

   

  return (
    <header className="top-header">
      <nav className="navbar navbar-expand">
        <div className="left-topbar d-flex align-items-center">
          <a href="javascript:;" className="toggle-btn">
            {" "}
            <i className="bx bx-menu" />
          </a>
        </div>
        <div className="ml-1 text-center">
          
            {/* <input type="text" className="form-control" placeholder="search" value= */}
             {insDetails.status != 1?(
                    <span style={{color:'red',fontWeight:'bold',fontSize:'1vw'}}>
                      Payment for Approval or Contact AllCoaching mobile number +919889977685</span>
                ):(null)}
            
          
        </div>
        <div className="right-topbar ml-auto">
          <ul className="navbar-nav">
            <li className="nav-item search-btn-mobile">
              <a className="nav-link position-relative" href="javascript:;">
                {" "}
                <i className="bx bx-search vertical-align-middle" />
              </a>
            </li>
            <li className="nav-item dropdown dropdown-lg">
              <HeaderMessages
                messages={messages}
                messageCount={messageCount}
              />
            </li>
            <li className="nav-item dropdown dropdown-lg">
              <a
                className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative"
                href="javascript:;"
                data-toggle="dropdown"
                // onClick={()=>setTransactionsVisible(true)}
              >
                {" "}
                <i className="bx bx-bell vertical-align-middle" />
                {transactionCount>0?(
                  <span className="msg-count">{transactionCount}</span>
                ):(null)}
                
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                <a href="javascript:;">
                  <div className="msg-header">
                    <h6 className="msg-header-title">{transactionCount} New</h6>
                    <p className="msg-header-subtitle">
                      Transaction & Feed Notifications
                    </p>
                  </div>
                </a>
                <div className="header-notifications-list" style={{overflowY: 'scroll'}}>

                  {transactions.map(item=>( 
                        <SingleNotification
                            item={item} 
                        /> 
                  ))}

                   
                   
                </div>
                {/* <a href="javascript:;">
                  <div className="text-center msg-footer">
                    View All Notifications
                  </div>
                </a> */}
              </div>
            </li>
            <li className="nav-item dropdown dropdown-user-profile">
              <a
                className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                href="javascript:;"
                data-toggle="dropdown"
              >
                <div className="media user-box align-items-center">
                  <div className="media-body user-info">
                    <p className="user-name mb-0">{insDetails.name}</p>
                    <p className="designattion mb-0">{insDetails.status==1?"Approved":insDetails.status==2?"Blocked":"Pending Approval"}</p>
                  </div>
                  <img
                    src={insDetails.logo?.includes("https://")||insDetails.logo?.includes("http://")?insDetails.logo:serverBaseUrl+insDetails.logo}
                    className="user-img"
                    alt="user avatar"
                  />
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-right">
                {" "}
                 <Link className="dropdown-item" to="/instituteProfile">
                  <i className="bx bx-user" />
                  <span>Profile</span>
                </Link>
                <Link className="dropdown-item" to="/InstituteEdit">
                  <i className="bx bx-cog" />
                  <span>Edit Profile</span>
                </Link>
                 
                <div className="dropdown-divider mb-0" />{" "}
                <a className="dropdown-item" href="javascript:;" onClick={()=>logout()}>
                  <i className="bx bx-power-off" />
                  <span>Logout</span>
                </a>
              </div>
            </li>
            <li className="nav-item dropdown dropdown-language">
              <a
                className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                href="javascript:;"
                data-toggle="dropdown"
              >
                <div className="lang d-flex">
                  <div>
                    <i className="flag-icon flag-icon-in" />
                  </div>
                  <div>
                    <span>IN</span>
                  </div>
                </div>
              </a>
               
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )}
export default Header