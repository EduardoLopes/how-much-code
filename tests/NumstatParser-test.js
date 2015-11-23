var NumstatParser = require('../NumstatParser');
var test = require('ava');

test('NumstatParser should list 2 files', t => {

    var numstatLog ='\n7\t0\tCHANGELOG.md\n1\t1\tindex.js\n';
    var data = new NumstatParser(numstatLog);

    t.is(data.files.length, 2);
    t.end();

});

test('NumstatParser should list the files: [CHANGELOG.md, index.js, package.json]', t => {

    var numstatLog ='\n53\t0\tindex.js\n32\t0\tpackage.json\n55\t0\tparser.js';
    var data = new NumstatParser(numstatLog);

    t.is(data.files[0].file, 'index.js');
    t.is(data.files[1].file, 'package.json');
    t.is(data.files[2].file, 'parser.js');

    t.end();

});

test('NumstatParser should show that package.json have 32 insertions and 0 deletions', t => {

    var numstatLog ='\n53\t0\tindex.js\n32\t0\tpackage.json\n55\t0\tparser.js';
    var data = new NumstatParser(numstatLog);

    t.is(data.files[1].file, 'package.json');
    t.is(data.files[1].insertions, 32);
    t.is(data.files[1].deletions, 0);

    t.end();

});

test('NumstatParser should show 0 insertions or deletions when the file was changed but didn\'t show those informations', t => {

    var numstatLog ='\n-\t-\tsun.jpeg\n-\t-\tmoon.png';
    var data = new NumstatParser(numstatLog);

    t.is(data.files[0].file, 'sun.jpeg');
    t.is(data.files[0].insertions, 0);
    t.is(data.files[0].deletions, 0);

    t.is(data.files[1].file, 'moon.png');
    t.is(data.files[1].insertions, 0);
    t.is(data.files[1].deletions, 0);

    t.end();

});

