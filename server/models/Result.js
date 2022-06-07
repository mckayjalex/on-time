const { Schema, model } = require('mongoose');
const moment = require('moment');

const resultSchema = new Schema({
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
    },
    onGround: {
        type: String,
    },
    onChocks: {
        type: String,
    },
    gateClearance: {
        type: String,
    },
    lirDelivered: {
        type: String,
    },
    cargoDoorsClosed: {
        type: String,
    },
    doorsClosed: {
        type: String,
    },
    beaconsOn: {
        type: String,
    },
    offChocks: {
        type: String,
    },
    offGround: {
        type: String,
    },
    username: {
        type: String
    }, 
    createdAt: {
        type: String
    }
});

resultSchema.pre('save', function (next) {
    this.createdAt = moment().format('HH:mm').toString();
    next()
})
   

const Result = model('Result', resultSchema);

module.exports = Result;