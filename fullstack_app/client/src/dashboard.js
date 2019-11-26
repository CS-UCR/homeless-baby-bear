// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

import ScriptTag from 'react-script-tag';
import Helmet from 'react-helmet';
import Barcharts from './chartsjs/barcharts'

class SimpleMap extends Component {
  state = {
      percent_number : "+24%"
  }

  render() {
    return (
    <div>
        <Helmet>
        <meta charset="utf-8"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
        <link rel="shortcut icon" href="../favicon.ico"></link>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet"></link>
        <link rel="stylesheet" href="styles_dashboard.css"></link>
        <script src="https://kit.fontawesome.com/406b77ded1.js"></script>
        <title>National Dashboard</title>
        </Helmet>
        <div class="grid-container">
        <div class="menu-icon">
            <i class="fas fa-bars"></i>
        </div>
        <header class="header">
            <div class="header-search">
               
                <form id="address-form">
                    <input class="" id="address" type="search" placeholder="Search a city or address" aria-label="Search"></input>
                </form>
            </div>
        </header>

        <aside class="sidenav">
            <div class="sidenav-close-icon">
                <i class="fas fa-times"></i>
            </div>
            <span class="sidenav-title">National Dashboard</span>
            <ul class="sidenav-list">
                <li class="sidenav-list-item">Location Stats</li>
                <li class="sidenav-list-item">Visualizations</li>
                <li class="sidenav-list-item">Mail upload</li>
            </ul>
        </aside>

        <main class="main">
            <div class="main-header">
                <div id="graph-picker" class="time-picker">
                    <button>Last week</button>
                    <button>Last month</button>
                    <button>Last year</button>
                    <button>Lifetime</button>
                    <button>Custom Timeframe</button>
                </div>
                <Barcharts />
            </div>

            <div class="main-overview">
                <div class="overviewcard">
                    Top 5 cities(mail sent): city, mail sent in
                    <ol>
                        <li>City, # of mail sent in</li>
                        <li>City, # of mail sent in</li>
                        <li>City, # of mail sent in</li>
                        <li>City, # of mail sent in</li>
                        <li>City, # of mail sent in</li>
                    </ol>
                </div>
                <div class="overviewcard">
                    Top 5 addresses. mail sent in
                    <ol>
                        <li>Address, # of mail sent in</li>
                        <li>Address, # of mail sent in</li>
                        <li>Address, # of mail sent in</li>
                        <li>Address, # of mail sent in</li>
                        <li>Address, # of mail sent in</li>
                    </ol>
                </div>
                <div class="overviewcard">
                    Top 5 dates. mail sent in
                    <ol>
                        <li>Dates, # of mail sent in</li>
                        <li>Dates, # of mail sent in</li>
                        <li>Dates, # of mail sent in</li>
                        <li>Dates, # of mail sent in</li>
                        <li>Dates, # of mail sent in</li>
                    </ol>
                </div>
            </div>

            <div class="main-cards">
                <div class="card">
                    <canvas id="states-piechart"></canvas>
                </div>
                <div class="card">
                    Mail count net change.
                    <div id="net-picker" class="time-picker">
                        <button>Yesterday</button>
                        <button>Last week</button>
                        <button>Last month</button>
                        <button>Last year</button>
                    </div>
                    <span class="net-change-percent">
                        <span class="sign positive" > {this.state.percent_number} </span>
                    </span>
                    <span class="net-change-value">
                        <span id="net-change-msg">
                            <span id="net-value" class="positive">+200</span> mail recieved vs. <span id="time-choice">yesterday</span>
                        </span>
                    </span>
                </div>
            </div>

            <div class="main-header">
                table with state and the total number of mail from them
                <table>
                    <tr>
                        <th>State</th>
                        <th>Mail count</th>
                    </tr>
                    <tr>
                        <td>California</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>Nevada</td>
                        <td>5</td>
                    </tr>
                </table>
            </div>    

        </main>

        <footer class="footer">
            <div class="footer-copyright">&copy; AMT</div>
            <div class="footer-signature">Made by team homeless baby bear</div>
        </footer>
  </div>  
  <ScriptTag isHydrating={true} type="text/javascript" src="https://cdn.jsdelivr.net/npm/places.js@1.16.6" />
        <ScriptTag isHydrating={true} type="text/javascript" src="app_dashboard.js" />
    </div>

    );
  }
}

export default SimpleMap;