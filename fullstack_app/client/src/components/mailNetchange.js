import React, { Component } from 'react'

// The main purpose of the component is to compare the last week, month, and year with the week, month, and year before it.

export class Netchange extends Component {
    constructor(props){
        super(props);
        this.state = {
            chart_choice: "week",
            percent: 25,
            number: 200
        }
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
                <span className="card-title">Mail count net change</span>
                    <div id="net-picker" className="time-picker">
                        <button onClick={this.weekSelected}>Last week</button>
                        <button onClick={this.monthSelected}>Last month</button>
                        <button onClick={this.yearSelected}>Last year</button>
                    </div>
                    {/* Can remove this h2 */}
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
            percentage: (parseInt((parseInt(this.props.state[this.state.chart_choice+"_num"]))*100/(parseInt(this.props.state["lifetime_num"]))))+"%",
            mailCount: this.props.state[this.state.chart_choice+"_num"]
        }
    }
}

export default Netchange