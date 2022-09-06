import React, { useState, useEffect } from 'react'
import { dataLimit } from '../../..';
import { fetchLeads } from '../../../api/leads';
import LeadsRow from './LeadsRow';
import { Shimmer } from 'react-shimmer'

function InstituteLeads(props) {

    const { insId } = props;
    const [offset, setOffset] = useState(0)
    const [leadsLoading, setLeadsLoading] = useState(true)
    const [leads, setLeads] = useState([])
    const [allDataLoaded, setAllDataLoaded] = useState(false)
    const [showNextButton, setShowNextButton] = useState()
    const [loading, setLoading]=useState(true)

    useEffect(() => {
        fetchLeads(insId, offset, dataLimit, fetchLeadsCallback)
    }, [insId,offset])


    const fetchLeadsCallback = (response) => {
        setLoading(false)
        if (response.status == 200) {
            response.json().then(data => {
                if (data.length == dataLimit) {
                    setLeads(data)
                    setShowNextButton(true)
                } 
                else if(data.length<dataLimit) 
                {
                    console.log("else")
                    console.log(data.length)
                    if(data.length==0) 
                    {
                        if(offset==0)
                        {
                            setOffset(0)
                        }else
                        {
                            setOffset(offset-1)
                        }
                    }
                    else if(data.length!=0)
                    {     
                        setLeads(data)
                    }
                    setShowNextButton(false)
                    setAllDataLoaded(true)
                }
                setLeads(data)
                console.log("leads data", data)
            })
        }
        else {
            console.log("something went wrong")
        }
    }

    const nextPageHandler = () => {
        if (!allDataLoaded) {
            setOffset(offset + 1)
        } else {
            window.alert("No more data available")
        }

    }
    const prePageHandler = () => {
        if (offset > 0) {
            setOffset(offset - 1)
        }
        else if (offset == 0) {
            setOffset(0)
            setShowNextButton(true)
        }
        setAllDataLoaded(false)

    }

    return (
        <div className="mt-3">
            <div class="table-responsive">
                <table class="table table-striped table-bordered mb-0" id="table1">
                    <thead class="thead-dark">
                        <tr>
                            <th align="center">#</th>
                            <th align="center">Course</th>
                            <th align="center">Leads Count</th>
                        </tr>
                    </thead>
                    {loading?(
                        <tbody>
                            <tr>
                            <Shimmer width={'100%'} height={50} />
                            </tr>
                        </tbody>
                    ):(
                        <tbody>
                            {leads.map((row, i) => (
                                <LeadsRow row={row} index={i} />
                            ))}

                        </tbody>
                    )}
                </table>
            </div>
            <div class="modal-footer">
            {offset>0?(

                <button type="button" class="btn btn-primary" onClick={()=>prePageHandler()}>Previous</button>
            ):(null)}
               {!allDataLoaded&&showNextButton?( 
                    <button type="button" class="btn btn-primary "  onClick={()=>nextPageHandler()}>Next</button>
               ):(null)}
                
            </div>
        </div>
    )
}

export default InstituteLeads
