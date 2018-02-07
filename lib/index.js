const _        = require("lodash"),
    dbConfig   = require('./db_connect'),
    pack       = require('../package.json');

let locale     = '',
     messages  = [];

module.exports = {
    register : function (server, options) {
        var pluginOptions = {};
        
        if (options)
            pluginOptions = options;
        
        dbConfig.setConfiguration(pluginOptions);
        dbConfig.connect();

    },
    setLocale: function (selected_locale, callback) {
        locale = selected_locale;
        dbConfig.getDb().collection(dbConfig.getCollection())
            .find({ 'language.code': selected_locale }, { 'language.$': 1, _id: 0, key: 1 })
            .toArray(function (error, data) {
                if (error)
                    throw Error(error);
                else {
                    if (messages) {
                        messages = data;
                        callback();
                    }
                    else
                        throw Error('Empty');
                }
            });
    },
    getLocale: function () {
        return locale;
    },
    __ : function (key) {
        let message = _.find(messages, { key: key });
        if (message)
            return message.language[0].translation;
        else
            return key;
    },
    pkg: {
        name   : pack.name,
        version: pack.version
    }
};