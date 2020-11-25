const Schema = require('jugglingdb').Schema;
const schema = new Schema('mongodb', {
    url: 'mongodb://localhost:27017/myapp',
    w: 1,
    j: 1
});

const Picture = schema.define('Picture', {
    title : {
        type: String,
        length: 255
    },
    description: {
        type: Schema.Text
    },
    category: {
        type: String,
        length: 255
    },
    image : {
        type: JSON
    }
});

module.exports = schema;