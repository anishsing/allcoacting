import moment from 'moment';
import React, { useState, useEffect } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import { serverBaseUrl, theme } from '../../../..';

function CourseTimeTableRow(props) {
    const { row, index, parentIndex, delSubject, setIsCourseTimeTableModalVisible, setMode } = props
 
    const [subjectId, setSubjectId] = useState(row.id);
    const [delLoading, setDelLoading] = useState(false);


    useEffect(()=>{
        setDelLoading(props.delLoading)
    },[props.delLoading])
console.log(row)

    return (
        <tr>
            <td align="center">{index + 1}</td>
            <td align="center">{row.title}</td>
            <td align="center">{row.subTitle}</td>
            <td align="center">{moment(row.date).format("D-M-Y")}</td>
            <td align="center">{row.time}</td>
            <td align="center">
                <button aria-label="delete" onClick={() => {delSubject(subjectId, index, parentIndex, "item")}} className="btn btn-danger mr-1">
                    {delLoading?(
                        <ClipLoader color={theme.primaryColor}   loading={delLoading}     />
                    ):("DELETE")}
                </button>

            </td>
        </tr>
    )
}
export default CourseTimeTableRow
