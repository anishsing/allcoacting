import React, { useState, useEffect } from 'react';
import {validateLogin} from '../../api/login'
import { useDispatch, useSelector } from 'react-redux'
import { SET_AUTH_STATUS, SET_INSTITUTE_DETAILS } from '../../Reducers/types';
import {Link, Redirect,useHistory } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";
import { theme } from '../..';
import ForgotPassword from '../../Pages/ForgotPassword/ForgotPassword';

const Login = props => 
{
    const [email, setEmail]=useState("")
    const [password, setPassword]=useState("")
    const [error,setError] = useState(null);
    const [redirect, setRedirect]=useState(false)
    const [loading, setLoading]=useState(false)
    const [showPassword, setShowPassword]   = useState(false);
    const [mode,setMode] = useState("login");
    const dispatch = useDispatch()
    const history = useHistory();
    const authStatus = useSelector((state)=>state.ins.authStatus)
    const loginCallBack=(response)=>
    {
        if(response.status==200)
        {
            response.json().then(data=>{
   
                if(data)
                {
                    dispatch({ type: SET_AUTH_STATUS,payload:{authStatus: true}})
                    dispatch({ type: SET_INSTITUTE_DETAILS,payload:{insDetails: data}})
                    localStorage.setItem('data', JSON.stringify(data));
                    setRedirect(true)
                    history.push("/dashboard");
                }
                else  
                {
                    console.log("login success",data,typeof data)
                    setError("Email or password is incorrect")
                }
                setLoading(false)
            })           
        }
        else
        {
            console.log(response.status)
        }
    }

    const login=()=>
    {
        if(validateLoginData())
        {
            if(!loading)
            {
                setLoading(true)
                setError('')
                validateLogin(email,password, loginCallBack)
            }
            

        }else
        {
            setError("Please Fill All The Fields.")
        }
        
    }
    useEffect(()=>{
        if(authStatus) 
        {
            history.push("/dashboard")
        }
    },[])
    const validateLoginData=()=>email&&password

    const renderLoginForm = ()=>
    {
        return(
            <div className="card-body p-md-5">
                <div className="text-center">
                    <img src="assets/images/logo-icon.png" style={{width: '300px'}} alt=""/>
                    <h3 className="mt-4 font-weight-bold">Welcome Back</h3>
                </div>

                <div className="justify-content-center align-items-center d-flex">
                    {error?(
                        <span style={{color:'red',fontWeight:'bold'}}>{error}</span>
                    ):(null)}
                        
                </div>
                <div className="form-group mt-4">
                    <label>Email Address</label>
                    <input type="text" className="form-control" placeholder="Enter your email address" onChange={(e)=>setEmail(e.target.value)} />
                </div>
                
                <label>Password</label>
                <div className="input-group mb-3">
                    <input type={showPassword?"text":"password"} className="form-control" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
                    <div class="input-group-append">
                        <a  href="javascript:void(0);" onClick={()=>setShowPassword(!showPassword)}><span class="input-group-text" ><i class={showPassword?"bx bx-low-vision":"bx bx-show"}></i></span></a>
                    </div>
                </div>
                <div className="row">
                        <div class="col-md-7">
                                
                        </div>
                        <div class="col-md-5 text-end">	<a href="javascript:void(0);"  onClick={()=>setMode("forgotPaswword")}>Forgot Password ?</a>
                        </div>
                </div>
                
                <div className="btn-group mt-3 w-100">
                    <button type="button" className="btn btn-primary btn-block" onClick={()=>login()}>
                    {loading?(
                        <ClipLoader color={theme.primaryColor}   loading={loading}     />

                    ):('Log In')}</button>
                    <button type="button" className="btn btn-primary"><i className="lni lni-arrow-right"></i>
                    </button>
                </div>
                
                <hr/>
                <p>Don't have an account?<Link to="/signup"> SignUp</Link></p>
            </div>
        )
    }
    return( 
                <div className="section-authentication-login d-flex align-items-center justify-content-center mt-5">
                    <div className="row">
                        <div className="col-12 col-lg-10 mx-auto">
                            <div className="card radius-15">
                                <div className="row no-gutters">
                                    <div className="col-lg-6">
                                        {mode=="login"?(
                                                    renderLoginForm()
                                            
                                        ):(
                                            <ForgotPassword 
                                                setMode={setMode}
                                            />
                                        )}
                                    </div>
                                    <div className="col-lg-6">
                                        <img src="assets/images/login-images/login-frent-img.jpg" className="card-img login-img h-100" alt="..."/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
        
    )
}
export default Login