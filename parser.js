const isArray = require('is-array');

function Parser(data){

  this.raw = data;

  this.filesChanged = this.getFilesChanged();
  this.insertions = this.getInsertions();
  this.deletion = this.getDeletions();

}

Parser.prototype.getFilesChanged = function(first_argument) {

  var filesChanged = 0;

  var match = this.raw.match(/(\d*)\s(?:file|files)\schanged/);

  if(isArray(match)){
    filesChanged = parseInt(match[1]);
  }

  return filesChanged;

};

Parser.prototype.getInsertions = function(first_argument) {

  var insertions = 0;

  var match = this.raw.match(/(\d*)\s(?:insertion|insertions)\(\+\)/);

  if(isArray(match)){
    insertions = parseInt(match[1]);
  }

  return insertions;

};

Parser.prototype.getDeletions = function(first_argument) {

  var deletions = 0;

  var match = this.raw.match(/(\d*)\s(?:deletion|deletions)\(\-\)/);

  if(isArray(match)){
    deletions = parseInt(match[1]);
  }

  return deletions;

};

module.exports = Parser;