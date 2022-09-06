import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom"
import { fetch_categories, editInstituteDetails, fetch_instituteDetails } from '../../api/institute'
import { insertImage } from '../../api/blog'
import { serverBaseUrl } from '../..'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { theme } from '../../index'
import { SET_INSTITUTE_DETAILS } from '../../Reducers/types';
import Snackbar from '@material-ui/core/Snackbar';
import ClipLoader from "react-spinners/ClipLoader";

export default function InstituteEdit(props) {

    const insDetails = useSelector((state) => state.ins.insDetails)
    let instituteId = insDetails.id
    const history = useHistory();
    const dispatch = useDispatch()
    const [categoryData, seCategoryData] = useState([])
    const [institute, setInstitute] = useState({})

    const [name, setName] = useState(insDetails.name)
    const [directorName, setDirectorName] = useState(insDetails.directorName)
    const [phone, setPhone] = useState(insDetails.phone)
    const [email, setEmail] = useState(insDetails.email)
    const [password, setPassword] = useState(insDetails.password)
    const [address, setAddress] = useState(insDetails.address)
    const [city, setCity] = useState(insDetails.city)
    const [insState, setInsState] = useState(insDetails.state)
    const [about, setAbout] = useState(insDetails.about)
    const [category, setCategory] = useState(insDetails.category)
    const [logo, setLogo] = useState(insDetails.logo)
    const [SnackBarMessage, setSnackBarMessage] = useState("")
    const [isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [uploadImg, setUploadImg] = useState([])
    const [status, setStatus] = useState(institute.status)

    console.log('getting Institute id', insDetails)

    const fetchCategoryCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                console.log('getting category', data)
                seCategoryData(data)
            })
        }
    }

    useEffect(() => {
        fetch_categories(fetchCategoryCallback);
        fetch_instituteDetails(instituteId, (response) => {
            if (response.status == 200) {
                response.json().then(data => {
                    setName(data.name);
                    setDirectorName(data.directorName);
                    setPhone(data.phone);
                    setEmail(data.email);
                    setPassword(data.password);
                    setAddress(data.address);
                    setCity(data.city);
                    setInsState(data.state);
                    setAbout(data.about);
                    setCategory(data.category);
                    if(data.logo.includes("https://")||data.logo.includes("http://"))
                    {
                        setLogo(data.logo);
                    }else
                    {
                        setLogo(serverBaseUrl + data.logo);
                    }
                    
                    setInstitute(data);
                })
            }
        })
    }, [instituteId])


    console.log(institute)

    const editInstituteCallback = (response) => {
        if (response.status == 200) {
            var obj = { ...institute }
            obj.name = name;
            obj.directorName = directorName
            obj.phone = phone
            obj.email = email
            obj.address = address
            obj.city = city
            obj.state = insState
            obj.about = about
            obj.category = category
            obj.logo = logo
            setInstitute(obj)
            setIsSnackBarShow(true)
            setSnackBarMessage("Institute Details Updated Successfully")
        } else {
            setSnackBarMessage("Something Went Wrong. Please Try Again Later.")
            setIsSnackBarShow(true)
        }
        setLoading(false)
    }

    const closeSnack = () => {
        setIsSnackBarShow(false)
    }

    const imageUploadCallback = (response) => {
        if (response.status == 201) {
            console.log(response.headers.get('location'))
            setLogo(serverBaseUrl + response.headers.get('location'))
            console.log('ha image uploaded successfully')
            console.log(response.headers.get('location'))
            editInstituteDetails(instituteId, name, directorName, phone, email, password, address, city, insState, about, category, response.headers.get('location'), institute.accountHolderName, institute.accountNumber, institute.bankName, institute.ifsc, institute.leads, institute.expoToken, institute.boostValue, institute.fiveStarCount, institute.followersCount, institute.fourStarCount, institute.oneStarCount,  institute.status, institute.threeStarCount, institute.totalRating, institute.totalRatingCount, institute.totalRevenue, institute.twoStarCount, editInstituteCallback)

        }
    }


    const action4EditInstitute = () => {

        if (!loading) {
            if ((window.confirm("Are you Sure Save Current Changes?"))) {
                setLoading(true)
                if (uploadImg != "") {
                    // alert('ha user updated img')
                    insertImage(uploadImg, imageUploadCallback)

                    return;
                }

                editInstituteDetails(instituteId, name, directorName, phone, email, password, address, city, insState, about, category, logo, institute.accountHolderName, institute.accountNumber, institute.bankName, institute.ifsc, institute.leads, institute.expoToken, institute.boostValue, institute.fiveStarCount, institute.followersCount, institute.fourStarCount, institute.oneStarCount, institute.status, institute.threeStarCount, institute.totalRating, institute.totalRatingCount, institute.totalRevenue, institute.twoStarCount, editInstituteCallback)
            }
        }
    }

    const action4selectedSelectCategory = (e) => {
        if (e.target.value != institute.category) {
            setStatus(institute.status)
        } else {
            setStatus(institute.status)
        }
        setCategory(e.target.value)
    }
    


    return (
        <>
            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Institute Edit</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="ml-auto">
                    <div class="btn-group">
                        <button type="button" class="btn btn-dark" style={{ marginRight: 5 }} onClick={() => history.goBack()}>Go Back</button>
                    </div>
                </div>
            </div>

            <div>
                <div className="form-row">

                    <div className="col-lg-6 px-4">
                        <div className="form-group">
                            <label htmlFor="">Institute Name</label>
                            <input type="text" className="form-control" onChange={(e) => setName(e.target.value)} defaultValue={institute.name} />
                        </div>
                    </div>

                    <div className="col-lg-6  px-4">
                        <div className="form-group">
                            <label htmlFor="">Institute directorName</label>
                            <input type="text" className="form-control" onChange={(e) => setDirectorName(e.target.value)} defaultValue={institute.directorName} />
                        </div>
                    </div>

                    <div className="col-lg-6 px-4">
                        <div className="form-group">
                            <label htmlFor="">Phone Number</label>
                            <input type="tel" className="form-control" onChange={(e) => setPhone(e.target.value)} defaultValue={institute.phone} />
                        </div>
                    </div>

                    <div className="col-lg-6  px-4">
                        <div className="form-group">
                            <label htmlFor="">Email address</label>
                            <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} defaultValue={institute.email} />
                        </div>
                    </div>

                    <div className="col-lg-12 px-4">
                        <div className="form-group">
                            <label htmlFor="">Address</label>
                            <input type="text" className="form-control" onChange={(e) => setAddress(e.target.value)} defaultValue={institute.address} />
                        </div>
                    </div>

                    <div className="col-lg-6 px-4">
                        <div className="form-group">
                            <label htmlFor="">city</label>
                            <input type="text" className="form-control" onChange={(e) => setCity(e.target.value)} defaultValue={institute.city} />
                        </div>
                    </div>

                    <div className="col-lg-6 px-4">
                        <div className="form-group">
                            <label htmlFor="">state</label>
                            <input type="text" className="form-control" onChange={(e) => setInsState(e.target.value)} defaultValue={institute.state} />
                        </div>
                    </div>

                </div>

                <div className="px-4">
                    <label htmlFor="">About Institute</label>
                    <textarea className="form-control" rows="3" defaultValue={institute.about} onChange={(e) => setAbout(e.target.value)}>
                    </textarea>
                </div>

                <div className="row px-4 align-items-center">

                    <div className="col-lg-6">
                        <div className="row">
                            <div className="col-lg-12 px-4 mt-3">
                                <div className="form-group">
                                    <label htmlFor="" for="exampleFormControlSelect1">Select Category</label>
                                    <select id="exampleFormControlSelect1" value={category} class=" form-control" onChange={(e) => {
                                        action4selectedSelectCategory(e)
                                    }}  >
                                        {categoryData.map((item) => (
                                            <option value={item.key} >{item.label}</option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-12 px-4 mt-3">
                                <div className="form-group">
                                    <label htmlFor="">Select Logo</label>
                                    <input type="file" className="form-control" onChange={(e) => setUploadImg(e.target.files[0])} />
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-lg-6 mt-4 text-center">
                        <div>
                            <img src={logo} className="rounded-circle" width="130" height="130" alt="" />
                        </div>
                    </div>
                </div>


                <div className="mt-5 mb-4 text-center">
                    <button className="btn btn-primary px-4 py-3" onClick={() => { action4EditInstitute() }}>
                        {loading ? (
                            <ClipLoader color={theme.primaryColor} loading={loading} />
                        ) : ('Save Changes')}
                    </button>
                </div>

                <Snackbar
                    open={isSnackBarShow}
                    onClose={(e) => closeSnack(e)}
                    TransitionComponent="TransitionUp"
                    message={SnackBarMessage}
                />
            </div>

        </>
    )
}
