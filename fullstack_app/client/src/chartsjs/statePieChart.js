import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2';
import Chart from "react-apexcharts";

const data = {
	labels: [
		'Red',
		'Blue',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

class Donut extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        options: {},
        series: [44, 55, 41, 17, 15],
        labels: ['A', 'B', 'C', 'D', 'E']
      }
    }
  
    render() {
  
      return (
        <div>
        <h2>Pie Example</h2>
        <Pie data={data} />
      </div>
      );
    }
  }
  
  export default Donut;
/*
export class Donut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
            labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
            responsive: [{
                breakpoint: 480,
                options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
                }
            }]
            },
            series: [44, 55, 13, 43, 22],
        }
    }
    render() {
        return (
            <div className="card">
                <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width="380" />
                {}
            </div>
        )
    }
}


const domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(PieChart), domContainer);
export default statePieChart
*/