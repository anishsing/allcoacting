import React, { useState, useEffect }from 'react'
import { dataLimit } from '../../..'; 
import { fetchRevenueOverview } from '../../../api/revenue';
import RevenueRow from './RevenueRow';

function InstituteRevenue(props) {
 
    const {insId} = props;
    const [offset, setOffset] = useState(0) 
    const [revenueLoading,setRevenueLoading] = useState(true)
    const [revenue, setRevenue] = useState({})
    
    useEffect(() =>{
        fetchRevenueOverview(insId, fetchRevenueOverviewCallback)
    },[insId])

    const fetchRevenueOverviewCallback=(response)=>{
        if(response.status==200)
        {
            response.json().then(data=>
            {
                console.log("revenue data",data);
                setRevenue(data)
            })
        }
        else
        {
            console.log("something went wrong")
        }
    }

    return (
        <div>
            <div className="mt-3">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered mb-0" id="table1">
                        <thead class="thead-dark">
                            <tr>
                                <th align="center">#</th>
                                <th align="center">Total Course Revenue</th>
                                <th align="center">Course Name</th>
                                <th align="center">Course Fees</th>
                            </tr>
                        </thead>
                        <tbody>
                            {revenue.salesOverViewDataDtos&&revenue.salesOverViewDataDtos.map((row, i) => (
                                <RevenueRow row={row} index={i} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default InstituteRevenue
