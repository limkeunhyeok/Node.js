const express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    Location = mongoose.model('Location');

module.exports = function(app) {
    app.use('/', router);
};

router.get('/locations', (req, res, next) => {
    Location.find((err, item) => {
        if (err) {
            return next(err);
        }
        res.render('locations', {
            title: 'Locations',
            location: item,
            lat: -23.54312,
            long: -46.642748,
            API_KEY: process.env.API_KEY
        });
    });
});

router.get('/locations/add', (req, res, next) => {
    res.render('add-location', {
        title: 'Insert Locations',
        API_KEY: process.env.API_KEY
    });
});

router.post('/locations', (req, res, next) => {
    const loc = {
        title: req.body.title,
        coordinates: [req.body.long, req.body.lat]
    };
    const locations = new Location(loc);
    locations.save((error, item) => {
        if (error) {
            return res.status(400).send({
                message: error
            });
        }
        res.render('add-location', {
            message: 'Upload with Success',
            obj: item,
            API_KEY: process.env.API_KEY
        });
    });
});

router.post('/nearme', (req, res, next) => {
    const limit = req.body.limit || 10;
    const maxDistance = req.body.distance || 10;
    
    let coords = [];
    coords[0] = req.body.longitude;
    coords[1] = req.body.latitude;
    
    Location.find({
        'coordinates': {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: coords
                },
                $maxDistance: maxDistance * 1609.34
            }
        }
    }).limit(limit).exec((err, stores) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.render('locations', {
            title: 'Locations',
            location: stores,
            lat: -23.54312,
            long: -46.642748,
            API_KEY: process.env.API_KEY
        });
    });
});