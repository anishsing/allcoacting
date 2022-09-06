import React, { useEffect, useState } from 'react';
import { fetchRevenueOverView_institutewise } from '../../../api/revenue';
import Chart from '../../../components/charts/chart';
 
 const monthNames = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                        ];

const  AnaylictsApiCallBack=(response,mode,setBacks)=>
{ 
 
    if(response.status == 200)
    {
        response.json().then(data=>{ 
            // data = data.salesOverViewDataDtos
            console.log(data)
            let label = []
            let dataValues=[];
           console.log(data)
            switch(mode)
            {
                case'monthly':
                         
                        
                        data.map(item=>{
                            label.push(monthNames[(item.x)-1]);
                            dataValues.push(item.y)
            
                        })
                break;
                case 'weekly':
                case 'yearly':
                    
                    
                    data.map(item=>{
                        label.push((item.x));
                        dataValues.push(item.y)
        
                    })
                    break;
            }
            
            setBacks.setLeadData({
                labels: label,
                datasets: [{ 
                    label: 'Revenue',
                    data: dataValues,
                    backgroundColor: "#673ab7",
                    borderColor: "#673ab7",
                    pointRadius: "0",
                    borderWidth: 4,
                    barPercentage:0.5
                }]
            })

        });
    }
}
 
const RevenueModeWiseGraph = props => {
   
    const {insId} = props
    const [graphMode,setGraphMode] = useState('yearly')
    const [graphModeDisplayName,setGraphModeDisplayName] = useState('This Year')
    const [dataTime,setDataTime] = useState(9) 
    const [leadData,setLeadData] = useState([]);  
    const [loadingLeadData,setLoadingLeadData] = useState(true); 
    
    useEffect(() => {
        fetchRevenueOverView_institutewise(insId, graphMode,dataTime,(response)=>AnaylictsApiCallBack(response,graphMode,{setLeadData,setLoadingLeadData}));
    },[graphMode])

 
    
    return  (
        <div className="row">
            {/* left chart */}
            <div className="col-12 col-lg-12">
                <div className="card radius-15 overflow-hidden">
                    <div className="card-body"> 
                        <div className="d-lg-flex align-items-center">
                            <p className="mb-0 font-20 font-weight-bold">Revenue</p>  
                            <div className="ml-lg-auto mb-2 mb-lg-0">
                                <div className="btn-group-round">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-white">{graphModeDisplayName}</button>
                                        <div className="dropdown-menu">	
                                            {/* <a className="dropdown-item" onClick={()=>{setGraphMode("weekly");setDataTime(9);setGraphModeDisplayName("This Month");console.log("pressed")}}  data-toggle="dropdown-item" href="javascript:;">This Month</a> */}
                                            <a className="dropdown-item" onClick={()=>{setGraphMode('monthly');setDataTime(2021);setGraphModeDisplayName("Monthly")}} href="javaScript:;">Monthly</a>
                                            <a className="dropdown-item" onClick={()=>{setGraphMode('yearly');setGraphModeDisplayName("Yearly")}} href="javascript:;">Yearly</a>
                                        </div>
                                        <button type="button" className="btn btn-white dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">	<span className="sr-only">Toggle Dropdown</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Chart height={300} chartType="bar" chart_counter={3} data={leadData}  /> 
                    </div>
                </div>
            </div>
        </div>
    );
};
 

export default RevenueModeWiseGraph