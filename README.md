# how-much-code

> A module that count how much code have you committed in a git repository

[![Build Status](https://travis-ci.org/EduardoLopes/how-much-code.svg)](https://travis-ci.org/EduardoLopes/how-much-code) [![Coverage Status](https://coveralls.io/repos/EduardoLopes/how-much-code/badge.svg?branch=master&service=github)](https://coveralls.io/github/EduardoLopes/how-much-code?branch=master)

### Install
```
npm install how-much-code -g
```

### Usage
```
#Get info of all the commits in the repository:
$ how-much-code       

#Since midnight 
$ how-much-code --since=midnight

#Since 6am
$ how-much-code --since=6am

#...and so on 
$ how-much-code --since=6am --author="Eduardo Lopes"
```

### Options
You can basiclly use any [git log](http://git-scm.com/docs/git-log) option, but try to use only the limiting options or the parser can get crazy.

Shortcut options:
```
  --today       shows the info about the commits of the day
  --yesderday   shows the info about the commits of yesterday
  --week        shows the info about the commits of the current week
  --month       shows the info about the commits of the current month
```

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