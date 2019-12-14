// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import Dropzone from 'react-dropzone'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
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
                        <p>{file.name}{index<props.success?<CheckIcon color="secondary"/>:<IconButton aria-label="delete" onClick={props.delete(index)}><DeleteIcon /></IconButton>}</p>
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
            submitting:false,
            success:0,
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
        this.setState({flag: 2, submitting:false})
    }
    async submit(){
        const formData = new FormData();
        if(this.state.file.length !== 0){
            this.setState({last: this.state.file.length})
            var index = 0;
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            for(index = 0; index< this.state.file.length;index++){
                formData.append('myImage',this.state.file[index]);   
            }
            //new Promise(async function(accept,reject) {
            try {
                await axios.post(process.env.REACT_APP_API+'/upload',formData,config,{timeout: 80000})
                    .then((response) => {
                        
                        this.setState({file: []})
                        if(response.data.success)
                            this.setState({flag: 0,submiting:false})
                        else{
                            this.setState({flag: 1,submiting:false})
                        }

                    }).catch((error) => {
                        this.setState({submiting:false})
                        this.setState({flag: 1})
            });
            }catch(error){
                this.setState({submiting:false})
                    console.log("fail")
                    this.setState({flag: 1})
            }
        }
    }
    async submitone(one){
            const formData = new FormData();
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            };
            formData.append('myImage',one);   

            try {
                await axios.post(process.env.REACT_APP_API+'/upload',formData,config)
                .then((response) => {

                }).catch((error) => {
            });
            }catch(error){
            }
    }

    async onFormSubmit(e){
        e.preventDefault();
        this.setState({submitting:true})
        await this.submit()
        /*
        try{
            for(let i = 0; i < this.state.file.length; i ++){
                await this.submitone(this.state.file[i])
                this.setState({success: i+1,last: i})
                
            }
            this.setState({submiting:false,submiting:false})
        }catch(error){
            this.setState({submiting:false,flag: 1})
        }
        */
        
    }
    handleChange(e) {
        this.setState({file: e.target.files});
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
        <ShowFiles submitting={this.state.submitting} success={this.state.success} file={this.state.file} date={this.state.date} delete={()=>this.deletFile}/>
        {this.state.submitting?
        <CircularProgress />
        :        
        <div>
        <Button variant="contained" onClick={this.onFormSubmit} style={{margin: '10px'}}color="primary">
            Submit
        </Button>        
        <Button variant="contained" onClick={this.clear} style={{margin: '10px'}} color="secondary">
            Reset
        </Button>
        </div>}
    
    </div>
    }
        </div>
    );
  }
}

export default Upload;