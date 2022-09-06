import React, { useEffect, useState } from 'react'
import { dataLimit } from '../../../..';
import { fetch_allTransactions } from '../../../../api/transaction'
import CourseTransactionRow from './CourseTransactionRow';
import { Image, Shimmer } from 'react-shimmer'

function CourseTransaction() {

    const [offset, setOffset] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [status, setStatus] = useState(-1)
    const [showShimmer, setShowShimmer] = useState(true)
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()
    const [delLoading, setDelLoading] = useState(false);

    useEffect(() => {
        fetch_allTransactions(offset, dataLimit, (response) => {

            if (response.status == 200) {
                response.json().then(data => {
                    if (data.length == dataLimit) {
                        setTransactions(data)
                        setShowNextButton(true)
                    }
                    else if (data.length < dataLimit) {
                        console.log("else")
                        console.log(data.length)
                        if (data.length == 0) {
                            if (offset == 0) {
                                setOffset(0)
                            } else {
                                setOffset(offset - 1)
                            }
                        }
                        else if (data.length != 0) {
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
        <div className="mt-3">
            <div class="table-responsive">
                <table class="table table-striped table-bordered mb-0" id="table1">
                    <thead class="thead-dark">
                        <tr>
                            <th align="center">#</th>
                            <th align="center">Title</th>
                            <th align="center">Duration(mins)</th>
                            <th align="center">Max Marks</th>
                            <th align="center">Total Question</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showShimmer ? (
                            <td colspan="6">
                                <Shimmer width={'100%'} height={40} />
                            </td>
                        ) : (
                            <>
                                {transactions.map((row, i) => (
                                    <CourseTransactionRow row={row} index={i} />
                                ))}
                            </>
                        )}

                    </tbody>
                </table>
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

export default CourseTransaction

