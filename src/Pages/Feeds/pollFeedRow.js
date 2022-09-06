import React, { useState } from 'react'
import PollFeed from './pollFeed'
import { useSelector } from 'react-redux'
import { votePoll } from '../../api/feed' 
import ClipLoader from "react-spinners/ClipLoader";
import { theme } from '../..';
// import ProgressBar from "@ramonak/react-progress-bar";

const PollFeedRow = props => {
    const { row, totalPollVotes, setFocusedOptionIndex} = props
    const percentage = () => Math.round((row.upVotes/totalPollVotes)*100,0 )
    const insDetails = useSelector((state) => state.ins.insDetails)
    const [loading, setLoading]=useState(false)
    let insId = insDetails.id

    const voteForPoll=(poll_id,option_id)=>
    {
        console.log(poll_id, option_id)
        votePoll(poll_id,option_id,1,insId,handleVotePollCallback)
        setLoading(true)
    }

    const handleVotePollCallback=(response,option_id)=>
    {
        console.log(response.status)
        if(response.status==200)
        {
            props.updateVote(option_id) 
            setLoading(false)
        }
        
        else
        {
            console.log("failed")
        }
    }

    console.log("row",row.upVotes)

    const switchCanUserVote=(status,index,row)=>{
        console.log(status)
        switch(status)
        {
            case true:
                return(
                    <div>
                        <div className="progress mt-3" style={{ height: 30 }} onClick={()=> voteForPoll(row.feedId,row.id)}> 
                        {loading?(
                                <ClipLoader color={theme.primaryColor}   loading={loading}     />
                        ):(
                            <button className="btn progress-bar bg-success"
                                role="progressbar" style={{ width: "0%" }}
                                aria-valuenow={0} aria-valuemin="0"
                                aria-valuemax="100">
                                    
                            <span style={{color:'black', marginTop: 12}}>{row.pollOption}</span>
                            </button>
                        )}
                        </div>
                    </div>
                )
            
            case false:
            return(
                <div className=" text-center">
                    <div className="progress mt-3 text-center" style={{ height: 30 }} onClick={()=>setFocusedOptionIndex(index)}> 
                    {loading?(
                                <ClipLoader color={theme.primaryColor}   loading={loading}     />
                        ):(
                        <button className="btn progress-bar bg-success"
                            role="progressbar" style={{ width: percentage()?percentage():1+"%" }}
                            aria-valuenow={percentage()?percentage():1} aria-valuemin="0"
                            aria-valuemax="100">
                        <span style={{color:'black', marginTop: 12}}>{row.pollOption}</span>
                        </button>
                        )}
                    </div>
                </div>
            )
        }
    }
   
    
    return (
            switchCanUserVote(props.canUserVote,props.index,row)
    )


}

export default PollFeedRow;