
const form = document.getElementById('news-form');
const statusDiv = document.getElementById('status-div');

const responseText = document.querySelector('#response-text pre');
const responseObj  = document.querySelector('#response-object pre');
const requestObj   = document.querySelector('#request-object pre');




form.addEventListener('submit', function(e){
    e.preventDefault();

    let formData = new FormData(this);

    // AJAXTO >>
    new ajaxto().post('response.php', formData)
        .done((res, req) => {

            //This place always works.

            responseText.innerHTML = res.text;
            responseObj.innerHTML  = JSON.stringify(res, null, 4);
            requestObj.innerHTML   = JSON.stringify(req, null, 4);

            //You can look at the console for details of the returned and generated values.
            console.log({res, req});

        }).success((res, req) => {

            //The values returned from the server are ok.
            //The status value returned from the server is "true" or "false".

            // VALIDATION DOM TRANSACTION >>
            for(let key in res.validation){
                let validationItem = res.validation[key];

                let helper = form.querySelector(`div.${validationItem.field} small`);
                let input  = form.querySelector(`[name="${validationItem.field}"]`);

                if(validationItem.status){ //valid field
                    helper.innerHTML = "";
                    input.className = "success";
                } else{ //invalid field
                    helper.innerHTML = validationItem.msg;
                    input.className = "error";
                }
            }
            // VALIDATION DOM TRANSACTION //

        }).resTrue((res, req) => {

            //The status value returned from the server is "true".
            //Server-side transaction is "Successful"

        }).resFalse((res, req) => {

            //The status value returned from the server is "false".
            //Server-side transaction "Fail"

        }).fail((res, req) => {

            //There is a problem with the value returned from the server.
            statusDiv.innerHTML = 'Incoming data is inappropriate.';

        });
    // AJAXTO //

});