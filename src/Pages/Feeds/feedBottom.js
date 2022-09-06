import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { like_feed, unlike_feed } from '../../api/feed'
import {
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton, 
    InstapaperIcon, 
    InstapaperShareButton, 
    LinkedinShareButton, 
    PinterestIcon, 
    PinterestShareButton, 
    RedditIcon, 
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton, 
    TwitterIcon, 
    TwitterShareButton, 
    WhatsappIcon, 
    WhatsappShareButton, 
  } from "react-share";
  import {CopyToClipboard} from 'react-copy-to-clipboard';

const FeedBottom = props => {
    
    const { feed, feedId,setShowComment} = props;
    const [likes, setLikes] = useState(feed.feed.feed.likes)
    const [commentCount, setCommentCount] = useState(feed.feed.feed.commentCount)
    const [alreadyLiked, setAlreadyLiked] = useState(false)
    const [showShareOptions,setShowShareOptions]     = useState(false)
    const insDetails = useSelector((state) => state.ins.insDetails)
    const [copied, setCopied] = useState(false)
    const likesCallback = (response) => {
        
        if (response.status === 200) {

            setLikes(likes + 1)
            setAlreadyLiked(true)
        }
    }


    const unlikesCallback = (response) => {
        console.log(response.status)
        if (response.status === 200) {

            setLikes(likes - 1)
            setAlreadyLiked(false)
        }
    }



    useEffect(() => {
        if (feed.feed.feed.feedLikerIns.includes(`,${insDetails.id},`)) {
            setAlreadyLiked(true);
        } else {
            setAlreadyLiked(false)
        }
    }, [])


    const likeHandler = () => {
        like_feed(feedId, 1, insDetails.id, likesCallback)

    }
    const unlikeHandler = () => {
        unlike_feed(feedId, 1, insDetails.id, unlikesCallback)

    }

 


    return (
        <div className="justify-content-center mx-4 mb-3">
            {alreadyLiked ? (
                <button type="button" className="btn " onClick={() => unlikeHandler()}><i className="lni lni-heart-filled"></i>{likes}</button>
            ) : (

                <button type="button" className="btn " onClick={() => likeHandler()}><i className="bx bx-heart"></i>{likes}</button>
            )}

            <button type="button" className="btn" onClick={()=>setShowComment(true)}><i className="bx bx-comment"></i>{commentCount}</button>
            <button type="button" className="btn float-right" onClick={() =>{if(showShareOptions){};setShowShareOptions(true)}}><i className="bx bx-share-alt"></i></button>
            {showShareOptions?(
                <>
                
                <div className="row mt-2 mb-2 d-flex align-items-center justify-content-center">
                    <div className="col-10">
                        <input type="text" className="form-control" name="feedId" value={`https://allcoaching.in/feed/${feedId}`} />
                    </div>
                    <div className="col-1">
                        <CopyToClipboard text={`https://allcoaching.in/feed/${feedId}`}
                            onCopy={() => setCopied(true)}>
                            <button className="btn"><i className="bx bx-copy"></i></button>
                        </CopyToClipboard>
                        
                    </div>
                    <div className="col-1">
                            <button type="button" onClick={() =>setShowShareOptions(false)}className="btn" ><i className="bx bx-x"></i></button>
                        
                    </div>
                </div>
                <div className="row mt-1">
                    
                    <div className="col-1">
                        <FacebookShareButton size={32} round={true} url={`https://allcoaching.in/feed/${feedId}`}>
                            <FacebookIcon size={32} round={true} />
                        </FacebookShareButton>
                        
                    </div>
                    <div className="col-1">
                        <WhatsappShareButton size={32} round={true} url={`https://allcoaching.in/feed/${feedId}`}>
                            <WhatsappIcon size={32} round={true} />
                        </WhatsappShareButton>

                    </div>
                    <div className="col-1">
                        <InstapaperShareButton size={32} round={true} url={`https://allcoaching.in/feed/${feedId}`}>
                            <InstapaperIcon  size={32} round={true}/>
                        </InstapaperShareButton>

                    </div>
                    <div className="col-1">
                        <TwitterShareButton size={32} round={true} url={`https://allcoaching.in/feed/${feedId}`}>
                            <TwitterIcon size={32} round={true} />
                        </TwitterShareButton>

                    </div>
                    <div className="col-1">
                        <RedditShareButton size={32} round={true} url={`https://allcoaching.in/feed/${feedId}`}>
                            <RedditIcon size={32} round={true} />
                        </RedditShareButton>

                    </div>
                    <div className="col-1">
                        <TelegramShareButton size={32} round={true} url={`https://allcoaching.in/feed/${feedId}`}>
                            <TelegramIcon size={32} round={true} />
                        </TelegramShareButton>

                    </div>
                    <div className="col-1">
                        <PinterestShareButton size={32} round={true} url={`https://allcoaching.in/feed/${feedId}`}>
                            <PinterestIcon size={32} round={true} />
                        </PinterestShareButton>

                    </div>
                </div>
                </>
            ):(null)}
             
        </div>
    );
}

export default FeedBottom;