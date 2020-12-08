const mongoose = require('mongoose');
const boardSchema = mongoose.Schema({
    created: {
        type: Date,
        default: Date.now
    },
    writer: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Board', boardSchema);