import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { serverBaseUrl, theme } from '../../../..'
import { addMessageReplyImage, addReply } from '../../../../api/message';
import Snackbar from '@material-ui/core/Snackbar';
import ClipLoader from "react-spinners/ClipLoader";
function MessageItemLayout({messageObj}) {


    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [messageReply,setMessageReply] = useState(messageObj.reply);
    const [messageReplied,setMessageReplied] = useState(messageObj.reply?true:false)
    const [showMessageReplyInput,setShowMessageReplyInput] = useState(false)
    const [replyLoading,setReplyLoading] = useState(false)
    const inputFile = useRef(null)
    const [messageImages,setMessageImages] = useState(messageObj?.images)
    const [updateTime,setUpdateTime] = useState(messageObj.messageUpdateTime)
    useEffect(() => { 
        setMessageReply(messageObj.reply)
        setMessageReplied(messageObj.reply?true:false)
        setUpdateTime(messageObj.messageUpdateTime)
        setShowMessageReplyInput(false)
        setMessageImages(messageObj?.images)
    },[messageObj])


    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }
    const addReplyBtnHandler=()=>
    {

        setReplyLoading(true)

        if(messageImages.length>0)
        {
            addMessageReplyImage(messageObj,messageImages,(response)=>{

                if(response.status == 201)
                {
                    setMessageReplied(true)
                    setUpdateTime(Date.now())
                    setShowMessageReplyInput(false)
                }else
                {
                    setSnackBarMessage("Some Things went wrong")
                    setIsSnackBarShow(true)

                }
                setReplyLoading(false)
            })
        }else
        {
                 
            addReply({...messageObj,reply:messageReply},(response)=>{

                if(response.status == 201)
                {
                    setMessageReplied(true)
                    setUpdateTime(Date.now())
                    setShowMessageReplyInput(false)
                }else
                {
                    setSnackBarMessage("Some Things went wrong")
                    setIsSnackBarShow(true)

                }
                setReplyLoading(false)
            })
        }
    }

    const handleImageChange =(e)=>
    {
        let file = e.target.files[0];
         if(file)
         
         {
            setMessageImages([...messageImages,file])
         }
        
    }

    const removeImage=(item,index)=>
    {
        let messageImages_arr = [...messageImages]
        messageImages_arr.splice(index, 1);
        // this.setState(messageImages);
        setMessageImages(messageImages_arr)
    }
    const  renderimages=(item,index)=>
    {
        let url="";
        console.log(item, " pancham")
       if(item.imageLink)
       {
        url = serverBaseUrl+item.imageLink;
       }else{
        url = URL.createObjectURL(item)
       }
     
          return (
              <div style={{margin:5,}}>
                  <button onClick={()=>removeImage(item,index)} style={{ position:"absolute",right:0,top:0,zIndex:1000,backgroundColor:"#ffffff00",border:'none'}}>
                      <div >
                        <i class='bx bx-x' style={{fontSize:22}}></i>
                      </div>
                  </button> 
                  <img src={url} style={{  height:70,width: 70,borderRadius: 10}}/>
              </div>
          )
       
    }

  return (
      <>
        
        <div class="chat-content-leftside">
            <div class="d-flex">
                <img src={messageObj?.student?.studentImage?.includes("https://")?messageObj?.student?.studentImage: serverBaseUrl+messageObj?.student?.studentImage} width="48" height="48" class="rounded-circle" alt="" 
                     onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src="/assets/images/avatars/avatar-1.png";
                      }}
                />
                <div class="flex-grow-1 ms-2 ml-1">
                    <p class="mb-0 chat-time">{messageObj?.student?.name}, {moment(messageObj.messageInitialTime).format("h:m A")}   <a href="javascript:;" onClick={()=>{setShowMessageReplyInput(!showMessageReplyInput)}}><i className="lni lni-reply"></i></a></p>
                    <p class="chat-left-msg">{messageObj.message}</p>
                    {messageObj?.images?.filter((image)=>!image.replyImage).map((item)=>(
                         <p class="chat-left-msg w-50 h-50"><img src={serverBaseUrl+item.imageLink} className="w-100 h-100" /></p>
                    ))}
                </div>
            </div>
        </div>
        {messageReplied&&!showMessageReplyInput?(

            <div class="chat-content-rightside">
                <div class="d-flex ms-auto">
                    <div class="flex-grow-1 me-2 " style={{flexDirection:'column',display: 'flex'}}>
                        <p class="mb-0 chat-time text-start ml-auto" style={{textAlign: "end",marginRight:10}}>you, {moment(updateTime).format("h:m A")}</p>

                        <div><p class="chat-right-msg">{messageReply}</p></div>
                        <div style={{display: 'flex', flexDirection: 'column',alignItems:'flex-end',marginTop:20}}>
                            {messageObj?.images?.filter((image)=>image.replyImage).map((item)=>(
                                <p class="chat-right-msg w-50 h-50"><img src={serverBaseUrl+item.imageLink} className="w-100 h-100" /></p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ):(null)}
        {
        showMessageReplyInput?(
         
        <>
        <div class="flex-grow-1 pe-2 mb-2 mt-5">
            <div className="row">
                
                {messageImages.map((item,index)=>(
                    <div className="col-3 col-md-2 col-lg-2">
                        {renderimages(item,index)}
                    </div>
                ))} 
            </div> 
            <div class="input-group">	
                <input type="text"  value={messageReply} onChange={(e)=>setMessageReply(e.target.value)} class="form-control" placeholder="Type a message"/>
                <a href="javascript:;" onClick={()=>{addReplyBtnHandler()}}>
                    <span class="input-group-text" style={{padding:0,paddingTop:1,paddingBottom:1,paddingLeft:10,paddingRight:10}}>
                        {replyLoading?(
                            <ClipLoader color={theme.primaryColor}   loading={replyLoading}     />
                        ):(
                            <i class='bx bx-play' style={{fontSize:22}}></i>
                        )}
                        
                    </span>
                </a>
                <a href="javascript:;" onClick={()=>{inputFile.current.click()}}>
                    <span class="input-group-text" style={{padding:0,paddingTop:1,paddingBottom:1,paddingLeft:10,paddingRight:10}}>
 
                            <i class='bx bx-file' style={{fontSize:22}}></i>
                      
                        
                    </span>
                </a>
                
            </div>
            <input type="file" ref={inputFile} style={{visibility: 'hidden'}} onChange={(e)=>handleImageChange(e)} />
        </div>
        </>
        ):(null)
        }

            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
    </>
  )
}

export default MessageItemLayout