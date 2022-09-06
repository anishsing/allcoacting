import React, { useState, useEffect, useRef } from 'react';
import { signUp } from '../../../src/api/signup'
import { fetch_categories } from '../../../src/api/institute'
import { useDispatch, useSelector } from 'react-redux'
import { SET_AUTH_STATUS, SET_INSTITUTE_DETAILS } from '../../../src/Reducers/types';
import { Link, Redirect,useHistory } from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar'; 
import ClipLoader from "react-spinners/ClipLoader";

const Signup = props => {
    
    const [showPassword, setShowPassword]   = useState(false);
    const [file, setFile] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cnfPassword, setCnfPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [directorName, setDirectorName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [category, setCategory] = useState("")
    const [categoryData, seCategoryData] = useState([])
    const [about, setAbout] = useState("")
    const [redirect, setRedirect] = useState(false)
    const dispatch = useDispatch()
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const[isLoading, setIsLoading] = useState(false)
    const [imagePrev,setImagePrev] = useState("")
    const history = useHistory();
    
    const authStatus = useSelector((state)=>state.ins.authStatus)
    const indianStates = [ 
        "Andaman and Nicobar Islands",
        "Andhra Pradesh",
        "Arunachal Pradesh",
        "Assam",
        "Bihar",
        "Chandigarh",
        "Chhattisgarh",
        "Dadra and Nagar Haveli",
        "Daman and Diu",
        "Delhi",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal Pradesh",
        "Jammu and Kashmir",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Ladakh",
        "Lakshadweep",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Puducherry",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttar Pradesh",
        "Uttarakhand",
        "West Bengal"
    ]

    const fetchCategoryCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                console.log('getting category', data)
                seCategoryData(data)
            })
        }
    }
    useEffect(()=>{
        if(authStatus) 
        {
            history.push("/dashboard")
        }
    },[])

    useEffect(() => {
        fetch_categories(fetchCategoryCallback)

    }, [])


    const signupCallBack = (response) => {
        setIsLoading(false)
        if (response.status == 201) {
            console.log('signup', response.headers.get('location'))
            var obj = {
                id: response.headers.get('location'),
                logo: URL.createObjectURL(file),
                name: name,
                directorName: directorName,
                email: email,
                phone: phone,
                password: password,
                address: address,
                city: city,
                state: state,
                category: category,
                about: about
            }
            
            dispatch({ type: SET_INSTITUTE_DETAILS, payload: { insDetails: obj } })
            dispatch({ type: SET_AUTH_STATUS, payload: { authStatus: true } })
            localStorage.setItem('data', JSON.stringify(obj));
            setRedirect(true)
            history.push("/dashboard")
            
        }else
        {
            response.json().then(data => {
                console.log(data)
                if(data.message?.includes("ConstraintViolationException"))
                {
                    setSnackBarMessage("Email Already Exists")
                }else
                {
                    setSnackBarMessage("Something went wrong")
                }
                
                setIsSnackBarShow(true)
            })
            
        }
    }



    const signupClickHandler = (e) => {
        e.preventDefault()
        
        if(cnfPassword==password)
        {
            setIsLoading(true)
            signUp(file, name, directorName, email, phone, password, address, city, state, category, about, 0, signupCallBack)
        }else
        {
                setIsSnackBarShow(true)
                setSnackBarMessage("Password Mismatch")
        }
        
    }



    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }


    return ( 
            <div className=" " style={{marginTop:0}}>
                <div className="row align-items-center justify-content-center">
                    <div className="col-11 col-lg-11 " style={{margin: 10}} >
                        <div className="card radius-15">
                            <div className="row no-gutters">
                            {/* <div className="col-lg-6">
                                <img  style={{borderTopLeftRadius: 15,borderBottomLeftRadius: 15,borderTopRightRadius: 0,borderBottomRightRadius: 15}} src="assets/images/login-images/login-frent-img.jpg" className="card-img login-img h-100" alt="..." />
                            </div> */}
                            <div className="col-12 w-100">
                                <form onSubmit={signupClickHandler} >
                                  
                                        <div className="card-body p-md-4" >
                                            <div className="text-center">
                                                <img src="assets/images/logo-icon.png" style={{width: '300px'}} alt="" />
                                                <h3 className="mt-4 font-weight-bold">Welcome to AllCoaching</h3>
                                            </div>
                                            <div className="input-group  rounded mt-5 align-items-center justify-content-center">
                                                <img src={imagePrev} width="80" alt="" />
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group ">
                                                        <label>File</label>
                                                        <input type="file" required className="form-control" placeholder="Enter your institute name" onChange={(e) =>{setImagePrev(URL.createObjectURL(e.target.files[0])); setFile(e.target.files[0])}} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group ">
                                                        <label>Institute Name</label>
                                                        <input type="text" required className="form-control" placeholder="Enter your institute name" onChange={(e) => setName(e.target.value)} />
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group ">
                                                        <label>Director Name</label>
                                                        <input type="text" className="form-control" placeholder="Enter your director name" onChange={(e) => setDirectorName(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group ">
                                                        <label>Email Address</label>
                                                        <input type="email" required className="form-control" placeholder="Enter your email address" onChange={(e) => setEmail(e.target.value)} />
                                                    </div>
                                                </div> 
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group ">
                                                        <label>Phone</label>
                                                        <input type="text" minlength="10" maxlength="10"  required className="form-control" placeholder="Enter your phone number" onChange={(e) => setPhone(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <label>Password</label>
                                                    <div className="input-group ">     
                                                        <input type={showPassword?"text":"password"}     required className="form-control" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                                                        <div class="input-group-append">
                                                            <a  href="javascript:void(0);" onClick={()=>setShowPassword(!showPassword)}><span class="input-group-text" ><i class={showPassword?"bx bx-low-vision":"bx bx-show"}></i></span></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Confirm Password</label>
                                                        <input type="password" required className="form-control" placeholder="Enter your password" onChange={(e) => setCnfPassword(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>City</label>
                                                        <input type="text" required className="form-control" placeholder="Enter your city" onChange={(e) => setCity(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Address</label>
                                                <textarea type="text" required className="form-control" placeholder="Enter your address" onChange={(e) => setAddress(e.target.value)} ></textarea>
                                            </div>
                                           <div className="row">
                                                <div className="col-6" >
                                                    <div className="form-group">
                                                        <label>State</label>
                                                        {/* <input type="text" className="form-control" placeholder="Enter your state" onChange={(e) => setState(e.target.value)} /> */}
                                                        <select required className=" form-control" onChange={(e) => setState(e.target.value)} value={state}>
                                                            <option value={-1}>Select State</option>
                                                            {indianStates.map((item) => (
                                                                <option value={item}>{item}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label>Category</label>
                                                        <select required className=" form-control" onChange={(e) => setCategory(e.target.value)} value={category}>
                                                            <option value={-1}>Select Category</option>
                                                            {categoryData.map((item) => (
                                                                <option value={item.key}>{item.label}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>About</label>
                                                <textarea required type="text" className="form-control" placeholder="Enter your about institute" onChange={(e) => setAbout(e.target.value)} ></textarea>
                                            </div>
                                            <div className="btn-group mt-3 w-100">
                                                <button type="submit" className="btn btn-primary btn-block" >
                                                    {isLoading?(
                                                        <ClipLoader color={"white"}   loading={isLoading}     />
                                                    ):("Sign Up")}</button>
                                               
                                            </div>
                                            <hr />
                                            <p>Have an account?<Link to="/"> Login</Link></p>
                                        </div> 
                                </form>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>  
            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div> 
    )
}
export default Signup