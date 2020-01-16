import React, { Component} from 'react';
import axios from 'axios';
import Dates from './date';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import DoneIcon from '@material-ui/icons/Done';
import Helmet from 'react-helmet';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';

function AddressCard(props){
  const [address, setAddress] = React.useState(props.dat.address)
  const [name, setName] = React.useState(props.dat.name)
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [addrLoading, setAddrLoading] = React.useState(false)

  

  return(<div align="center">
  <Card 
    style={{ 
      padding: '2px', 
      maxWidth: 700, 
      minWidth: 700
    }} 
    >
    <CardMedia 
      style={{ 
        width: 700,
        height: 500
      }}
      image="../letter5.png">
    <CardContent>
      <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
      </Typography>
      <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        
      </Typography>
    {/*<CardMedia paddingTop="56.25%" height="0" image="../center.jpg">*/}
      <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <img 
          src={"/uploads" + props.dat.picture} 
          alt = {props.dat.id} width = "280"
        />
      </Typography>
      <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        address: {props.dat.address}
      </Typography> 
      <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <TextField
        type="text"
        style={{ width: '400px' }}
        value = {address}
        onChange={(e)=>setAddress(e.target.value)}
      />
      {addrLoading?<CircularProgress style={{margin: '2px', width: '25px'}}/>:      
      <Button 
        color="primary"
        variant="contained"
        style={{margin: '2px', width: '25px'}}
        onClick={()=>props.updateAddress(address,props.dat._id,setAddrLoading)}
      >
        UPDATE
      </Button> }
      <Button 
        color="secondary"
        variant="contained"
        style={{margin: '2px', width: '25px'}}
        onClick={()=>props.delete(props.dat._id,props.index,props.dat.picture)}
      >
        DELETE
      </Button>
      </Typography>
      
      <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Name: <TextField type="text"
        style={{ width: '200px' }}

        value = {name}
        onChange={(e)=>setName(e.target.value)}
        />
        <Button 
        color="primary"
        variant="contained"
        style={{margin: '2px', width: '25px'}}
        onClick={()=>props.updateName(name, props.dat._id,setLoading,setSuccess)}
        >
        
        UPDATE
      </Button> 
      {success?loading? <CircularProgress />:<DoneIcon  />:<div></div>}
      </Typography> 

      <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Accuracy: {props.dat.accuracy}
      </Typography> 
      <Typography variant="h6" align="left"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Date: {props.dat.date.slice(0,10)}
      </Typography> 
      {/*</CardMedia>*/}
    </CardContent>
    </CardMedia>
  </Card>
</div>

  );
}


class App extends Component {
    // initialize our state
    constructor(props){
      super(props)
      this.state = {
        data: [],
        id: 0,
        updateToApply: [],
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
        updating:false,
        updateCount:3,
        start: false,
        loading:false,
    };
    }
    getDataFromDb = () => {
        fetch(process.env.REACT_APP_API+'/getData')
        .then((data) => data.json())
        .then((res) => this.setState({ data: res.data }));
    };

    getDataFromDbDate = (fromDate, toDate, location_type,clearall) => {
      this.setState({loading:true})
      if(clearall)
        this.setState({data: []})
      if(this.state.start === false){
        this.setState({start:true})
      }
      this.setState({fromDate: fromDate, toDate: toDate, location_type: location_type})
        axios.post(process.env.REACT_APP_API+'/getData_bydate', {
            fromDate: fromDate,
            toDate: toDate,
            location_type: location_type
        }).then((res) => {
            this.setState({ data: res.data.data,loading:false})
        });
    };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete,index,picture) => {

    axios.delete(process.env.REACT_APP_API+'/deleteData', {
      data: {
        id: idTodelete,
        picture: picture
      },
    }).then((res)=>{
        if(res.data.success) {
            this.setState({data:this.state.data.slice(0, index)})
            this.getDataFromDbDate(this.state.fromDate, this.state.toDate, this.state.location_type,false)
        }
    })
  };

  download = () =>{
    var tomorrow = new Date()
    var today = new Date(tomorrow.getFullYear(),tomorrow.getMonth(),tomorrow.getDate()).toJSON().slice(0,10).replace(/-/g,'');
    console.log("in dowload function")
    axios.post(process.env.REACT_APP_API+'/writetocsv', {
      data: this.state.data
  }).then((res)=>{
      if(res.data.success){
        console.log(res.data.success)
        
        const link = document.createElement('a');
        link.href = "/downloads/out"+today+".csv";
        link.setAttribute('download', "out"+today+".csv");
        // 3. Append to html page
        document.body.appendChild(link);
        // 4. Force download
        link.click();
        // 5. Clean up and remove the link
        link.parentNode.removeChild(link);
      
      }
  })
  }
  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (updateToApply, _id,setLoading) => {
    axios.post(process.env.REACT_APP_API+'/updateAddress', {
        update: { _id: _id, address: updateToApply},
    }).then((res)=>{
      this.setState({upadating:true})
      this.getDataFromDbDate(this.state.fromDate, this.state.toDate, this.state.location_type,false)
      this.getDataFromDbDate(this.state.fromDate, this.state.toDate, this.state.location_type,false)
      setLoading(false)
    })
  };
  updateName = (name_var, _id,setLoading,setSuccess) => {
    axios.post(process.env.REACT_APP_API+'/updateData', {
      id: _id,
      update: { name: name_var },
  }).then((res) => {
    setLoading(false)
  });
};
  
  render() {
    
    return (
      <div /*style={sectionStyle}*/>
        <Helmet>
        <title>Changing Data</title>
        </Helmet>
        <Dates func={this.getDataFromDbDate}/>
        <Container>
          {this.state.start?this.state.data.length <= 0
            ? <div align="center">{this.state.loading?
              <div>
              <CircularProgress />
              <Typography variant="h5" align="center">
                Please Wait for Loading
              </Typography>
              </div>
            :<Typography variant="h4" align="center">
                NO DB ENTRIES YET
              </Typography>}</div>
            : 
            <div>
              <div align="center">
                <Fab variant="outlined" color="primary" onClick={()=>this.download()}><FileCopyIcon/>General CSV file</Fab>
              </div>
              {this.state.data.map((dat, index) => (
                  <AddressCard 
                      key={index}
                      dat={dat} 
                      index={index} 
                      delete={this.deleteFromDB} 
                      updateAddress={this.updateDB}
                      updateName={this.updateName}/>
                  ))}
              </div>:<Typography variant="h5" align="center">Please select the time period and click search</Typography>}
        </Container>
      </div>
    );
  }
}

export default App;