const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const LocationSchema = new Schema({
    title: String,
    coordinates: {
        type: [Number],
        index: '2dsphere'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Location', LocationSchema);