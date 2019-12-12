import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class topFive extends Component {
    render() {
        let topFive = {};

        if(this.props.description === "Cities") {
            topFive = this.getTopFiveCities();
        }

        else if(this.props.description === "Addresses") {
            topFive = this.getTopFiveAddreses();
        }

        else if(this.props.description === "Dates") {
            topFive = this.getTopFiveDates();
        }
        
        // Need this if statement in case topFive hasn't been assigned data yet.
        // Otherwise, React will return an error and page can't load
        if(!topFive.value && !topFive.mailCount) {
            return (
                <div className="overviewcard">
                    Loading..
                </div>
            )
        }
        return (
            <div className="overviewcard">
                Top 5 {this.props.description}
                <ol>
                    <li>{topFive.value[0]}, {topFive.mailCount[0]}</li>
                    <li>{topFive.value[1]}, {topFive.mailCount[1]}</li>
                    <li>{topFive.value[2]}, {topFive.mailCount[2]}</li>
                    <li>{topFive.value[3]}, {topFive.mailCount[3]}</li>
                    <li>{topFive.value[4]}, {topFive.mailCount[4]}</li>
                </ol>
            </div>
        )
    }

    // All of these functions will return an object with two arrays: value and mailCount
    // value: the name of the description. So if description is Cities, value will be the name of the city.
    // mailCount: mail count for that particular city/addresses/date
    // Note: I feel like there could be a better name for value

    getTopFiveCities = () => {
        // search the database for the cities here
        
        // placeholder
        return {
            value: this.props.state.city_rank_lable,
            mailCount: this.props.state.city_rank_data
        };
    }

    getTopFiveAddreses = () => {
        // search the database for the addresses here

        // placeholder
        return {
            value: this.props.state.address_rank_lable,
            mailCount: this.props.state.address_rank_data
        };
    }

    getTopFiveDates = () => {
        // search the database for the dates here

        // placeholder
        return {
            value: this.props.state.date_rank_lable,
            mailCount: this.props.state.date_rank_data
        };
    }
}

topFive.propTypes = {
    description: PropTypes.string.isRequired
};

export default topFive