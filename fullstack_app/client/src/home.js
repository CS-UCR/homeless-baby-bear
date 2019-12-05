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

//import Background from './background3.png';

/*
var sectionStyle = {
  width: "100%",
  height: "10000px",
  position: "absolute",
  backgroundImage: `url(${Background})` 
};
*/
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
        name_var: "",
        address_helper: [],
        name_helper: [],
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
        location_type: null,
    };
    getDataFromDb = () => {
        fetch('http://localhost:3001/api/getData')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
    };

    getDataFromDbDate = (fromDate, toDate, location_type) => {
      this.setState({fromDate: fromDate, toDate: toDate, location_type: location_type})
        axios.post('http://localhost:3001/api/getData_bydate', {
            fromDate: fromDate,
            toDate: toDate,
            location_type: location_type
        }).then((res) => {
            this.setState({ data: res.data.data })
        });
    };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    console.log(this.state.fromDate)
    console.log(this.state.toDate)
    console.log(this.state.location_type)
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
    }).then((res)=>{

      this.getDataFromDbDate(this.state.fromDate, this.state.toDate, this.state.location_type)
    })
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (updateToApply, _id,index) => {
    axios.post('http://localhost:3001/api/updateAddress', {
        update: { _id: _id, address: updateToApply},
    }).then((res)=>{
      this.state.address_helper[index] = "Update Success!"
      this.getDataFromDbDate(this.state.fromDate, this.state.toDate, this.state.location_type)
    })
  };
  updateName = (name_var, _id, index) => {
    axios.post('http://localhost:3001/api/updateData', {
      id: _id,
      update: { name: name_var },
}).then((res) => {
  this.state.name_helper[index] = "Update Success!"
});
};
  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  changeNameHelper = (index)=>{
      console.log(this.state.name_helper[index])
      var name_helper =  this.state.name_helper;
      name_helper[index] = ''
      return name_helper
  }
  changeAddressHelper = (index)=>{
    var address_helper =  this.state.address_helper;
    address_helper[index] = ''
    return address_helper
}

  componentDidMount () {
    this.timerID = setInterval(
        () => this.tick(),
        500
      );
}
componentWillUnmount() {
    clearInterval(this.timerID);
  }
tick() {
    this.setState({
      name_helper : this.state.name_helper
    });
  }
  
  
  render() {
    
    const { data } = this.state;
    return (
      <div /*style={sectionStyle}*/>
        <Date func={this.getDataFromDbDate}/>
        <Container>
          {data.length <= 0
            ? <Typography variant="h4" align="center">
                NO DB ENTRIES YET
              </Typography>
            : data.map((dat, index) => (
              <div align="center">
                <Card 
                  style={{ 
                    padding: '2px', 
                    maxWidth: 700, 
                    minWidth: 700
                  }} 
                  key={data.picture}>
                  <CardMedia 
                    style={{ 
                      width: 700,
                      height: 500
                    }}
                    image="../letter5.png">
                  <CardContent>
                    
                  {/*<CardMedia paddingTop="56.25%" height="0" image="../center.jpg">*/}
                    <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <img 
                        src={"/uploads" + dat.picture} 
                        alt = {dat.id} width = "280"
                      />
                    </Typography>
                    <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      address: {dat.address}
                    </Typography> 
                    <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <TextField
                      type="text"
                      style={{ width: '400px' }}
                      defaultValue = {dat.address}
                      helperText={this.state.address_helper[index]}
                      onChange={(e) => this.setState({ updateToApply: e.target.value, address_helper: this.changeAddressHelper(index) })}
                      placeholder={dat.address}
                    />
                    <Button 
                      color="primary"
                      variant="contained"

                      style={{margin: '2px', width: '25px'}}
                      onClick={() => this.updateDB(this.state.updateToApply, dat._id, index)}>
                      UPDATE
                    </Button> 
                    <Button 
                      color="secondary"
                      variant="contained"
                      style={{margin: '2px', width: '25px'}}
                      onClick={() => this.deleteFromDB(dat.id)}>
                      DELETE
                    </Button>
                    </Typography>
                    
                    <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      Name: <TextField type="text"
                      style={{ width: '200px' }}
                      defaultValue = {dat.name}
                      helperText={this.state.name_helper[index]}
                      onChange={(e) => this.setState({ name_var: e.target.value , name_helper: this.changeNameHelper(index)})}
                      />
                      <Button 
                      color="primary"
                      variant="contained"
                      style={{margin: '2px', width: '25px'}}
                      
                      onClick={() => this.updateName(this.state.name_var, dat._id, index)}>
                      UPDATE
                    </Button> 
                    </Typography> 
                    <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      Accuracy: {dat.accuracy}
                    </Typography> 
                    <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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