var Q = require('q');
var is = require('is');
var fs = require('fs');
var cp = require('child_process');
var path = require('path');
var Application = function(folder, callback) {
  if (!(this instanceof Application)) {
    return new Application(folder, callback);
  }
  this.folder = is.string(folder) ? folder : process.cwd();
  this.callback = is.fn(folder) ? folder : callback;
  this.execute = function() {
    var deferred = Q.defer();
    var that = this;
    var file = path.join(that.folder, "wnext");
    var actions = [];
    if(fs.existsSync(file)) {
      var file = fs.readFileSync(file).toString().split(/\r?\n/);
      var i, _l = file.length;
      for(i = 0; i < _l; i++) {
        if(file[i].trim() != '') {
          try {
            var res = cp.execSync(file[i], {cwd: that.folder});
            actions.push({action: file[i], result: res.toString(), error: false});
          } catch(err) {
            actions.push({action: file[i], result: err.toString(), error: true});
          }
        }
      }
      if(is.undef(that.callback))
        deferred.resolve(actions);
      else
        callback(null, actions);
    } else {
      if(is.undef(that.callback))
        deferred.reject(new Error('wnext doesnt exists on folder'));
      else
        callback(new Error('wnext doesnt exists on folder'));
    }
    if(is.undef(that.callback)) return deferred.promise;
  }
  return this.execute();
}
module.exports = Application;
