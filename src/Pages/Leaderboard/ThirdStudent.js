import React from 'react'
import {ThirdStudentDiv, SpecialName, SpecialNumber, SpecialScore, SpecialProfilePic} from './Styled'

function ThirdStudent({rank, profilePic, name, marksobt, fullmar}) {
    return (
        <ThirdStudentDiv>
           <SpecialNumber>{rank}</SpecialNumber>
            <SpecialProfilePic><img src={profilePic} alt="profilepic" /></SpecialProfilePic>
            <SpecialName>{name}</SpecialName>
            <SpecialScore>{marksobt}/{fullmar}</SpecialScore>
        </ThirdStudentDiv>
    )
}

export default ThirdStudent
