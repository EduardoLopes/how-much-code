var isArray = require('is-array');
var isNumber = require('is-number');

function NumstatParserLine(data){

  this.raw = data;

  var match = this.raw.match(/(((?:\d+|\-))\t((?:\d+|\-))\t(.+))/);

  this.insertions = parseInt(match[2]);
  this.deletions = parseInt(match[3]);
  this.file = match[4];

  if(isNumber(this.insertions) == false){
    this.insertions = 0;
  }

  if(isNumber(this.deletions) == false){
    this.deletions = 0;
  }

}

function NumstatParser(data){

  this.raw = data;

  this.files = [];

  for (var i = 0; i < this.raw.length; i++) {
    this.files[i] = new NumstatParserLine(this.raw[i]);
  };

}

module.exports = NumstatParser;