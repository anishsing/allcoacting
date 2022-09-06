import React, { useState, useEffect } from 'react'
import { dataLimit } from '../..';
import { currentMonthIncomeSumIns, fetchInsTransactions, todayIncomeSumIns, totalIncomeSumIns } from '../../api/transaction';
import TransactionRow from './TransactionRow';
import { Image, Shimmer } from 'react-shimmer'
import { useSelector } from 'react-redux'

function Transactions(props) {
    const [offset, setOffset] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [status, setStatus] = useState(-1)
    const [showShimmer, setShowShimmer] = useState(true)
    const [showNextButton, setShowNextButton] = useState()
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const insDetails = useSelector((state) => state.ins.insDetails)
    let insId = insDetails.id
    const [todaysIncome, setTodaysIncome] = useState('0')
    const [totalIncome, setTotalIncome] = useState('0')
    const [currentMonthTotal, setCurrentMonthTotal] = useState('0')

    useEffect(() => {
        fetchInsTransactions(insId, offset, dataLimit, (response) => {

            if (response.status == 200) {
                response.json().then(data => {
                    if (data.length == dataLimit) {
                        setTransactions(data)
                        setShowNextButton(true)
                    } 
                    else if(data.length<dataLimit) 
                    {
                        console.log("else")
                        console.log(data.length)
                        if(data.length==0) 
                        {
                            if(offset==0)
                        {
                            setOffset(0)
                        }else
                        {
                            setOffset(offset-1)
                        }
                        }
                        else if(data.length!=0)
                        {     
                            setTransactions(data)
                        }
                        setShowNextButton(false)
                        setAllDataLoaded(true)
                    }
                    setTransactions(data)
                    setLoadingTransactions(false)
                    console.log(data)
                    setShowShimmer(false)

                })

            }
        }, status)
        
    }, [offset])
    useEffect(() =>{
        if(insId)
        {
            todayIncomeSumIns(insId,(response) =>{
                if(response.status == 200)
                {
                    response.json().then(data=>{
                        setTodaysIncome(data)
                    })
                }
            })
            currentMonthIncomeSumIns(insId,(response) =>{
                if(response.status == 200)
                {
                    response.json().then(data=>{
                        setCurrentMonthTotal(data)
                    })
                }
            })
            totalIncomeSumIns(insId,(response) =>{
                if(response.status == 200)
                {
                    response.json().then(data=>{
                        setTotalIncome(data)
                    })
                }
            })
        }
    },[insId])
    const nextPageHandler = () => {
        if (!allDataLoaded) {
            setOffset(offset + 1)
        } else {
            window.alert("No more data available")
        } 
    }
    const prePageHandler = () => {
        if (offset > 0) {
            setOffset(offset - 1)
        }
        else if (offset == 0) {
            setOffset(0)
            setShowNextButton(true)
        }
        setAllDataLoaded(false)

    }

    return (
        <div>
            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Transactions</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="ml-auto">
                    {/* <div class="btn-group">
                        <button type="button" class="btn btn-dark" style={{marginRight: 5}} onClick={()=>setIsAboutCourseModalVisible(true)}>Edit About Course</button>
                    </div> */}
                </div>
            </div>
            <div className="row mt-5">

                <div className="col-lg-4 col-md-4">
                    <div className="card radius-15 bg-rose mx-lg-4 mx-md-2 mx-3">
                        <div className="card-body text-center">
                            <div className="widgets-icons mx-auto bg-white rounded-circle"><i className="bx bx-line-chart"></i>
                            </div>
                            <h4 className="mb-0 font-weight-bold mt-3 text-white">{todaysIncome}</h4>
                            <p className="mb-0 text-white">Todays Income</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-4">
                    <div className="card radius-15 bg-primary mx-lg-4 mx-md-2 mx-3">
                        <div className="card-body text-center">
                            <div className="widgets-icons mx-auto bg-white rounded-circle"><i className="bx bx-bulb"></i>
                            </div>
                            <h4 className="mb-0 font-weight-bold mt-3 text-white">{currentMonthTotal}</h4>
                            <p className="mb-0 text-white">This Month Income</p>
                        </div>
                    </div>
                </div>


                <div className="col-lg-4 col-md-4">
                    <div className="card radius-15 bg-info mx-lg-4 mx-md-2 mx-3">
                        <div className="card-body text-center">
                            <div className="widgets-icons mx-auto bg-white rounded-circle"><i className="bx bx-time"></i>
                            </div>
                            <h4 className="mb-0 font-weight-bold mt-3 text-white">{totalIncome}</h4>
                            <p className="mb-0 text-white">Total Income</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="mt-3">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered mb-0" id="table1">
                        <thead class="thead-dark">
                            <tr>
                                <th align="center">#</th>
                                <th align="center">OrderId</th>
                                <th align="center">Date</th>
                                <th align="center">Amount</th>
                                <th align="center">Student Name</th>
                                <th align="center">Student Mobile</th>

                                <th align="center">Course</th>
                                <th align="center">Institue</th>
                                <th align="center">Institue Email</th>
                                <th align="center">Status</th>
                                {/* <th align="center">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {showShimmer ? (
                                <td colspan="11">
                                    <Shimmer width={'100%'} height={40} />
                                </td>
                            ) : (
                                <>
                                    {transactions.map((row, i) => (
                                        <TransactionRow row={row} index={i} delTransaction={() => { }} />
                                    ))}
                                </>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>

            <div class="modal-footer">
                {offset > 0 ? (

                    <button type="button" class="btn btn-primary" onClick={() => prePageHandler()}>Previous</button>
                ) : (null)}
                {!allDataLoaded && showNextButton ? (
                    <button type="button" class="btn btn-primary " onClick={() => nextPageHandler()}>Next</button>
                ) : (null)}

            </div>
        </div>
    )
}

export default Transactions
