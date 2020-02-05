// /client/App.js
import React, { Component } from "react";

// Need to remove this later?
import Helmet from "react-helmet";
import GoogleMapReact from "google-map-react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AlgoliaPlaces from "algolia-places-react";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}));

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 39.5,
        lng: -98.35
      },
      zoom: 5,
      heatMapData: null,
      generated: false
    };

    this.generateHeatMapData = this.generateHeatMapData.bind(this);
  }
  classes = useStyles;

  generateHeatMapData = () => {
    if (!this.state.generated) {
      let heatmapData = [];

      fetch(process.env.REACT_APP_API + "/getData")
        .then(data => data.json())
        .then(res => {
          for (let i = 0; i < res.data.length; ++i) {
            let latitude = res.data[i].lat;
            let longitude = res.data[i].lng;
            heatmapData.push({
              lat: latitude,
              lng: longitude
            });
          }
          this.setState({
            heatMapData: {
              positions: heatmapData,
              options: {
                radius: 10,
                opacity: 0.6
              }
            },
            generated: true
          });
        });
    }
  };
  // zoom in on that location
  locationEntered = (locationType, coordinates) => {
    if (locationType === "city") {
      this.setState({
        zoom: 10,
        center: {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
      });
    } else if (locationType === "address") {
      this.setState({
        zoom: 15,
        center: {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
      });
    }
  };
  componentDidMount() {
    if (!this.state.generated) this.generateHeatMapData();
  }

  render() {
    return (
      <div>
        <Helmet>
          <meta charset="utf-8"></meta>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          ></meta>
          <link rel="icon" href="../public/favicon2.ico" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="stylesheet" href="styles.css"></link>
          <title>Mail Sender Heatmap</title>
        </Helmet>
        <Paper className={this.classes.root}>
          <div className="search-container">
            <div id="search-form">
              <AlgoliaPlaces
                placeholder="Write an address or city here"
                options={{
                  appId: "plYR0C6D25C3",
                  apiKey: "cb7d79d87daed4f68068500409865fa1",
                  language: "en"
                  // Other options from https://community.algolia.com/places/documentation.html#options
                }}
                onChange={({
                  query,
                  rawAnswer,
                  suggestion,
                  suggestionIndex
                }) => {
                  this.locationEntered(suggestion.type, suggestion.latlng);
                }}
              />
            </div>
          </div>

          {/* Heat map code */}
          <div style={{ height: "100vh", width: "100%" }}>
            {this.state.generated ? (
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.GOOGLE_MAP_CREDENTIALS
                }}
                center={this.state.center}
                zoom={this.state.zoom}
                heatmapLibrary={true}
                heatmap={this.state.heatMapData}
                options={{ mapTypeId: "hybrid" }}
              ></GoogleMapReact>
            ) : (
              <h5> </h5>
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

export default SimpleMap;
