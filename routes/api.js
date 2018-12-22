const util = require('../util/util');
const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const VoteLog = require('../models/vote-log');
const ObjectId = require('mongoose').Types.ObjectId;

// Get all candidate
router.get('/candidates', function (req, res, next) {
    Candidate.find({}, function (err, candidates) {
        let ret = {
            success: true,
            data: {
                candidates: candidates.map(function (candidate) {
                    return {
                        id: candidate._id,
                        name: candidate.name,
                        info: candidate.info,
                        voteNum: candidate.voteNum
                    }
                })
            }
        };
        util.handleResponse(res, err, ret.data);
    });
});

// Vote to a candidate
router.post('/candidate', function (req, res, next) {
    // Check whether id exists
    if (!util.reqShouldContain(['id'])(req.body)) {
        res.send({success: false, data: {err: 'Lack of id or id does not exist.'}});
        return;
    }
    Candidate.findById(req.body.id, function (err, candidate) {
        if (!candidate || err) {
            res.send({success: false, data: {err: 'invalid id.'}});
        } else {
            let ip = req.ip;
            // find vote log
            VoteLog.findOne({ip: ip}, function (err, voteLog) {
                // Reach Maximum vote times.
                if (process.env.NODE_ENV === 'production' && (voteLog && voteLog.voteTimes > 5 || voteLog.voteTo.indexOf(ObjectId(req.body.id)) !== -1)) {
                    res.send({success: false, data: {err: 'Reach maximum vote times.'}});
                } else {
                    if (voteLog) {
                        voteLog.voteTo.push(ObjectId(req.body.id));
                        voteLog.save(function (err) {
                            if (err) {
                                res.send({success: false, data: {err: err}});
                            } else {
                                voteLog.updateOne({$inc: {voteTimes: 1}}, function (err) {
                                    if (err) {
                                        res.send({success: false, data: {err: err}});
                                    } else {
                                        Candidate.update({_id: candidate._id}, {$inc: {voteNum: 1}}, function (err, candidate) {
                                            util.handleResponse(res, err, candidate);
                                        });
                                    }
                                })
                            }
                        })
                    } else {
                        voteLog ? voteLog.voteTo.push(ObjectId(req.body.id)) : 0;
                        VoteLog.updateOne({ip: ip}, {
                                ip: ip,
                                voteTimes: voteLog ? voteLog.voteTimes + 1 : 1,
                                voteTo: voteLog ? voteLog.voteTo : [ObjectId(req.body.id)]
                            }, {
                                upsert: true
                            },
                            function (err, raw) {
                                if (err) {
                                    res.send({success: false, data: {err: err}});
                                } else {
                                    Candidate.update({_id: candidate._id}, {$inc: {voteNum: 1}}, function (err, candidate) {
                                        util.handleResponse(res, err, candidate)
                                    });
                                }
                            });
                    }
                }
            });
        }
    });
});

// Get rank
router.get('/rank', function (req, res, next) {
    Candidate.find().sort('-voteNum').exec(function (err, candidates) {
        let ret = {
            success: true,
            data: {
                candidates: candidates.map(function (candidate, index) {
                    return {
                        name: candidate.name,
                        rank: index,
                        voteNum: candidate.voteNum
                    };
                })
            }
        };
        res.send(ret);
    });
});

module.exports = router;