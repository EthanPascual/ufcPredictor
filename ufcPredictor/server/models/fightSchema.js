const mongoose = require('mongoose');
const fighterSchema = require('./fighterSchema.js');
const Fighter = mongoose.model('Fighter', fighterSchema); 

const fightSchema = mongoose.Schema({
    fighter1: { type: mongoose.Schema.Types.ObjectId, ref: 'Fighter' },
    fighter2: { type: mongoose.Schema.Types.ObjectId, ref: 'Fighter' },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Fighter' },
    round: Number,
    time: Number,
    KD1: Number, 
    sigStr1: Number,
    sigStrP1: Number,
    totalStr1: Number,
    TD1: Number,
    TDP1: Number,
    subAtt1: Number,
    rev1: Number,
    ctrl1: Number,
    KD2: Number, 
    sigStr2: Number,
    sigStrP2: Number,
    totalStr2: Number,
    TD2: Number,
    TDP2: Number,
    subAtt2: Number,
    rev2: Number,
    ctrl2: Number,
    method: String,
    date: String
});


module.exports = mongoose.model('Fight', fightSchema);