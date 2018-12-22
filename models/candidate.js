const mongoose = require('mongoose');

let candidateSchema = mongoose.Schema({
    name: {type: String, required: [true, 'name required']},
    info: {type: String, required: [true, 'info required']},
    voteNum: {type: Number, default: 0},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});
let Candidate = mongoose.model('Candidate', candidateSchema);
module.exports = Candidate;