const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const shordid = require('shortid')
const config = require('../config/config')

router.post("/mailSender", (req, res) => {
    let email = req.body.email;

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.gmail.id,
            pass: config.gmail.pwd
        }
    });

    let mailOptions = {
        from: config.gmail.id,
        to: email,
        subject: 'Mailer Test',
        html: `
            <p>Please click the link below.</p>
            <a href='http://localhost:3000/auth/?email=${email}&token=${shordid.generate()}'>auth</a>    
        `
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.redirect("/");
});

router.get('/auth', (req, res) => {
    console.log(req.query.email);
    console.log(req.query.token);
    res.redirect('/');
})

module.exports = router;