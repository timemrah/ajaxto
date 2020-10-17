const ajaxto = function(){

    const Controller = {};

    const request = {
        method : 'GET',
        url    : null,
        data   : {},
        header : {}
    };
    const response = {
        body   : null,
        header : null
    };

    // CALLBACK FUNCTIONS >>
    let uploadProgress = () => {};
    let success    = () => {};
    let fail       = () => {};
    let resTrue    = () => {};
    let resFalse   = () => {};
    let done       = () => {};
    let notFound   = () => {};
    // CALLBACK FUNCTIONS //

    const defaultAjaxResponse = {
        xhr        : null,
        httpCode   : null,
        status     : null,
        code       : null,
        msg        : null,
        data       : null,
        validation : null,
        clientProcess: {
            innerHtml : null,
            class  : null,
            direct : null
        }
    };

    // CONTROLLER >>

    // INSTANCE >>
    Controller.new = function(){
        return new ajaxto();
    }

    //SET METHOD AND URL >>
    Controller.get = function(url, data = null){
        request.method = 'GET';
        request.url    = url;
        return send(data);
    }
    Controller.post = function(url, data = null){
        request.method = 'POST';
        request.url    = url;
        return send(data);
    }
    Controller.put = function(url, data = null){
        request.method = 'PUT';
        request.url    = url;
        return send(data, data);
    }
    Controller.delete = function(url, data = null){
        request.method = 'DELETE';
        request.url    = url;
        return send(data);
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
    Controller.uploadProgress = function(uploadProgFunc){
        uploadProgress = uploadProgFunc;
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
    // CONTROLLER //


    // AJAX SEND >>
    const send = function(data = null){

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
                if(ajaxResponse.status === true){ resTrue(ajaxResponse); }
                else{ resFalse(ajaxResponse); }

                // CLIENT PROCESS >>
                clientProcess.innerHTml(ajaxResponse.clientProcess.innerHtml);
                clientProcess.class(ajaxResponse.clientProcess.class);
                clientProcess.direct(ajaxResponse.clientProcess.direct);
                // CLIENT PROCESS //
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
                if(ajaxResponse.httpCode === 404){ notFound(ajaxResponse); }

            }

            // RUN DONE CALLBACK
            done(ajaxResponse);

        });

        //XHR UPLOAD PROGRESS
        xhr.upload.addEventListener('progress', e => {
            let percent = (e.loaded / e.total * 100);
            uploadProgress(percent, e);
        });

        //IF THERE IS DATA HERE AND THE METHOD IS GET, THE DATA IS ADDED TO THE URL.
        if(request.method === 'GET' && request.data){
            let urlParams = new URLSearchParams(request.data).toString();
            request.url += "?" + urlParams;
        }

        xhr.open(request.method, request.url);

        //SET HEADER OF XHR REQUEST
        for(let key in request.header){
            let value = request.header[key];
            xhr.setRequestHeader(key, value);
        }

        //SEND
        if(request.method !== 'GET'){ xhr.send(request.data); }
        else{ xhr.send(); }

        return Controller;
    }
    // AJAX SEND //


    const clientProcess = new function(){

        this.direct = function(direct){

            let url = direct.url || null;
            let timeout = direct.timeout || null;
            let target = direct.target || null;

            if(!url){ return false; }

            let link = document.createElement('a');
            link.href = direct.url;

            if(target){ link.target = direct.target; }
            if(timeout){
                setTimeout(() => { link.click() }, timeout);
            } else{
                link.click();
            }
        }

        this.innerHTml = function(items){
            for(let i in items){
                let item = items[i];
                let selectedDom = document.querySelector(item.selector);
                selectedDom.innerHTML = item.html;
            }
        }

        this.class = function(items){
            for(let i in items){
                let item = items[i];
                let selectedDom = document.querySelector(item.selector);
                if(item.process === 'add'){
                    selectedDom.classList.add(item.class);
                }
                else if(item.process === 'remove'){
                    selectedDom.classList.remove(item.class);
                }
            }
        }

    }


    return Controller;
};