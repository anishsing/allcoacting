import React,{useEffect} from 'react';
  const LineChart=(props)=>
{
    const {height,chartType,data,chart_counter} = props
    useEffect(()=>{
        var ctx = document.getElementById('chart'+chart_counter).getContext('2d');
        var myChart = new window.Chart(ctx, {
            type: chartType,
                // data: {
                //     labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
                //     datasets: [{
                //         label: 'Google',
                //         data: [13, 20, 4, 18, 7, 4, 8],
                //         backgroundColor: "#673ab7",
                //         borderColor: "#673ab7",
                //         pointRadius: "0",
                //         borderWidth: 4
                //     }]
                // },
            data,
            options: {
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    labels: {
                        fontColor: '#585757',
                        boxWidth: 40
                    }
                },
                tooltips: {
                    enabled: true
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#585757'
                        },
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.07)"
                        },
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#585757'
                        },
                        gridLines: {
                            display: true,
                            color: "rgba(0, 0, 0, 0.07)"
                        },
                    }]
                }
            }
        });
    })
	


    return(
        <div style={{height}}>
            <canvas id={"chart" +chart_counter}></canvas>
        </div>
    )
}

export default LineChart