import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                lables:['Boston', 'Worcester','Springfield','Lowell'],
                datasets:[
                    {
                        lable:'Population',
                        data:[
                            617594,
                            181045,
                            153060,
                            106519,
                        ],
                        backgroundColor:[
                            "rgba(255,99,132,1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(75, 192, 192, 1)",
                        ]
                    }
                ]
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