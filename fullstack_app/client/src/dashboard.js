// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

import Helmet from 'react-helmet';
import Barcharts from './chartsjs/barcharts'

class SimpleMap extends Component {
    state = {
        percent_number : "+24%",
        chart_choice: "week"
    }

    componentDidMount () {
        let script = document.createElement("script");
        script.src = "app_dashboard.js";
        script.async = true;
        document.body.appendChild(script);
    }

    weekSelected = () => {
        this.setState({
            chart_choice: "week"
        })
    }

    monthSelected = () => {
        this.setState({
            chart_choice: "month"
        })
    }

    yearSelected = () => {
        this.setState({
            chart_choice: "year"
        })
    }

    lifetimeSelected = () => {
        this.setState({
            chart_choice: "lifetime"
        })
    }

  render() {
    let chart = null;

    if(this.state.chart_choice === "week") {
        chart = (
            <Barcharts chartTimeframe={"week"}/>
        )
    }
    else if(this.state.chart_choice === "month") {
        chart = (
            <Barcharts chartTimeframe={"month"}/>
        )
    }
    else if(this.state.chart_choice === "year") {
        chart = (
            <Barcharts chartTimeframe={"year"}/>
        )
    }
    else if(this.state.chart_choice === "lifetime") {
        chart = (
            <Barcharts chartTimeframe={"lifetime"}/>
        )
    }

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
                <div className="main-header">
                    <div id="graph-picker" className="time-picker">
                        <button onClick={this.weekSelected}>Last week</button>
                        <button onClick={this.monthSelected}>Last month</button>
                        <button onClick={this.yearSelected}>Last year</button>
                        <button onClick={this.lifetimeSelected}>Lifetime</button>
                        {/* Lets not include custom for now */}
                        {/* <button>Custom Timeframe</button> */}
                    </div>
                    {chart}
                </div>

                <div className="main-overview">
                    <div className="overviewcard">
                        Top 5 cities(mail sent): city, mail sent in
                        <ol>
                            <li>City, # of mail sent in</li>
                            <li>City, # of mail sent in</li>
                            <li>City, # of mail sent in</li>
                            <li>City, # of mail sent in</li>
                            <li>City, # of mail sent in</li>
                        </ol>
                    </div>
                    <div className="overviewcard">
                        Top 5 addresses. mail sent in
                        <ol>
                            <li>Address, # of mail sent in</li>
                            <li>Address, # of mail sent in</li>
                            <li>Address, # of mail sent in</li>
                            <li>Address, # of mail sent in</li>
                            <li>Address, # of mail sent in</li>
                        </ol>
                    </div>
                    <div className="overviewcard">
                        Top 5 dates. mail sent in
                        <ol>
                            <li>Dates, # of mail sent in</li>
                            <li>Dates, # of mail sent in</li>
                            <li>Dates, # of mail sent in</li>
                            <li>Dates, # of mail sent in</li>
                            <li>Dates, # of mail sent in</li>
                        </ol>
                    </div>
                </div>

                <div className="main-cards">
                    <div className="card">
                        <canvas id="states-piechart"></canvas>
                    </div>
                    <div className="card">
                        Mail count net change.
                        <div id="net-picker" className="time-picker">
                            <button>Yesterday</button>
                            <button>Last week</button>
                            <button>Last month</button>
                            <button>Last year</button>
                        </div>
                        <span className="net-change-percent">
                            <span className="sign positive" > {this.state.percent_number} </span>
                        </span>
                        <span className="net-change-value">
                            <span id="net-change-msg">
                                <span id="net-value" className="positive">+200</span> mail recieved vs. <span id="time-choice">yesterday</span>
                            </span>
                        </span>
                    </div>
                </div>

                <div className="main-header">
                    table with state and the total number of mail from them
                    <table>
                        <thead>
                            <tr>
                                <th>State</th>
                                <th>Mail count</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>California</td>
                                <td>10</td>
                            </tr>
                            <tr>
                                <td>Nevada</td>
                                <td>5</td>
                            </tr>
                        </tbody>
                    </table>
                </div>    

            </main>

            <footer className="footer">
                <div className="footer-copyright">&copy; AMT</div>
                <div className="footer-signature">Made by team homeless baby bear</div>
            </footer>
        </div>  
    </div>

    );
  }
}

export default SimpleMap;