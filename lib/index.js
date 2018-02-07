const _ = require("lodash"),
    dbConfig = require('./db_connect'),
    pack = require('../package.json');

let locale = '',
    messages = [];

module.exports = {
    register: function (server, options) {
        var pluginOptions = {};

        if (options)
            pluginOptions = options;

        dbConfig.setConfiguration(pluginOptions);
        dbConfig.connect();

    },
    setLocale: async function (selected_locale) {
        locale = selected_locale;
        await dbConfig.getDb().collection(dbConfig.getCollection())
            .find({})
            .toArray(function (error, data) {
                if (error)
                    throw Error(error);
                else {
                    if (messages)
                        messages = data;
                    else
                        throw Error('Empty');
                }
            });
    },
    getLocale: function () {
        return locale;
    },
    __: function (key) {
        let message = _.find(messages, { key: key });
        if (message)
            return message.language[0].translation;
        else
            return key;
    },
    pkg: {
        name: pack.name,
        version: pack.version
    }
};