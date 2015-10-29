var assert = require('assert');
var Parser = require('./parser');

describe('Parser', function() {
  describe('#getFilesChanged', function () {

    it('should return the number of files changed', function () {

      var parser = new Parser('1 file changed, 28 insertions(+), 13 deletions(-)');
      assert.equal(parser.getFilesChanged(), 1);

    });

    it('should return the number of files even when more than one file was changed (plural and singular test)', function () {

      var parser = new Parser('2 files changed, 16 insertions(+), 10 deletions(-)');
      assert.equal(parser.getFilesChanged(), 2);

    });

  });

  describe('#getFilesChanged', function () {

    it('should return the number of insertions', function () {

      var parser = new Parser('4 file changed, 1 insertion(+), 13 deletions(-)');
      assert.equal(parser.getInsertions(), 1);

    });

    it('should return the number of insertions even when there\'s more than one insertion (plural and singular test)', function () {

      var parser = new Parser('2 files changed, 16 insertions(+), 10 deletions(-)');
      assert.equal(parser.getInsertions(), 16);

    });

    it('should return 0 if there\'s no insertions', function () {

      var parser = new Parser('4 files changed, 16 deletions(-)');
      assert.equal(parser.getInsertions(), 0);

    });

  });

  describe('#getDeletions', function () {

    it('should return the number of insertions', function () {

      var parser = new Parser('1 file changed, 28 insertions(+), 1 deletion(-)');
      assert.equal(parser.getDeletions(), 1);

    });

    it('should return the number of deletions even when there\'s more than one deletions (plural and singular test)', function () {

      var parser = new Parser('2 files changed, 16 insertions(+), 10 deletions(-)');
      assert.equal(parser.getDeletions(), 10);

    });

    it('should return 0 if there\'s no deletions', function () {

      var parser = new Parser('8 files changed, 26 insertions(+)');
      assert.equal(parser.getDeletions(), 0);

    });

  });

});