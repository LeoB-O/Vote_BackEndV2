const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');

// Add a candidate record
router.put('/candidate', function (req, res, next) {
    let body = req.body;
    Candidate.create(body, function (err, candidate) {
        if (err) {
            res.send({success: false, data: {err: err}});
        } else {
            res.send({
                success: true,
                data: {id: candidate._id, name: candidate.name, info: candidate.info, voteNum: candidate.voteNum}
            });
        }
    });
});

module.exports = router;