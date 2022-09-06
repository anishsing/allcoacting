import moment from 'moment'
import React from 'react'

function ChatItem({name,message,time,avatar,active,userId,switchChatToUser,setActiveUserName}) {




  return (
      <a href="javascript:;" onClick={()=>{switchChatToUser(userId);setActiveUserName(name)}} className={active?"list-group-item active":"list-group-item"}>
        <div class="d-flex">
            <div class="chat-user mr-1">
                <img src={avatar} width="42" height="42" class="rounded-circle" alt="" 
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src="/assets/images/avatars/avatar-1.png";
                  }}
                />
            </div>
            <div class="flex-grow-1 ms-2">
                <h6 class="mb-0 chat-title">{name}</h6>
                <p class="mb-0 chat-msg">{message?.slice(0,20)}</p>
            </div>
            <div class="chat-time">{moment(time).format("h:m A")}</div>
        </div>
    </a>
  )
}

export default ChatItem