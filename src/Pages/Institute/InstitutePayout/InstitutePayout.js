import React, { useState, useEffect } from 'react'
import {
    getTodaysTotalPayout, getTotalPayout,
    getPayoutByInstitute, getPayoutByInstituteMonthly
} from '../../../api/payout'
import { useSelector } from 'react-redux'
import { Link, useHistory } from "react-router-dom"



export default function InstitutePayout(props) {

    const insDetails = useSelector((state) => state.ins.insDetails)
    let instituteId = insDetails.id

    const history = useHistory();
    const [todaysPayout, setTodaysPayout] = useState('0')
    const [totalPayout, setTotalPayout] = useState('0')
    const [totalRemaining, setTotalRemaining] = useState('0')

    const [page, setPage] = useState('0')
    const [pageSize, setPageSize] = useState('10')

    const [payoutByInsData, setPayoutByInsData] = useState([])
    const [payoutByInsMonthlyData, setpayoutByInsMonthlyData] = useState([])

    const [isShowDataCurrent, SetIsShowDataCurrent] = useState(true)

 

    const getTotalPayoutCallback = (response) => {
        if (response.status == 200)
            response.json().then(data => {
                console.log('getting total payout', data)
                setTotalPayout(data)
            })
    }


    const getTodayTatalCallback = (response) => {
        getTotalPayout(instituteId, getTotalPayoutCallback)
        if (response.status == 200)
            response.json().then(data => {
                console.log('getting today total', data)
                setTodaysPayout(data)
            })
    }

 
    const getPayoutByInsCallback = (response) => {
        if (response.status == 200)
            response.json().then(data => {
                console.log('getting table data', data)
                setPayoutByInsData(data)
            })
    }


    const getPayoutByInsMonthlyCallback = (response) => {
        if (response.status == 200)
            response.json().then(data => {
                console.log('getting table monthly data', data)
                setpayoutByInsMonthlyData(data)
            })
    }

    useEffect(() => {
        getTodaysTotalPayout(instituteId, getTodayTatalCallback)
        getTotalPayout(instituteId, getTotalPayoutCallback)
        getPayoutByInstitute(instituteId, page, pageSize, getPayoutByInsCallback)
        getPayoutByInstituteMonthly(instituteId, page, pageSize, getPayoutByInsMonthlyCallback)

    }, [instituteId])


    return (
        <>
            <div className="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div className="breadcrumb-title pr-3">Payout View</div>
                <div className="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb mb-0 p-0">
                            <li className="breadcrumb-item"><a href="javascript:;"><i className='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>

            </div>

            <div className="row mt-5">

                <div className="col-lg-4 col-md-4">
                    <div className="card radius-15 bg-rose mx-lg-4 mx-md-2 mx-3">
                        <div className="card-body text-center">
                            <div className="widgets-icons mx-auto bg-white rounded-circle"><i className="bx bx-line-chart"></i>
                            </div>
                            <h4 className="mb-0 font-weight-bold mt-3 text-white">{todaysPayout}</h4>
                            <p className="mb-0 text-white">Today Payout</p>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4 col-md-4">
                    <div className="card radius-15 bg-primary mx-lg-4 mx-md-2 mx-3">
                        <div className="card-body text-center">
                            <div className="widgets-icons mx-auto bg-white rounded-circle"><i className="bx bx-bulb"></i>
                            </div>
                            <h4 className="mb-0 font-weight-bold mt-3 text-white">{totalPayout}</h4>
                            <p className="mb-0 text-white">Total Payout</p>
                        </div>
                    </div>
                </div>


                <div className="col-lg-4 col-md-4">
                    <div className="card radius-15 bg-info mx-lg-4 mx-md-2 mx-3">
                        <div className="card-body text-center">
                            <div className="widgets-icons mx-auto bg-white rounded-circle"><i className="bx bx-time"></i>
                            </div>
                            <h4 className="mb-0 font-weight-bold mt-3 text-white">{totalRemaining}</h4>
                            <p className="mb-0 text-white">Remaining Payout</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="d-flex">
                <div className="ml-auto">
                    <div className="btn-group">
                        <button type="button" class="btn btn-primary">Select Type</button>
                        <button type="button" class="btn btn-primary bg-split-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown"><span class="sr-only">Toggle Dropdown</span></button>

                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
                            <span class="dropdown-item" onClick={() => SetIsShowDataCurrent(true)} >Total Payout</span>
                            <span class="dropdown-item" onClick={() => SetIsShowDataCurrent(false)} >Month Payout</span>
                        </div>

                        <button type="button" className="ml-3 btn btn-dark" style={{ marginRight: 5 }} onClick={() => history.goBack()}>Go Back</button>

                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="table-responsive">
                    <table className="table table-striped table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Amount</th>
                                <th scope="col">OrderId</th>
                                <th scope="col">Payout Time</th>
                            </tr>
                        </thead>
                        <tbody>

                            {isShowDataCurrent ? (
                                <>
                                    {payoutByInsData.map((item, index) =>
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.amount}</td>
                                            <td>{item.orderId}</td>
                                            <td>{item.payoutTime}</td>
                                        </tr>
                                    )}
                                </>
                            ) : (
                                <>
                                    {payoutByInsMonthlyData.map((item, index) =>
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.amount} </td>
                                            <td>{item.orderId}</td>
                                            <td>{item.payoutTime}</td>
                                        </tr>
                                    )}
                                </>
                            )}


                        </tbody>
                    </table>
                </div>
            </div>



        </>
    )
}
