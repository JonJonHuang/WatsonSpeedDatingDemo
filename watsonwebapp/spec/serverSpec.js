var http = require('http');
var childProcess = require('child_process');

describe('Server', function() {

    // TODO - dont assume in watsonwebapp dir, use Path library to find www
    var successMessageRegex = /Listening on port: ([0-9]{1,5})/;
    var subprocess;
    var data;
    beforeEach(function(done) {
        subprocess = childProcess.fork('bin/www', [], {stdio: 'pipe'});
        subprocess.stdout.on('data', function(chunk) {
            data = chunk.toString();
            done();
        });
    });
    // TODO - race condition, test fails if it runs before subprocess
    it('sends the correct success message', function(done) {
        match = successMessageRegex.exec(data);
        expect(match).not.toBeNull();
        done();
        // subprocess.stdout.on('data', function(chunk) {
        //     data = chunk.toString();
        // });
    });
    it('successfully stands', function(done) {
        match = successMessageRegex.exec(data);
        port = match ? Number(match[1]) : 3000;
        http.get('http://127.0.0.1:' + port, function(res) {
            expect(res).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            done();
        });
    });

    afterEach(function(done) {
        subprocess.kill();
        done();
    });
});
