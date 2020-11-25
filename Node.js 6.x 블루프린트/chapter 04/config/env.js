module.exports = function(app, configEnv) {
    const dotenv = require('dotenv');
    dotenv.config();
    const cloudinary = require('cloudinary').v2;
    if (typeof(process.env.CLOUDINARY_URL) == 'undefined') {
        console.log('Cloudinary config file is not defined');
        console.log('Setup CLOUDINARY_URL or use dotenv module file');
    } else {
        console.log('Cloudinary config, successfully used:');
        console.log(cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET
        }));
    }
};