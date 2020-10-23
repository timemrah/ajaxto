
# ajaxto


### What is ajaxto
Ajaxto provides a useful javascript library for php server.

This library is used for 'restful' transaction but has more capabilities.

- **Ajaxto also provides server-side javascript controls.**
- **It can also help you with your validation process.**

---

### Front End Ajax Request Code Example
```javascript
new ajaxto().post(url, data).resTrue(res => {
  /* The ajax process was successfull and 
     serverside ajaxto process status is true. */

  // Do something positive..
}).resFalse(res => {
    /* The ajax process was successfull and 
       serverside ajaxto process status is false. */

    // Do something negative..
}).fail(res => {
    /* The ajax process was fail */

    // Do something for fail..
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