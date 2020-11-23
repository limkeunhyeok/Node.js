const fs = require('fs');
const mime = require('mime');
const gravatar = require('gravatar');
const Images = require('../models/images');
const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

exports.show = function(req, res) {
    Images.find().sort('-created').populate('user', 'local.email').exec((error, images) => {
        if (error) {
            return res.status(400).send({
                message: error
            });
        }
        res.render('images-gallery', {
            title: 'Images Gallery',
            images: images,
            gravatar: gravatar.url(images.email, {s: '80', r: 'x', d: 'retro'}, true)
        });
    });
};

exports.uploadImage = function(req, res) {
    let src;
    let dest;
    let targetPath;
    let targetName;
    const tempPath = req.file.path;
    console.log(req.file);
    const type = mime.lookup(req.file.mimetype);
    const extension = req.file.path.split(/[. ]+/).pop();
    if (IMAGE_TYPES.indexOf(type) == -1) {
        return res.status(415).send('Supported image formats: jpeg, jpg, jpe, png.');
    }
    targetPath = './public/images/' + req.file.originalname;
    src = fs.createReadStream(tempPath);
    dest = fs.createWriteStream(targetPath);
    src.pipe(dest);
    src.on('error', (err) => {
        if (err) {
            return res.status(500).send({
                message: error
            });
        }
    });
    src.on('end', () => {
        let image = new Images(req.body);
        image.imageName = req.file.originalname;
        image.user = req.user;
        image.save((error) => {
            if (error) {
                return res.status(400).send({
                    message: error
                });
            }
        });
        fs.unlink(tempPath, (err) => {
            if (err) {
                return res.status(500).send('Woh, something bad happened here');
            }
            res.redirect('images-gallery');
        });
    });
};

exports.hasAuthorization = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};