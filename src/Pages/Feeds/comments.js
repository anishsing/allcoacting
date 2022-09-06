import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { add_comments, fetch_comments } from '../../api/feed'
import { dataLimit, serverBaseUrl, commentLimit } from '../..'
import moment from 'moment'
import { Shimmer } from "react-shimmer";


const Comment = props => {
    const { feed, feedId } = props
    const [comment, setComment] = useState([])
    const [addComment, setAddComment] = useState("")
    const [offset, setOffset] = useState(0);
    const [allCommentsLoaded, setAllCommentsLoaded] = useState(false)
    const [showLoadMoreButton, setShowLoadMoreButton] = useState()
    const insDetails = useSelector((state) => state.ins.insDetails)
    const [loadingComments, setLoadingComments] = useState(true);
    const [loadingMoreComments, setLoadingMoreComments] = useState(false);
    const commentsCallback = (response) => {
         
        if (response.status === 200) {
            response.json().then((data) => {
                if (data.length == commentLimit) {
                    setComment(data)
                    setShowLoadMoreButton(true)
                    
                } else if (data.length < commentLimit) {
                 
                    if (data.length == 0) {
                        setOffset(offset - 1)
                    }
                    else if (data.length != 0) {
                        setComment(data)
                    }
                    setShowLoadMoreButton(false)
                    setAllCommentsLoaded(true)

                }
                setLoadingComments(false);
            })
        }
    }

    const addCommentsCallback = (response) => {
       
        if (response.status === 201) {
            var arr = [...comment]

            var obj = {
                commenterObject: insDetails,
                feedComments: { comment: addComment, id: 0, insId: insDetails.id, commenter: 1, feedId: feedId },
            }
            arr.push(obj)
            setComment(arr)
        }
    }


    const action4AddComment = () => {
        add_comments(addComment, 1, feedId, insDetails.id, addCommentsCallback)
    }


    const loadMoreHandler = () => {
        if (!allCommentsLoaded) {
            setOffset(offset + 1)
        }

    }

    useEffect(() => {

        fetch_comments(feedId, offset, commentLimit, commentsCallback)
    }, [offset])




    return (
        <div class="justify-content-center w-100">
            <div class="">
                <div class="border-blue mt-3"> <span class="dots"></span>
                    <div class="form">
                        <div class="mt-2 d-flex justify-content-end">
                            <input class="form-control w-100" placeholder="Write a comment..." value={addComment} onChange={(e) => setAddComment(e.target.value)} />
                            <button class="btn btn-primary h-25 mx-2" type="button" onClick={() => action4AddComment()}>Add </button>
                        </div>
                    </div>
                </div>
                {loadingComments ? (

                    <div style={{ display: 'flex', flexDirection: 'row', margin: 10, alignItems: "center" }}>
                        <div style={{ borderRadius: 20, width: 40, height: 40, overflow: 'hidden' }}>
                            <Shimmer width={'100%'} height={'100%'} />
                        </div>
                        <div style={{ flex: 1, marginLeft: 10 }}>
                            <div style={{ margin: 5 }}>
                                <Shimmer width={'100%'} height={10} />
                            </div>
                            <div style={{ margin: 5 }}>
                                <Shimmer width={'80%'} height={10} />
                            </div>
                            <div style={{ margin: 5 }}>
                                <Shimmer width={'70%'} height={10} />
                            </div>
                        </div>
                    </div>

                ) : (

                    <>
                        {comment.map((row, index) => (
                            <div class="comment-section">
                                <div class="mt-3 border-blue"> <span class="dots"></span>
                                    <div class="d-flex justify-content-between ">
                                        <div class="d-flex flex-row">
                                            <div class="user-image">
                                                <img src={serverBaseUrl + row.commenterObject.logo} style={{ width: 40 }} class="rounded-circle shadow" />
                                            </div>
                                            <div class="d-flex flex-column mx-2 bg-light rounded">
                                                <h6 class="mb-0 mt-2 mx-2" style={{ fontSize: 14 }}>{row.commenterObject.name}</h6>
                                                <span class="date mx-2" style={{ fontSize: 10 }}>{moment(row.feedComments.timestamp).fromNow()}</span>
                                                <p class="content mx-2">{row.feedComments.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {loadingMoreComments ? (

                            <div style={{ display: 'flex', flexDirection: 'row', margin: 10, alignItems: "center" }}>
                                <div style={{ borderRadius: 20, width: 40, height: 40, overflow: 'hidden' }}>
                                    <Shimmer width={'100%'} height={'100%'} />
                                </div>
                                <div style={{ flex: 1, marginLeft: 10 }}>
                                    <div style={{ margin: 5 }}>
                                        <Shimmer width={'100%'} height={10} />
                                    </div>
                                    <div style={{ margin: 5 }}>
                                        <Shimmer width={'80%'} height={10} />
                                    </div>
                                    <div style={{ margin: 5 }}>
                                        <Shimmer width={'70%'} height={10} />
                                    </div>
                                </div>
                            </div>

                        ) : (
                            <>
                            {!allCommentsLoaded && showLoadMoreButton ? (
                                
                                <button type="button" className="btn btn-sm btn-link float-right" onClick={() => {loadMoreHandler(); setLoadingComments(true)}}>Load More</button>
                            ) : (null)}
                            </>
                        )}


                    </>

                )}







            </div>
        </div>
    )
}

export default Comment;