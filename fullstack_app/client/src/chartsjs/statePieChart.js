import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2';
import Chart from "react-apexcharts";
import TopFive from "../components/topFive";

class PieChart extends Component {

    constructor(props) {
      super(props);
  
      this.state = {
        options: {},
        series: [44, 55, 41],
        labels: ['A', 'B', 'C']
      }
    }
  
    render() {
      return (
        <div className="card">
          Top states piechart
          <Chart 
            options={this.state.options} 
            series={this.state.series} 
            type="pie" 
            width="500" />
        </div>
      );
    }
  }
  
  export default PieChart;
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