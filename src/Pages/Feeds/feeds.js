import React from 'react'
import { useState, useEffect } from 'react'
import ImageFeed from './imageFeed';
import PollFeed from './pollFeed';
import TextFeed from './textFeed';
import { fetch_feeds, fetch_comments } from '../../api/feed'
import { dataLimit } from '../..';
import { Image, Shimmer } from 'react-shimmer'
import FeedAdd from './FeedAdd';
import { useSelector } from 'react-redux';

const Feeds = props => {
    const [feeds, setFeeds] = useState([])
    const [offset, setOffset] = useState(0);
    const [showLoader, setShowLoader] = useState(true)
    const [feedToEdit,setFeedToEdit] = useState(null)
    const insDetails = useSelector((state) => state.ins.insDetails)
    useEffect(() => { 
        fetch_feeds(insDetails.id,offset, dataLimit, feedCallback)
    }, [])

    const feedCallback = (response) => {
        if (response.status === 200) {
            response.json().then((data) => {
                console.log(data)
                setFeeds(data)
                setShowLoader(false)

            })
        }
    }

    const appendFeed=(feed)=>{
        let feedsArr = [...feeds]
        feedsArr.unshift(feed) 
        console.log("feedds arr",feedsArr)
        setFeeds(feedsArr)
        
         
    }
    const updateFeed=(feed,index)=>{
        let feedsArr = [...feeds]
        feedsArr[index] = feed; 
        setFeeds(feedsArr)    
        console.log("feedds arr",feedsArr)
    }
    const removeFeedFromState=(index)=>
    {
        let feedsArr = [...feeds]
        feedsArr.splice(index,1) 
        console.log("feedds arr",feedsArr)
        setFeeds(feedsArr)
    }

    return (
        <div style={{alignItems: 'center',justifyContent: 'center', }}>
            <FeedAdd feed={feedToEdit} appendFeed={appendFeed} updateFeed={updateFeed}  />


        {showLoader ? (
            <Shimmer width={'100%'} height={40} />) :
            (

                <div style={{width: '60%'}}>
                    {feeds.map((feed, index) => {
                        
                        switch (feed.feed.feed.feedType) {
                            case 1:
                            case "1":
                                return (<ImageFeed removeFeedFromState={removeFeedFromState} index={index} feed={feed} setFeedToEdit={setFeedToEdit} />)
                            case 2:
                            case "2":
                                return (<PollFeed  removeFeedFromState={removeFeedFromState} index={index} feed={feed} type={1}  setFeedToEdit={setFeedToEdit}/>);
                            case 3:
                            case "3":
                                return (<TextFeed  removeFeedFromState={removeFeedFromState} index={index} feed={feed} setFeedToEdit={setFeedToEdit} />);
                            default:
                                return (<Shimmer width={'100%'} height={40} />) 
                        } 
                    })}
                </div>
            )}
            </div>
    )
    
    
};



export default Feeds;