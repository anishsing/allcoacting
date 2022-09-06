import React, { useState, useEffect } from 'react'
import RenderSingleInstituteCat from './RenderSingleInstituteCat'
import { fetch_categoriesAll, addCategory } from '../../api/institute'
import { Image, Shimmer } from 'react-shimmer'
import Snackbar from '@material-ui/core/Snackbar';
import ClipLoader from "react-spinners/ClipLoader";


export default function InstituteCategory() {

    const [InstituteCategoryData, setInstituteCategory] = useState([]);
    const [offset, setOffset] = useState(0);

    const [icon, setIcon] = useState("")
    const [Categoryname, setCategoryname] = useState("")
    const [sortOrder, setSortOrder] = useState("")
    const [showShimmer, setShowShimmer] = useState(true)
    const[SnackBarMessage, setSnackBarMessage] = useState("")
    const[isSnackBarShow, setIsSnackBarShow] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const fetchCategoryCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                console.log('getting all institute category', data)
                setInstituteCategory(data)
                setShowShimmer(false)
            })
        }
    }


    useEffect(() => {
        fetch_categoriesAll(fetchCategoryCallback)
    }, [offset], [InstituteCategoryData])


    const deleteAtIndex = (index) => {
        let instituteData_local = [...InstituteCategoryData]
        instituteData_local.splice(index, 1);
        setInstituteCategory(instituteData_local)
    }

    useEffect(() => { console.log("updated category data", InstituteCategoryData) }, [InstituteCategoryData])


    const addCategoryCallback = (response) => {
        if (response.status == 200) {
            response.json().then(data => {
                console.log("response after adding category", data)
                setInstituteCategory(data)
            })
            setSnackBarMessage("Category Added Successfully")
            setIsSnackBarShow(true)
        }else{
            setSnackBarMessage("Something went wrong")
            setIsSnackBarShow(true)
        }
        setIsLoading(false)
    }


    const action4Category = () => {
        
        if(!isLoading){
            if (window.confirm('Are you sure to Add category')) {
    
                addCategory(icon, Categoryname, sortOrder, addCategoryCallback)
    
            } else {
                console.log('cancel mission add category', Categoryname, sortOrder)
    
            }
            setIsLoading(true)
        }


    }

    const closeSnack=()=>{
        setIsSnackBarShow(false)
    }


    return (
        <>

            <div class="page-breadcrumb  d-md-flex align-items-center mb-3">
                <div class="breadcrumb-title pr-3">Institute Category</div>
                <div class="pl-3">
                    <nav aria-label="breadcrumb">
                        <ol class="breadcrumb mb-0 p-0">
                            <li class="breadcrumb-item"><a href="javascript:;"><i class='bx bx-home-alt'></i></a>
                            </li>
                        </ol>
                    </nav>
                </div>
                <div class="ml-auto">
                    <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCentered">Add Category</button>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered mb-0" id="table1">
                            <thead class="thead-dark">
                                <tr>
                                    <th align="center">#</th>
                                    <th align="center">Name</th>
                                    <th align="center">Sort Order</th>
                                    <th align="center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {showShimmer ? (
                                    <td colspan="4">
                                        <Shimmer width={'100%'} height={40} />
                                    </td>
                                ) : (
                                    <>

                                        {InstituteCategoryData && InstituteCategoryData.map((row, i) => (
                                            <RenderSingleInstituteCat row={row} index={i} deleteAtIndex={deleteAtIndex} />
                                        ))}

                                    </>

                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>





            {/* Modal 4 add category */}
            <div class="modal fade" data-backdrop="static" data-keyboard="false" id="exampleModalCentered" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenteredLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3 class="modal-title" id="exampleModalCenteredLabel">Add Category</h3>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <input type="text" class="form-control mt-3" onChange={e => setCategoryname(e.target.value)} placeholder="Category Name" />

                            <input type="text" class="form-control mt-3" onChange={e => setSortOrder(e.target.value)} placeholder="Sort Order" />


                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            {isLoading ? (
                            <button type="button" class="btn btn-primary px-5">
                                <ClipLoader color={"white"} size={18} />
                            </button>) : (
                            <button type="button" class="btn btn-primary" onClick={() => action4Category()}>Save changes</button>
                            )}
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






        </>
    )
}
