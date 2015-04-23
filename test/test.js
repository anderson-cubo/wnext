var wnext = require('../index.js');
var should = require('should');
describe("wnext", function() {
  wnext('./test/', function(err, result) {
    it('should not exists error', function(done) {
      should.not.exist(err);
      done();
    });
    it('should exists result', function(done) {
      should.exist(result);
      done();
    });
    it('should exists array of results', function(done) {
      result.should.be.instanceof(Array).and.have.lengthOf(3);
      done();
    });

  });

});
