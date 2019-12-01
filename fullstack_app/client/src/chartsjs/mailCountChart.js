import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Bar, Line} from 'react-chartjs-2';

export class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            today: new Date(),
            week: [0,0,0,0,0,0,0],
            month: [0,0,0,0,0,0,0],
            year: [0,0,0,0,0,0,0,0,0,0,0,0],
            lifetime: [0,0,0,0,0,0,0,0,0,0], 
            getWeek: false,
            getMonth: false,
            getYear: false,
            getLifetime:false,
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
    
    getTotal = (var_name) => {
        let total = 0;
        for(let i = 0; i < var_name.length;i++){
            total += var_name[i];
        }
        return total
    }
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
                text: "Total mail sent this past " + this.props.chartTimeframe + ". Total: "+this.getTotal(this.state[this.props.chartTimeframe]),
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
    getDataFromDbDate = (fromDate, toDate, var_name, i) => {
        axios.post('http://localhost:3001/api/getData_bydate', {
            fromDate: fromDate,
            toDate: toDate,
        }).then((res) => {
            var_name[i] = res.data.data.length;
            //this.setState({ [var_name]: res.data.data })
        });
    };


    getLastWeekData = () => {
        // we must query the database for 'data' in the datasets object
        return {
            labels: this.getLastWeekLabels(),
            datasets: [{

              data: this.state.week,
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
                data: this.state.month
            }]
        };
    }

    getLastYearData = () => {
        return {
            labels: this.getLastYearLabels(),
            datasets: [{
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: this.state.year
            }]
        }
    }

    // getCGLabels are currently hard coded.
    // Need to get the database start date(the day it was created) and end date(today's date).
    getLifetimeData = () => {
        return {
            labels: this.getCGLabels(new Date("August 19, 2018"), new Date("August 19, 2019")), // first date is start date, second is end date
            datasets: [{
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 100, 184, 293, 400, 567, 630, 710, 885, 943, 1075, 1200]
            }]
        }
    }

    // ---Label functions for mail count chart

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
            if(this.state.getWeek == false && i != 6){
                console.log(date)
                this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5 + i), this.state.week,i)
            }else{
                this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5 + i), this.state.week,i)
                this.state.getWeek = true
            }
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
            if(this.state.getMonth == false && i != 6){
                this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30 + (5 * i)+5), this.state.month,i)
            }else{
                this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30 + (5 * i)+5), this.state.month,i)
                this.state.getMonth = true
            }
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
            console.log(date)
            mm = String(date.getMonth() + 1).padStart(2, '0');
            yyyy = date.getFullYear();
            dateString = mm + '/' + yyyy;
            dateLabels.push(dateString);
            if(this.state.getYear == false && i != 11){
                this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth() - 11 + i+1), this.state.year,i)
            }else{
                this.getDataFromDbDate(date,new Date(today.getFullYear()+1,1), this.state.year,i)
                this.state.getYear = true
            }
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