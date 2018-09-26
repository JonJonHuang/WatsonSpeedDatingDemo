
describe('Test test', function() {
    var returns10 = require('../test.js');
    val = returns10();
    it('Test returns10', function(done) {
        expect(val).toEqual(10);
        done();
    });
});
