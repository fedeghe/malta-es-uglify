require('malta').checkDeps('uglify-es');

var uglify_es = require("uglify-es"),
    path = require('path'),
    fs = require('fs');

function malta_es_uglify(o, options) {

    var self = this,
        start = new Date(),
        msg,
        pluginName = path.basename(path.dirname(__filename));

    options = options || {};
    options.fromString = true;

    try {
        o.content = uglify_es.minify(o.content + "", options).code;
    } catch (err) {
        self.doErr(err, o, pluginName);
    }

    return function (solve, reject) {
        fs.writeFile(o.name, o.content, function (err) {
            err && self.doErr(err, o, pluginName);
            msg = 'plugin ' + pluginName.white() + ' wrote ' + o.name + ' (' + self.getSize(o.name) + ')';
            err
                ? reject(`Plugin ${pluginName} compilation error:\n${err}`)
                : solve(o);
            self.notifyAndUnlock(start, msg);
        });
    };
}
malta_es_uglify.ext = ['js', 'coffee', 'ts'];
module.exports = malta_es_uglify;