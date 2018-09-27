var http = require('http');
var childProcess = require('child_process');

describe('Stand server', function() {
    // TODO - dont assume in watsonwebapp dir, use Path library to find www
    // TODO - race condition, test fails if it runs before subprocess
    it('Server stood up', function(done) {
        var subprocess = childProcess.fork('bin/www');
        setTimeout(function() {
            http.get('http://127.0.0.1:3000', function(res) {
                expect(res).toBeTruthy();
                expect(res.statusCode).toEqual(200);
                subprocess.kill();
                done();
            });
        }, 2500);
    });
});
