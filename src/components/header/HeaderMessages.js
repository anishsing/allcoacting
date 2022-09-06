import React from 'react';
import SingleMessageNotification from './SingleMessageNotification';

function HeaderMessages({messageCount,messages}) {
  return(
    <>
    <a className="nav-link dropdown-toggle dropdown-toggle-nocaret position-relative"
        href="javascript:;"
        data-toggle="dropdown"
    >
        {" "}
        {messageCount>0?(
            <span className="msg-count">{messageCount}</span>
        ):(null)}
        
        <i className="bx bx-comment-detail vertical-align-middle" />
    </a>
    <div className="dropdown-menu dropdown-menu-right">
        <a href="javascript:;">
            <div className="msg-header">
            <h6 className="msg-header-title">{messageCount} New</h6>
            <p className="msg-header-subtitle">Student Messages</p>
            </div>
        </a>
        <div className="header-message-list">
        
            {messages.map(message =>(

            <SingleMessageNotification
                item={message}
            />
            ))}
            
        </div>
        {/* <a href="javascript:;">
            <div className="text-center msg-footer">View All Messages</div>
        </a> */}
    </div>
    </>
  );
}

export default HeaderMessages;
