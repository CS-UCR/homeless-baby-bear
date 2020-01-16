
import React, { Component } from 'react';
import Home from './home';
import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from './navbar';
import Heapmap from './heatmap';
import Upload from './upload';
import Dashboard from './dashboard';
import Date from './date';
import LocationStats from './locStats';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
        <Navbar />
          <Route exact={true} path='/AMT/data' render={() => (
            <div className="App">
              <Home />
            </div>
          )}/>
          <Route exact={true} path='/AMT/upload' render={() => (
            <div className="App">
              <Upload />
            </div>
          )}/>
          <Route exact={true} path='/AMT/heatmap' render={() => (
            <div className="App">
              <Heapmap />
            </div>
          )}/>
          <Route exact={true} path='/AMT/locationStats' render={() => (
            <div className="App">
              <LocationStats />
            </div>
          )}/>
          <Route exact={true} path='/AMT/' render={() => (
            <div className="App">
              <Dashboard />
            </div>
          )}/>
          <Route exact={true} path='/AMT/date' render={() => (
            <div className="App">
              <Date />
            </div>
          )}/>
        </div>
      </BrowserRouter>
    )
  }
}
export default App;