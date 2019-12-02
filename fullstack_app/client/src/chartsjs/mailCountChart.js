import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Bar, Line} from 'react-chartjs-2';

export class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            weeklables: [],
            monthlables: [],
            yearlables: [],
            lifetimelables: [],
            getWeek: false,
            getMonth: false,
            getYear: false,
            getLifetime:false,
            week: [],
            month: [],
            year: [],
            lifetime: [], 

            // Can't really do the charts with state props. Leaving this for now. 
        }
    }

    render() {
        let chart = null;
            this.getLastWeekLabels()
            this.getLast30DaysLabels()
            this.getLastYearLabels()
            this.getCGLabels(new Date("August 19, 2018"), new Date("August 19, 2019"))

            if(this.props.chartTimeframe === "week") {
                if(this.state.week.length > 0 )
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
                {this.state.week.length > 0? chart: <div>Please Select by clicking the button</div>}
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
    getDataFromDbDate =  (fromDate, toDate, var_name, i) => {

        axios.post('http://localhost:3001/api/getData_bydate', {
            fromDate: fromDate,
            toDate: toDate,
        }).then((res) => {
           // console.log(var_name)
             var_name[i] = res.data.data.length;
            return res.data.data.length;
            //this.setState({ [var_name]: res.data.data })
        });
    };


    getLastWeekData = () => {
        // we must query the database for 'data' in the datasets object
        return {
            labels: this.state.weeklables,
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
            labels: this.state.monthlables,
            datasets: [{
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: this.state.month
            }]
        };
    }

    getLastYearData = () => {

        return {
            labels: this.state.yearlables,
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
            labels: this.state.lifetimelables, // first date is start date, second is end date
            datasets: [{
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data:this.state.lifetime
            }]
        }
    }

    // ---Label functions for mail count chart

    getLastWeekLabels =() => {
        let dateLabels = [];
        let dateData = [];
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
                
                dateData.push(this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5 + i), this.state.week,i))
            }else{
                dateData.push(this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5 + i), this.state.week,i))
                this.state.getWeek = true
            }
        }
        
        this.state.weeklables = dateLabels
        return dateData
        //return dateLabels;
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
            if(this.state.getMonth == false && i < 6){
                this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30 + (5 * i)+5),this.state.month,i)
            }else{
                this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30 + (5 * i)+5),this.state.month,i)
                this.state.getMonth = true
            }
        }
        this.state.monthlables = dateLabels;
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
            if(this.state.getYear == false && i != 11){
                this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth() - 11 + i+1),this.state.year ,i)
            }else{
                this.getDataFromDbDate(date,new Date(today.getFullYear(),today.getMonth() - 11 + i+1),this.state.year ,i)
                this.state.getYear = true
            }
        }
       // this.state.year = datedata
        this.state.yearlables =  dateLabels;
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
            if(this.state.getLifetime == false && i != numLabels - 2){
                this.getDataFromDbDate(date,new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1 + (Math.ceil(dayDifference / numLabels - 1) * (i+1))), this.state.lifetime ,i)
            }else{
                this.getDataFromDbDate(date, new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),this.state.lifetime ,i)
                this.state.getLifetime = true
            }
        }
    
        // add endDate label. Got to guarentee the endDate is the last label
        date = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
        dd = String(date.getDate()).padStart(2, '0');
        mm = String(date.getMonth() + 1).padStart(2, '0');
        yyyy = date.getFullYear();
        dateString = mm + '/' + dd + '/' + yyyy;
        dateLabels.push(dateString);
        this.getDataFromDbDate(date, new Date(),this.state.lifetime ,numLabels - 1)
        
        //this.state.lifetime = datedata
       this.state.lifetimelables = dateLabels
    }
}

// Prop passed in through the dashboard component
/*
Chart.propTypes = {
    chartTimeframe: PropTypes.string.isRequired
};

*/
export default Chart;