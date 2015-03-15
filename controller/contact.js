var mailer = require('../service/mailer');

module.exports = {
    get: function (req, res) {
        renderTemplate(res);
    },
    post: function (req, res) {
        mailer(req.body).then(function () {
            renderTemplate(res, {message: 'success'});
        }, function () {
            renderTemplate(res, {message: 'fail'});
        });
    }
};

function renderTemplate (res, data) {
    data = data || {};
    var out = {
        title: 'Contact'
    };
    for(var name in data) {
        out[name] = data[name];
    }
    console.log(out);
    res.render('contact.dust', out);
}