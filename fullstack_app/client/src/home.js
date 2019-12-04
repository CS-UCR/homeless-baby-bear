import React, { Component, useState, useContext } from 'react';
import axios from 'axios';
import Date from './date';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Background from './background3.png';


var sectionStyle = {
  width: "100%",
  height: "10000px",
  position: "absolute",
  backgroundImage: `url(${Background})` 
};

/*
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
*/
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

    getDataFromDbDate = (fromDate, toDate, locaction_type) => {
        axios.post('http://localhost:3001/api/getData_bydate', {
            fromDate: fromDate,
            toDate: toDate,
            location_type: locaction_type
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
      <div style={sectionStyle}>
        <Date func={this.getDataFromDbDate}/>
        <Container>
          {data.length <= 0
            ? <Typography variant="h4" align="center">
                NO DB ENTRIES YET
              </Typography>
            : data.map((dat) => (
              <div align="center">
                <Card 
                  style={{ 
                    padding: '2px', 
                    maxWidth: 700, 
                  }} 
                  key={data.picture}>
                  <CardMedia image="../letter4.jpg">
                  <CardContent>
                  {/*<CardMedia paddingTop="56.25%" height="0" image="../center.jpg">*/}
                    <Typography align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                      id: {dat.id}
                    </Typography >
                    <Typography align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      picture: 
                      <img 
                        src={"/uploads" + dat.picture} 
                        alt = {dat.id} width = "300"
                      />
                    </Typography>
                    <Typography align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      address: {dat.address}
                    </Typography> 
                    <Typography align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                      type="text"
                      style={{ width: '400px' }}
                      defaultValue = {dat.address}
                      onChange={(e) => this.setState({ updateToApply: e.target.value })}
                      placeholder={dat.address}
                    />
                    <Button 
                      color="primary"
                      variant="contained"
                      onClick={() => this.updateDB(dat.id, this.state.updateToApply)}>
                      UPDATE
                    </Button> 
                    <Button 
                      color="secondary"
                      variant="contained"
                      onClick={() => this.deleteFromDB(dat.id)}>
                      DELETE
                    </Button>
                    </Typography>
                    <Typography align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      Raw_address: {dat.raw_address}
                    </Typography> 
                    <Typography align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      Accuracy: {dat.accuracy}
                    </Typography> 
                    <Typography align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      Date: {dat.date}
                    </Typography> 
                    {/*</CardMedia>*/}
                  </CardContent>
                  </CardMedia>
                </Card>
              </div>
              ))}
        </Container>
      </div>
    );
  }
}

export default App;