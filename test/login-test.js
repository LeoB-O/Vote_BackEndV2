const rest = require('restler');
const assert = require('chai').assert;

suite('Login API tests', function () {
    let base = 'http://localhost:3000';

    test('should not able to access before logging in.', function (done) {
        rest.put(base + '/admin/candidate', {data: {name: 'test', info: 'test'}}).on('success', function (data) {
            assert(data.success === false);
            done();
        });
    });

    test('login with wrong username should return error message.', function (done) {
        rest.post(base+'/admin/login', {data:{username:'notexist', password:'notexist'}}).on('success',function (data) {
            assert(data.data.msg==='Incorrect username.');
            assert(data.success===false);
            done();
        });
    });

    test('login with wrong password should return error message.', function (done) {
        rest.post(base+'/admin/login', {data:{username: 'test', password: 'wrong'}}).on('success', function (data) {
            assert(data.data.msg==='Incorrect password.');
            assert(data.success===false);
            done();
        });
    });

    test('login with right username and password should return success', function (done) {
        rest.post(base+'/admin/login', {data:{username:'test', password:'test'}}).on('success', function (data) {
            assert(data.success===true);
            done();
        });
    });
});