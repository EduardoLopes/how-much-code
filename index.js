#!/usr/bin/env node

'use strict';
var spawn   = require('child_process').spawn;
var split   = require('split');
var trim    = require('trim');
var colors  = require('colors/safe');
var readline = require('readline');
var isArray = require('is-array');
var NumstatParser  = require('./NumstatParser');

var filesChanged = {};
var insertions   = 0;
var deletions    = 0;
//for some reason the stream is getting one line without a commit
var countCommits = 0;


var argsToInject = process.argv.slice(2);

var args = [
  'log',
  '--format=%n==_END_COMMIT_MESSAGE_HOW_MUCH_CODE_MODULE_',
  '--numstat'
];

argsToInject = argsToInject.filter(function(value){

  if(value.match(/--format|--pretty/)){
    console.log( colors.red('WARNING:'), 'Can\'t change log format' );
    return false;
  }

  if(value == '--yesterday'){

    var after = new Date();
    after.setDate(after.getDate() - 1);
    after.setHours(0, 0, 0, 0);

    var before = new Date();
    before.setDate(before.getDate() - 1);
    before.setHours(23, 59, 59, 999);

    args = args.concat(['--after', after.toString(), '--before', before.toString()]);

    return false;

  }

  if(value == '--today'){

    var today = new Date();
    today.setDate(today.getDate() - 1);
    today.setHours(0, 0, 0, 0);

    args = args.concat(['--after', today.toString()]);

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

  if(line.length <= 1) return;

  //check if there's a numstat log in the commit
  var parser = line.toString().match(/((?:\d+|\-))\t((?:\d+|\-))\t(.+)/g);

  if(isArray(parser)){

    var data = new NumstatParser(line.toString());

    for (var i = 0; i < data.files.length; i++) {

      if(typeof filesChanged[data.files[i].file] == 'undefined'){
        filesChanged[data.files[i].file] = 0;
      }

      filesChanged[data.files[i].file] += 1;

      insertions += data.files[i].insertions;
      deletions += data.files[i].deletions;
    };

  }

  //some commits doesn't have files changed, insertions or deletations
  countCommits++;

  readline.clearLine(process.stdout, 0);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(pluralSingulaFilter('Commit', 'Commits', countCommits));

})
.on('end', function() {

  readline.clearLine(process.stdout, 0);

  var filesChangedCount = 0;

  for (var fileChanged in  filesChanged) {
    filesChangedCount++;
  }

  console.log('\n'+colors.cyan('----------------------------'));
  log( pluralSingulaFilter('Commit', 'Commits', countCommits) );
  log( pluralSingulaFilter('File changed', 'Files changed', filesChangedCount) );
  log( pluralSingulaFilter('Insertion', 'Insertions', insertions) + colors.green('(+)') );
  log( pluralSingulaFilter('Deletion', 'Deletions', deletions) + colors.red('(-)') );
  console.log(colors.cyan('----------------------------'));

});