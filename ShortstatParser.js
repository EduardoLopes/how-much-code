const isArray = require('is-array');

function ShortstatParser(data){

  this.raw = data;

  this.filesChanged = this.getFilesChanged();
  this.insertions = this.getInsertions();
  this.deletion = this.getDeletions();

}

ShortstatParser.prototype.getFilesChanged = function(first_argument) {

  var filesChanged = 0;

  var match = this.raw.match(/(\d*)\s(?:file|files)\schanged/);

  if(isArray(match)){
    filesChanged = parseInt(match[1]);
  }

  return filesChanged;

};

ShortstatParser.prototype.getInsertions = function(first_argument) {

  var insertions = 0;

  var match = this.raw.match(/(\d*)\s(?:insertion|insertions)\(\+\)/);

  if(isArray(match)){
    insertions = parseInt(match[1]);
  }

  return insertions;

};

ShortstatParser.prototype.getDeletions = function(first_argument) {

  var deletions = 0;

  var match = this.raw.match(/(\d*)\s(?:deletion|deletions)\(\-\)/);

  if(isArray(match)){
    deletions = parseInt(match[1]);
  }

  return deletions;

};

module.exports = ShortstatParser;