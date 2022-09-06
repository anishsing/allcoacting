import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
function TransactionRow(props) {

        const {row,index,delTransaction} = props
        const {orderId,courseId,insId,purchaseDate,amount,status}= row.transaction
       
        const {title} =row.course
        const {name,email} = row.institute
        // console.log(row);
    return (
        <tr>
            <td align="center">{index+1}</td>
            <td align="center">{orderId}</td>
            <td align="center">{moment(purchaseDate).format('DD-MM-YYYY HH:mm')}</td>
            <td align="center">{amount}</td>
            <td align="center">{row.student.name}</td>
            <td align="center">{row.student.mobileNumber}</td>
            <td align="center">{title}</td>
            <td align="center">{name}</td>
            <td align="center">{email}</td>
            <td align="center">{status}</td>
    
            {/* <td align="center">
            <button aria-label="delete" onClick={()=>delTransaction(courseId,index)} className="btn btn-danger mr-1">
                DELETE
            </button>  
            </td> */}
        </tr>
    )
}

export default TransactionRow
