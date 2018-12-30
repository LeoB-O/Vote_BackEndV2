const util = require('../util/util');
const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const Setting = require('../models/setting');

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

// api for login
// actually every api under admin could be used as login
router.post('/login', function (req, res, next) {
    res.send({success: true, data: {msg: 'login success.'}});
});

// logout
router.get('/logout', function (req, res, next) {
    req.logout();
    util.handleResponse(res, null, {msg: 'logout success.'});
});

// get setting
router.get('/setting', function (req, res, next) {
    Setting.find({}, function (err, settings) {
        let ret = util.arrayToObject(settings);
        util.handleResponse(res, err, ret);
    });
});

// put setting
router.put('/setting', function (req, res, next) {
    let sent = false;
    let body = req.body;
    if (!body || body === {}) {
        util.handleResponse(res, 'Need params.', null);
        return;
    } else {
        for (let key in body) {
            Setting.updateOne({key: key}, {key: key, value: body[key]}, {upsert: true}, function (err, raw) {
                if (!sent) {
                    util.handleResponse(res, err, null);
                    sent = true;
                }
            });
        }
    }
});

// post setting
router.post('/setting', function (req, res, next) {
    let body = req.body;
    if (!body || body === {}) {
        util.handleResponse(res, 'Need params.', null);
    } else {
        for (let key in body) {
            Setting.updateOne({key: key}, {key: key, value: body[key]}, {upsert: true}, function (err, raw) {
                util.handleResponse(res, err, null);
            });
        }
    }
});
module.exports = router;