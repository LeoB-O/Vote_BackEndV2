const mongoose = require('mongoose');

let settingSchema = mongoose.Schema({
    key: String,
    value: String,
    active: Boolean,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});
let Setting = mongoose.Model('Setting', settingSchema);
module.exports = Setting;