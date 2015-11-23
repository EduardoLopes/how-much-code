var pify = require('pify');
var childProcess = require('child_process');
var test = require('ava');

var arg = '--before="Thu Nov 12 12:21:46 2015 -0300"';
var output = pify(childProcess.execFile)('../index.js', [arg]);

test('how-much-code should count 20 Commits', t => {

    return output.then(function(out){

      var match = out.toString().match(/20\sCommits/);
      t.not(match, null);

    });

});

test('how-much-code should count 9 files changed', t => {

    return output.then(function(out){

      var match = out.toString().match(/9\sFiles\schanged/);
      t.not(match, null);

    });

});

test('how-much-code should count 157 sDeletions', t => {

    return output.then(function(out){

      var match = out.toString().match(/157\sDeletions\(\-\)/);
      t.not(match, null);

    });

});

test('how-much-code should count 482 Insertions', t => {

    return output.then(function(out){

      var match = out.toString().match(/482\sInsertions\(\+\)/);
      t.not(match, null);

    });

});

test('how-much-code should warning about \'--format\' git log option', t => {

    var arg = '--before="Thu Nov 12 12:21:46 2015 -0300"';
    var output = pify(childProcess.execFile)('../index.js', [arg, '--format="%m"']);

    return output.then(function(out){

      var match = out.toString().match(/WARNING:\sCan\'t\schange\slog\sformat/);
      t.not(match, null);

    });

});