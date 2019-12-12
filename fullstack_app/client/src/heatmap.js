// /client/App.js
import React, { Component } from 'react';

// Need to remove this later?
import Helmet from 'react-helmet';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AlgoliaPlaces from 'algolia-places-react';

let heatMapData = {
    positions: generateHeatMapData(),
    options: {
        radius: 10,
        opacity: 0.6
	}
}

function generateHeatMapData() {
    let heatmapData = [];
    
    fetch(process.env.REACT_APP_API+'/getData')
    .then((data) => data.json())
    .then((res) => {
        for(let i = 0; i < res.data.length; ++i){
            
            let latitude = res.data[i].lat;
            console.log(latitude)
            let longitude = res.data[i].lng;
            heatmapData.push(
                {
                    lat: latitude, lng: longitude
                }
            );
        }
    }
    );
    return heatmapData;
}

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
  }));

class SimpleMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            center: {
                lat: 39.5,
                lng: -98.35
              },
              zoom: 5
        }

    }
    classes = useStyles;

    // zoom in on that location
    locationEntered = (locationType, coordinates) => {
        if(locationType === "city") {
            this.setState({
                zoom: 10,
                center: {
                    lat: coordinates.lat,
                    lng: coordinates.lng
                }
            })
        }
        else if(locationType === "address") {
            this.setState({
                zoom: 15,
                center: {
                    lat: coordinates.lat,
                    lng: coordinates.lng
                }
            })
        }
    }

    render() {
        return (
            
            <div>
                <Helmet>
                    <meta charset="utf-8"></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
                    <link rel="icon" href="../public/favicon2.ico" />
                    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet"></link>
                    <link rel="stylesheet" href="styles.css"></link>
                    <title>Mail Sender Heatmap</title>
                </Helmet>
                <Paper className={this.classes.root} >
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
                                    this.locationEntered(suggestion.type, suggestion.latlng)}
                            }
                        />
                    </div>
                </div>

                {/* Heat map code */}
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyArXSxgGfYKbh_pMB5rTXgQ3dqmX7gGADE"}}
                        center={this.state.center}
                        zoom={this.state.zoom}
                        heatmapLibrary={true} 
                        heatmap={heatMapData}
                        options={{mapTypeId: 'hybrid'}}
                        >
                    </GoogleMapReact>
                </div>
                </Paper>
            </div>
        )
    }
}

export default SimpleMap;