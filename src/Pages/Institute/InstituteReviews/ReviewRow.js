import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { serverBaseUrl, theme } from '../../../index';
import ClipLoader from "react-spinners/ClipLoader";

function ReviewRow(props) {
    const { row, index, delReview, setEditDetails} = props;
    const [student, setStudent] = useState(row.studentName);
    const [rating, setRating] = useState(row.insReview.rating);
    const [review, setReview] = useState(row.insReview.review);
    const [reply, setReply] = useState(row.insReview.reply);
    const [reviewId, setReviewId] = useState(row.insReview.id);
    const [delLoading, setDelLoading] = useState(false);


    useEffect(()=>{
        setDelLoading(props.delLoading)
    },[props.delLoading])

    return (
        <tr>
        {review?(
            <>
            <td align="center">{index + 1}</td>
            <td align="center">{student}</td>
            <td align="center">{rating}</td>
            <td align="center">{review}</td>
            <td align="center">{row.insReview.reply}</td>

            <td align="center">
            
                <button aria-label="reply" onClick={() =>setEditDetails(reviewId, index, reply)} className="btn btn-danger mr-1">
                    REPLY
                </button>
                <button aria-label="delete" onClick={() => {setDelLoading(true); delReview(reviewId, index)}} className="btn btn-danger mr-1">
                    {delLoading?(
                        <ClipLoader color={theme.primaryColor}   loading={delLoading}     />
                    ):("DELETE")}
                </button>

            </td>
            </>
        ):(null)}
            
        </tr>
        
    )
}

export default ReviewRow
