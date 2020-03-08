const uglify_es = require("uglify-es"),
    path = require('path'),
    fs = require('fs');

function malta_es_uglify(o, options) {

    const self = this,
        start = new Date(),
        pluginName = path.basename(path.dirname(__filename));

    let msg;

    options = options || {};
    options.fromString = true;

    try {
        o.content = uglify_es.minify(o.content + "", options).code;
    } catch (err) {
        self.doErr(err, o, pluginName);
    }

    return (solve, reject) => {
        fs.writeFile(o.name, o.content, err => {
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