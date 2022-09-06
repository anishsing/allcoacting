import React, { useState, useEffect }from 'react'

export default function  CourseDocumentPlaylistRow(props) {

    const {row,index,deletePlaylistHandler,setEditValues}=props 
     
   
    return (
        <>
        <tr>
        <td align="center">{index+1}</td> 
        <td align="center">{row.name}</td>  
   
        <td align="center">
            {row.id!=-1?(
                <>
                    <button aria-label="delete" className="btn btn-danger mr-1" onClick={()=>deletePlaylistHandler(row.id,index)}>
                        DELETE
                    </button>
                    <button aria-label="delete" className="btn btn-info mr-1" data-toggle="modal" data-target="#addPlayListModal" onClick={()=>setEditValues(row.name,row.id,index)}>
                        Edit
                    </button> 
                </>
            ):(null)} 
        </td>
    </tr>  
        </>
    )
}
