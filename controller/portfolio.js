var fs = require('fs'),
    immutable = require('immutable'),
    items = immutable.List(JSON.parse(fs.readFileSync(__dirname+'/../public/content/portfolio.json')));

items = items.map(function (item) {
    item.href = item.href ||  '/portfolio/'+item.slug;
    item.img = '/static/img/portfolio/'+item.slug+'.png';
    return item;
});

module.exports = {
    items: items,
    get: function (req, res) {
        var out = {
            title: 'Portfolio',
            items: items.toArray()
        };
        res.render('portfolio.dust', out);
    },
    getItem: function (item, req, res) {
        console.log(item);
        res.write('Ala ma kota');
    }
};