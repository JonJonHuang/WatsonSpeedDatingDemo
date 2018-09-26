var http = require('http');
var childProcess = require('child_process');

describe('Stand server', function() {
    // TODO - dont assume in watsonwebapp dir, use Path library to find www
    var subprocess = childProcess.fork('bin/www');
    it('Server stood up', function(done) {
        http.get('http://127.0.0.1:3000', function(res) {
            expect(res).toBeTruthy();
            expect(res.statusCode).toEqual(200);
            subprocess.kill();
            done();
        });
    });
});
