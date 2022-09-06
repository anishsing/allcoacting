import React, { useEffect, useState } from 'react'
import {forgotPassword} from '../../api/login'
import { useDispatch, useSelector } from 'react-redux' 
import {Link, Redirect,useHistory ,useParams} from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import { theme } from '../..';
function ForgotPassword({setMode}) {

    const [email, setEmail]=useState("")
    const [error,setError] = useState(null);
    const [msg,setMsg] = useState(null);
 
    const [loading, setLoading]=useState(false)
    const dispatch = useDispatch()
    const history = useHistory();
    const authStatus = useSelector((state)=>state.ins.authStatus)


    const forgotPasswordCallback=(response)=>
    {
        setLoading(false)
        if(response.status==200)
        {
             setMsg("Reset Link Sent, Please Check your Email")
        }
        else
        {
             setError("Unable to find account with your email address")
        }
    }

    const forgotPasswordBtnHandler=()=>
    {
        if(validateData())
        {
            if(!loading)
            {
                setLoading(true)
                setError('') 
                setMsg('')
                forgotPassword(email,forgotPasswordCallback)
            }
            

        }else
        {
            setError("Please enter your registered email address")
        }
        
    }
    useEffect(()=>{
        if(authStatus) 
        {
            history.push("/dashboard")
        }
    },[])
    const validateData=()=>email

  return ( 
        <div class="card-body pt-5 ">
            <div className="text-center">
                    <img src="assets/images/logo-icon.png" width="300px" alt=""/> 
                    <h4 class="mt-5 font-weight-bold">Forgot Password?</h4>
                    <p class="text-muted">Enter your registered email ID to reset the password</p>
            </div>
            <div className="justify-content-center align-items-center d-flex">
                {error?(
                    <span style={{color:'red',fontWeight:'bold'}}>{error}</span>
                ):(null)}
                    
            </div>
            <div className="justify-content-center align-items-center d-flex">
                {msg?(
                    <span style={{color:'green',fontWeight:'bold'}}>{msg}</span>
                ):(null)}
                    
            </div>
            <div class="mb-3 mt-4">
                <label class="form-label">Email id</label>
                <input type="text" class="form-control form-control-lg " placeholder="example@user.com" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div class="d-grid gap-2" style={{flexDirection:'column',display: 'flex'}}>
                <button type="button" class="btn btn-primary btn-lg  mb-2" onClick={forgotPasswordBtnHandler}>
                {loading?(
                    <ClipLoader color={theme.primaryColor}   loading={loading}     />):("Send Reset Link")
                }
                </button>
                    <a href="javascript:void(0)" onClick={()=>setMode("login")}><i class='bx bx-arrow-back mr-1'></i>Back to Login</a>
            </div>
        </div>
		 
  )
}

export default ForgotPassword