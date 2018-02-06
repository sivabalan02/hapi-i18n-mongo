# hapi-i18n-mongo
Translation module for hapi with the mongodb support

## Installation
```
npm install hapi-i18n-mongo
```

## Usage


JavaScript example:
```js
{
  path: '/path',
  method: 'GET',
  handler: function ( request, h ){
    return h.response({
      message: request.i18n.__( "My localized string" )
    });
  })
}
```

## Register Plugin

```js
server.register(
    {
        register: require( "hapi-i18n-mongo" ),
        options : {
        db      : {
            host      : 'localhost',
            port      : 27017,
            db        : 'admin',
            username  : '',
            password  : '',
            collection: 'api_translation'
            }
        }
    } 
);
```

## Setting locale

To set the locale have to use the `Accept-Language` header. If the header was not set, english will be taken as default locale

```js
const i18n = require('hapi-i18n-mongo');
server.ext({
    type  : 'onRequest', 
    method: function(request, h){
        request.i18n = i18n;
        locale = request.headers['Accept-Language'] ? request.headers['Accept-Language']: "en";
        request.i18n.setLocale(locale, function(){
            return h.continue();
        })
    }
});
```

## Get locale

```js
request.i18n.getLocale();
```

## Collection Schema

MongoDB schema have to be like this
```
{
    key: 'translation_key',
    language: [
        {
            code: 'language_code',
            translation: 'translated key'
        }
    ]
}
```