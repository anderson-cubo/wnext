# wnext
Perform certain actions on a directory from a `wnext` file.
Each row in a wnext file is run as a shell command.
## Installation

In your project root

```shell
$ npm install wnext
```
In your code

```
var wnext = require('wnext');
```
## Usage
### A wnext file
You can excute multiples actions
```
pm2 kill
pm2 start index.js
```
### In your code
With Callbacks
```
var wnext = require('wnext');
wnext([folder], [callback]);
```
With Promises
```
var wnext = require('wnext');
wnext([folder]).then([result], [error]);
```
## Examples
###Running in the same folder.
```
var wnext = require('wnext');
wnext(function(err, result) {
	console.log(result);
});
```
###Choosing another folder
```
var wnext = require('wnext');
wnext('../', function(err, result) {
	console.log(result);
});
```
You can get as promise as well.
```
wnext().then(function(result) {
    console.log(result);
}, function(err) {
    console.error(err);
});
```
