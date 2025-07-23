const mongoose = require('mongoose')

const fighterSchema = mongoose.Schema({
    name: String,
    height: Number,
    reach: Number,
    stance: String,
    DOB: String,
    SLpM: Number,
    StrAcc: Number,
    SApM: Number,
    StrDef: Number,
    TDAvg: Number,
    TDAcc: Number,
    TDDef: Number,
    SubAvg: Number,
    wins: Number,
    losses: Number,
    draws: Number,
    imgURL: String

});

module.exports = fighterSchema;