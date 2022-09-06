import moment from 'moment';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { serverBaseUrl } from '../..';
import { updateMessagesSeenStatus } from '../../api/message';

function Bull({isVisible}) {
  return (
      <span style={{fontSize:25,color:"#673ab7",marginRight:10}}>
          {isVisible?"•":" "}
      </span>
  );
}
function SingleMessageNotification({item}) {



  useEffect(()=>{
    console.log(item)
    if(!item.seenByIns)
    { 
      updateMessagesSeenStatus(item.id,true,(response)=>console.log(response.status));
    }
  },[])
  return (
    <Link  to={"/studentChat/"+item.courseId + "/"+item.student.id} className="dropdown-item" href="javascript:;">
    <div className="media align-items-center">

      <Bull isVisible={!item.seenByAdmin}/>
      <div className="user">
        <img
          src={`${serverBaseUrl}${item.student.studentImage}`}
          className="msg-avatar"
          alt="user avatar"
        />
      </div>
      <div className="media-body">
        <h6 className="msg-name">

          {item.messageType=="feedback" ?"FeedBack from ":"Message from "}
         {item.student.name}{" "}
          <span className="msg-time float-right">{moment(item.messageInitialTime).fromNow()}</span>
        </h6>
        <p className="msg-info">
          
          {item.message.length>20?(
            `${item.message.slice(0,20)} ...` 
          ):(
            item.message
          )}
        </p>
      </div>
    </div>
  </Link>
  );
}

export default SingleMessageNotification;
