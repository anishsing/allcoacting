import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams,useHistory } from 'react-router';
import { serverBaseUrl, theme } from '../../../..';
import { getChatListForInstitute, getStudentChatMessagesForCourse } from '../../../../api/message';
import ChatItem from './ChatItem';
import MessageItemLayout from './MessageItemLayout';
import ClipLoader from "react-spinners/ClipLoader";
function StudentChat() {
    const {courseId,studentId} = useParams()
    const history = useHistory();
    const insDetails = useSelector((state) => state.ins.insDetails)
    const studentMessages = useSelector((state) => state.studentMessages);
    //chat list paging variables
    const [chatListOffset,setChatListOffset] = useState(0)
    const [chatListLimit,setChatListLimit] = useState(25)

    //message list paging variables
    const [messageListOffset,setMessageListOffset] = useState(0)
    const [messageListLimit,setMessageListLimit] = useState(25)
    
    const [loadingChatList,setLoadingChatList] = useState(true)
    const [chatList,setChatList] = useState([])
    const [activeChatStudentId,setActiveChatStudentId] = useState(null)
    const [loadingMessage,setLoadingMessage] = useState(false)
    const [messgeList,setMessageList]= useState([])
    const [activeStudentName,setActiveStudentName] = useState("")
    const [refreshCount,setRefreshCount] = useState(0)
    const [refreshing,setRefreshing] = useState(false)
    useEffect(() => {

        setRefreshing(true);
        setLoadingChatList(true)
        getChatListForInstitute(insDetails.id,courseId,chatListOffset,chatListLimit,(response)=>{
                if(response.status == 200)
                {
                    response.json().then(data=>{
                         setChatList(data)
                         if(data.length > 0)
                         {
                             if(studentId)
                             {
                                const sArr = data.filter(item=>item.student.id==studentId)
                                if(sArr.length>0)
                                {
                                    setActiveChatStudentId(sArr[0]?.student?.id)
                                    setActiveStudentName(sArr[0]?.student?.name)    
                                }else
                                {
                                    setActiveChatStudentId(data[0]?.student?.id)
                                    setActiveStudentName(data[0]?.student?.name)
                                }
                             }else
                             {
                                setActiveChatStudentId(data[0]?.student?.id)
                                setActiveStudentName(data[0]?.student?.name)
                             }
                            
                         }
                        
                    })
                    
                }
                setRefreshing(false);
                setLoadingChatList(false)
        })
    },[courseId,chatListOffset,refreshCount])


    useEffect(() => {
        if(courseId&&activeChatStudentId)
        {
            setLoadingMessage(true)
            getStudentChatMessagesForCourse(insDetails.id,activeChatStudentId,courseId,messageListOffset,messageListLimit,(response)=>{ 
                if(response.status ==200)
                {
                    response.json().then(data=>{ 
                        setMessageList(data)  
                    }) 
                }
                setLoadingMessage(false)
            })
        } 
    },[activeChatStudentId,courseId,refreshCount])
  return (
    <>
        <div className="row" style={{justifyContent: 'space-between'}}>
                <div className="col-2 m-1 mb-3">
                     <button type="button" class="btn btn-dark" style={{ marginLeft: 5 }} onClick={() => history.goBack()}>Go Back</button>
                </div>
                <div className="col-2 m-1 mb-3">
                     <button type="button" class="btn btn-primary" style={{ marginLeft: 5 }} onClick={() => setRefreshCount(refreshCount+1)}>
                         {refreshing?(
                            <ClipLoader color={theme.primaryColor}   loading={refreshing}     />
                         ):("Refresh")}
                    </button>
                </div>
        </div>
        <div class="chat-wrapper">
            <div class="chat-sidebar">
                <div class="chat-sidebar-header">
                    <div class="d-flex align-items-center">
                        <div class="chat-user">
                            <img src={insDetails.logo} width="45" height="45" class="rounded-circle" alt="" />
                        </div>
                        <div class="flex-grow-1 ms-2 ml-1">
                            <p class="mb-0">{insDetails.name}</p>
                        </div>
                            {/* <div class="dropdown">
                                <div class="cursor-pointer font-24 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown"><i class='bx bx-dots-horizontal-rounded'></i>
                                </div>
                                <div class="dropdown-menu dropdown-menu-end"> <a class="dropdown-item" href="javascript:;">Settings</a>
                                    <div class="dropdown-divider"></div>	<a class="dropdown-item" href="javascript:;">Help & Feedback</a>
                                    <a class="dropdown-item" href="javascript:;">Enable Split View Mode</a>
                                    <a class="dropdown-item" href="javascript:;">Keyboard Shortcuts</a>
                                    <div class="dropdown-divider"></div>	<a class="dropdown-item" href="javascript:;">Sign Out</a>
                                </div>
                            </div> */}
                    </div>
                    <div class="mb-3"></div>
                    {/* <div class="input-group input-group-sm"> <span class="input-group-text bg-transparent"><i class='bx bx-search'></i></span>
                        <input type="text" class="form-control" placeholder="People, groups, & messages"/> <span class="input-group-text bg-transparent"><i class='bx bx-dialpad'></i></span>
                    </div> */}
                    {/* <div class="chat-tab-menu mt-3">
                        <ul class="nav nav-pills nav-justified">
                            <li class="nav-item">
                                <a class="nav-link active" data-bs-toggle="pill" href="javascript:;">
                                    <div class="font-24"><i class='bx bx-conversation'></i>
                                    </div>
                                    <div><small>Chats</small>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-bs-toggle="pill" href="javascript:;">
                                    <div class="font-24"><i class='bx bx-phone'></i>
                                    </div>
                                    <div><small>Calls</small>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-bs-toggle="pill" href="javascript:;">
                                    <div class="font-24"><i class='bx bxs-contact'></i>
                                    </div>
                                    <div><small>Contacts</small>
                                    </div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" data-bs-toggle="pill" href="javascript:;">
                                    <div class="font-24"><i class='bx bx-bell'></i>
                                    </div>
                                    <div><small>Notifications</small>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div> */}
                </div>
                <div class="chat-sidebar-content">
                    <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-Chats">
                            {/* <div class="p-3">
                                <div class="meeting-button d-flex justify-content-between">
                                    <div class="dropdown"> <a href="#" class="btn btn-white btn-sm radius-30 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown"><i class='bx bx-video me-2'></i>Meet Now<i class='bx bxs-chevron-down ms-2'></i></a>
                                        <div class="dropdown-menu"> <a class="dropdown-item" href="#">Host a meeting</a>
                                            <a class="dropdown-item" href="#">Join a meeting</a>
                                        </div>
                                    </div>
                                    <div class="dropdown"> <a href="#" class="btn btn-white btn-sm radius-30 dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown" data-display="static"><i class='bx bxs-edit me-2'></i>New Chat<i class='bx bxs-chevron-down ms-2'></i></a>
                                        <div class="dropdown-menu dropdown-menu-right">	<a class="dropdown-item" href="#">New Group Chat</a>
                                            <a class="dropdown-item" href="#">New Moderated Group</a>
                                            <a class="dropdown-item" href="#">New Chat</a>
                                            <a class="dropdown-item" href="#">New Private Conversation</a>
                                        </div>
                                    </div>
                                </div>  
                                <div class="dropdown mt-3"> <a href="#" class="text-uppercase text-secondary dropdown-toggle dropdown-toggle-nocaret" data-bs-toggle="dropdown">Recent Chats <i class='bx bxs-chevron-down'></i></a>
                                    <div class="dropdown-menu">	<a class="dropdown-item" href="#">Recent Chats</a>
                                        <a class="dropdown-item" href="#">Hidden Chats</a>
                                        <div class="dropdown-divider"></div>	<a class="dropdown-item" href="#">Sort by Time</a>
                                        <a class="dropdown-item" href="#">Sort by Unread</a>
                                        <div class="dropdown-divider"></div>	<a class="dropdown-item" href="#">Show Favorites</a>
                                    </div>
                                </div> 
                            </div>*/}
                            <div class="chat-list">
                                <div class="list-group list-group-flush">

                                    {chatList.map(item=>(
                                            <ChatItem
                                                name={item?.student?.name}
                                                message={item?.message}
                                                time={item?.messageInitialTime}
                                                avatar={item?.student?.studentImage?.includes("https://")?item?.student?.studentImage:serverBaseUrl+item?.student?.studentImage}
                                                switchChatToUser={setActiveChatStudentId}
                                                userId={item?.student?.id}
                                                active={item?.student?.id==activeChatStudentId}
                                                setActiveUserName={setActiveStudentName}
                                            />
                                            ) 
                                    )}

                                    {chatList.length==0?(
                                                    <div className="h-100 w-100 d-flex align-Items-center justify-content-center" >
                                                        <h5>
                                                            No Student to Chat
                                                        </h5>

                                                    </div>
                                                ):(null)}
                                    {/* <a href="javascript:;" class="list-group-item">
                                        <div class="d-flex">
                                            <div class="chat-user mr-1">
                                                <img src="/assets/images/avatars/avatar-2.png" width="42" height="42" class="rounded-circle" alt="" />
                                            </div>
                                            <div class="flex-grow-1 ms-2">
                                                <h6 class="mb-0 chat-title">Louis Litt</h6>
                                                <p class="mb-0 chat-msg">You just got LITT up, Mike.</p>
                                            </div>
                                            <div class="chat-time">9:51 AM</div>
                                        </div>
                                    </a>
                                    <a href="javascript:;" class="list-group-item active">
                                        <div class="d-flex">
                                            <div class="chat-user mr-1">
                                                <img src="/assets/images/avatars/avatar-3.png" width="42" height="42" class="rounded-circle" alt="" />
                                            </div>
                                            <div class="flex-grow-1 ms-2">
                                                <h6 class="mb-0 chat-title">Harvey Specter</h6>
                                                <p class="mb-0 chat-msg">Wrong. You take the gun....</p>
                                            </div>
                                            <div class="chat-time">4:32 PM</div>
                                        </div>
                                    </a>  */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chat-header d-flex align-items-center">
                <div class="chat-toggle-btn"><i class='bx bx-menu-alt-left'></i>
                </div>
                <div>
                    <h4 class="mb-1 font-weight-bold">{activeStudentName}</h4>
                    {/* <div class="list-inline d-sm-flex mb-0 d-none"> <a href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary"><small class='bx bxs-circle me-1 chart-online'></small>Active Now</a>
                        <a href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary">|</a>
                        <a href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary"><i class='bx bx-images me-1'></i>Gallery</a>
                        <a href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary">|</a>
                        <a href="javascript:;" class="list-inline-item d-flex align-items-center text-secondary"><i class='bx bx-search me-1'></i>Find</a>
                    </div> */}
                </div>
                {/* <div class="chat-top-header-menu ms-auto"> <a href="javascript:;"><i class='bx bx-video'></i></a>
                    <a href="javascript:;"><i class='bx bx-phone'></i></a>
                    <a href="javascript:;"><i class='bx bx-user-plus'></i></a>
                </div> */}
            </div>
            <div class="chat-content" style={{overflowY: 'scroll'}}>

                {messgeList.map(item=>(
                    <MessageItemLayout
                            messageObj={item} 
                        /> 
                ))}
                {messgeList.length==0?(
                    <div className="h-100 w-100 d-flex align-Items-center justify-content-center" >
                        <h5>
                            No Messages to Display
                        </h5>

                    </div>
                ):(null)}
    {/*            
                <div class="chat-content-leftside">
                    <div class="d-flex">
                        <img src="/assets/images/avatars/avatar-3.png" width="48" height="48" class="rounded-circle" alt="" />
                        <div class="flex-grow-1 ms-2">
                            <p class="mb-0 chat-time">Harvey, 3:12 PM</p>
                            <p class="chat-left-msg">ohhk, great, which admin template you have purchased?</p>
                        </div>
                    </div>
                </div>
                <div class="chat-content-rightside">
                    <div class="d-flex">
                        <div class="flex-grow-1 me-2">
                            <p class="mb-0 chat-time text-end">you, 3:14 PM</p>
                            <p class="chat-right-msg">i purchased dashtreme admin template from themeforest. it is very good product for web application</p>
                        </div>
                    </div>
                </div>
                <div class="chat-content-leftside">
                    <div class="d-flex">
                        <img src="/assets/images/avatars/avatar-3.png" width="48" height="48" class="rounded-circle" alt="" />
                        <div class="flex-grow-1 ms-2">
                            <p class="mb-0 chat-time">Harvey, 3:16 PM</p>
                            <p class="chat-left-msg">who is the author of this template?</p>
                        </div>
                    </div>
                </div>
                <div class="chat-content-rightside">
                    <div class="d-flex">
                        <div class="flex-grow-1 me-2">
                            <p class="mb-0 chat-time text-end">you, 3:22 PM</p>
                            <p class="chat-right-msg">codervent is the author of this admin template</p>
                        </div>
                    </div>
                </div>
                <div class="chat-content-leftside">
                    <div class="d-flex">
                        <img src="/assets/images/avatars/avatar-3.png" width="48" height="48" class="rounded-circle" alt="" />
                        <div class="flex-grow-1 ms-2">
                            <p class="mb-0 chat-time">Harvey, 3:16 PM</p>
                            <p class="chat-left-msg">ohh i know about this author. he has good admin products in his portfolio.</p>
                        </div>
                    </div>
                </div>
                <div class="chat-content-rightside">
                    <div class="d-flex">
                        <div class="flex-grow-1 me-2">
                            <p class="mb-0 chat-time text-end">you, 3:30 PM</p>
                            <p class="chat-right-msg">yes, codervent has multiple admin templates. also he is very supportive.</p>
                        </div>
                    </div>
                </div>
                <div class="chat-content-leftside">
                    <div class="d-flex">
                        <img src="/assets/images/avatars/avatar-3.png" width="48" height="48" class="rounded-circle" alt="" />
                        <div class="flex-grow-1 ms-2">
                            <p class="mb-0 chat-time">Harvey, 3:33 PM</p>
                            <p class="chat-left-msg">All the best for your target. thanks for giving your time.</p>
                        </div>
                    </div>
                </div>
                <div class="chat-content-rightside">
                    <div class="d-flex">
                        <div class="flex-grow-1 me-2">
                            <p class="mb-0 chat-time text-end">you, 3:35 PM</p>
                            <p class="chat-right-msg">thanks Harvey</p>
                        </div>
                    </div>
                </div> */}
            </div>


            {/* <div class="chat-footer d-flex align-items-center">
            
                <div class="chat-footer-menu"> <a href="javascript:;"><i class='bx bx-file'></i></a>
                    <a href="javascript:;"><i class='bx bxs-contact'></i></a>
                    <a href="javascript:;"><i class='bx bx-microphone'></i></a>
                    <a href="javascript:;"><i class='bx bx-dots-horizontal-rounded'></i></a>
                </div>
            </div> */}
            
            <div class="overlay chat-toggle-btn-mobile"></div>
            
        </div>
    </>
  )
}

export default StudentChat