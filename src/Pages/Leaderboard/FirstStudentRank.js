import React from 'react'
import styled from 'styled-components'
import {FirstStudent, SpecialName, SpecialNumber, SpecialScore, SpecialProfilePic} from './Styled'
import { Shimmer } from 'react-shimmer'

function FirstStudentRank({rank, profilePic, name, marksobt, fullmar}) {
    return (
        <FirstStudent>
            <SpecialNumber>{rank}</SpecialNumber>
            <SpecialProfilePic><img src={profilePic} alt="profilepic" /></SpecialProfilePic>
            <SpecialName>{name}</SpecialName>
            <SpecialScore>{marksobt}/{fullmar}</SpecialScore>
                    
        </FirstStudent>
    )
}

export default FirstStudentRank
