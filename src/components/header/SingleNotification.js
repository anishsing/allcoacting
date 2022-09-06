import moment from 'moment';
import React, { useEffect } from 'react';
import { serverBaseUrl } from '../..';
import { updateTransactionSeenStatus } from '../../api/transaction';




function Bull({isVisible}) {
    return (
        <span style={{fontSize:25,color:"#673ab7",marginRight:10}}>
            {isVisible?"•":" "}
        </span>
    );
}
function SingleNotification({item}) {


    useEffect(()=>{
        if(!item.transaction?.seenByIns)
        {
          updateTransactionSeenStatus(item.transaction?.id,true,(response)=>console.log(response.status));
        }
      },[])

  return ( <a className="dropdown-item" href="javascript:;" style={{paddingLeft:5}}>
            <div className="media align-items-center">
                <Bull isVisible={!item.transaction.seenByAdmin}/>
                <div className="notify bg-light-mehandi text-mehandi">
                    {/* <i className="bx bx-door-open" /> */}
                    
                    <img src={`${serverBaseUrl}${item?.student?.studentImage}`} style={{width:50, height:50,borderRadius:25 }}/>
                </div>
                <div className="media-body">
                <h6 className="msg-name" style={{fontWeight: 'bold'}}>
                    {item.student?.name}{" "}
                    <span className="msg-time float-right">
                        {moment(item.transaction.purchaseDate).fromNow()}
                    </span>
                </h6>
                <p style={{flexWrap: 'wrap',flex:1,width:"100%",whiteSpace:"break-spaces"}} className="msg-info">{item.student.name} purchased {item.course.title} worth of {item.transaction.amount} INR</p>
                </div>
            </div>
        </a>);
}

export default SingleNotification;
