import { getTestSeriesStudentResponse } from '../../api/TestSeries'
import React,{ useState, useEffect } from 'react'
import { Topthreetemplate, Studenttemplate } from './Styled'
import { Shimmer } from 'react-shimmer'
import styled from 'styled-components'
import profile from './profile.png'
import arrow from './right-arrow.png' 
import FirstStudent from './FirstStudentRank'
import SecondStudent from './SecondStudent'
import ThirdStudent from './ThirdStudent'
import StudentGeneral from './StudentGeneral'
import { ThirdStudentDiv } from './Styled'
import { dataLimit } from '../..'


// we will take four props, 1st 2nd 3rd position student and rest of the student
function LeaderBoard(props) {
    
    const {match}=props  
    const {params}=match   
    const [student, setStudent] = useState([]); 
    const [loadmore, setLoadmore] = useState(false)
    const [loading, setloading] = useState(true)
    const [offset, setOffset]=useState(0);
    console.log(student)
    console.log(offset)
    console.log(loading)


    
    useEffect(() => {
        getTestSeriesStudentResponse(params.id, offset, dataLimit, leaderboardcallback)
            
    },[params.id, offset])

    const  leaderboardcallback = (response) => {
        console.log("data", response.status)
        if (response.status === 200) {
            response.json().then((data) => {
               
                    setloading(false)
                    if (data.length > 0) {
                        console.log("Leaderboard Data")
                        console.log(data)
                        setStudent(student.concat(data))
                    }
                    else {
                        setLoadmore(true)
                    }
               
                

            })
        }
    }
   


    return (
        
        (loading) ? (
            <Container>
                <TopThree>
                    <Topthreetemplate>
                     <Shimmer width={200} height={200} />
                    </Topthreetemplate>
                    <Topthreetemplate>
                     <Shimmer width={200} height={200} />
                    </Topthreetemplate>
                    <Topthreetemplate>
                     <Shimmer width={200} height={200} />
                    </Topthreetemplate>
                </TopThree>
                <Studenttemplate>
                    <Shimmer width={500} height={30} />
                </Studenttemplate>
                <Studenttemplate>
                    <Shimmer width={500} height={25} />
                </Studenttemplate>
            </Container>
            
        ) : (
            <Container>
               
            <TopThree>
            {student.map((row, index) => (
                
                    (index==0) ? (
                       
                            <FirstStudent 
                                name={row['student']['name']}
                                rank={index+1}
                                profilePic={profile}
                                //profilePic={row['student']['studentImage']}
                                marksobt={row['responseBrief']['correctQues']}
                                fullmar={(row['responseBrief']['correctQues']+row['responseBrief']['wrongQues'])+row['responseBrief']['skippedQues']}
                            />
                        
                        ) : 
                    
                    (index==1) ? (
                        <SecondStudent 
                            name={row['student']['name']}
                            rank={index+1}
                            profilePic={profile}
                            //profilePic={row['student']['studentImage']}
                            marksobt={row['responseBrief']['correctQues']}
                            fullmar={(row['responseBrief']['correctQues']+row['responseBrief']['wrongQues'])+row['responseBrief']['skippedQues']}
                        />
                        ) : 

                    (index==2) ? (
                        <ThirdStudent 
                            name={row['student']['name']}
                            rank={index+1}
                            profilePic={profile}
                            //profilePic={row['student']['studentImage']}
                            marksobt={row['responseBrief']['correctQues']}
                            fullmar={(row['responseBrief']['correctQues']+row['responseBrief']['wrongQues'])+row['responseBrief']['skippedQues']}
                        />
                    ) :
                    
                    (
                        <div></div>
                    )  
            ))}
            </TopThree>
            {student.map((row, index) => (
            ((row['responseBrief']['rank'])>2) ? (
                        <StudentGeneral 
                            name={row['student']['name']}
                            profilePic={profile}
                            //profilePic={row['student']['studentImage']}
                            rank={index+1}
                            marksobt={row['responseBrief']['correctQues']}
                            fullmar={(row['responseBrief']['correctQues']+row['responseBrief']['wrongQues'])+row['responseBrief']['skippedQues']}
                        />
                    ) : (
                        <div></div>
                    )  
            ))}
            {(loadmore) ? (
                <LoadMore>No more data</LoadMore>
                
            ) : (
                <LoadMore><button class="btn btn-primary" onClick={()=> {setOffset(offset+dataLimit); setloading(true)}}>See all scores</button></LoadMore>
            )}
        </Container>
        )
       
        
    
    )
}


export default LeaderBoard


const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
`
const TopThree = styled.div`
    
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    @media only screen and (max-width: 600px) {
        flex-direction: column;
      }
`


const LoadMore = styled.div`
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-top: 5px;
    width: 500px;
    text-align: end;
    padding-right: 10px;
    @media only screen and (max-width: 600px) {
        width: 300px;
        
      }
    

`