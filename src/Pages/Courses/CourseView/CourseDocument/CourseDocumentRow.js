import React, { useState, useEffect }from 'react'
import { serverBaseUrl, theme } from '../../../..';
import {updateDocumentDemoStatus, updateDocumentStatus} from '../../../../api/document'
import ClipLoader from "react-spinners/ClipLoader";
import Menu from '../../../../components/Menu/Menu';
import moment from 'moment';

const CourseDocumentRow=props=> {
    const {row,index,delDocument, setEditDetails}=props 
      
    const [ title,setTitle] = useState(row.name);
    const [document,setDocument] = useState(serverBaseUrl+""+row.fileAddress)
    const [documentId,setDocumentId] = useState(row.id);
    const [hiddenStatus,setHiddenStatus] = useState(row.hidden);
    const [delLoading, setDelLoading] = useState(false);
    const [demo ,setDemo] = useState(row.demo)

    useEffect(() =>{

        setDemo(row.demo);
    },[row])
    useEffect(()=>{
        setDelLoading(props.delLoading)
    },[props.delLoading])


    const updateStatusCallBack=(response, status)=>{
        if(response.status==200)
        {
            setHiddenStatus(status)
        }
        else
        {
            console.log(response.status)
        }
    }
    const updateDemoStatusCallBack=(response, status)=>{
        if(response.status==200)
        {
            setDemo(status)
        }
        else
        {
            console.log(response.status)
        }
    }

    return (












        <>


    <div className="col-12 mb-3" style={{flexDirection:'column',alignItems: 'center',justifyContent: 'center'}}>
            <div className="row " style={{alignItems: 'center',justifyContent: 'center'}} >
                <div className="col-1 align-items-center justify-content-center d-flex" >
                    <h4>{index+1}.</h4>
                </div>
                <div className="col-4">
                     
                    <img src={"/assets/images/pdfIcon.png"} className="w-50 h-50" style={{borderRadius:15,border: '1px solid grey'}}  />
                     
                </div>  
                <div className="col-3 align-items-center justify-content-center d-flex " style={{flexDirection: 'column'}}>
                        <h4>
                            {row.name?.length>20?(
                                row.name?.slice(0,20)+"..."
                            ):(
                                row.name
                            )}
                            
                        </h4>
                        <h6 className="align-items-center   d-flex">  <i className="lni lni-calendar ml-1 mr-1"></i> {moment(row.time_stamp).format("D/M/Y")}</h6>
                </div>
                <div class="col-4 justify-content-between">
                                
                <button aria-label="delete" onClick={()=>{ delDocument(documentId,index)}} className="btn btn-danger mr-1">
                    {delLoading?(
                        <ClipLoader color={theme.primaryColor}   loading={delLoading}     />
                    ):("DELETE")}
                </button> 
                <a href={document} target="_blank" aria-label="view" className="btn btn-primary mr-1">
                    VIEW
                </a>
                {hiddenStatus?(
                    <button aria-label="delete" onClick={()=>updateDocumentStatus(false,documentId,(response) => updateStatusCallBack(response, false))} className="btn btn-warning mr-1">
                        PUBLISH
                    </button> 
                ):(
                    <button aria-label="delete" onClick={()=>updateDocumentStatus(true,documentId,(response) => updateStatusCallBack(response, true))} className="btn btn-warning mr-1">
                        HIDE
                    </button> 
                )} 
                     <Menu>
                        <nav>
                        <ul class="nav">
                            <li> 
                                <a href="javascript:;" onClick={()=>setEditDetails(title,documentId,index,row.playlistId,false,true,serverBaseUrl+row.fileAddress)}>EDIT DETAILS</a>
                            </li>
                            <li> 
                                 <a href="javascript:;" onClick={()=>setEditDetails(title,documentId,index,row.playlistId,true, false,serverBaseUrl+row.fileAddress)}>EDIT Document</a> 
                            </li>

                             
                            <li> 
                                {demo?(

                                    <a href="javascript:;" onClick={()=>{updateDocumentDemoStatus(false,documentId,(response) => updateDemoStatusCallBack(response, false))}}>Close For Non Paid Users</a>
                                ):(

                                    <a href="javascript:;" onClick={()=>{updateDocumentDemoStatus(true,documentId,(response) => updateDemoStatusCallBack(response, true))}}>Open For All (Free)</a>
                                )} 
                            </li>
                          
                        </ul>
                        </nav>
                    </Menu>
            
                </div>
                
            </div>  
        </div>
       
    </>
    )
}

export default CourseDocumentRow
