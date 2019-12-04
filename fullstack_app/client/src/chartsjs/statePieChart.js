import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2';
// import Chart from "react-apexcharts";
import TopFive from "../components/topFive";

class PieChart extends Component {

    constructor(props) {
      super(props);
    //   this.state = {
    //     options: {},
    //     series: [44, 55, 41],
    //     labels: ['A', 'B', 'C']
    //   }
      this.state = {
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: "Top states piechart",
                fontSize: 20
            }
        },
        data: {
            datasets: [{
                // here the data could be the total amount of mail
                data: this.getStateData().mailCount,
                backgroundColor: ["#1496BB", "#0d3c55", "#c02e1d", "#d94e1f", "#f16c20", "#ebc844", "#a2b86c", "#5ca793", "#0f5b78"]
            }],
        
            // State names go here. They appear with the data values when you hover over
            labels: this.getStateData().stateNames
        }
      }
    }

    // search the data base for the states and there total mail count
    // similar to stateMailCountTable, though after 80% full, the remaining states will be joined.
    // This chart is meant to showcase the main states and their contributions visually
    getStateData = () => {
        let stateData = [];
        
        // add data to the array. search database here
        stateData.push({state: 'Oregon', mailCount: 150});
        stateData.push({state: 'California', mailCount: 250});
        stateData.push({state: 'Nevada', mailCount: 150});
        stateData.push({state: 'Vermont', mailCount: 10});
        stateData.push({state: 'West Virginia', mailCount: 50});
        stateData.push({state: 'Virginia', mailCount: 20});

        // sort the data and return it to the piechart
        return this.sortStateData(stateData);
    }

    sortStateData = (stateData) => {
        let mailCounts = [];
        let states = [];

        for(let i = 0; i < stateData.length; ++i) {
            mailCounts.push(stateData[i].mailCount);
        }

        for(let i = 0; i < stateData.length; ++i) {
            states.push(stateData[i].state);
        }

        for (let i = 0; i < mailCounts.length-1; i++) 
        {
            for (let j = 0; j < mailCounts.length-i-1; j++) 
            {
                if (mailCounts[j] < mailCounts[j+1]) 
                { 
                    // swaping count and state name
                    let temp_count = mailCounts[j];
                    let temp_state = states[j];
                    mailCounts[j] = mailCounts[j+1]; 
                    states[j] = states[j+1]; 
                    mailCounts[j+1] = temp_count; 
                    states[j+1] = temp_state; 
                } 
            }
        }

        return {mailCount: mailCounts, stateNames: states};
    }
  
    render() {
      return (
        <div className="card">
          <Pie
            options={this.state.options} 
            data={this.state.data} 
            />
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