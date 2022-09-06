import React from 'react'
import {SecondStudentDiv, SpecialName, SpecialNumber, SpecialScore, SpecialProfilePic} from './Styled'

function SecondStudent({rank, profilePic, name, marksobt, fullmar}) {
    return (
        <SecondStudentDiv>
            <SpecialNumber>{rank}</SpecialNumber>
            <SpecialProfilePic><img src={profilePic} alt="profilepic" /></SpecialProfilePic>
            <SpecialName>{name}</SpecialName>
            <SpecialScore>{marksobt}/{fullmar}</SpecialScore>
            
        </SecondStudentDiv>
    )
}

export default SecondStudent
