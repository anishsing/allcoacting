import React,{ useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { serverBaseUrl, theme } from '../../../..';
import ClipLoader from "react-spinners/ClipLoader";
 
function CourseBannerRow(props) {
    const {row,index,delBanner,setEditDetails}=props 
      
    const [ bannerImage,setBannerImage] = useState(serverBaseUrl+""+ row.bannerImageLink);
    const [bannerId,setBannerId] = useState(row.id);
    const [delLoading, setDelLoading] = useState(false);


    useEffect(()=>{
        setDelLoading(props.delLoading)
    },[props.delLoading])

    return (
        <tr>
        <td align="center">{index+1}</td> 
        <td align="center"> <img src={serverBaseUrl+row.bannerImageLink} className="img-responsive w-50 h-50"/></td>
   
        <td align="center">
        {/* <button aria-label="delete" onClick={()=>setEditDetails(serverBaseUrl+row.bannerImageLink)} className="btn btn-success mr-1">
            EDIT
        </button>  */}
        <button aria-label="delete" onClick={()=>{setDelLoading(true); delBanner(bannerId,index)}} className="btn btn-danger mr-1">
            {delLoading?(
                        <ClipLoader color={theme.primaryColor}   loading={delLoading}     />
                    ):("DELETE")}
        </button> 
        </td>
    </tr>
    )
}

export default CourseBannerRow
