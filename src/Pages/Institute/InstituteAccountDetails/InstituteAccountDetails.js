import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import {theme} from '../../../index'
import { accountDetails, updateAccountDetails } from '../../../api/institute';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../components/modal/modal';
import Snackbar from '@material-ui/core/Snackbar';
import { Shimmer } from 'react-shimmer'
import ClipLoader from "react-spinners/ClipLoader";
function InstituteAccountDetails(props) {

    const [data, setData] = useState({});
    const [ifsc, setIfsc] = useState();
    const [accHolderName, setAccHolderName] = useState();
    const [upi,setUpi] = useState();
    const [accNumber, setAccNumber] = useState();
    const [accNumberCnf, setAccNumberCnf] = useState();
    const [bankName, setBankName] = useState();
    const [isAddEditModalVisible, setIsAddEditModalVisible] = useState(false);
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isAccountDetailLoaded, setIsAccountDetailLoaded] = useState(false)
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [loading, setLoading]=useState(false)
    const { insId } = props


    useEffect(() => {
        console.log(insId)
        accountDetails(insId, detailsCallBack)
    }, [insId])

    const detailsCallBack = (response) => {
        console.log(response.status)
        if (response.status == 200) {
            response.json().then(data => {
                setData(data)
            })
        }
        else
        {

        }
        setIsAccountDetailLoaded(true)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        if(accNumber ==accNumberCnf)
        {
            if(!loading)
            {
                
                if (window.confirm("Are You Sure You Want To Save Changes?")) {
                    setIsAccountDetailLoaded(false)
                    setLoading(true)
                    updateAccountDetails(accHolderName, accNumber, bankName, ifsc, upi,insId, updateCallback)
                }
            }
        }else
        {
            setIsSnackBarShow(true)
            setSnackBarMessage("Account Number Mismatch")
        }
        
    }

    const updateCallback = (response) => {
        setLoading(false)
        if (response.status == 200) {
            var obj = { ...data }
            obj.ifsc = ifsc
            obj.bankName = bankName
            obj.accountNumber = accNumber
            obj.accountHolderName = accHolderName
            obj.upi = upi
            setData(obj)
            setSnackBarMessage("Bank Details Updated Successfully")
            setIsSnackBarShow(true)
        }
        else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log("up error", response.status)
        }
        setIsAddEditModalVisible(false)
        setIsAccountDetailLoaded(true)
    }

    const setDetails = () => {
        setAccHolderName(data.accountHolderName);
        setBankName(data.bankName);
        setAccNumber(data.accountNumber)
        setIfsc(data.ifsc)
        setUpi(data.upi)
        setIsAddEditModalVisible(true)
    }

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }

    return (
        <div>
            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="ml-auto">
                    <div class="btn-group">
                        <button type="button" class="btn btn-danger" onClick={setDetails} style={{ marginRight: 5 }}>Change Account Details</button>
                    </div>
                </div>
            </div>
            <div className="card radius-15 mt-3">
                <div className="card-body">
                    {isAccountDetailLoaded&&isAccountDetailLoaded?(
                        <div className="col-12 col-lg-5">
                            <table className="table table-sm table-borderless mt-md-0 mt-3">
                                    <tbody>
                                        <tr>
                                            <th>Account Holder Name:</th>
                                            <td >{data.accountHolderName}</td>
                                        </tr>
                                        <tr>
                                            <th>Account Number:</th>
                                            <td  >{data.accountNumber}</td>
                                        </tr>
                                        <tr>
                                            <th>IFSC Code:</th>
                                            <td >{data.ifsc}</td>
                                        </tr>
                                        <tr>
                                            <th>Bank Name:</th>
                                            <td >{data.bankName}</td>
                                        </tr>
                                        <tr>
                                            <th>Upi :</th>
                                            <td >{data.upi}</td>
                                        </tr>
                                    </tbody>
                            </table>
                        </div>
                    ):(
                        <div className="col-12 col-lg-12"> 
                            <Shimmer width={'100%'} height={80} /> 
                        </div>       
                        
                    )}
                </div>
            </div>
            <Modal
                visible={isAddEditModalVisible}
                setModalVisible={setIsAddEditModalVisible}
                modalId={"testAddEditModal"}
            >
                <form onSubmit={onSubmitHandler}>
                    <ModalHeader>
                        <h5 className="modal-title">Account Details</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                        </button>
                    </ModalHeader>
                    <ModalBody>

                        <div className="form-row">
                            <label>Account Holder Name</label>
                            <input className="form-control" value={accHolderName} placeholder="Account Holder Name" onChange={(e) => setAccHolderName(e.target.value)} />
                        </div>
                        <div className="form-row">
                            <label>Account Number</label>
                            <input className="form-control" value={accNumber} placeholder="Account Number" onChange={(e) => setAccNumber(e.target.value)} />
                        </div>
                        <div className="form-row">
                            <label>ReEnter Account Number</label>
                            <input className="form-control" value={accNumberCnf} placeholder="Account Number" onChange={(e) => setAccNumberCnf(e.target.value)} />
                        </div>
                        <div className="form-row">
                            <label>IFSC Code</label>
                            <input className="form-control" value={ifsc} placeholder="IFSC Code" onChange={(e) => setIfsc(e.target.value)} />
                        </div>
                        <div className="form-row">
                            <label>Bank Name</label>
                            <input className="form-control" value={bankName} placeholder="Bank Name" onChange={(e) => setBankName(e.target.value)} />
                        </div>
                        <div className="form-row">
                            <label>UPI Id</label>
                            <input className="form-control" value={upi} placeholder="Bank Name" onChange={(e) => setUpi(e.target.value)} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button className="btn btn-primary">
                            {loading?(
                                <ClipLoader color={theme.primaryColor}   loading={loading}     />
                            ):('Save Changes')}
                        </button>
                    </ModalFooter>
                </form>
            </Modal>
            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div>
    )
}

export default InstituteAccountDetails
