var fs = require('fs'),
    immutable = require('immutable'),
    content = immutable.Map(JSON.parse(fs.readFileSync(__dirname+'/../public/content/cv.json')));

module.exports = function (req, res) {
    var out = content.set('title', 'CV');
    res.render('cv.dust', out.toObject());
};