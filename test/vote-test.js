const rest = require('restler');
const assert = require('chai').assert;

suite('Vote API tests', function () {
    let base = 'http://localhost:3000';

    test('should be able to get all candidates', function (done) {
        rest.get(base+'/api/candidates').on('success', function (data) {
            assert.match(data.data.candidates[0].id, /\w/, 'id must be set');
            done();
        });
    });

    test('should be able to vote to one candidate', function (done) {
        rest.get(base+'/api/candidates').on('success', function (data) {
            let id = data.data.candidates[0].id;
            rest.post(base+'/api/candidate', {data: {id: id}}).on('success', function (data) {
                assert(data.success===true);
                done();
            })
        });
    });
});