const fs = require('fs');
const mime = require('mime');
const gravatar = require('gravatar');
const Videos = require('../models/videos');
const VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/ogv'];

exports.show = function(req, res) {
    Videos.find().sort('-created').populate('user', 'local.email').exec((error, videos) => {
        if (error) {
            return res.status(400).send({
                message: error
            });
        }
        console.log(videos);
        res.render('videos', {
            title: 'Videos Page',
            videos: videos,
            gravatar: gravatar.url(videos.email, {s: '80', r: 'x', d: 'retro'}, true)
        });
    });
};

exports.uploadVideo = function(req, res) {
    let src;
    let dest;
    let targetPath;
    let targetName;
    console.log(req);
    const tempPath = req.file.path;
    const type = mime.lookup(req.file.mimetype);
    const extension = req.file.path.split(/[. ]+/).pop();
    if (VIDEO_TYPES.indexOf(type) == -1) {
        return res.status(415).send('Supported video formats: mp4, webm, ogg, ogv');
    }
    targetPath = './public/videos/' + req.file.originalname;
    src = fs.createReadStream(tempPath);
    dest = fs.createWriteStream(targetPath);
    src.pipe(dest);
    src.on('error', (error) => {
        if (error) {
            return res.status(500).send({
                message: error
            });
        }
    });
    src.on('end', () => {
        let video = new Videos(req.body);
        video.videoName = req.file.originalname;
        video.user = req.user;
        video.save((error) => {
            if (error) {
                return res.status(400).send({
                    message: error
                });
            }
        });
        fs.unlink(tempPath, (err) => {
            if (err) {
                return res.status(500).send({
                    message: error
                });
            }
            res.redirect('videos');
        });
    });
};

exports.hasAuthorization = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};