var assert = require('assert');
var NumstatParser = require('./NumstatParser');
var pify = require('pify');
var childProcess = require('child_process');

describe('how-much-code', function(){

  //list the first 20 commits
  var arg = '--before="Thu Nov 12 12:21:46 2015 -0300"';
  var output = pify(childProcess.execFile)('./index.js', [arg]);

  it('should count 20 Commits', function(){

    return output.then(function(out){

      var match = out.toString().match(/20\sCommits/);
      assert.notEqual(match, null);

    });

  });

  it('should count 9 files changed', function(){

    return output.then(function(out){

      var match = out.toString().match(/9\sFiles\schanged/);
      assert.notEqual(match, null);

    });

  });

  it('should count 157 sDeletions', function(){

    return output.then(function(out){

      var match = out.toString().match(/157\sDeletions\(\-\)/);
      assert.notEqual(match, null);

    });

  });

  it('should count 482 Insertions', function(){

    return output.then(function(out){

      var match = out.toString().match(/482\sInsertions\(\+\)/);
      assert.notEqual(match, null);

    });

  });

});

describe('NumstatParser', function() {

  it('should list 2 files', function(){

    var commit ='\n7\t0\tCHANGELOG.md\n1\t1\tindex.js\n';
    var parser = commit.match(/((?:\d+|\-))\t((?:\d+|\-))\t(.+)/g);
    var data = new NumstatParser(parser);

    assert.equal(data.files.length, 2);

  });

  it('should list the files: [CHANGELOG.md, index.js, package.json]', function(){

    var commit ='\n53\t0\tindex.js\n32\t0\tpackage.json\n55\t0\tparser.js';
    var parser = commit.match(/((?:\d+|\-))\t((?:\d+|\-))\t(.+)/g);
    var data = new NumstatParser(parser);

    assert.equal(data.files.length, 3);
    assert.equal(data.files[0].file, 'index.js');
    assert.equal(data.files[1].file, 'package.json');
    assert.equal(data.files[2].file, 'parser.js');

  });

  it('package.json should have 32 insertions and 0 deletions', function(){

    var commit ='\n53\t0\tindex.js\n32\t0\tpackage.json\n55\t0\tparser.js';
    var parser = commit.match(/((?:\d+|\-))\t((?:\d+|\-))\t(.+)/g);
    var data = new NumstatParser(parser);

    assert.equal(data.files[1].file, 'package.json');
    assert.equal(data.files[1].insertions, 32);
    assert.equal(data.files[1].deletions, 0);

  });

  it('insertions and deletions should be 0', function(){

    var commit ='\n-\t-\tsun.jpeg\n-\t-\tmoon.png';
    var parser = commit.match(/((?:\d+|\-))\t((?:\d+|\-))\t(.+)/g);
    var data = new NumstatParser(parser);

    assert.equal(data.files[0].file, 'sun.jpeg');
    assert.equal(data.files[0].insertions, 0);
    assert.equal(data.files[0].deletions, 0);

    assert.equal(data.files[1].file, 'moon.png');
    assert.equal(data.files[1].insertions, 0);
    assert.equal(data.files[1].deletions, 0);

  });

});