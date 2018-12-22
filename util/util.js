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
        if (err) {
            res.send({success: false, data: {err: err}});
        } else {
            res.send({success: true, data: data});
        }
    }
}