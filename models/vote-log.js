const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

let voteLogSchema = mongoose.Schema({
    ip: String,
    voteTimes: Number,
    voteTo: [ObjectId],
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});
let VoteLog = mongoose.model('VoteLog', voteLogSchema);
module.exports = VoteLog;