import React, { useState, useEffect } from 'react'
import { dataLimit } from '../../..';
import { fetch_institute_reviews, updateReview } from '../../../api/review'; 
import Modal,{ModalBody, ModalHeader, ModalFooter} from "../../../components/modal/modal"
import ReviewRow from './ReviewRow';
import { Image, Shimmer } from 'react-shimmer'
import Snackbar from '@material-ui/core/Snackbar';
import ClipLoader from "react-spinners/ClipLoader";
function InstituteReviews(props) {

    const { insId } = props;
    const [offset, setOffset] = useState(0)
    const [reviewLoading, setReviewLoading] = useState(true)
    const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
    const [reviews, setReviews] = useState([])
    const [id,setId] = useState();
    const [reply,setReply] = useState();
    const [index,setIndex] = useState();
    const [allDataLoaded,setAllDataLoaded]=useState(false)
    const [showNextButton, setShowNextButton]=useState()
    const [showShimmer, setShowShimmer] = useState(true)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [delLoading, setDelLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        fetch_institute_reviews(insId, offset, dataLimit, reviewsCallBack)
    }, [insId])

    useEffect(() => {
        fetch_institute_reviews(insId, offset, dataLimit, reviewsCallBack)
    }, [offset])



    const reviewsCallBack = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setReviews(data)
                    setShowNextButton(true)
                } 
                else if(data.length<dataLimit) 
                {
                    console.log("else")
                    console.log(data.length)
                    if(data.length==0) 
                    {
                        if(offset==0)
                        {
                            setOffset(0)
                        }else
                        {
                            setOffset(offset-1)
                        }
                    }
                    else if(data.length!=0)
                    {     
                        setReviews(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                setReviews(data)
                console.log(data)
                setReviewLoading(false)
                setShowShimmer(false)
            })
        }
    }
    const nextPageHandler=()=>
    {
        if(!allDataLoaded)
        {
            setOffset(offset+1)
        }else {
            window.alert("No more data available")
        }
        
    }
    const prePageHandler=()=>
    {
        if(offset>0)
        {
            setOffset(offset-1)
        }
        else if(offset==0)
        {
            setOffset(0)
            setShowNextButton(true)
        }
        setAllDataLoaded(false)
        
    }



    const delReview = (id, index) => {
        if(window.confirm("Are you sure you want to delete?"))
        {
            updateReview(id, '', (response) => deleteCallBack(response, index))
        }  
    }

    const deleteCallBack = (response, index) => {
        setDelLoading(false)
        console.log(response.status)
        if (response.status == 200) {
            let arr = [...reviews]
            arr.splice(index, 1)
            setReviews(arr)
            setSnackBarMessage("Review Deleted Successfully")
            setIsSnackBarShow(true)
        }
        else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log("error", response.status)
        }
    }

    const updateReviewDetails = () => {
        if(!isLoading){
            if (window.confirm("Are yor sure want to update?")) {
                updateReview(id,reply,updateReviewCallBack)
                setDelLoading(true)
            }
        }

    }

    const updateReviewCallBack = (response) => {
        console.log(response.status)
        setIsLoading(false)
        if (response.status === 200) {
            var arr = [...reviews]
            arr[index].insReview.reply=reply
            setSnackBarMessage("Review Details Updated Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
        setIsReplyModalVisible(false)
        setReviews(arr)
    }

    const setEditDetails=(id, index, reply)=>{
        setId(id);
        setIndex(index);
        setReply(reply);
        setIsReplyModalVisible(true);
    }

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }

    return (
        <div className="mt-3">
             <div class="table-responsive">
                <table class="table table-striped table-bordered mb-0" id="table1">
                    <thead class="thead-dark">
                        <tr>
                            <th align="center">#</th>
                            <th align="center">Student</th>
                            <th align="center">Rating</th>
                            <th align="center">Review</th>
                            <th align="center">Reply</th>
                            <th align="center">Actions</th> 
                        </tr>
                    </thead>
                    <tbody>
                    {showShimmer?(
                                <td colspan="6">
                                  <Shimmer width={'100%'} height={40} /> 
                                </td>
                            ):(
                                <>
                            {reviews.map((row, i) => (
                                    <ReviewRow row={row} index={i} delReview={delReview} setEditDetails={setEditDetails} delLoading={delLoading}/>
                                ))}
                            </>
                            )}

                    </tbody>
                </table>
            </div>
            
            
        <Modal
                visible={isReplyModalVisible}
                setModalVisible={setIsReplyModalVisible}
                modalId={"courseModal"}
            >
                <ModalHeader>
                    <h5 className="modal-title">Reply</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>
                    <form >
                        <div className="form-row">
                            <label>Reply</label>
                            <input className="form-control" value={reply} placeholder="Reply Message" onChange={(e)=>setReply(e.target.value)} />
                        </div>
                    </form>
                </ModalBody>
                <ModalFooter>

                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    {isLoading ? (
                            <button type="button" class="btn btn-primary px-5">
                                <ClipLoader color={"white"} size={18} />
                            </button>) : (
                    <button type="button" className="btn btn-primary" onClick={updateReviewDetails} >Reply</button>
                            )}
                </ModalFooter>
            </Modal>
            <div class="modal-footer">
            {offset>0?(

                <button type="button" class="btn btn-primary" onClick={()=>prePageHandler()}>Previous</button>
            ):(null)}
               {!allDataLoaded&&showNextButton?( 
                    <button type="button" class="btn btn-primary "  onClick={()=>nextPageHandler()}>Next</button>
               ):(null)}
                
            </div>

            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div>
    )
}

export default InstituteReviews
