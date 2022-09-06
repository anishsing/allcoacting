import React,{ useState, useEffect} from 'react'

export default function CourseVideoPlaylistRow(props) {

    const {row,index,deleteVideoPlaylistHandler,setEditValues }=props 
      
    const [ title,setTitle] = useState(row.name);
    

    return (
        <>
           <tr>
            <td align="center">{index+1}</td> 
            <td align="center">{row.name}</td>
           
    
            <td align="center">
                {row.id!=-1?(
                    <>
                        
                        <button className="btn btn-success mr-1" data-toggle="modal" data-target="#addPlayListModal" onClick={()=>setEditValues(row.name,row.id,index)}>
                            EDIT
                        </button> 
                        <button  className="btn btn-danger mr-1" onClick={()=>deleteVideoPlaylistHandler(row.id,index)}>
                            DELETE
                        </button> 
                        </>
                    ):(null)}
                
            </td>
        </tr> 
       </> 
    )
}
