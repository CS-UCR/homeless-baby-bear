import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Bar, Line} from 'react-chartjs-2';

export class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            month: props.state.month,
            year: props.state.year,
            lifetime: props.state.lifetime
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

    // ---Time frame helpers

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
                text: "Total mail sent this past " + this.props.chartTimeframe + ". Total: " +this.props.state[this.props.chartTimeframe+"_num"],
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
            labels: this.props.state.weeklables,
            datasets: [{
              data: this.props.state.week,
              backgroundColor: [
                "rgba(255, 235, 59, 0.6)",
                "rgba(121, 85, 72, 0.6)",
                "rgba(233, 30, 99, 0.6)",
                "rgba(75, 192, 192, 0.6)",
                "rgba(153, 102, 255, 0.6)",
                "rgba(255, 159, 64, 0.6)",
                "rgba(105, 205, 0, 0.6)"
          
              ],
              borderColor: [
                "rgba(255, 235, 59, 1)",
                "rgba(121, 85, 72, 1)",
                "rgba(233, 30, 99, 1)",
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
        const monthdata = this.state.month.slice(0, 7)
        return {
            labels: this.props.state.monthlables,
            datasets: [{
                backgroundColor: "#00ed84",
                borderColor: "#00ed84",
                data: monthdata
            }]
        };
    }

    getLastYearData = () => {
        const yeardata = this.state.year.slice(0, 12)
        return {
            labels: this.props.state.yearlables,
            datasets: [{
                backgroundColor: "#00ed84",
                borderColor: "#00ed84",
                data: yeardata
            }]
        }
    }

    // getCGLabels are currently hard coded.
    // Need to get the database start date(the day it was created) and end date(today's date).
    getLifetimeData = () => {
        const lifetimedata = this.state.lifetime.slice(0, 12)
        return {
            labels: this.props.state.lifetimelables,
            datasets: [{
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: lifetimedata
            }]
        }
    }

    // ---Label functions for mail count chart

}

// Prop passed in through the dashboard component
Chart.propTypes = {
    chartTimeframe: PropTypes.string.isRequired
};

export default Chart;