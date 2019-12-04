import React, { Component, useState, useContext } from 'react';
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
    };

    getDataFromDb = () => {
        fetch('http://localhost:3001/api/getData')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
    };

    getDataFromDbDate = (fromDate, toDate) => {
        axios.post('http://localhost:3001/api/getData_bydate', {
            fromDate: fromDate,
            toDate: toDate,
        }).then((res) => {
            this.setState({ data: res.data.data })
        });
    };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach((dat) => {
      if (dat.id === idToUpdate) {
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
        <Date func={this.getDataFromDbDate}/>
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