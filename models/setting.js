const mongoose = require('mongoose');

// TODO still using relation database conception, should change to NOSQL style
let settingSchema = mongoose.Schema({
    key: String,
    value: String,
    active: Boolean,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});
let Setting = mongoose.model('Setting', settingSchema);
module.exports = Setting;