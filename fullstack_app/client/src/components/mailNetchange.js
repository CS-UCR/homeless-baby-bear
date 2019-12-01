import React, { Component } from 'react'

// The main purpose of the component is to compare the last week, month, and year with the week, month, and year before it.

export class Netchange extends Component {
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

    render() {
        return (
            <div className="card">
                Mail count net change.
                    <div id="net-picker" className="time-picker">
                        <button onClick={this.weekSelected}>Last week</button>
                        <button onClick={this.monthSelected}>Last month</button>
                        <button onClick={this.yearSelected}>Last year</button>
                    </div>
                    <span className="net-change-percent">
                        <span className="sign positive" > {this.calculateNetChange().percentage} </span>
                    </span>
                    <span className="net-change-value">
                        <span id="net-change-msg">
                            <span id="net-value" className="positive">+{this.calculateNetChange().mailCount}</span> mail recieved vs. <span id="time-choice">{this.state.chart_choice}</span>
                        </span>
                    </span>
            </div>
        )
    }

    // make queries here probably
    calculateNetChange = () => {
        return {
            percentage: "24%",
            mailCount: 200
        }
    }
}

export default Netchange