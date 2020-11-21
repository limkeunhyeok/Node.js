const models = require('../models/index');
const Band = require('../models/band');

exports.create = function(req, res) {
    models.Band.create(req.body).then((band) => {
        res.redirect('/bands');
    });
};

exports.list = function(req, res) {
    models.Band.findAll({
        order: [['createdAt', 'DESC']]
    }).then((bands) => {
        res.render('band-list', {
            title: 'List bands',
            bands: bands
        });
    });
};

exports.byId = function(req, res) {
    models.Band.find({
        where: {
            id: req.params.id
        }
    }).then((band) => {
        res.json(band);
    });
};

exports.update = function(req, res) {
    models.Band.find({
        where: {
            id: req.params.id
        }
    }).then((band) => {
        if (band) {
            band.updateAttributes({
                name: req.body.name,
                description: req.body.description,
                album: req.body.album,
                year: req.body.year,
                UserId: req.body.user_id
            }).then((band) => {
                res.send(band);
            });
        }
    });
};

exports.delete = function(req, res) {
    models.Band.destroy({
        where: {
            id: req.params.id
        }
    }).then((band) => {
        res.json(band);
    });
};