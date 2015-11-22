# how-much-code

> A module that count how much code have you committed in a git repository

[![Build Status](https://travis-ci.org/EduardoLopes/how-much-code.svg)](https://travis-ci.org/EduardoLopes/how-much-code)  

### Install
```
npm install how-much-code -g
```

### Usage

Get info from all the commits in the repository:
`how-much-code`  
Since midnight: `how-much-code --since=midnight`  
Since 6am: `how-much-code --since=6am`  
...and so on: 
`how-much-code --since=6am --author="Eduardo Lopes"`


### Options
You can basiclly use any [git log](http://git-scm.com/docs/git-log) option, but try to use only the limiting options or the parser can get crazy.

### Tips
Set alias in you command line tool, so you don't need to type too much to get what you want:

```
$ #(linux example)
$ alias gittoday='how-much-code --since=midnight'
$ alias gitmonth='how-much-code --since="1 month ago"'
```

#### Know issues

- It can take a while depending on the size of the git repository
- If a option that changes the format of the log is set, the parser can get confused. I'm trying to prevent that by removing `--format` and `--pretty` options if the use try to set that, but there's others options that can change the log format. The recomendation is to use only git log limiting options.