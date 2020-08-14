import React, { Component } from 'react';
import Helmet from 'react-helmet';
import AlgoliaPlaces from 'algolia-places-react';
import MailCountChartContainer from './components/locMailCountContainer';
import AddressesTable from './components/addressesTable';
import axios from 'axios';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import SearchBar from 'material-ui-search-bar';

export class locStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: '', // maybe have a default location
            data: [],
            state: 'week',
            weeklabels: [],
            monthlabels: [],
            lifetimelables: [],
            week: [],
            month: [],
            year: [],
            lifetime: [],
            getlables: false,
            getData: false,
            searchQuery: false,
            query: '',
        };
    }

    getDataFromDbDate = (city, state) => {
        axios
            .post(process.env.REACT_APP_API + '/searchcitystate', {
                city: city,
                state: state,
            })
            .then(res => {
                if (res.data.success) {
                    var data = res.data.data;
                    data.forEach(single => {
                        let newdate = new Date(single.date);
                        single.date =
                            newdate.getFullYear() +
                            '-' +
                            String(newdate.getMonth() + 1).padStart(2, '0') +
                            '-' +
                            String(newdate.getDate()).padStart(2, '0');
                    });
                    this.setState({ data: data });
                    this.getLabels();
                }
                //this.setState({ [var_name]: res.data.data })
            });
    };

    search = () => {
        this.setState({ location: this.state.query });
        axios
            .post(process.env.REACT_APP_API + '/search', {
                query: this.state.query,
            })
            .then(res => {
                if (res.data.success) {
                    this.setState({ data: res.data.data });
                    this.getLabels();
                }
            });
    };
    searchByLatLong = (lat, long) => {
        axios
            .post(process.env.REACT_APP_API + '/searchlatlong', {
                lat: lat,
                long: long,
            })
            .then(res => {
                if (res.data.success) {
                    this.setState({ data: res.data.data });
                    this.getLabels();
                }
            });
    };
    //---------------------laybels
    getLabels = () => {
        this.getLastWeekLabels();
        this.getLast30DaysLabels();
        this.getLastYearLabels();
        this.getCGLabels(new Date('August 19, 2018'), new Date());
    };
    getLastWeekLabels() {
        let dateLabels = [];
        let today = new Date();
        let date = null;
        let dd = '';
        let mm = '';
        let yyyy = '';
        let dateString = '';
        let dates = [];

        for (let i = 0; i < 7; ++i) {
            date = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - 6 + i
            );
            dd = String(date.getDate()).padStart(2, '0');
            mm = String(date.getMonth() + 1).padStart(2, '0');
            yyyy = date.getFullYear();
            dateString = mm + '/' + dd + '/' + yyyy;
            dateLabels.push(dateString);
            dateString = yyyy + '-' + mm + '-' + dd;
            dates.push(dateString);
            // eslint-disable-next-line
            this.state.week[i] = 0;
            for (let j = 0; j < this.state.data.length; j++) {
                if (
                    this.state.data[j].date.toString().slice(0, 10) === dates[i]
                ) {
                    // eslint-disable-next-line
                    this.state.week[i] += 1;
                }
            }
        }
        for (let j = 0; j < this.state.data.length; j++) {
            console.log(this.state.data[j]);
            if (this.state.data[j].date.toString().slice(0, 10) >= today) {
                // eslint-disable-next-line
                this.state.week[6] += 1;
            }
        }
        this.setState({ weeklabels: dateLabels });
        //return dateLabels;
    }

    getLast30DaysLabels = () => {
        let dateLabels = [];

        let today = new Date();
        let date = null;
        let mm = '';
        let dd = '';
        let yyyy = '';
        let dateString = '';
        let dates = [];

        for (let i = 0; i < 7; ++i) {
            date = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate() - 30 + 5 * i
            );
            dd = String(date.getDate()).padStart(2, '0');
            mm = String(date.getMonth() + 1).padStart(2, '0');
            yyyy = date.getFullYear();
            dateString = mm + '/' + dd + '/' + yyyy;
            dateLabels.push(dateString);
            dateString = yyyy + '-' + mm + '-' + dd;
            dates.push(dateString);
            // eslint-disable-next-line
            this.state.month[i] = 0;
            if (i > 0) {
                for (let j = 0; j < this.state.data.length; j++) {
                    if (
                        this.state.data[j].date.toString().slice(0, 10) >
                            dates[i - 1] &&
                        this.state.data[j].date.toString().slice(0, 10) <=
                            dates[i]
                    ) {
                        // eslint-disable-next-line
                        this.state.month[i - 1] += 1;
                    }
                }
            }
        }

        for (let j = 0; j < this.state.data.length; j++) {
            if (this.state.data[j].date.toString().slice(0, 10) >= today) {
                // eslint-disable-next-line
                this.state.month[6] += 1;
            }
        }
        this.setState({ monthlabels: dateLabels });
    };

    getLastYearLabels = () => {
        let dateLabels = [];
        let today = new Date();
        let date = null;
        let mm = '';
        let yyyy = '';
        let dateString = '';
        let dates = [];

        for (let i = 0; i < 12; ++i) {
            date = new Date(today.getFullYear(), today.getMonth() - 11 + i);
            mm = String(date.getMonth() + 1).padStart(2, '0');
            yyyy = date.getFullYear();
            dateString = mm + '/' + yyyy;
            dateLabels.push(dateString);
            dates.push(yyyy + '-' + mm);
            // eslint-disable-next-line
            this.state.year[i] = 0;
            if (i > 0) {
                for (let j = 0; j < this.state.data.length; j++) {
                    if (
                        this.state.data[j].date.toString().slice(0, 7) ===
                        dates[i - 1]
                    ) {
                        // eslint-disable-next-line
                        this.state.year[i - 1] += 1;
                    }
                }
            }
        }
        for (let j = 0; j < this.state.data.length; j++) {
            if (this.state.data[j].date.toString().slice(0, 7) === dates[11]) {
                // eslint-disable-next-line
                this.state.year[11] += 1;
            }
        }
        this.setState({ yearlabels: dateLabels });
    };

    getCGLabels = (startDate, endDate) => {
        const oneDay = 1000 * 3600 * 24;
        const dayDifference = (endDate - startDate) / oneDay;

        if (dayDifference <= 7) {
            return this.cgLabelGenerator(
                dayDifference,
                startDate,
                endDate,
                dayDifference
            );
        } else {
            return this.cgLabelGenerator(10, startDate, endDate, dayDifference);
        }
    };

    cgLabelGenerator = (numLabels, startDate, endDate, dayDifference) => {
        let dateLabels = [];
        let date = null;
        let dd = '';
        let mm = '';
        let yyyy = '';
        let dateString = '';
        let dates = [];

        for (let i = 0; i < numLabels - 1; ++i) {
            date = new Date(
                startDate.getFullYear(),
                startDate.getMonth(),
                startDate.getDate() +
                    1 +
                    Math.ceil(dayDifference / numLabels - 1) * i
            );
            dd = String(date.getDate()).padStart(2, '0');
            mm = String(date.getMonth() + 1).padStart(2, '0');
            yyyy = date.getFullYear();
            dateString = mm + '/' + dd + '/' + yyyy;
            dates.push(yyyy + '-' + mm + '-' + dd);
            dateLabels.push(dateString);
            // eslint-disable-next-line
            this.state.lifetime[i] = 0;
            if (i > 0) {
                for (let j = 0; j < this.state.data.length; j++) {
                    if (
                        this.state.data[j].date.toString().slice(0, 10) >
                            dates[i - 1] &&
                        this.state.data[j].date.toString().slice(0, 10) <=
                            dates[i]
                    ) {
                        // eslint-disable-next-line
                        this.state.lifetime[i - 1] += 1;
                    }
                }
            }
        }

        // add endDate label. Got to guarentee the endDate is the last label
        date = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate()
        );
        dd = String(date.getDate()).padStart(2, '0');
        mm = String(date.getMonth() + 1).padStart(2, '0');
        yyyy = date.getFullYear();
        dateString = mm + '/' + dd + '/' + yyyy;
        dates.push(yyyy + '-' + mm);
        dateLabels.push(dateString);
        for (let j = 0; j < this.state.data.length; j++) {
            if (
                this.state.data[j].date.toString().slice(0, 10) >
                    dates[numLabels - 2] &&
                this.state.data[j].date.toString().slice(0, 10) <
                    new Date().toString().slice(0, 10)
            ) {
                // eslint-disable-next-line
                this.state.lifetime[numLabels - 2] += 1;
            }
        }
        // eslint-disable-next-line
        this.state.lifetime[numLabels - 1] = 0;
        for (let j = 0; j < this.state.data.length; j++) {
            if (
                this.state.data[j].date.toString().slice(0, 10) ===
                new Date().toString().slice(0, 10)
            ) {
                // eslint-disable-next-line
                this.state.lifetime[numLabels - 1] += 1;
            }
        }
        this.setState({ lifetimelabels: dateLabels });
    };

    locationEntered = location => {
        console.log(location);

        if (location.type === 'city') {
            this.setState({
                location: location.name + ', ' + location.administrative, // City, State
            });
            this.getDataFromDbDate(location.name, location.administrative);
            // query the database for the city
        } else if (location.type === 'address') {
            this.setState({
                location:
                    location.name +
                    ', ' +
                    location.city +
                    ', ' +
                    location.administrative, // Address, City, State
            });
            this.searchByLatLong(location.latlng.lat, location.latlng.lng);
            // query the database for the address
        }
    };

    runOnce = () => {
        if (this.state.getData === false) {
            this.setState({
                location: localStorage.getItem('topCities'), // Address, City, State
            });
            let arr = localStorage.getItem('topCities').split(', ');
            this.getDataFromDbDate(arr[0], arr[1]);
            this.setState({ getData: true });
        }
    };

    render() {
        return (
            <div>
                <Helmet>
                    <meta charset='utf-8' />
                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1, shrink-to-fit=no'
                    />
                    <script src='https://cdn.jsdelivr.net/npm/chart.js@2.8.0'></script>
                    <link
                        href='https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap'
                        rel='stylesheet'
                    />
                    <link rel='stylesheet' href='styles_loc_stats.css' />
                    <title>Location Stats</title>
                </Helmet>
                <div className='main-container'>
                    <div className='search-container'>
                        <div id='search-form'>
                            {this.state.searchQuery ? (
                                <SearchBar
                                    value={this.state.query}
                                    onChange={newValue =>
                                        this.setState({ query: newValue })
                                    }
                                    onRequestSearch={() => this.search()}
                                    onCancelSearch={() =>
                                        this.setState({ query: '' })
                                    }
                                    fullWidth
                                    style={{
                                        margin: '0 auto',
                                    }}
                                />
                            ) : (
                                <AlgoliaPlaces
                                    placeholder='Write an address or city here'
                                    options={{
                                        appId: 'plYR0C6D25C3',
                                        apiKey:
                                            'cb7d79d87daed4f68068500409865fa1',
                                        language: 'en',
                                        countries: ['us'],
                                        // Other options from https://community.algolia.com/places/documentation.html#options
                                    }}
                                    onChange={({
                                        query,
                                        rawAnswer,
                                        suggestion,
                                        suggestionIndex,
                                    }) => {
                                        this.locationEntered(suggestion);
                                        // this is the object that is returned when the user enters a location
                                        // use it for the query of the database if needed
                                    }}
                                />
                            )}
                            {this.runOnce()}
                        </div>
                    </div>

                    <div className='stats-container'>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={this.state.searchQuery}
                                    onChange={() =>
                                        this.setState({
                                            searchQuery: !this.state
                                                .searchQuery,
                                        })
                                    }
                                    value={this.state.searchQuery}
                                    color='primary'
                                />
                            }
                            label='Search by Query'
                        />

                        <h1 id='location'>{this.state.location}</h1>
                        <MailCountChartContainer
                            data={this.state.data}
                            state={this.state}
                        />
                        <AddressesTable data={this.state.data} />
                    </div>
                </div>
            </div>
        );
    }
}

export default locStats;
