import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Bar, Line, Pie} from 'react-chartjs-2';

export class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            // Can't really do the charts with state props. Leaving this for now. 
        }
    }

    render() {
        let chart = null;

        if(this.props.chartTimeframe === "week") {
            chart = <Bar 
                data={this.getLastWeekData}
                options={this.getOptions()} />
        }
        else if(this.props.chartTimeframe === "month") {
            chart = <Line 
                data={this.getLast30DaysData}
                options={this.getOptions()} />
        }
        else if(this.props.chartTimeframe === "year") {
            chart = <Line 
                data={this.getLastYearData}
                options={this.getOptions()} />
        }
        else if(this.props.chartTimeframe === "lifetime") {
            chart = <Line 
                data={this.getLifetimeData}
                options={this.getOptions()} />
        }

        return (
            <div className="chart">
                {chart}
            </div>
        )
    }

    // Helper functions. Same as the ones in the original websites(non-React versions)

    // add the database query to show the total.
    getOptions = () => {
        return {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            title: {
                display: true,
                text: "Total mail sent this past " + this.props.chartTimeframe + ". Total: ",
                fontSize: 18
            },
            scales: {
                xAxes: [{
                gridLines: {
                    display:true
                },
                ticks: {
                    fontSize: 16
                }  
                }],
                yAxes: [{
                    gridLines: {
                        display:true
                    },
                    ticks: {
                        beginAtZero: true,
                        fontSize: 16
                    }   
                }]
            }
        };
    }

    getLastWeekData = () => {
        // we must query the database for 'data' in the datasets object
        return {
            labels: this.getLastWeekLabels(),
            datasets: [{
              data: [20, 10, 30, 10, 20, 10, 50],
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
              borderWidth: 1
            }]
        };
    }

    getLast30DaysData = () => {
        return {
            labels: this.getLast30DaysLabels(),
            datasets: [{
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [20, 10, 30, 10, 20, 10, 50]
            }]
        };
    }

    getLastYearData = () => {
        return {
            labels: this.getLastYearLabels(),
            datasets: [{
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 100, 184, 293, 400, 567, 630, 710, 885, 943, 1075, 1200]
            }]
        }
    }

    // getCGLabels are currently hard coded.
    // Need to get the database start date(the day it was created) and end date(today's date).
    getLifetimeData = () => {
        return {
            labels: this.getCGLabels(new Date("August 19, 2018"), new Date("August 19, 2019")),
            datasets: [{
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 100, 184, 293, 400, 567, 630, 710, 885, 943, 1075, 1200]
            }]
        }
    }

    getLastWeekLabels = () => {
        let dateLabels = [];
        let today = new Date();
        let date = null;
        let dd = "";
        let mm = "";
        let yyyy = "";
        let dateString = "";
    
        for(let i = 0; i < 7; ++i) {
            date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6 + i);
            dd = String(date.getDate()).padStart(2, '0');
            mm = String(date.getMonth() + 1).padStart(2, '0');
            yyyy = date.getFullYear();
            dateString = mm + '/' + dd + '/' + yyyy;
            dateLabels.push(dateString);
        }
    
        return dateLabels;
    }

    getLast30DaysLabels = () => {
        let dateLabels = [];
        let today = new Date();
        let date = null;
        let mm = "";
        let dd = "";
        let yyyy = "";
        let dateString = "";
    
        for(let i = 0; i < 7; ++i) {
            date = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30 + (5 * i));
            dd = String(date.getDate()).padStart(2, '0');
            mm = String(date.getMonth() + 1).padStart(2, '0');
            yyyy = date.getFullYear();
            dateString = mm + '/' + dd + '/' + yyyy;
            dateLabels.push(dateString);
        }
    
        return dateLabels;
    }

    getLastYearLabels = () => {
        let dateLabels = [];
        let today = new Date();
        let date = null;
        let mm = "";
        let yyyy = "";
        let dateString = "";
    
        for(let i = 0; i < 12; ++i) {
            date = new Date(today.getFullYear(), today.getMonth() - 11 + i);
            mm = String(date.getMonth() + 1).padStart(2, '0');
            yyyy = date.getFullYear();
            dateString = mm + '/' + yyyy;
            dateLabels.push(dateString);
        }
    
        return dateLabels;
    }

    getCGLabels = (startDate, endDate) => {
        const oneDay = 1000 * 3600 * 24;
        const dayDifference = (endDate - startDate) / oneDay;
    
        if(dayDifference <= 7) {
            return this.cgLabelGenerator(dayDifference, startDate, endDate, dayDifference);
        }
        else {
            return this.cgLabelGenerator(10, startDate, endDate, dayDifference);
        }
    }
    
    cgLabelGenerator = (numLabels, startDate, endDate, dayDifference) => {
        let dateLabels = [];
        let date = null;
        let dd = "";
        let mm = "";
        let yyyy = "";
        let dateString = "";
    
        for(let i = 0; i < numLabels - 1; ++i) {
            date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1 + (Math.ceil(dayDifference / numLabels - 1) * i));
            dd = String(date.getDate()).padStart(2, '0');
            mm = String(date.getMonth() + 1).padStart(2, '0');
            yyyy = date.getFullYear();
            dateString = mm + '/' + dd + '/' + yyyy;
            dateLabels.push(dateString);
        }
    
        // add endDate label. Got to guarentee the endDate is the last label
        date = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        dd = String(date.getDate()).padStart(2, '0');
        mm = String(date.getMonth() + 1).padStart(2, '0');
        yyyy = date.getFullYear();
        dateString = mm + '/' + dd + '/' + yyyy;
        dateLabels.push(dateString);
    
        return dateLabels
    }
}

// Prop passed in through the dashboard component
Chart.propTypes = {
    chartTimeframe: PropTypes.string.isRequired
};

export default Chart;