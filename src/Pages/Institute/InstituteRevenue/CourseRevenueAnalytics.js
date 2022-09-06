import React, { useEffect, useState } from 'react';
import { fetch_instituteSalesOverView } from '../../../api/analytics';
import Chart from '../../../components/charts/chart';

const AnaylictsApiCallBack=(response,setBacks)=>
{ 
 
    if(response.status == 200)
    {
        response.json().then(data=>{ 
            data = data.salesOverViewDataDtos
            console.log(data)
            let courseNames = [];
            let courseVsPuchaseData=[]
            let courseVsRevenueData=[];
            data.map(item=>{
                courseNames.push(item.courseName)
                courseVsPuchaseData.push(item.total)
                courseVsRevenueData.push(item.totalCourseRevenue)
            })
            
            setBacks.setCourseVsPurchaseChartData({
                labels: courseNames,
                datasets: [{ 
                    label: 'Purchase',
                    data: courseVsPuchaseData,
                    backgroundColor: "#673ab7",
                    borderColor: "#673ab7",
                    pointRadius: "0",
                    borderWidth: 4,
                    barPercentage:0.5
                }]
            })
            setBacks.setCourseVsRevenueChartData({
                labels:courseNames,
                datasets: [{
                    label: 'Revenue',
                    data: courseVsRevenueData,
                    backgroundColor: "transparent",
                    borderColor: "#32ab13",
                    pointRadius: "0",
                    borderWidth: 4,
                    barPercentage:0.5
                }]
            }) 
            setBacks.setCourseNames(courseNames)
            setBacks.setLoadingCourseVsPurchaseChartData(false);
        });
    }
}
 
const CourseRevenueAnalytics = props => {

    
    const [courseVsPurchaseChartData,setCourseVsPurchaseChartData] = useState([]);
    const [courseVsRevenueChartData,setCourseVsRevenueChartData] = useState([]);
    const [courseNames,setCourseNames] = useState([]);
    const [loadingCourseVsPurcahseChartData,setLoadingCourseVsPurchaseChartData] = useState(true);
    const {insId} = props;    

    useEffect(() => {

        fetch_instituteSalesOverView(insId,(response)=>AnaylictsApiCallBack(response,{setCourseVsPurchaseChartData,setLoadingCourseVsPurchaseChartData,setCourseVsRevenueChartData,setCourseNames}));
    },[])

 
    
    return  (
        <div className="row">
            {/* left chart */}
            <div className="col-12 col-lg-6">
                <div className="card radius-15 overflow-hidden">
                    <div className="card-body"> 
                        <div>
                            <p className="mb-0 font-20 font-weight-bold">Course vs Purchase</p>  
                        </div>
                        <Chart height={300} chartType="bar" chart_counter={1} data={courseVsPurchaseChartData}  /> 
                    </div>
                </div>
            </div>
                {/* right chart */}
            <div className="col-12 col-lg-6">
                <div className="card radius-15 overflow-hidden">
                    <div className="card-body">
                        <div>
                            <p className="mb-0 font-20 font-weight-bold">Course vs Revenue</p>  
                        </div>
                        <Chart height={300} chartType="bar" chart_counter={2} data={courseVsRevenueChartData}  /> 
                    </div>
                </div>
            </div>
        </div>
    );
};
 

export default CourseRevenueAnalytics