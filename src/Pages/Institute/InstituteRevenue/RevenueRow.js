import React, { useState, useEffect }from 'react'
import { Link } from 'react-router-dom';

function RevenueRow(props) {
    const {row,index,delReview} = props; 
    return (
        <tr>
            <td align="center">{index+1}</td>
            <td align="center">{row.totalCourseRevenue}</td>
            <td align="center">{row.courseName}</td>
            <td align="center">{row.courseFee}</td>
        </tr>
    )
}

export default RevenueRow
