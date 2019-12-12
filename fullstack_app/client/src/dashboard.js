// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

import Helmet from 'react-helmet';
import MailNetchange from './components/mailNetchange';
import MailCountChart from './components/mailCountContainer';
import StatePieChart from './chartsjs/statePieChart';
import TopFive from './components/topFive';
import StateMailCountTable from './components/stateMailCountTable';


class SimpleMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            allData: [],
            dateData: [],
            date: new Date(),
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
            week_num: 0,
            month_num: 0,
            year_num: 0,
            last_week_num: 0,
            last_month_num: 0,
            last_year_num: 0,
            getdata_num: false,
            lifetime_num: 0,
            date_rank_lable: [],
            date_rank_data: [],
            city_rank_lable: [],
            city_rank_data: [],
            address_rank_lable: [],
            address_rank_data: [],
            state_rank_lable: [],
            state_rank_data: [],
            states_array: []
        }
    }

    getDataFromDbDate =  (fromDate, toDate, var_name, i) => {
        axios.post(process.env.REACT_APP_API+'/getData_bydate', {
            fromDate: fromDate,
            toDate: toDate,
            location_type: "ALL"
        }).then((res) => {
            var_name[i] = res.data.data.length;
            if(var_name === this.state.lifetime)
                this.setState({allData: this.state.allData.concat(res.data.data)});
        });
    };

    getDataFromDbDate2 =  (fromDate, toDate, var_name) => {
        axios.post(process.env.REACT_APP_API+'/getData_bydate', {
            fromDate: fromDate,
            toDate: toDate,
            location_type: "ALL"
        }).then((res) => {
            console.log(res.data.data.length)
            this.setState({[var_name]: res.data.data.length})
        });
    };

    // ---Label functions for mail count chart
    getLastWeekLabels (){
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
            this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5 + i), this.state.week, i)
            if(this.state.getWeek !== false && i === 6)
                this.setState({getWeek: true});
        }
        this.setState({weeklabels: dateLabels})
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
            if(this.state.getMonth === false && i < 6){
                this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30 + (5 * i)+5),this.state.month,i)
                
            }else{
                this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30 + (5 * i)+5),this.state.month,i)
        
                this.setState({getMonth: true})
            }
        }
        this.setState({monthlabels: dateLabels});
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
            if(this.state.getYear === false && i !== 11){
                this.getDataFromDbDate(date,new Date(today.getFullYear(), today.getMonth() - 11 + i+1),this.state.year ,i)
               
            }else{
                this.getDataFromDbDate(date,new Date(today.getFullYear(),today.getMonth() - 11 + i+1),this.state.year ,i)
               
                this.setState({getYear: true})
            }
        }
        this.setState({yearlabels: dateLabels})
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
            if(this.state.getLifetime === false && i !== numLabels - 2){
                this.getDataFromDbDate(date,new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 1 + (Math.ceil(dayDifference / numLabels - 1) * (i+1))), this.state.lifetime ,i)
            }else{
                this.getDataFromDbDate(date, new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),this.state.lifetime ,i)
                this.setState({getLifetime: true})
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
        this.setState({lifetimelabels: dateLabels})
    }

    map_reduce=(mapper, labels, datas)=>{
        mapper.sort()
        var name_array = []
        var number_array = []
        var array = [{label: mapper[0], data: 1}]
        for(let i = 1; i < mapper.length; i++){
            if(mapper[i] !== mapper[i-1])
            {  
                array.push({label: mapper[i], data: 1})
            }else{
                array[array.length-1].data += 1
            }
        }
        array.sort(function(a, b){return a.data -b.data}).reverse()
        for(let i = 0; i < array.length; i++){
            name_array.push(array[i].label)
            number_array.push(array[i].data)
        }
        if(labels === "state_rank_lable")
        {
            this.setState({states_array: array})
        }
        this.setState({[labels]: name_array, [datas]: number_array})
    }

    setValue=()=>{
        if(this.state.getdata_num === true){
            if(this.state.date_rank_lable.length === 0 || this.state.date_rank_lable[0] === undefined){
                this.setState({week_num: this.state.week.reduce((a, b) => a + b, 0)})
                this.setState({month_num: this.state.month.reduce((a, b) => a + b, 0)})
                this.setState({year_num: this.state.year.reduce((a, b) => a + b, 0)})
                this.setState({lifetime_num: this.state.lifetime.reduce((a, b) => a + b, 0)})
                let today = new Date();
                this.getDataFromDbDate2(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14),new Date(today.getFullYear(), today.getMonth(), today.getDate() -6),"last_week_num")
                this.getDataFromDbDate2(new Date(today.getFullYear(), today.getMonth()-2, today.getDate()),new Date(today.getFullYear(), today.getMonth()-1, today.getDate()),"last_month_num")
                this.getDataFromDbDate2(new Date(today.getFullYear()-2, today.getMonth(), today.getDate()),new Date(today.getFullYear()-1, today.getMonth(), today.getDate()),"last_year_num")
                var mapper_date = this.state.allData.map(data => data.date.substring(0,10))
                var mapper_city = this.state.allData.map(data => data.city)
                var mapper_address = this.state.allData.map(data => data.address)
                var mapper_state = this.state.allData.map(data => data.state)
                this.map_reduce(mapper_date, "date_rank_lable", "date_rank_data")
                this.map_reduce(mapper_city, "city_rank_lable", "city_rank_data")
                this.map_reduce(mapper_address, "address_rank_lable", "address_rank_data")
                this.map_reduce(mapper_state, "state_rank_lable", "state_rank_data")
            }
        }
        if(this.state.getdata_num === false){
            this.getLastWeekLabels()
            this.getLast30DaysLabels()
            this.getLastYearLabels()
            this.getCGLabels(new Date("August 19, 2018"), new Date())
            this.setState({getdata_num: true})
        }
    }

    componentDidMount () {
        this.timerID = setInterval(() => this.tick(), 500);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick() {
        this.setValue()
        this.setState({date: new Date()});
    }

    render() {
        return (
        <div>
            <Helmet>
                <meta charset="utf-8"></meta>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
                <link rel="shortcut icon" href="../favicon.ico"></link>
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet"></link>
                <link rel="stylesheet" href="styles_dashboard.css"></link>
                <title>National Dashboard</title>
            </Helmet>
            <div className="grid-container">
                <main className="main">
                    <MailCountChart state={this.state}/>

                    <div className="main-overview">
                        <TopFive description="Cities" state={this.state} />
                        <TopFive description="Addresses" state={this.state}/>
                        <TopFive description="Dates" state={this.state}/>
                    </div>

                    <div className="main-cards">
                        <StatePieChart state={this.state}/>
                        <MailNetchange state={this.state}/>
                    </div>

                    <StateMailCountTable state={this.state}/>

                </main>
            </div>  
        </div>

        );
    }
}

export default SimpleMap;