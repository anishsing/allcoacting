import React, { useState, useEffect } from 'react';
import {passwordReset, validateLogin} from '../../api/login'
import { useDispatch, useSelector } from 'react-redux'
import { SET_AUTH_STATUS, SET_INSTITUTE_DETAILS } from '../../Reducers/types';
import {Link, Redirect,useHistory ,useParams} from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import { theme } from '../..';

const ResetPassword = props => 
{
    const {hash1,hash2} = useParams()
    const [password, setPassword]=useState("")
    const [passwordCnf, setPasswordCnf]=useState("")
    const [error,setError] = useState(null);
    const [msg,setMsg] = useState(null);
 
    const [loading, setLoading]=useState(false)
    const dispatch = useDispatch()
    const history = useHistory();
    const authStatus = useSelector((state)=>state.ins.authStatus)
    const resetCallback=(response)=>
    {
        setLoading(false)
        if(response.status==200)
        {
             setMsg("Password Changed Successfully")
        }
        else
        {
             setError("Something went wrong with your request, please try again")
        }
    }

    const resetPasswordBtnHandler=()=>
    {
        if(validateData())
        {
            if(!loading)
            {
                setLoading(true)
                setError('') 
                setMsg('')
                passwordReset(password,hash1,hash2,resetCallback)
            }
            

        }else
        {
            setError("Password Mismatch")
        }
        
    }
    useEffect(()=>{
        if(authStatus) 
        {
            history.push("/dashboard")
        }
    },[])
    const validateData=()=>passwordCnf&&password&&passwordCnf==password

    if(hash1&&hash2)
    {
        return( 
            <div class=" wrapper pt-5 ">
                <div className="authentication-reset-password d-flex align-items-center justify-content-center mt-5">
                    <div className="row">
                        <div className="col-12 col-lg-10 mx-auto">
                            <div className="card radius-15">
                                <div className="row no-gutters">
                                    <div className="col-lg-5">
                                        <div className="card-body p-md-5">
                                            <div className="text-center">
                                                <img src="/assets/images/logo-icon.png" width="80" alt=""/>
                                                <h4 class="mt-5 font-weight-bold">Genrate New Password</h4>
                                                <p class="text-muted">We received your reset password request. Please enter your new password!</p>
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
                                            <div class="mb-3 mt-5">
                                                <label class="form-label">New Password</label>
                                                <input type="text" class="form-control" placeholder="Enter new password" onChange={(e)=>setPassword(e.target.value)} />
                                            </div>
                                            <div class="mb-3">
                                                <label class="form-label">Confirm Password</label>
                                                <input type="text" class="form-control" placeholder="Confirm password" onChange={(e)=>setPasswordCnf(e.target.value)}/>
                                            </div>
                                            <div className="btn-group mt-3 w-100 mb-2">
                                                <button type="button" className="btn btn-primary btn-block" onClick={()=>resetPasswordBtnHandler()}>
                                                    {loading?(
                                                        <ClipLoader color={theme.primaryColor}   loading={loading}     />

                                                    ):('Reset Password')}</button>
                                                 
                                            </div>
                                            <Link to="/" class="btn btn-light w-100"><i class='bx bx-arrow-back mr-1'></i>Back to Login</Link>
                                            <hr/>
                                            
                                        </div>
                                    </div>
                                    <div className="col-lg-7">
                                        <img src="/assets/images/login-images/forgot-password-frent-img.jpg" class="card-img login-img h-100" alt="..."/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
    
        )
         
    }else
    {
        return null
    }
    
}
export default ResetPassword