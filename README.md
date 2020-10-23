
# ajaxto


### What is ajaxto
Ajaxto provides a useful javascript library for php server.

This library is used for 'restful' transaction but has more capabilities.

- **Ajaxto also provides server-side javascript controls.**
- **It can also help you with your validation process.**

---

### Front End Ajax Request Code Example
```javascript
new ajaxto().post(url, data)
    .done((res, req) => {

        //This place always works.

    }).success((res, req) => {

        //Ajax process success. The values returned from the server are ok.
        //The status value returned from the server is "true" or "false".

    }).resTrue((res, req) => {

        //Ajax process success. The values returned from the server are ok.
        //The status value returned from the server is "true".

    }).resFalse((res, req) => {

        //Ajax process success. The values returned from the server are ok.
        //The status value returned from the server is "false".

    }).fail((res, req) => {

        //Ajax process is fail!
        //There is a problem with the value returned from the server.

    });
```

### Back End Response of Ajax PHP Code Example
```php
require 'ajaxto.php';

ajaxto::new() 
    //Set javascript process for ajax response
    ->innerHtml('#elmID', 'Html and text string')
    ->addClass('#elmID', 'is-valid')
    //Positive Ajax Response
    ->resTrue('message', 'statusCode', 'data');
```

### Available Back End Methods
```php
new()
goOn()
singleton()
innerHtml('selector', 'html or text string')
addClass('selector', 'className')
removeClass('selector', 'className')
valid('field', 'msg', 'code')
invalid('field', 'msg', 'code')
isInvalid()
direct('url', 'timeout', 'target')
httpCode('httpStatusCode')
resTrue('msg', 'code', 'data')
resFalse('msg', 'code', 'data')

//Ajax Response With JSON
ajaxto::new()->resTrue('msg', 'statusCode', data); //Positive ajax response
ajaxto::new()->resFalse('msg', 'statusCode', data); //Negative ajax response with alert
```

**More information will be added.**