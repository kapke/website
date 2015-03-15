'use strict';
var fs = require('fs'),
    marked = require('marked');

module.exports = function (req, res) {
    var content = fs.readFileSync(__dirname+'/../public/content/about.md', {encoding: 'utf8'});
    res.render('about.dust', {
        title: 'About',
        content: marked(content)
    });
};