const { Schema, model } = require('mongoose');

const flightSchema = new Schema({
    origin: {
        type: String,
        required: true,
        uppercase: true
    },
    destination: {
        type: String,
        required: true,
        uppercase: true 
    },
    flightNo: {
        type: String,
        required: true,
        uppercase: true 
    },
    rego: {
        type: String,
        required: true,
        uppercase: true 
    },
    deptTime: {
        type: String,
        uppercase: true 
    },
    arrTime: {
        type: String,
        uppercase: true 
    }
})

const Flight = model('Flight', flightSchema);

module.exports = Flight;