// /client/App.js
import React, { Component, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import Date from './date';

class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    picture: null,
    address: null,
    raw_address: null,
    accuracy: null,
    date: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    dateContent : null,
    fromDate: null,
    toDate: null,
  };
  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    
    if(!this.state.fromDate){
      this.getDataFromDb();
    }else{
      this.getDataFromDbDate(this.state.fromDate);
    }

    if (!this.state.intervalIsSet) {
      if(!this.state.fromDate){
        let interval = setInterval(this.getDataFromDb, 5000);  // was 1000
        this.setState({ intervalIsSet: interval });
      }else{
        let interval = setInterval(this.getDataFromDbDate(this.state.fromDate), 5000);  // was 1000
        this.setState({ intervalIsSet: interval });
      }

    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  getDataFromDbDate = (fromDate) => {
    fetch('http://localhost:3001/api/getData_bydate', {fromDate})
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  
  putDataToDB = (picture, address, raw_address, accuracy, date) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      picture: picture,
      address: address,
      raw_address: raw_address,
      accuracy: accuracy,
      date: date,
    });
  };
  

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id == idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

 logday= (from, to) =>{
    this.setState({fromDate: from})
    this.setState({toDate: to})
    return;
 }

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id == idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post('http://localhost:3001/api/updateData', {
      id: objIdToUpdate,
      update: { address: updateToApply },
    });
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;
    return (
      
      <div>
        <Date func={this.logday}/>
        <ul>
          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((dat) => (
                <li style={{ padding: '10px' }} key={data.picture}>
                  <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                  <span style={{ color: 'gray' }}> picture: </span> <br />
                  <img src={"/uploads" + dat.picture} alt = {dat.id} width = "300"/> <br />
                  <span style={{ color: 'gray' }}> address: </span> {dat.address} <br />
                  <input
                    type="text"
                    style={{ width: '400px' }}
                    defaultValue = {dat.address}
                    onChange={(e) => this.setState({ updateToApply: e.target.value })}
                    placeholder={dat.address}
                  />
                  <button onClick={() => this.updateDB(dat.id, this.state.updateToApply)}>
                    UPDATE
                  </button> 
                  <button onClick={() => this.deleteFromDB(dat.id)}>
                    DELETE
                  </button> <br />
                  <span style={{ color: 'gray' }}> raw_address: </span> {dat.raw_address} <br />
                  <span style={{ color: 'gray' }}> accuracy: </span> {dat.accuracy} <br />
                  <span style={{ color: 'gray' }}> date: </span> {dat.date} <br />
                </li>
              ))}
        </ul>
      </div>
    );
  }
}

export default App;