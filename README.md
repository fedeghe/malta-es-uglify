---
[![npm version](https://badge.fury.io/js/malta-es-uglify.svg)](http://badge.fury.io/js/malta-es-uglify)
[![npm downloads](https://img.shields.io/npm/dt/malta-es-uglify.svg)](https://npmjs.org/package/malta-es-uglify)
[![npm downloads](https://img.shields.io/npm/dm/malta-es-uglify.svg)](https://npmjs.org/package/malta-es-uglify)  
---  

This plugin can be used on: **.js** files and even on **.coffee** and **.ts** files after using the right plugin  

Options : all options of the [uglify-es package](https://www.npmjs.com/package/uglify-es)  

Sample usage:  
```
malta app/source/index.js public/js -plugins=malta-es-uglify
```
or in the .json file :  
```
"app/source/index.js" : "public/js -plugins=malta-es-uglify",
...
```
or in a script :  
``` js
var Malta = require('malta');
Malta.get().check([
    'app/source/index.js',
    'public/js',
    '-plugins=malta-es-uglify',
    '-options=showPath:false,watchInterval:500,verbose:0'
    ]).start(function (o) {
        var s = this;
        console.log('name : ' + o.name)
        console.log("content : \n" + o.content);
        'plugin' in o && console.log("plugin : " + o.plugin);
        console.log('=========');
    });
```