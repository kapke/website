var nodemailer = require('nodemailer'),
    directTransport = require('nodemailer-direct-transport'),
    q = require('q');

var transport = nodemailer.createTransport(directTransport({
    name: 'kapke.eu'
}));

module.exports = function (data) {
    var deferred = q.defer();

    transport.sendMail(convertToMail(data), function (error, info) {
        if(error) {
            console.error(error);
            deferred.reject(error);
        } else {
            console.info(info);
            deferred.resolve(info);
        }
    });

    return deferred.promise;
};

function convertToMail (data) {
    return {
        to: 'andrzej.kopec@kapke.eu',
        from: 'Web Form <www-form@kapke.eu>',
        replyTo: data.name + ' <' + data.email + '>',
        subject: data.title,
        text: data.content
    };
}
