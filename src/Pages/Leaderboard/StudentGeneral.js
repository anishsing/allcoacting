import React from 'react'
import styled from 'styled-components'
import { ViewSolution } from './Styled'
import profile from './profile.png'
import arrow from './right-arrow.png'

function StudentGeneral({rank, profilePic, name, marksobt, fullmar}) {
    return (
        <Student>
            <Number>{rank}</Number>
            <ProfilePic><img src={profilePic} alt="profilepic" /></ProfilePic>
            <Name>{name}</Name>
            <Score>{marksobt}/{fullmar}</Score>
            <ViewSolution><img src={arrow} alt="arrow" /></ViewSolution>
        </Student>
    )
}

export default StudentGeneral

const Number = styled.div`
    width: 40px;
    color: black
    padding: 5px;
    @media only screen and (max-width: 600px) {
        width: 25px;
        
      }

`
const Name = styled.div`
    color: black;
    align-items: center;
    display: flex;
    width: 200px;
    text-align: center;

`
const Score = styled(Name)`
    width: 90px;
    margin: 5px;
    color: black;

`
const ProfilePic = styled.div`

    width: 100px;
    margin: 10px;
    img {
        width: 25px;
    }
    @media only screen and (max-width: 600px) {
        margin: 10px;
        width: 70px;
        
      }
`
const Student = styled.div`
    background-color: rgb(237,237,237);
    width: 500px;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    height: 40px;
    font-weight: 600;
    color: black;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    @media only screen and (max-width: 600px) {
        width: 300px;
        
      }
    
`