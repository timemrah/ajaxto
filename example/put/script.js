
const form = document.getElementById('news-form');
const statusDiv = document.getElementById('status-div');

const responseText = document.querySelector('#response-text pre');
const responseObj  = document.querySelector('#response-object pre');
const requestObj   = document.querySelector('#request-object pre');




form.addEventListener('submit', function(e){
    e.preventDefault();

    let formData = new FormData(this);

    // AJAXTO >>
    new ajaxto().put('response.php', formData)
        .done((res, req) => {

            //This place always works.

            responseText.innerHTML = res.text;
            responseObj.innerHTML  = JSON.stringify(res, null, 4);
            requestObj.innerHTML   = JSON.stringify(req, null, 4);

            //You can look at the console for details of the returned and generated values.
            console.log({res, req});

        }).success((res, req) => {

            //Ajax process success. The values returned from the server are ok.
            //The status value returned from the server is "true" or "false".

            //VALIDATION TRANSACTION
            //Validation DOM process was done on the server side!

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
    // AJAXTO //

});