
# ajaxto


### What is ajaxto
Ajaxto provides a useful javascript library for php server.

This library is used for 'restful' transaction but has more capabilities.

- **Ajaxto also provides server-side javascript controls.**
- **It can also help you with your validation process.**

---

### Front End Ajax Request Code Example
```javascript
new ajaxto().post(url, data).resTrue((res, req) => {

    //It meets the response created with resTrue() on the server side.

})
```

### Back End Response of Ajax PHP Code Example
```php
require 'ajaxto.php';

//Positive Ajax Response
ajaxto::new()->resTrue(message (string), statusCode (string), data (array));
```

### Available Back End Methods
```php
new()
goOn()
singleton()
innerHtml(selector (string), html (string))
addClass(selector (string), className (string))
removeClass(selector (string), className (string))
valid(field (string), msg (string), code (string))
invalid(field (string), msg (string), code (string))
isInvalid()
direct(url (string), timeout (int), target (string))
httpCode(httpStatusCode (int))
resTrue(msg (string), code (string), data (array))
resFalse(msg (string), code (string), data (array))

//Ajax Response With JSON
ajaxto::new()->resTrue(message (string), statusCode (string), data (array)); //Positive ajax response
ajaxto::new()->resFalse(message (string), statusCode (string), data (array)); //Negative ajax response with alert
```

**More information will be added.**