import React, { useState, useEffect } from 'react';
import {
    boostInstitute, fetchAllInstitute,
    fetchInstituteByStatus, fetchInstituteByCategory,
    fetchInstituteByStatusAndCategory, fetch_categories,
    instituteSearchByName, instituteSearchByEmail
} from '../../api/institute'
import { dataLimit, theme } from '../../index'
import RenderSingleInstitute from './RenderSingleInstitute'
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../components/modal/modal'
import { Image, Shimmer } from 'react-shimmer'
import ClipLoader from "react-spinners/ClipLoader";
import Snackbar from '@material-ui/core/Snackbar';


const Institute = props => {

    const [instituteList, setInstituteList] = useState([]);
    const [category, setCategory] = useState([]);
    const [boostValue, setBoostValue] = useState(0);
    const [offset, setOffset] = useState(0);
    const [isBoostModalVisible, setIsBoostModalVisible] = useState(false)
    const [boostInsId, setBoostInsId] = useState(-1)
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [selectedCategoryName, setSelectedCategoryName] = useState("Select Category");
    const [showShimmer, setShowShimmer] = useState(true)

    const [showDataSearchBy, setShowDataSearchBy] = useState(false)
    const [instituteSearchBy, setInstituteSearchBy] = useState("ByName")
    const [instituteSearchValue, setInstituteSearchValue] = useState("")
    const [instituteDataSearchBy, setInstituteDataSearchBy] = useState([])
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)

    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        console.log(boostInsId)
    }, [boostInsId])
    const instituteCallBack = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                console.log("data", data)
                setInstituteList(data)
                setShowShimmer(false)
            })
        }
        else {
            console.log("something went wrong")
        }
    }

    const handleCatgoryCallback = (response) => {
        if (response.status === 200) {
            response.json().then(data => {
                data.unshift({ key: -1, label: "All" })
                setCategory(data)
            })

        } else {
            console.log("something went wrong")
        }

    }

    const update = (i, status) => {
        var arr = instituteList
        arr[i].status = status;
        setInstituteList(arr)
    }

    useEffect(() => {
        console.log(selectedCategory)
        props.match.params.type == -1 ?
            (
                selectedCategory != -1 ?
                    (
                        fetchInstituteByCategory(selectedCategory, offset, dataLimit, instituteCallBack)
                    ) :
                    (
                        fetchAllInstitute(offset, dataLimit, instituteCallBack)
                    )

            ) :
            (
                selectedCategory != -1 ?
                    (
                        fetchInstituteByStatusAndCategory(props.match.params.type, selectedCategory, offset, dataLimit, instituteCallBack)
                    ) :
                    (
                        fetchInstituteByStatus(props.match.params.type, offset, dataLimit, instituteCallBack)
                    )

            );
        fetch_categories(handleCatgoryCallback)
    }, [props.match.params.type, selectedCategory])

    const boostInstituteClickHanlder = () => {
        boostInstitute(boostInsId, boostValue, (response) => {
            console.log(response.status)
            if (response.status == 200) {
                document.getElementById("boost" + boostInsId).innerHTML = boostValue
                setIsBoostModalVisible(false)
            }
        })
    }
    const deleteCallback = (response, i) => {
        if (response.status == 200) {
            const arr = instituteList.slice()
            delete arr[i];
            setInstituteList(arr)
            setSnackBarMessage("Institute Deleted Successfully")
            setIsSnackBarShow(true)

        }
        else {
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
            console.log("unable to delete");
        }
    }

    const filterItems = (key) => { console.log("hello") }


    const findInstituteByCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                console.log("getting search data", data)
                setInstituteDataSearchBy(data)
                setShowDataSearchBy(true)
                setShowShimmer(false)
            })
        }
        setLoading(false)
    }

    const action4SearchInstitute = () => {
        setShowShimmer(true)
        setLoading(true)
        if (instituteSearchBy == "ByName") {
            // alert('Search by name')
            instituteSearchByName(instituteSearchValue, offset, dataLimit, findInstituteByCallback)
        } else if (instituteSearchBy == "ByEmail") {
            // alert('Seach by Email')
            instituteSearchByEmail(instituteSearchValue, offset, dataLimit, findInstituteByCallback)
        }
    }

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }

    return (
        <div>
            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Institutes</div>
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
                        <button type="button" class="btn btn-primary">{selectedCategoryName}</button>
                        <button type="button" class="btn btn-primary bg-split-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">	<span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
                            {category.map((row, i) => (
                                // <option value={row.key}>{row.label}</option>
                                // <p class="dropdown-item" onClick={()=>filterItems(row.key)}>{row.label}</p>
                                <a class="dropdown-item" href="javascript:;" onClick={() => { setSelectedCategory(row.key); setSelectedCategoryName(row.label) }}>{row.label}</a>
                            ))}

                            {/* <a class="dropdown-item" href="javascript:;">Another action</a>
                            <a class="dropdown-item" href="javascript:;">Something else here</a>
                            <div class="dropdown-divider"></div>	<a class="dropdown-item" href="javascript:;">Separated link</a> */}
                        </div>
                    </div>
                </div>

            </div>



            <div>
                <div className="row mt-3">
                    <div className="col-lg-4 col-md-6 col-12 d-flex mb-4">
                        <input type="text" className="form-control mr-3" onChange={(e) => setInstituteSearchValue(e.target.value)} placeholder="Search Institute" />

                        <div class="btn-group">
                            {isLoading ? (
                                <button type="button" class="btn btn-primary px-5">
                                    <ClipLoader color={"white"} size={18} />
                                </button>
                            ) : (
                                <button type="button" class="btn btn-primary" onClick={(e) => action4SearchInstitute()} >Search&nbsp;{instituteSearchBy} </button>
                            )}
                            <button type="button" class="btn btn-primary bg-split-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown">	<span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-right dropdown-menu-lg-left">
                                <a class="dropdown-item" href="javascript:;" onClick={() => setInstituteSearchBy("ByName")}>Name</a>
                                <a class="dropdown-item" href="javascript:;" onClick={() => setInstituteSearchBy("ByEmail")}>Email</a>
                            </div>
                        </div>

                    </div>


                </div>
                {showDataSearchBy ? (
                    <div className="mb-2">
                        <button className="btn btn-light" style={{ cursor: 'pointer' }} onClick={() => setShowDataSearchBy(false)}>Clear Search x</button>
                    </div>
                ) : (null)}
            </div>




            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered mb-0" id="table1">
                            <thead class="thead-dark">
                                <tr>
                                    <th align="center">#</th>
                                    <th align="center">Name</th>
                                    <th align="center">Director Name</th>
                                    <th align="center">Email</th>
                                    <th align="center">Phone</th>
                                    <th align="center">City</th>
                                    <th align="center">State</th>
                                    <th align="center">Boost Value</th>
                                    <th align="center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showShimmer ? (
                                    <td colspan="9">
                                        <Shimmer width={'100%'} height={40} />
                                    </td>
                                ) : (
                                    <>
                                        {showDataSearchBy ? (
                                            <>
                                                {instituteDataSearchBy && instituteDataSearchBy.map((row, i) => (
                                                    <RenderSingleInstitute setBoostInsId={setBoostInsId} setBoostValue={setBoostValue} setIsBoostModalVisible={setIsBoostModalVisible} row={row} index={i} update={update} deleteCallback={deleteCallback} />
                                                ))}
                                                {instituteDataSearchBy <= 0 ? (
                                                    <td align="center" colspan="9">
                                                        No data found, Try with another keyword.
                                                    </td>
                                                ) : (null)}
                                            </>
                                        ) : (
                                            <>
                                                {instituteList && instituteList.map((row, i) => (
                                                    <RenderSingleInstitute setBoostInsId={setBoostInsId} setBoostValue={setBoostValue} setIsBoostModalVisible={setIsBoostModalVisible} row={row} index={i} update={update} deleteCallback={deleteCallback} />
                                                ))}
                                            </>
                                        )}
                                    </>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Modal
                visible={isBoostModalVisible}
                setModalVisible={setIsBoostModalVisible}
                modalId={"boostInsModal"}
            >
                <ModalHeader>
                    <h5 className="modal-title">Add Banner</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">	<span aria-hidden="true">&times;</span>
                    </button>
                </ModalHeader>
                <ModalBody>

                    <div className="form-row">
                        <label>Boost Value </label>
                        <input className="form-control" value={boostValue} placeholder="Banner Link" onChange={(e) => setBoostValue(e.target.value)} />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" onClick={() => boostInstituteClickHanlder()}>Boost Institute</button>
                </ModalFooter>
            </Modal>

            <Snackbar
                open={isSnackBarShow}
                onClose={(e)=>closeSnack(e)}
                TransitionComponent="TransitionUp"
                message={SnackBarMessage}
            />
        </div>
    )
};



export default Institute;