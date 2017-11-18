var _          = require("lodash");
const dbConfig = require('./db_connect');
var locale     = '';
var messages   = [];
  
exports.register = function (server, options, next) {
    var pluginOptions = {};
    
    if (options)
        pluginOptions = options;
    
    dbConfig.setConfiguration(pluginOptions.db);
    dbConfig.connect();

    next();
};

exports.setLocale = function(selected_locale, callback){
    locale = selected_locale;
    dbConfig.getDb().collection(dbConfig.getCollection())
        .find({'language.code' : selected_locale}, {'language.$' : 1, _id: 0, key: 1})
        .toArray(function(error, data){
            if(error)
                throw Error(error);
            else
            {
                if(messages)
                {
                    messages = data;
                    callback();
                }
                else
                    throw Error('Empty');
            }
        });
}

exports.getLocale = function(){
    return locale;
}

exports.__ = function(key) {
    let message = _.find(messages, {key: key });
    if(message)
        return  message.language[0].translation;
    else
        return key;
}

exports.register.attributes = {
    pkg: require('./package.json')
};
