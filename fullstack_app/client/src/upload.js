// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import Dropzone from 'react-dropzone'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
function Success(props){
    return(
        <div class="main-container success-bg">
        <div class="status-container">
            <div class="status-txt-container">
                <span class="symbol success-symbol">&#10003;</span>
                <h1 class="status-title">Success!</h1>
                <p class="status-msg">{props.last} picture{props.last>1?"s":""} had successfully uploaded</p>
                <button  onClick={()=>props.back()}  class=" button go-back">Upload more pictures</button>
            </div>
        </div>
    </div>
    )
}

function Failure(props){
    return(
        <div class="main-container failure-bg">
        <div class="status-container">
            <div class="status-txt-container">
                <span role="img" aria-label="img" class="symbol failure-symbol">&#128683;</span>
                <h1 class="status-title">Failure</h1>
                <p class="status-msg">Something wrong when upload.</p>
                <button onClick={()=>props.back()} class=" button go-back">
                    Upload more pictures
                </button>
            </div>
        </div>
    </div>
    )
}
function ShowFiles(props){
    return (
        <div>
            {props.file.length > 0?
            <div>
            {props.file.map((file,index)=>(
                    <div>
                        <p>{file.name}<IconButton aria-label="delete" onClick={props.delete(index)}><DeleteIcon /></IconButton></p>
                        <Divider variant="middle" />
                    </div>  
                ))}</div>
                :<div></div>
                }
        </div>
    
        )
}
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state ={
            file: [],
            last: 0,
            date: new Date(),
            flag: 2,
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    deletFile = (index)=>{
        this.state.file.splice(index,1)
    }
    clear=()=>{
        this.setState({file: []})
    }
    back= ()=>{
        this.setState({flag: 2})
    }
    async onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        if(this.state.file.length !== 0){
            this.setState({last: this.state.file.length})
            var index = 0;
            for(index = 0; index< this.state.file.length;index++){
                formData.append('myImage',this.state.file[index]);   
            }
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            //new Promise(async function(accept,reject) {
            try {
                await axios.post(process.env.REACT_APP_API+'/upload',formData,config)
                    .then((response) => {
                        
                        this.setState({file: []})
                        if(response.data.success)
                            this.setState({flag: 0})
                        else{
                            this.setState({flag: 1})
                        }

                    }).catch((error) => {
                        this.setState({flag: 1})
            });}catch(error){
                    console.log("fail")
                    this.setState({flag: 1})
            }
            //})
        }
    }
    handleChange(e) {
        this.setState({file: e.target.files});
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    
      tick() {
        this.setState({
          date: new Date()
        });
      }
  render() {
    return (
    <div>
        <Helmet>
        <meta charset="UTF-8"></meta>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
    <meta http-equiv="X-UA-Compatible" content="ie=edge"></meta>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet"></link>
    <link rel="stylesheet" href="styles_upload.css"></link>
    <link rel="stylesheet" href="upload_style.css"></link>
    <title>Picture upload</title>
        </Helmet>
    
    {this.state.flag === 0? 
    
    <Success back={this.back} last={this.state.last}/> : this.state.flag === 1? 
    
    <Failure back={this.back}/>:

    <div>
        <div className="image-header">
        <img id="logo" src="https://secureservercdn.net/45.40.150.81/enl.69a.myftpupload.com/wp-content/uploads/2017/12/A-Million-Thanks.png" alt="A million thanks logo"></img>
        <div className="header-txt">
            Picture upload
        </div>
    </div>
    <div className="main-container">
    <fieldset>
        <legend>Upload here</legend>
    
        <div>

            <Dropzone multiple={true} accept="image/png, image/jpg,image/jpeg" onDrop={acceptedFiles =>{if(this.state.file.length === 0){this.setState({file: acceptedFiles})}else{this.setState({file: this.state.file.concat(acceptedFiles)})}}}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div {...getRootProps()}>
                    <input {...getInputProps()} multiple="multiple" accept="image/png, image/jpg,image/jpeg"/>
                    <div id="filedrag">Drag 'n' drop some files here, or click to select files</div>
                </div>
                <em>accept: png jpg jpeg</em>
                </section>
            )}
            </Dropzone>
        </div>
    
    </fieldset>

        </div>
        <ShowFiles file={this.state.file} date={this.state.date} delete={()=>this.deletFile}/>
        <Button variant="contained" onClick={this.onFormSubmit} style={{margin: '10px'}}color="primary">
            Submit
        </Button>
        <Button variant="contained" onClick={this.clear} style={{margin: '10px'}} color="secondary">
            Reset
        </Button>
    
    </div>
    }
        </div>
    );
  }
}

export default Upload;