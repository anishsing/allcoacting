import React from 'react'
import { useState, useEffect,useRef } from 'react'
import { useSelector } from 'react-redux'
import { addImgeFeed, saveFeed } from '../../api/feed'

import { serverBaseUrl } from '../..';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build';
import { serverApiUrl } from '../..';
export default function FeedAdd(props) {
    const {appendFeed,feed,updateFeed} =props
    const insDetails = useSelector((state) => state.ins.insDetails)
    const [isPoleActive, setPoleActive] = useState(false)
    const [feedImages,setFeedImages] = useState([])
    const [feedType,setFeedType] = useState(3);
    const [feedOptions,setFeedOptions] = useState([
        { 
            pollOption:''
        },
        {
            
            pollOption:''
        }
    ]); 
    const [feedOptionsCounter,setFeedOptionsCounter] = useState(2);
    const [addingFeed,setAddingFeed] = useState(false);
    const [description,setDescription] = useState('')
    const [mode,setMode] = useState('add')
    const [feedId,setFeedId] = useState(null)
    const [creationTime,setCreationTime] = useState(null)
    const [feedObj,setFeedObj] = useState({});
    const [editIndex,setEditIndex] = useState(-1)
    let feedImageChooserRef = useRef();

    useEffect(()=>{
        if(feed)
        {
            setMode("edit");
            setFeedId(feed?.feed?.feed?.id)
            setDescription(feed?.feed?.feed?.description)
            setFeedOptionsCounter(feed?.feed?.feedPollOptions?.length?feed?.feed?.feedPollOptions?.length:0)
            setFeedOptions(feed?.feed?.feedPollOptions?feed?.feed?.feedPollOptions:[])
            setFeedType(feed?.feed?.feed?.feedType)
            setFeedImages(feed?.feed?.feedImages?feed?.feed?.feedImages:[])
            setCreationTime(feed?.feed?.feed?.creationTime)
            setEditIndex(feed?.index)
            console.log(feed?.feed?.feed?.feedType,"edit")
            

        }
    },[feed])

    const addPollOptions=()=>
    {
      let pollOptions  = [...feedOptions];
      let pollOptionCounter = feedOptionsCounter+1;
      pollOptions.push({pollOption:''})
      setFeedOptions(pollOptions)  
      setFeedOptionsCounter(pollOptionCounter) 
          
    } 

    const removePollOption=() => 
    {
        let pollOptions  = [...feedOptions];
        let pollOptionCounter = feedOptionsCounter-1;
        pollOptions.pop() 
        setFeedOptions(pollOptions)  
        setFeedOptionsCounter(pollOptionCounter) 
    }
     
    const openImageChooser = ()=>
    {
        setFeedType(1)
        feedImageChooserRef.click();
    }
    const handleImageChange=(e)=>
    { 
        let file = e.target.files[0]; 
        if(file)
        {
            let feedImagesArr = [...feedImages]
            feedImagesArr.push(file);
            setFeedImages(feedImagesArr) 
        }
        
    }

    const renderFeedImage=(item,index)=>
    {

        let url=""; 
        if(item instanceof File)
        {
            url = URL.createObjectURL(item);
        }else
        {
            console.log(item,url," url")
            url = serverBaseUrl+item.feedImage
        }
        return(
            <div style={{margin:10}}>
               
              <img src={url}  width={100} height={100}/>
              <span style={{position: 'relative',top:0,right:0,fontSize:20}} onClick={()=>removeFeedImage(item,index)}> 
                <i className="fadeIn animated bx bx-x" style={{color:'red'}}></i>
              </span>
            </div>
        )

    }
    const removeFeedImage=(item,index) => 
    {
         let feedImageArr = [...feedImages]
         feedImageArr.splice(index, 1)
         setFeedImages(feedImageArr);
    }

    const handlePollOptionInput=(index,e)=>
    {
        let pollOptions = [...feedOptions];
        pollOptions[index]['pollOption'] = e.target.value;
        setFeedOptions(pollOptions);
        
    }

    const renderPollOption=(item,index)=>
    {
          return (
              <div style={{
                  marginTop:'5%',   
                  display: 'flex',
                  flexDirection: 'column',
                  marginLeft: 10
                  }}>
                  <span style={{
                        fontSize: 14, 
                        color: "black", 
                        fontFamily:'Raleway_600SemiBold'
                  }}>Poll Option {index+1}</span> 
                      <input type="text" name="poll_option" onChange={(e)=>handlePollOptionInput(index,e)}  
                          placeholder={"Option "+(index+1)}  
                          style={{
                                    borderRadius: 10,
                                    padding: 10,
                                    borderWidth: 1,
                                    fontFamily: 'Raleway_600SemiBold',
                                    borderColor:"grey", 
                                }}
                          value={item.pollOption}
                      />   
              </div> 
          )
    }
   
 
   const  checkPostData=()=> {
        if(feedType!=3&&feedImages?.length == 0 && feedOptions?.filter(item=>item.pollOption=="")?.length==feedOptions?.length)
        {
            console.log("running")
            setFeedType(3);
            handleSubmitButtonClick(3)
        }else
        {
            handleSubmitButtonClick(feedType)
            console.log("running ", feedType)
        }
      }
    const handleSubmitButtonClick=(feedType)=>
      { 
          switch(feedType)
          {
              case 1:
                handleAddImageFeedBtnClick();
                break;
              case 2:
                handleAddPollFeedBtnClick();
                break;
              case 3:
                handleAddTextFeedBtnClick();
                break;
          }
      }

     const handleAddImageFeedBtnClick=()=>
      {
        
            if(!addingFeed)
            {
                setAddingFeed(true)
              
                let feed = {
                    feed:{
                        feedType:1,
                        description:description,
                        postedBy:1,
                        insId:insDetails.id, 
                        pollVotedInstitutes: ",",
                        pollVotedStudents: ",",
                        pollVoterList: ",",
                        feedLikerIns: ",",
                        feedLikerStudent: ",",  
                        categoryId:insDetails.category 
                    },
                    feedPollOptions:null
                }
                if(mode=="edit")
                {
                    feed.feed.edited=true
                    feed.feed.id=feedId;
                    feed.feed.creationTime=creationTime
                }
                // this.setState({feedItem:feed})
                setFeedObj(feed)
                addImgeFeed(feed,feedImages,(response)=>handleAddFeedCallback(response,feed))
            }  
         
      }
     const handleAddPollFeedBtnClick=()=>
      {
          if(verifyPollPost(description,feedOptions))
          {
              if(!addingFeed)
              {
                setAddingFeed(true)                
                let feed = {
                     feed:{
                        feedType:2,
                        description:description,
                        postedBy:1,
                        insId:insDetails.id, 
                        pollVotedInstitutes: ",",
                        pollVotedStudents: ",",
                        pollVoterList: ",",
                        feedLikerIns: ",",
                        feedLikerStudent: ",",  
                        categoryId:insDetails.category 
                    },
                    feedPollOptions:feedOptions,
                }
                if(mode=="edit")
                {
                    feed.feed.edited=true
                    feed.feed.id=feedId;
                    feed.feed.creationTime=creationTime
                     
                }
                // this.setState({feedItem:feed}) 
                setFeedObj(feed)
                
                saveFeed(feed,(response)=>handleAddFeedCallback(response,feed))
              }
                
          }else
          {
            // Toast.show('Please Fill All The Fields.');
            console.log('Please Fill All The Fields')
          }
      }
     const handleAddTextFeedBtnClick=()=>
      {
        if(verifyTextPost(description))
        {
            if(!addingFeed)
            {
                setAddingFeed(true);
                let feed = {
                    feed:{
                        feedType:3,
                        description:description,
                        postedBy:1,
                        insId:insDetails.id, 
                        pollVotedInstitutes: ",",
                        pollVotedStudents: ",",
                        pollVoterList: ",",
                        feedLikerIns: ",",
                        feedLikerStudent: ",",  
                        categoryId:insDetails.category 
                    },
                    feedPollOptions:null
                }
                if(mode=="edit")
                {
                    feed.feed.edited=true
                    feed.feed.id=feedId;
                    feed.feed.creationTime=creationTime
                }
                // this.setState({feedItem:feed})
                setFeedObj(feed)
                
                saveFeed(feed,(response)=>handleAddFeedCallback(response,feed))
            } 
        }
        else
        {
            // Toast.show('Please Fill All The Fields.');
            console.log('Please Fill All The Fields')
        }
      } 
    
    const verifyTextPost=(description)=>description
      
    const handleAddFeedCallback=(response,feedObj)=>
      {
          if(response.status==201)
          {
                let feedId = response.headers.get("location")
                if(mode=="edit")
                {
                    // Toast.show('Feed Updated Successfully.');
                    console.log("Feed Updated Successfully.")
                }
                else
                {
                    // Toast.show('Feed Added Successfully.');
                    console.log("Feed Added Successfully.")
                }
                setAddingFeed(false);
                setDescription("");
                setFeedImages([]);
                setFeedOptions([   
                    { 
                        pollOption:''
                    },
                    {
                        
                        pollOption:''
                    }
                ])
                setFeedType(3);
            //     this.setState({addFeedLoading:false,description:"",feedImageData:[],pollOptions:[
            //     {
                    
            //         pollOption:''
            //     },
            //     {
                    
            //         pollOption:''
            //     }
            //   ]})
           
    
          
    
            
            if(mode!="edit"){   
                 
                let feedItem = {feed:{...feedObj,feed:{...feedObj.feed,id:feedId}}};
               
                feedItem['posterObject']=insDetails
                appendFeed(feedItem)
            }
            else
            { 
                let feedItem = {feed: feedObj};
                feedItem['posterObject']=insDetails
                updateFeed(feedItem, editIndex)
            }
            // this.props.closeModal()
          }
          else
          {     
            // Toast.show('');
            console.log('Something Went Wrong. Please Try Again Later.')
          }
      }
     const verifyPollPost=(description,pollOptions)=>description&&pollOptions.filter(item=>item.pollOption)

    return (
        <>
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">Create Post</h5>

                    {/* <textarea  value={description} class="form-control" rows="3" onChange={(e)=>{setDescription(e.target.value)}} placeholder="Create Something"></textarea> */}
                    <CKEditor
                        editor={ClassicEditor}
                        config={{
                            ckfinder:
                            {
                                uploadUrl:serverApiUrl+"files/uploadFileCkEditor"
                            },
                            fontFamily: {
                                options: [
                                    'kruti_dev_010regular',
                                    "kruti_dev_010bold",
                                    "chanakyaregular",
                                    'Ubuntu, Arial, sans-serif',
                                    "walkman-chanakya-901bold",
                                    "GreekMathSymbols" 
                                ]
                            }

                        }}
                        data={description}
                        onReady={editor => {

                            console.log('Editor is ready to use!', editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            // setBlogContent(data)
                            setDescription(data)
                        }}
                        onBlur={(event, editor) => {
                        }}
                        onFocus={(event, editor) => {
                        }}
                    />
                    {feedType ==2?(
                         <div> 
                             {feedOptions.map((item,index) => (
                                 renderPollOption(item,index)
                             ))}

                            <div style={{flexDirection: 'row',alignItems: 'center',margin:10}}>
                                <span style={{fontSize:18,fontFamily: 'Raleway_600SemiBold'}}>Poll Options</span>
                                <div style={{flex: 1,flexDirection:'row',justifyContent: 'flex-end', alignItems: 'center'}}>
                                    <button className="btn btn-success" style={{margin:10,padding:10}} onClick={addPollOptions}>
                                            <i class="fadeIn animated bx bx-plus"></i>
                                    </button>
                                {feedOptionsCounter>2?( 
                                    <button className="btn btn-danger" style={{margin:10,padding:10}} onClick={removePollOption}>
                                        <i class="fadeIn animated bx bx-minus"></i> 
                                    </button>
                                    ):(null)} 
                                </div>
                            </div>
                         </div>
                    ):(null)}

                    <div style={{flexDirection:'row',display: 'flex'}}>
                        {feedType ==1?(

                            feedImages.map((item,index) =>(
                                        renderFeedImage(item,index)
                        ))
                            
                        ):(null)
                        }
                    </div>

                    <div class="btn-group m-1 mt-3 justify-content-end d-flex" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-success mr-2" onClick={()=>setFeedType(2)}>
                            <i class="fadeIn animated bx bx-poll"></i> Poll
                        </button>
                        <button type="button" class="btn btn-info mr-2" onClick={openImageChooser}>
                            <i class="fadeIn animated bx bx-images"></i>&nbsp;
                             Image
                        </button>
                        <button type="button" class="btn btn-primary" onClick={checkPostData}>
                           {mode=="edit"?"Save":"Post"} <i class="fadeIn animated bx bx-right-arrow-alt"></i>
                        </button>
                    </div>
                </div>
                <input type="file" onChange={(e)=>handleImageChange(e)} ref={(ref) =>feedImageChooserRef=ref} name="feedImages" style={{visibility: 'hidden',float: 'right'}}/>
            </div>  
        </>
    )
}
