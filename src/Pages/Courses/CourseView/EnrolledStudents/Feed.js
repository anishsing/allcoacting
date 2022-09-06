import React, { useState, useEffect } from 'react'

import {fetch_student_feed} from '../../../../api/Student'
import {dataLimit} from '../../../../index'

export default function Feed(props) {

    const[offset, setOffset] = useState(0)
    const [feedData, setFeedData] = useState([])
    const [showText, setShowText] = useState(true)
    const [showImage, setShowImage] = useState(false)
    const [showPolls, setShowPolls] = useState(false)

    const StudentFeedCallback=(response) => {
        if(response.status==200){
            response.json().then(data => {
                console.log('getting Feed data', data)
            })
        }
    }

    useEffect(()=>{
        fetch_student_feed(props.userId, offset, dataLimit, StudentFeedCallback)
    },[offset])

    return (
        <div>
           <h2 className="mt-4">Student Feed</h2> 
        </div>
    )
}
