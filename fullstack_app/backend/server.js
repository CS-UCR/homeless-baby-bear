const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const new_Data = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

require('dotenv/config');
const crypto = require('crypto');
const multer = require('multer');
const mime = require('mime');
//-----------google handwring api----------
const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();
const fs = require('fs');
const path = require('path');
//----------------------------------------
//-------------google map geocoidng api-------
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAWwGyXySCICwS8tp-Ap4OWhj7wTPVRJ0g'
});
//--------------------------------------------

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
        });
    }
});
const upload = multer({
    storage: storage
}); 

// this is our MongoDB database
const dbRoute =
    'mongodb+srv://cotest:copassword@cluster0-wxdkp.mongodb.net/test?retryWrites=true&w=majority';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true,  useUnifiedTopology: true  });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

// This is our get method
// This method fetches all available data in our database
// The following get functions used on home.js
router.get('/getData', (req, res) => {
    new_Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

router.post('/getData_bydate', async (req, res) => {
    const { fromDate, toDate, location_type} = req.body;
    if (location_type === "ALL") {
        var data = await new_Data.find({ "date": { $gte: fromDate, $lte: toDate}}).exec();
    } else {
        var data = await new_Data.find({ "date": { $gte: fromDate, $lte: toDate}, "accuracy": location_type} ).exec();
    }
    return res.json({ success: true, data: data });
});

// this is our update method
// this method overwrites existing data in our database
router.post('/updateAddress', (req, res) => {
    const {_id, address} = req.body.update;
    console.log(address)
    googleMapsClient.geocode({address: address}, function(err, res) {
        if (!err) {
            var formatted_address = "";
            address_components = res.json.results[0]["address_components"]
            let city = ""
            let state = ""
            for(let i= 0; i < address_components.length; i ++)
            {
                if( address_components[i]["types"][0] =='administrative_area_level_1')
                state = address_components[i]["long_name"]
                if(address_components[i]["types"][0] ==  'locality')
                city = address_components[i]["long_name"]
            }
            var accuracy = res.json.results[0]["geometry"]["location_type"];//is "ROOFTOP" or not
            var update = {}
            if (accuracy == "ROOFTOP"){
                formatted_address = res.json.results[0]["formatted_address"];
                update = {city: city, state: state, address: formatted_address, accuracy: accuracy, 
                    lat: res.json.results[0]["geometry"]["location"].lat, lng: res.json.results[0]["geometry"]["location"].lng};
            }else if (address.includes("Box")){
                var word_list = address.split(", ")
                update = {city: city, state: state, address: address.replace(/\n/g, ''), accuracy: "P.O. Box", 
                    lat: res.json.results[0]["geometry"]["location"].lat, lng: res.json.results[0]["geometry"]["location"].lng};
            }else{
                update = {city: city, state: state, address: address.replace(/\n/g, ''), accuracy: accuracy, 
                    lat: res.json.results[0]["geometry"]["location"].lat, lng: res.json.results[0]["geometry"]["location"].lng};
            }
            new_Data.findByIdAndUpdate(_id, update, (err) => {
            });
        }
    });
    return res.json({ success: true });
});

router.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    new_Data.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });	
    });	
});

router.post('/upload',upload.any(), async (req,res)=>{
    console.log("in post");
    try{
        console.log("in try");
        let total= req.files.length;

            for (i = 0, len = req.files.length; i < len; i++) {
                image_to_text(req.files[i]["filename"]);
            }

        return res.json({ success: true});
        
    }catch(err){
        console.log("in err")
        return res.json({ success: false, error: err });
        console.log("err"+err);
        console.log("err"+err);
        res.json({message:err});
        res.redirect("/upload");
    }
});

const image_to_text = async function(file){
    // generate next avaible id
    let idToBeAdded = 0;
    new_Data.find((err, data) => {
        let currentIds = data.map((data) => data.id);
        while (currentIds.includes(idToBeAdded)) {
        ++idToBeAdded;
        }
    });
    // using google handwring api to capture words
    const filePath = path.join(__dirname,'../client/public/uploads/'+file);
    const [result] = await client.documentTextDetection(filePath);
    const fullTextAnnotation = result.fullTextAnnotation;
    console.log(fullTextAnnotation.text)
    //--------------clean data--------------------
    var spawn = require("child_process").spawn;
    var process = spawn('python',["./cleandata-fornodejs.py", fullTextAnnotation.text]);
    var goodaddress =fullTextAnnotation.text
    process.stdout.on('data',function(data){geocodingAndSave(idToBeAdded, data.toString(), file)});
}

const geocodingAndSave = function(idToBeAdded, cleaned_address, file) {
    console.log("first step")
    console.log(cleaned_address)
    googleMapsClient.geocode({address: cleaned_address}, function(err, res) {
        if (!err) {
            var formatted_address = "";
            address_components = res.json.results[0]["address_components"]
            let city = ""
            let state = ""
            console.log("second step")
            for(let i= 0; i < address_components.length; i ++)
            {
                if( address_components[i]["types"][0] =='administrative_area_level_1')
                state = address_components[i]["long_name"]
                if(address_components[i]["types"][0] ==  'locality')
                city = address_components[i]["long_name"]
            }
            var accuracy = res.json.results[0]["geometry"]["location_type"];//is "ROOFTOP" or not
            console.log("??? step")
            if (accuracy == "ROOFTOP"){
                formatted_address = res.json.results[0]["formatted_address"];
                const doc = new new_Data({id: idToBeAdded, city: city, state: state,picture: '/'+ file, 
                    address: formatted_address, accuracy: accuracy, lat: res.json.results[0]["geometry"]["location"].lat, 
                    lng: res.json.results[0]["geometry"]["location"].lng});
                console.log("last step")
                console.log(doc)
                doc.save();
            }else if (cleaned_address.includes("Box")){
                var word_list = cleaned_address.split(", ")
                const box = new new_Data({id: idToBeAdded, city: city, state: state, picture: '/'+ file,
                    address: cleaned_address.replace(/\n/g, ''), accuracy: "P.O. Box", lat: res.json.results[0]["geometry"]["location"].lat, 
                    lng: res.json.results[0]["geometry"]["location"].lng});
                    console.log("last step")
                    console.log(box)
                    box.save();
            }else{
                const raw = new new_Data({id: idToBeAdded, city: city, state: state, picture: '/'+ file, 
                    address: cleaned_address.replace(/\n/g, ''), accuracy: accuracy, lat: res.json.results[0]["geometry"]["location"].lat, 
                    lng: res.json.results[0]["geometry"]["location"].lng});
                console.log("last step")
                console.log(raw)
                raw.save();
            }
        }
    });
}

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    console.log(id)
    new_Data.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
    let data = new new_Data();
    const { id, picture, address, raw_address, accuracy, date } = req.body;
    if ((!id && id !== 0) || !picture) {
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }
    data.id = id;
    data.picture= picture;
    data.address = address;
    data.raw_address = raw_address;
    data.accuracy = accuracy;
    data.date = date;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));