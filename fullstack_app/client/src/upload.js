// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';

import ScriptTag from 'react-script-tag';
import Helmet from 'react-helmet';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state ={
            file: []
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        if(this.state.file != []){
           
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
        <input defaultValue={this.state.file} accept="image/png, image/jpg,image/jpeg" type="file" multiple onChange={this.handleChange} />
        <button onClick={this.onFormSubmit}>submit</button>
        <form id="upload" enctype="multipart/form-data" onSubmit={this.onFormSubmit}>
            <fieldset>
                <legend>Upload here</legend>
                
                <input type="hidden" id="MAX_FILE_SIZE" name="MAX_FILE_SIZE" value="300000" ></input>
            
                <div>
                    <label for="fileselect">Files to upload:</label>
                    <input type="file" id="fileselect" name="fileselect[]" multiple onChange={this.onChange}></input>
                    <div id="filedrag" type="file" name="filedrag">
                        <span>or drop pictures here</span>
                    </div>
                </div>
            
            </fieldset>
            <div class="on-pic-drop">
                <div class="msg-container">
                    <div id="messages">

                    </div>
                </div>
            
    
                <div class="button-container">
                    <button id="upload-btn" type = "submit" value = "upload">Upload</button>
                    <button id="cancel-btn">Cancel Upload</button>
                </div>
            </div>
        </form>

    </div>

        <ScriptTag isHydrating={true} type="text/javascript" src="front-end.js" />
    </div>

    );
  }
}

export default Upload;