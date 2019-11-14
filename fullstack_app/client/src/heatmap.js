// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

import ScriptTag from 'react-script-tag';
import Helmet from 'react-helmet';


class SimpleMap extends Component {
  
  

  render() {
    return (
    <div>
        <Helmet>
        <meta charset="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <link rel="shortcut icon" href="../favicon.ico"></link>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet"></link>
        <script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyArXSxgGfYKbh_pMB5rTXgQ3dqmX7gGADE&libraries=visualization">
        </script>
            <link rel="stylesheet" href="styles.css"></link>
        </Helmet>
        <div class="search-container">
    <span id="sidebar-btn">
        <a id="sidebar-toggle" href="#" onclick="openSideMenu()">&#9776;</a>
    </span>
    <form id="search-form">
      <input class="" id="address" type="search" placeholder="Location search" aria-label="Search"></input>
        </form>
        </div>
        <div id="map"></div>
        <ScriptTag isHydrating={true} src="https://cdn.jsdelivr.net/npm/places.js@1.16.6" />
        <ScriptTag isHydrating={true} type="text/javascript" src="heatmap_.js" />
    </div>

    );
  }
}

export default SimpleMap;