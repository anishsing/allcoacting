import React, { useState } from "react";
import FeedTop from "./feedTop";
import FeedBottom from "./feedBottom";
import Comment from "./comments"
import { serverBaseUrl } from "../..";

const ImageFeed = props => {
    
    const { feed,setFeedToEdit,index,removeFeedFromState } = props 
    const [showComments ,setShowComment] = useState(false)
    return (
        <div> 
            <div class="card" >
                <div class="card-body">
                <FeedTop feed={feed} index={index} removeFeedFromState={removeFeedFromState} setFeedToEdit={setFeedToEdit} />
                    <div class="card-title mt-4 w-100 h-25">    
                        <h5 class="mb-0" dangerouslySetInnerHTML={{__html: feed.feed.feed.description}}></h5>
                    </div>
                    <hr />
                    <div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner">
                            {feed.feed.feedImages.map((row,index)=>{
                                if(typeof row =="object")
                                {
                                    return(
                                        <div class="carousel-item active">
                                            <img src={serverBaseUrl+row.feedImage} class="d-block w-100" style={{height: 400, width: '500'}} alt="..."/>
                                        </div>)
                                }else if(typeof row=='string')
                                {
                                    return(
                                        <div class="carousel-item active">
                                            <img src={serverBaseUrl+row} class="d-block w-100" style={{height: 400, width: '500'}} alt="..."/>
                                        </div>)
                                }
                                
                            })}
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

            
        </div>

    )
}

export default ImageFeed;