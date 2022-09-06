import React, { useState, useEffect }from 'react'
import { Link } from 'react-router-dom';

function LeadsRow(props) {
    const {row,index,delReview} = props; 
    return (
        <tr>
            <td align="center">{index+1}</td>
            <td align="center">{row.courseName}</td>
            <td align="center">{row.leads}</td>
        </tr>
    )
}

export default LeadsRow
