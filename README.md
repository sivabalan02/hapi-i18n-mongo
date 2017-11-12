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
  handler: function ( request, reply ){
    return reply({
      message: request.i18n.__( "My localized string" )
    });
  })
}
```

## Register Plugin

```js
server.register(
    {
        register: require( "hapi-i18n" ),
        options : {
        db      : {
            host      : 'localhost',
            port      : 27017,
            db        : 'admin',
            collection: 'api_translation'
            }
        }
    } 
);
```

## Setting locale

To set the locale have to use the `Accept-Language` header. If the header was not set, english will be taken as default locale

```js
server.ext('onRequest', function(request, reply){
    locale = request.headers['Accept-Language'] ? request.headers['Accept-Language']: "en";
    request.i18n.setLocale(locale, function(){
        return reply.continue();
    })
});
```
