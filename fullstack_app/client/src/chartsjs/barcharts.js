import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                label: "Mail sent",
                backgroundColor: [
                    "rgba(255, 99, 132, 0.5)",
                    "rgba(54, 162, 235, 0.5)",
                    "rgba(255, 206, 86, 0.5)",
                    "rgba(75, 192, 192, 0.5)",
                    "rgba(153, 102, 255, 0.5)",
                    "rgba(255, 159, 64, 0.5)",
                    "rgba(105, 205, 0, 0.5)"
              
                  ],
                borderColor: [
                    "rgba(255,99,132,1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(105, 205, 0, 1)"
                  ],
                data: [0, 10, 5, 2, 20, 30, 45],
                borderWidth: 1,
                }]
            }
        }
    }
    render(){
        return (
            <div className="chart">
                <Bar 
                    data={this.state.chartData}
                    options={{maintainAspectRatio:false}} />
            </div>
        )
    }

}

export default Chart;