const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const today = new Date();
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const pic_schema = require('../db/mongo');

const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_MAP_CREDENTIALS,
});

router.post('/getData_bydate', async (req, res) => {
    const { fromDate, toDate, location_type } = req.body;
    if (location_type === 'ALL') {
        var data = await pic_schema
            .find({ date: { $gte: fromDate, $lte: toDate } })
            .exec();
    } else {
        var data = await pic_schema
            .find({
                date: { $gte: fromDate, $lte: toDate },
                accuracy: location_type,
            })
            .exec();
    }
    return res.json({ success: true, data: data });
});

router.post('/updateAddress', (req, res) => {
    const { _id, address } = req.body.update;
    googleMapsClient.geocode({ address: address }, function (err, res) {
        if (!err) {
            var formatted_address = '';
            address_components = res.json.results[0]['address_components'];
            let city = '';
            let state = '';
            for (let i = 0; i < address_components.length; i++) {
                if (
                    address_components[i]['types'][0] ===
                    'administrative_area_level_1'
                ) {
                    state = address_components[i]['long_name'];
                }
                if (address_components[i]['types'][0] === 'locality') {
                    city = address_components[i]['long_name'];
                }
            }
            var accuracy = res.json.results[0]['geometry']['location_type']; //is "ROOFTOP" or not
            var update = {};
            if (accuracy == 'ROOFTOP') {
                formatted_address = res.json.results[0]['formatted_address'];
                update = {
                    city: city,
                    state: state,
                    address: formatted_address,
                    accuracy: accuracy,
                    lat: res.json.results[0]['geometry']['location'].lat,
                    lng: res.json.results[0]['geometry']['location'].lng,
                };
            } else if (address.includes('Box')) {
                update = {
                    city: city,
                    state: state,
                    address: address.replace(/\n/g, ''),
                    accuracy: 'P.O. Box',
                    lat: res.json.results[0]['geometry']['location'].lat,
                    lng: res.json.results[0]['geometry']['location'].lng,
                };
            } else {
                update = {
                    city: city,
                    state: state,
                    address: address.replace(/\n/g, ''),
                    accuracy: accuracy,
                    lat: res.json.results[0]['geometry']['location'].lat,
                    lng: res.json.results[0]['geometry']['location'].lng,
                };
            }
            pic_schema.findByIdAndUpdate(_id, update, (err) => {});
        }
    });
    return res.json({ success: true });
});

router.post('/updateName', (req, res) => {
    const { id, update } = req.body;
    pic_schema.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

router.delete('/deleteData', (req, res) => {
    const { id, picture } = req.body;
    fs.unlink('../client/public/uploads/' + picture, (err) => {
        if (err) return res.send(err);
    });
    pic_schema.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

router.post('/writetocsv', async (request, response) => {
    const { data } = request.body;
    const directory = '../client/public/downloads/';
    fs.readdir(directory, (err, files) => {
        if (err) return res.send(err);
        for (const file of files) {
            fs.unlink(path.join(directory, file), (err) => {
                if (err) throw err;
            });
        }
        const csvWriter = createCsvWriter({
            path:
                '../client/public/downloads/out' +
                today.getFullYear() +
                String(today.getMonth() + 1).padStart(2, '0') +
                String(today.getDate()).padStart(2, '0') +
                '.csv',
            header: [
                { id: 'city', title: 'City' },
                { id: 'state', title: 'State' },
                { id: 'name', title: 'Name' },
                { id: 'address', title: 'Address' },
                { id: 'date', title: 'Date' },
                { id: 'accuracy', title: 'Accuracy' },
            ],
        });
        csvWriter.writeRecords(data).then(() => {
            return response.json({ success: true });
        });
    });
});

module.exports = router;
