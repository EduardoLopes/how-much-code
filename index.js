#!/usr/bin/env node

'use strict';

var spawn   = require('child_process').spawn;
var split   = require('split');
var trim    = require('trim');
var colors  = require('colors/safe');
var Parser  = require('./parser');

var now          = new Date();
var today        = (now.getMonth() + 1) +'-'+ now.getDate() +'-'+ now.getFullYear();
var filesChanged = 0;
var insertions   = 0;
var deletion     = 0;
var countCommits = 0;

var args = [
  'log',
  '--format=%n',
  '--shortstat',
  '--after='+new Date( today )
];

function log(msg){

  console.log( colors.cyan('INFO:'), msg );

}

spawn('git', args).stdout
.pipe(split())
.on('data', function (line) {

  if(line.toString().length > 0){
    var data = new Parser( trim( line.toString() ) );
    filesChanged += data.filesChanged;
    insertions += data.insertions;
    deletion += data.deletion;
    countCommits++;
  }

})
.on('end', function() {

  console.log(colors.cyan('----------------------------'));
  log(countCommits + ' Commits');
  log(filesChanged + ' Files changed');
  log(insertions + ' Insertions'+colors.green('(+)'));
  log(deletion + ' Deletions'+colors.red('(-)'));
  console.log(colors.cyan('----------------------------'));

});