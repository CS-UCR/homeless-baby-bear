// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

// Need to remove this later?
import ScriptTag from 'react-script-tag';
import Helmet from 'react-helmet';
import GoogleMapReact from 'google-map-react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { mergeClasses } from '@material-ui/styles';

/* global google */

let heatMapData = {
    positions: generateHeatMapData(),
    options: {
        radius: 10,
        opacity: 0.6
	}
}


function generateHeatMapData() {
    let heatmapData = [];
    
    fetch('http://localhost:3001/api/getData')
    .then((data) => data.json())
    .then((res) => {
        for(let i = 0; i < res.data.length; ++i){
            let latitude = parseFloat(res.data[i].lat);
            let longitude = parseFloat(res.data[i].lng);
            heatmapData.push(
                {
                    lat: latitude, lng: longitude
                }
            );
        }
        console.log(heatmapData)
    }
    );
    
    return heatmapData;
    
    /*
    for(let i = 0; i < 500; ++i) {
        let latitude = getRandomLatOrLong(30, 50, 3);
        let longitude = getRandomLatOrLong(-123, -70, 3);
    
        heatmapData.push(
            {
                lat: latitude, lng: longitude
            }
        );
    }*/
}
    
function getRandomLatOrLong(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}
    
function getWeight() {
    return Math.floor((Math.random() * 10) + 1);
}

function openSideMenu() {
    if(document.getElementById("side-menu")) {
        document.getElementById("side-menu").style.left = "0px";
    }
}

function closeSideMenu() {
    if(document.getElementById("side-menu")) {
        document.getElementById("side-menu").style.left= "-500px";
    }
}

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
  }));

class SimpleMap extends Component {
    static defaultProps = {
        center: {
          lat: 39.5,
          lng: -98.35
        },
        zoom: 5
    };
    classes = useStyles;

    

    componentDidMount () {
        // Add scripts after components loaded so that the search bar works
        let script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/places.js@1.16.6";
        script.async = true;
        document.body.appendChild(script);

        // keeping here for the search bar. don't delete
        // script = document.createElement("script");
        // script.src = "heatmap.js";
        // script.async = true;
        // document.body.appendChild(script);
    }

    render() {
        return (
            
            <div>
                <Helmet>
                    <meta charset="utf-8"></meta>
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
                    <link rel="shortcut icon" href="favicon.ico"></link>
                    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet"></link>
                    <link rel="stylesheet" href="styles.css"></link>
                    <title>Mail Sender Heatmap</title>
                </Helmet>
                <Paper className={this.classes.root} >
                <div className="search-container">
                    <span id="sidebar-btn">
                        <a id="sidebar-toggle" href="#" onClick={openSideMenu}>&#9776;</a>
                    </span>
                    <form id="search-form">
                        <input className="" id="address" type="search" placeholder="Location search" aria-label="Search"></input>
                    </form>
                </div>

                <div id={"side-menu"} className="side-nav">
                    <a href="#" onClick={closeSideMenu} id="close-menu-icon">&times;</a>
                    <img id="logo" src="" alt="A million thanks logo"></img>
                    <div className="dividing-line"></div>
                        <a href="#" className="side-nav-title">Choose graph timeframe</a>
                        <div className="options" id="timeframe-options">
                            <a href="#">Last Week</a>
                            <a href="#">Last Month</a>
                            <a href="#">Last Year</a>
                            <a href="#">Lifetime</a>
                            <a href="#">Custom Range <span className="direction-arrow">&#9660;</span></a>
                            <div className="time-pickers">
                                <label htmlFor="start">Start date:</label>
                                <input type="date" id="start-date" name="trip-start" value="2019-12-25" min="2019-12-25" max="2019-12-25"></input>
                                <label htmlFor="start">End date:</label>
                                <input type="date" id="end-date" name="trip-end" value="2019-12-25" max="2019-12-25"></input>
                                <button id="accept-range-btn">Accept</button>
                            </div>
                        </div>
                    <div className="dividing-line"></div>
                        <a href="../dashboard/index.html" className="side-nav-subtitle external-link">National stats dashboard <img src="https://img.icons8.com/metro/26/000000/external-link.png" className="external-link-icon"></img></a>
                    <div className="dividing-line"></div>
                        <a href="#" className="side-nav-subtitle">Visualizations</a>
                        <div className="options">
                            <a href="../heatmap/index.html"> National Heat Map <img src="https://img.icons8.com/metro/26/000000/external-link.png" className="external-link-icon"></img></a>
                        </div>
                    <div className="dividing-line"></div>
                        <a href="../mail_upload/index.html" className="side-nav-subtitle external-link"> Mail Upload <img src="https://img.icons8.com/metro/26/000000/external-link.png" className="external-link-icon"></img></a>
                    <div className="dividing-line"></div>
                </div>

                {/* Heat map code */}
                <div style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyArXSxgGfYKbh_pMB5rTXgQ3dqmX7gGADE"}}
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
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