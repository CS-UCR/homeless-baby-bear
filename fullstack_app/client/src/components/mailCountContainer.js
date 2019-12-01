import React, { Component } from 'react';
import MailCountChart from '../chartsjs/mailCountChart';

export class mailCountChart extends Component {
    state = {
        chart_choice: "week"
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

    // rendering a new chart based on the button pressed.
    render() {
        let mailCountChart = null;

        if(this.state.chart_choice === "week") {
            mailCountChart = (
                <MailCountChart chartTimeframe={"week"} type="mail-count"/>
            )
        }
        else if(this.state.chart_choice === "month") {
            mailCountChart = (
                <MailCountChart chartTimeframe={"month"} type="mail-count"/>
            )
        }
        else if(this.state.chart_choice === "year") {
            mailCountChart = (
                <MailCountChart chartTimeframe={"year"} type="mail-count"/>
            )
        }
        else if(this.state.chart_choice === "lifetime") {
            mailCountChart = (
                <MailCountChart chartTimeframe={"lifetime"} type="mail-count"/>
            )
        }

        return (
            <div className="main-header">
                <div id="graph-picker" className="time-picker">
                    <button onClick={this.weekSelected}>Last week</button>
                    <button onClick={this.monthSelected}>Last month</button>
                    <button onClick={this.yearSelected}>Last year</button>
                    <button onClick={this.lifetimeSelected}>Lifetime</button>
                    {/* Lets not include custom for now */}
                    {/* <button>Custom Timeframe</button> */}
                </div>
                {mailCountChart}
            </div>
        )
    }
}

export default mailCountChart
