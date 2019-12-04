// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

import ScriptTag from 'react-script-tag';
import Helmet from 'react-helmet';
import Dropzone,{useDropzone} from 'react-dropzone'
import { timingSafeEqual } from 'crypto';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
function ShowFiles(props){
    return (
        <div>
            {props.file.length > 0?
            <div>
            {props.file.map((file,index)=>(
                    <div>
                        <p>{file[0].name}<IconButton aria-label="delete" onClick={props.delete(index)}><DeleteIcon /></IconButton></p>
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
            date: new Date()
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    deletFile = (index)=>{
        this.state.file.splice(index,1)
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        if(this.state.file.length != 0){
           
            console.log("file not null")
            console.log(this.state.file)
            var index = 0;
            for(index = 0; index< this.state.file.length;index++){
                console.log(this.state.file[index])
                formData.append('myImage',this.state.file[index]);   
            }
                const config = {
                    headers: {
                        'content-type': 'multipart/form-data'
                    }
                };
                axios.post("http://localhost:3001/api/upload",formData,config)
                    .then((response) => {
                        alert("The file is successfully uploaded");
                    }).catch((error) => {
                });
        }else{
            console.log("file is null")
        }
    }
    handleChange(e) {
        console.log("has select file")
        console.log("file is")
        console.log(e.target.files)
        this.setState({file: e.target.files});
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
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
    <link rel="shortcut icon" href="favicon.ico"></link>
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400&display=swap" rel="stylesheet"></link>
    <link rel="stylesheet" href="styles_upload.css"></link>
    <title>Picture upload</title>
        </Helmet>
        <div class="image-header">
        <img id="logo" src="https://secureservercdn.net/45.40.150.81/enl.69a.myftpupload.com/wp-content/uploads/2017/12/A-Million-Thanks.png" alt="A million thanks logo"></img>
        <div class="header-txt">
            Picture upload
        </div>
    </div>
    <div class="main-container">
            <fieldset>
                <legend>Upload here</legend>
            
                <div>
                    <label for="fileselect">Files to upload:</label>

                    <Dropzone multiple={true} accept="image/png, image/jpg,image/jpeg" onDrop={acceptedFiles => this.state.file.concat(acceptedFiles)}>
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
                <button onClick={this.onFormSubmit}>submit</button>
        <ScriptTag isHydrating={true} type="text/javascript" src="front-end.js" />
    </div>

    );
  }
}

export default Upload;