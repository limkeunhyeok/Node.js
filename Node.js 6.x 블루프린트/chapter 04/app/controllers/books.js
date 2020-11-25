const express = require('express'),
    router = express.Router(),
    schema = require('../models/book'),
    Picture = schema.models.Picture,
    cloudinary = require('cloudinary').v2,
    fs = require('fs'),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart();

module.exports = function(app) {
    app.use('/', router);
};

router.get('/books', (req, res, next) => {
    Picture.all().then((photos) => {
            console.log(photos);

        res.render('book/books', {
            title: 'PhotoBook',
            photos: photos,
            cloudinary: cloudinary
        });
    });
});

router.get('/books/add', (req, res, next) => {
    res.render('book/add-photo', {
        title: 'Upload Picture'
    });
});

router.post('/books/add', multipartMiddleware, (req, res, next) => {
    console.log(req.files);
    let photo = new Picture(req.body);
    const imageFile = req.files.image.path;
    cloudinary.uploader.upload(imageFile, {
        tags: 'photobook',
        folder: req.body.category + '/',
        public_id: req.files.image.originalFilename
    }).then((image) => {
        console.log('Picture uploaded to Cloudinary');
        console.log(image);
        photo.image = image;
        return photo.save();
    }).then((photo) => {
        console.log('Successfully saved');
        const filePath = req.files.image.path;
        fs.unlinkSync(filePath);
    }).finally(() => {
        res.render('book/posted-photo', {
            title: 'Upload with Success',
            photo: photo,
            upload: photo.image
        });
    });
});