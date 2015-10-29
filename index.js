#!/usr/bin/env node

'use strict';

var spawn   = require('child_process').spawn;
var split   = require('split');
var trim    = require('trim');
var colors  = require('colors/safe');
var Parser  = require('./parser');

var filesChanged = 0;
var insertions   = 0;
var deletion     = 0;
var countCommits = 0;

var argsToInject = process.argv.slice(2);

var args = [
  'log',
  '--format=%n',
  '--shortstat'
];

argsToInject = argsToInject.filter(function(value){

  if(value.match(/--format|--pretty/)){
    console.log( colors.red('WARNING:'), 'Can\'t change log format' );
    return false;
  }

  return true;

});

args = args.concat(argsToInject);


function log(msg){

  console.log( colors.cyan('INFO:'), msg );

}

function pluralSingulaFilter(singularMessage, pluralMessage, number){
    var message = pluralMessage;

  if(number <= 1){
    message = singularMessage;
  }

  return number +' '+message;
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
  log( pluralSingulaFilter('Commit', 'Commits', countCommits) );
  log( pluralSingulaFilter('File changed', 'Files changed', filesChanged) );
  log( pluralSingulaFilter('Insertion', 'Insertions', insertions) + colors.green('(+)') );
  log( pluralSingulaFilter('Deletion', 'Deletions', deletion) + colors.red('(-)') );
  console.log(colors.cyan('----------------------------'));

});