import React, { Component } from 'react';
import Helmet from 'react-helmet';
import AlgoliaPlaces from 'algolia-places-react';
import {Bar, Line} from 'react-chartjs-2';
import MailCountChartContainer from './components/locMailCountContainer';
import AddressesTable from './components/addressesTable';

export class locStats extends Component {
    constructor(props){
        super(props);
        this.state = {
            location: "" // maybe have a default location
        }

    }

    locationEntered = (location) => {
        if(location.type === "city") {
            this.setState({
                location: location.name + ", " + location.administrative // City, State
            })
            // query the database for the city
        }
        else if(location.type === "address") {
            this.setState({
                location: location.name + ", " + location.city + ", " + location.administrative // Address, City, State
            })
            // query the database for the address
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
                <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="styles_loc_stats.css"/>
                <title>Location Stats</title>
                </Helmet>
                <div classNameName="main-container">
                    <div className="search-container">
                        <div id="search-form">
                            <AlgoliaPlaces
                                placeholder='Write an address or city here'
                            
                                options={{
                                    appId: 'plYR0C6D25C3',
                                    apiKey: 'cb7d79d87daed4f68068500409865fa1',
                                    language: 'en'
                                    // Other options from https://community.algolia.com/places/documentation.html#options
                                }}
                            
                                onChange={
                                    ({ query, rawAnswer, suggestion, suggestionIndex }) => {
                                        this.locationEntered(suggestion);
                                        console.log(suggestion); 
                                        // this is the object that is returned when the user enters a location
                                        // use it for the query of the database if needed
                                    }
                                }
                            />
                        </div>
                    </div>

                    <div className="stats-container">
                        <h1 id="location">{this.state.location}</h1>
                        <MailCountChartContainer state={"week"}/>
                        <AddressesTable />
                    </div>
                </div>
            </div>
        )
    }
}

export default locStats