const express = require('express');
const router = express.Router();
const pic_schema = require('../db/mongo');

router.post('/search', async (request, response) => {
    const { query } = request.body;
    word_list = query.split(' ');

    var data = [];
    var new_data = await pic_schema.find().exec();
    var count = 0;
    var weight = 0;
    var weights = [];
    for (index = 0; index < new_data.length; index++) {
        weight = 0;
        for (word = 0; word < word_list.length; word++) {
            if (
                new_data[index].address
                    .toLowerCase()
                    .includes(word_list[word].toLowerCase()) ||
                new_data[index].city
                    .toLowerCase()
                    .includes(word_list[word].toLowerCase()) ||
                new_data[index].state
                    .toLowerCase()
                    .includes(word_list[word].toLowerCase())
            ) {
                weight += 1;
            }
        }
        if (weight == word_list.length)
            if (data.includes(new_data[index]) !== true)
                data.push(new_data[index]);
    }
    if (data === []) return response.json({ success: false });
    return response.json({ success: true, data: data });
});

router.post('/searchlatlong', async (request, response) => {
    const { lat, long } = request.body;
    var data = await pic_schema
        .find({
            lat: {
                $gte: (lat - 0.08).toString(),
                $lte: (lat + 0.08).toString(),
            },
            lng: {
                $gte: (long - 0.08).toString(),
                $lte: (long + 0.08).toString(),
            },
        })
        .exec();
    if (data === []) return response.json({ success: false });
    return response.json({ success: true, data: data });
});

router.post('/searchcitystate', async (request, response) => {
    const { city, state } = request.body;
    var data = await pic_schema.find({ city: city, state: state }).exec();
    if (data === []) return response.json({ success: false });
    return response.json({ success: true, data: data });
});

module.exports = router;
