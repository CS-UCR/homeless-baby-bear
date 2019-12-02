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
    state = {
        // state not needed for now
    }

    // needed for the javascript in the js file to work. Might remove later
    componentDidMount () {
        let script = document.createElement("script");
        script.src = "app_dashboard.js";
        script.async = true;
        document.body.appendChild(script);
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
                <MailCountChart />

                <div className="main-overview">
                    <TopFive description="Cities" />
                    <TopFive description="Addresses" />
                    <TopFive description="Dates" />
                </div>

                <div className="main-cards">
                    <StatePieChart />
                    <MailNetchange />
                </div>

                <StateMailCountTable />

            </main>
        </div>  
    </div>

    );
  }
}

export default SimpleMap;