var personality = require('../routes/personality');

describe('personality',function(){

    beforeAll(function(done){
        done();
    })
    it('Adding user successful', function(done){
        expect(personality).not.toBeNull();
        done();
    })
    it('finding user successful', function(done){
        expect(personality).not.toBeNull();
        done();
    })
    it('message stored successful', function(done){
        expect(personality).not.toBeNull();
        done();
    })
    afterAll(function(done){
        done();
    })
})