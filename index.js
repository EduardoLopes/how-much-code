#!/usr/bin/env node

'use strict';

var spawn   = require('child_process').spawn;
var split   = require('split');
var trim    = require('trim');
var colors  = require('colors/safe');
var readline = require('readline');
var Parser  = require('./parser');

var filesChanged = 0;
var insertions   = 0;
var deletion     = 0;
//for some reason the stream is getting one line without a commit
var countCommits = -1;

var argsToInject = process.argv.slice(2);

var args = [
  'log',
  '--format=%n==_END_COMMIT_MESSAGE_HOW_MUCH_CODE_MODULE_',
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
.pipe(split('==_END_COMMIT_MESSAGE_HOW_MUCH_CODE_MODULE_'))
.on('data', function (line) {

  if(line.toString().match(/(?:(\d*)\s(?:file|files)\schanged|(\d*)\s(?:insertion|insertions)\(\+\)|(\d*)\s(?:deletion|deletions)\(\-\))/)){
    var data = new Parser( trim( line.toString() ) );
    filesChanged += data.filesChanged;
    insertions += data.insertions;
    deletion += data.deletion;
  }

  //some commits doesn't have files changed, insertions or deletations
  countCommits++;

  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(pluralSingulaFilter('Commit', 'Commits', countCommits));

})
.on('end', function() {

  readline.clearLine(process.stdout, 0);

  console.log('\n'+colors.cyan('----------------------------'));
  log( pluralSingulaFilter('Commit', 'Commits', countCommits) );
  log( pluralSingulaFilter('File changed', 'Files changed', filesChanged) );
  log( pluralSingulaFilter('Insertion', 'Insertions', insertions) + colors.green('(+)') );
  log( pluralSingulaFilter('Deletion', 'Deletions', deletion) + colors.red('(-)') );
  console.log(colors.cyan('----------------------------'));

});