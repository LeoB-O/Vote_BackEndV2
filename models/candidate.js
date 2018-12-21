const mongoose = require('mongoose');

let candidateSchema = mongoose.Schema({
    name: String,
    info: String,
    voteNum: Number,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});
let Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;