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
        let mailCountChart = (
            <MailCountChart state={this.props.state} chartTimeframe={this.state.chart_choice} type="mail-count"/>
        );
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