import React, { useEffect, useState } from "react";
import FeedTop from "./feedTop";
import Comment from './comments'
import FeedBottom from "./feedBottom";
import { fetch_feeds } from '../../api/feed'
import PollFeedRow from "./pollFeedRow";
import { useSelector } from 'react-redux'

const PollFeed = props => {
  
    const { feed ,setFeedToEdit,index,removeFeedFromState} = props
    const insDetails = useSelector((state) => state.ins.insDetails)
    let insId = insDetails.id
  
    const [showComments ,setShowComment] = useState(false)
    const [totalPollVotes, setTotalPollVotes] = useState(props.feed.feed.feed.totalPollVotes)
    const [optionData, setOptionData] = useState(props.feed.feed.feedPollOptions)
    const [canUserVote, setCanUserVote] = useState(props.type==1?(props.feed.feed.feed.pollVotedInstitutes.includes(`,${insId},`)?(false):(true)):(props.type==2?(props.feed.feed.feed.pollVotedStudents.includes(`,${props.userInfo.id},`)?(false):(true)):(true)))
    const [focusedOptionIndex, setFocusedOption] = useState(-1)
    useEffect(()=>{
        setTotalPollVotes(props.feed.feed.feed.totalPollVotes)
        setOptionData(props.feed.feed.feedPollOptions)
        setCanUserVote(props.type==1?(props.feed.feed.feed.pollVotedInstitutes.includes(`,${insId},`)?(false):(true)):(props.type==2?(props.feed.feed.feed.pollVotedStudents.includes(`,${props.userInfo.id},`)?(false):(true)):(true)))
    },[feed])
    const setFocusedOptionIndex=(focusedOptionIndex)=>
    {
        this.setFocusedOption(focusedOptionIndex)
    }

    const updateVote=(option_id)=>
    {
        console.log("here", option_id)
        let optData = props.feed.feed.feedPollOptions.map((item)=>{
            if(item.id==option_id)
            {
                return {...item,upVotes:parseInt(item.upVotes)+1}
            }
            else
            {
                return item
            }
        })
        console.log("opt", optData)
        setTotalPollVotes(parseInt(totalPollVotes)+1)
        setOptionData(optData)
        setCanUserVote(false)
    }
    
    return (
            <div className="card justify-content-center" >
                <div className="card-body align-items-center">
                <FeedTop feed={feed} removeFeedFromState={removeFeedFromState} index={index} setFeedToEdit={setFeedToEdit}/>
                    <div className="ml-md-4 flex-grow-1 pt-3">
                        <div className="mb-md-0 mb-3">
                            <h5 dangerouslySetInnerHTML={{__html: feed.feed.feed.pollQuestion}}></h5>
                            {optionData.map((row, index) => (
                                <PollFeedRow row={row} totalPollVotes={totalPollVotes} updateVote={updateVote} setFocusedOptionIndex={setFocusedOptionIndex}  canUserVote={canUserVote} index={index} userType={1}/>
                            ))}
                        </div>
                    </div>
                    <FeedBottom feed={feed} feedId={feed.feed.feed.id} setShowComment={setShowComment}/>
                    {showComments?(

                        <Comment feed={feed} feedId={feed.feed.feed.id} />
                    ):(
                        null
                    )}
                </div>
            </div>
    )
}

export default PollFeed;