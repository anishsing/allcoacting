import React from 'react'
import styled from 'styled-components'

export const SpecialProfilePic = styled.div`

    width: 80px;
    img {
        width: 100%;
    }
`
export const ProfilePic = styled.div`

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

export const ViewSolution = styled.div`
    cursor: pointer;
    display: flex;
    height: 40px;
    width: 50px;
    align-items: center;
    border-top-right-radius:5px;
    border-bottom-right-radius:5px;
    justify-content: center;
    img {
        width: 14px;
    }

`

export const SpecialNumber = styled.div`

    
    color: white;
    padding: 5px;
    font-size: 24px;
`

export const SpecialName = styled.div`
    color: white;
    margin: 5px;
    font-size: 20px;
`

export const SpecialScore = styled.div`
    color: white;
    font-size: 20px;
    margin: 5px;

`
export const FirstStudent = styled.div`
    margin: 10px;
    width: 200px;;
    background-color: #F0A22A;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    height: 200px;
    font-weight: 600;
    align-items: center;
    margin-bottom: 15px;
    order: 1;
`
export const SecondStudentDiv = styled(FirstStudent)`
    margin-top: 50px;
    background-color: #4FC6FC;
    order: 0;

`
export const ThirdStudentDiv = styled(FirstStudent)`
    background-color: #6BD7B6;
    margin-top: 50px;
    order: 2;

`
export const Topthreetemplate = styled(FirstStudent)`
    background-color: transparent;

`
export const Studenttemplate = styled.div`
    width: 500px;
    border-radius: 5px;
    margin-bottom: 10px;
    @media only screen and (max-width: 600px) {
        width: 300px;
        
      }
    
`

