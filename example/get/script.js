const responseBody = document.querySelector('#response-body pre');
const responseObj  = document.querySelector('#response-object pre');
const requestObj   = document.querySelector('#request-object pre');


new ajaxto().get('response.php').resTrue((res, req) => {

    console.log({res, req});

    responseBody.innerHTML = JSON.stringify(res.body, null, 4);
    responseObj.innerHTML  = JSON.stringify(res, null, 4);
    requestObj.innerHTML   = JSON.stringify(req, null, 4);
});