const ajaxto = new function(){

    const Controller = {};
    const request    = {};
    const response   = {};

    //CALLBACK FUNCTIONS
    let progress   = () => {};
    let success    = () => {};
    let fail       = () => {};
    let resTrue    = () => {};
    let resFalse   = () => {};
    let done       = () => {};
    let notFound   = () => {};

    request.method = 'GET';
    request.url    = null;
    request.data   = {};
    request.header = {};

    response.data   = null;
    response.header = null;

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
            try{
                response.data = JSON.parse(this.responseText);
                if(response.data.status === undefined){
                    throw {msg : "undefined status"}
                } else if(response.data.code === undefined){
                    throw {msg : "undefined code"}
                } else if(response.data.msg === undefined){
                    throw {msg : "undefined msg"}
                } else if(response.data.data === undefined){
                    throw {msg : "undefined data"}
                }

                let responseData =  { ...{ xhr, httpCode: xhr.status }, ...response.data };

                //RUN ALL CALLBACK
                done(responseData);
                success(responseData);
                if(responseData.status === true){
                    resTrue(responseData);
                } else{
                    resFalse(responseData);
                }
            }
            catch(e){
                let responseData = {
                    xhr      : xhr,
                    httpCode : xhr.status,
                    status   : false,
                    code     : 'badData',
                    msg      : e.message,
                    data     : null
                }

                //RUN ALL CALLBACK
                done(responseData);
                fail(responseData);
                resFalse(responseData);

                if(responseData.httpCode === 404){
                    notFound(responseData);
                }
            }

            _private.clearProcess();
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


    let _private = new function(){

        this.clearProcess = function(){
            request.method = 'GET';
            request.url    = null;
            request.data   = {};
            request.header = {};

            response.data   = null;
            response.header = null;

            progress   = () => {};
            success    = () => {};
            fail       = () => {};
            resTrue    = () => {};
            resFalse   = () => {};
            done       = () => {};
            notFound   = () => {};
        }

    };



    return Controller;
};