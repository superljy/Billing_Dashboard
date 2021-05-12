const fs = require('fs');
const utils = {
    read: function (month, callback) {
        fs.readFile(`../static/data/billing/${month}.json`, 'utf8', (err, data) => {
            if (err || data.length == 0) {
                callback([]);
            } else {
                callback(data);
            }
        })
    },

    write: function (month, data, res) {
        fs.writeFile(`../static/data/billing/${month}.json`, JSON.stringify(data), (err) => {
            if (err) throw err;
            res.end('Success~!');
        })
    }
}

module.exports = utils;