const ajaxto = function(){

    const Controller = {};
    const request    = {
        method : 'GET',
        url    : null,
        data   : {},
        header : {}
    };
    const response   = {
        body   : null,
        header : null
    };

    // CALLBACK FUNCTIONS >>
    let progress   = () => {};
    let success    = () => {};
    let fail       = () => {};
    let resTrue    = () => {};
    let resFalse   = () => {};
    let done       = () => {};
    let notFound   = () => {};
    // CALLBACK FUNCTIONS //

    let ajaxResponse = null;
    const defaultAjaxResponse = {
        xhr      : null,
        httpCode : null,
        status   : null,
        code     : null,
        msg      : null,
        data     : null,
        validation: null,
        clientProcess:{
            innerHtml : null,
            class: null,
            direct: null
        }
    };

    // CONTROLLER >>

    // INSTANCE >>
    Controller.ins = function(){
        return new ajaxto();
    }

    //SET METHOD AND URL >>
    Controller.get = function(url){
        request.method = 'GET';
        request.url    = url;
        return Controller;
    }
    Controller.post = function(url){
        request.method = 'POST';
        request.url    = url;
        return Controller;
    }
    Controller.put = function(url){
        request.method = 'PUT';
        request.url    = url;
        return Controller;
    }
    Controller.delete = function(url){
        request.method = 'DELETE';
        request.url    = url;
        return Controller;
    }

    //SET HEADER
    Controller.header = function(key, value){
        request.header[key] = value;
        return Controller;
    }
    Controller.token = function(token){
        request.header['Access-Control-Expose-Headers'] = 'X-Token';
        request.header['X-Token'] = token;
        return Controller;
    }

    //UPLOAD PROGRESS HANDLER
    Controller.progress = function(progressFunction){
        progress = progressFunction;
        return Controller;
    }

    //THEN PROGRESS
    Controller.done = function(doneFunction){
        //AJAX PROCESS DONE
        done = doneFunction;
        return Controller;
    }
    Controller.success = function(successFunction){
        //AJAX PROCESS DONE AND COMMUNICATION DATA IS CORRECT
        success = successFunction;
        return Controller;
    }
    Controller.fail = function(failFunction){
        //AJAX PROCESS DONE AND COMMUNICATION DATA IS INCORRECT
        fail = failFunction;
        return Controller;
    }
    Controller.resTrue = function(trueFunction){
        //AJAX PROCESS DONE AND COMMUNICATION DATA IS CORRECT.
        //THE STATUS VALUE OF THE DATA IS TRUE
        resTrue = trueFunction;
        return Controller;
    }
    Controller.resFalse = function(falseFunction){
        //AJAX PROCESS DONE AND COMMUNICATION DATA IS CORRECT BUT THE STATUS VALUE OF THE DATA IS FALSE.
        //OR AJAX PROCESS DONE AND COMMUNICATION DATA IS INCORRECT
        resFalse = falseFunction;
        return Controller;
    }
    Controller.notFound = function(notFoundFunction){
        //HTTP STATUS CODE 404
        notFound = notFoundFunction;
        return Controller;
    }


    //AJAX SEND
    Controller.send = function(data){

        request.data = data;

        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function(xhrRes){

            let ajaxResponse = null;

            try{

                response.body = JSON.parse(this.responseText);
                if(response.body.status === undefined){
                    throw { message : "undefined status" }
                }

                ajaxResponse = {
                    ...defaultAjaxResponse,
                    ...response.body,
                    ...{
                        xhr,
                        httpCode:xhr.status
                    }
                };

                // RUN ALL CALLBACK >>
                success(ajaxResponse);
                if(ajaxResponse.status === true){
                    resTrue(ajaxResponse);
                } else{
                    resFalse(ajaxResponse);
                }

            }
            catch(e){

                ajaxResponse = {
                    ...defaultAjaxResponse,
                    ...{
                        xhr,
                        httpCode : xhr.status,
                        status   : false,
                        code     : 'badData',
                        msg      : e.message
                    }
                };

                // RUN ALL CALLBACK >>
                fail(ajaxResponse);
                resFalse(ajaxResponse);
                if(ajaxResponse.httpCode === 404){
                    notFound(ajaxResponse);
                }

            }

            // RUN DONE CALLBACK
            done(ajaxResponse);

        });
        xhr.upload.addEventListener('progress', e => {
            let percent = (e.loaded / e.total * 100);
            progress(percent, e);
        });

        if(request.method === 'GET'){
            let urlParams = new URLSearchParams(request.data).toString();
            request.url += "?" + urlParams;
        }

        xhr.open(request.method, request.url);

        //SET HEADER OF XHR REQUEST
        for(let key in request.header){
            let value = request.header[key];
            xhr.setRequestHeader(key, value);
        }

        if(request.method !== 'GET'){
            xhr.send(request.data);
        } else{
            xhr.send();
        }

        return Controller;

    }
    // CONTROLLER //


    return Controller;
};






class ajax{


    merhaba(){
        console.log('merhaba');
        return this;
    }

}