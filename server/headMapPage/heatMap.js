const express = require('express');
const router = express.Router();
const pic_schema = require('../db/mongo');

router.get('/getData', (req, res) => {
    pic_schema.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

module.exports = router;
