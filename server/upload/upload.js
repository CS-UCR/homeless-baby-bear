const express = require('express');
const router = express.Router();
const multer = require('multer');
const crypto = require('crypto');
const vision = require('@google-cloud/vision');
const path = require('path');
const spawn = require('child_process').spawn;
const pic_schema = require('../db/mongo');

const client = new vision.ImageAnnotatorClient();
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAP_CREDENTIALS,
});

var storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        cb(null, '../client/public/uploads/');
    },
    filename: async function (req, file, cb) {
        crypto.pseudoRandomBytes(16, async function (err, raw) {
            cb(null, Date.now() + file.originalname);
        });
    },
});

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

router.post('/', async (req, res) => {
    var InUpload = multer({ storage: storage }).array('myImage');
    InUpload(req, res, function (err) {
        if (err) {
            return res.json({ success: false });
        }

        try {
            let terms = Math.floor(req.files.length / 40) + 1;
            let files = [];
            for (let i = 0; i < terms; i++) {
                files.push(req.files.slice(i * 40, (i + 1) * 40));
            }
            new Promise(async (resolve, reject) => {
                await asyncForEach(files, async (item) => {
                    await asyncForEach(item, async (file, index) => {
                        await image_to_text(file['filename']);
                    });
                });
            });
            return res.json({ success: true });
        } catch (err) {
            return res.json({ success: false });
        }
    });
});

const image_to_text = async function (file) {
    // generate next avaible id
    let idToBeAdded = 0;

    await pic_schema.find(async (err, data) => {
        let currentIds = data.map((data) => data.id);
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }
    });
    // using google handwring api to capture words
    const filePath = path.join(
        __dirname,
        '../../client/public/uploads/' + file
    );
    const [result] = await client.documentTextDetection(filePath);
    const fullTextAnnotation = result.fullTextAnnotation;
    //--------------clean data--------------------
    var process = spawn('python', [
        './upload/cleandata-fornodejs.py',
        fullTextAnnotation.text,
    ]);
    //var goodaddress =fullTextAnnotation.text
    await process.stdout.on('data', async function (data) {
        await geocodingAndSave(idToBeAdded, data.toString(), file);
    });
    await process.on('exit', async (code) => {
        return;
    });
};

const geocodingAndSave = async function (idToBeAdded, cleaned_address, file) {
    await googleMapsClient.geocode(
        { address: cleaned_address },
        async function (err, res) {
            if (!err) {
                var name = '';
                if (cleaned_address.includes('Box')) {
                    name = cleaned_address.split('P.O.')[0];
                } else {
                    var word_list = cleaned_address.split(' ');
                    for (let i = 0; i < word_list.length; i++) {
                        if (!isNaN(parseInt(word_list[i]))) {
                            name = cleaned_address.split(' ' + word_list[i])[0];
                            break;
                        }
                    }
                }
                var formatted_address = '';
                address_components = res.json.results[0]['address_components'];
                let city = '';
                let state = '';
                for (let i = 0; i < address_components.length; i++) {
                    if (
                        address_components[i]['types'][0] ==
                        'administrative_area_level_1'
                    )
                        state = address_components[i]['long_name'];
                    if (address_components[i]['types'][0] == 'locality')
                        city = address_components[i]['long_name'];
                }
                var accuracy = res.json.results[0]['geometry']['location_type']; //is "ROOFTOP" or not
                if (accuracy === 'ROOFTOP') {
                    formatted_address =
                        res.json.results[0]['formatted_address'];
                    const doc = new pic_schema({
                        id: idToBeAdded,
                        city: city,
                        state: state,
                        picture: '/' + file,
                        name: name,
                        address: formatted_address,
                        accuracy: accuracy,
                        lat: res.json.results[0]['geometry']['location'].lat,
                        lng: res.json.results[0]['geometry']['location'].lng,
                    });
                    await doc.save();
                } else if (cleaned_address.includes('Box')) {
                    const box = new pic_schema({
                        id: idToBeAdded,
                        city: city,
                        state: state,
                        picture: '/' + file,
                        name: name,
                        address: cleaned_address.replace(/\n/g, ''),
                        accuracy: 'P.O. Box',
                        lat: res.json.results[0]['geometry']['location'].lat,
                        lng: res.json.results[0]['geometry']['location'].lng,
                    });
                    await box.save();
                } else {
                    const raw = new pic_schema({
                        id: idToBeAdded,
                        city: city,
                        state: state,
                        picture: '/' + file,
                        name: name,
                        address: cleaned_address.replace(/\n/g, ''),
                        accuracy: accuracy,
                        lat: res.json.results[0]['geometry']['location'].lat,
                        lng: res.json.results[0]['geometry']['location'].lng,
                    });
                    await raw.save();
                }
                return;
            }
        }
    );
};

module.exports = router;
