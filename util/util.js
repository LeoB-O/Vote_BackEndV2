module.exports = {
    reqShouldContain: function (params) {
        return function (req) {
            for (let p of params) {
                if (!req[p]) {
                    return false;
                }
            }
            return true;
        }
    },

    handleResponse: function (res, err, data) {
        if (data === null) {
            data = {}
        }
        if (err) {
            res.send({success: false, data: {err: err}});
        } else {
            res.send({success: true, data: data});
        }
    },

    // array should like[{key: key1, value: value1, active: true}]
    arrayToObject: function (array) {
        let ret = {};
        for (let object of array) {
            if (object.active && object.key!=='password'&&object.key!=='username') {
                ret[object.key] = object.value;
            }
        }
        return ret;
    }
}