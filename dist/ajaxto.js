class ajaxto
{

    request = {
        method      : null,
        url         : null,
        queryString : null,
        formData    : null,
        data        : null,
        header      : null
    };

    response = {
        body   : null,
        header : null
    };

    #defaultAjaxResponse = {
        xhr        : null,
        httpCode   : null,
        status     : null,
        code       : null,
        msg        : null,
        data       : null,
        text       : null,
        validation : null,
        header     : null,
        clientProcess : {
            innerHtml : null,
            class     : null,
            direct    : null
        }
    };

    #callback = {
        begin          : () => {},
        done           : () => {},
        success        : () => {},
        fail           : () => {},
        resTrue        : () => {},
        resFalse       : () => {},
        notFound       : () => {},
        uploadProgress : () => {},
    };

    static dataTypeRelationshipOfMethod = {
        queryString : ['GET' , 'DELETE'],
        formData    : ['POST', 'PUT']
    };

    static always = {
        begin          : () => {},
        done           : () => {},
        success        : () => {},
        fail           : () => {},
        resTrue        : () => {},
        resFalse       : () => {},
        notFound       : () => {},
        uploadProgress : () => {}
    };


    // SET HEADER >>
    header(key, value){
        this.request.header[key] = value;
        return this;
    }
    token(token){
        this.request.header['Access-Control-Expose-Headers'] = 'X-Token';
        this.request.header['X-Token'] = token;
        return this;
    }
    // SET HEADER //


    // SET CALLBACK >>
    begin(callback){
        this.#callback.begin = callback;
        return this;
    }
    done(callback){
        this.#callback.done = callback;
        return this;
    }
    success(callback){
        this.#callback.success = callback;
        return this;
    }
    fail(callback){
        this.#callback.fail = callback;
        return this;
    }
    resTrue(callback){
        this.#callback.resTrue = callback;
        return this;
    }
    resFalse(callback){
        this.#callback.resFalse = callback;
        return this;
    }
    notFound(callback){
        this.#callback.notFound = callback;
        return this;
    }
    uploadProgress(callback){
        this.#callback.uploadProgress = callback;
        return this;
    }
    // SET CALLBACK //


    // RUN CALLBACK >>
    #beginRunCallback(xhr){
        ajaxto.always.begin(xhr, this);
        this.#callback.begin(xhr, this);
    }
    #doneRunCallback(ajaxResponse){
        ajaxto.always.done(ajaxResponse, this.request, this);
        this.#callback.done(ajaxResponse, this.request);
    }
    #successRunCallback(ajaxResponse){
        ajaxto.always.success(ajaxResponse, this.request, this);
        this.#callback.success(ajaxResponse, this.request);
    }
    #failRunCallback(ajaxResponse){
        ajaxto.always.fail(ajaxResponse, this.request, this);
        this.#callback.fail(ajaxResponse, this.request);
    }
    #resTrueRunCallback(ajaxResponse){
        ajaxto.always.resTrue(ajaxResponse, this.request, this);
        this.#callback.resTrue(ajaxResponse, this.request);
    }
    #resFalseRunCallback(ajaxResponse){
        ajaxto.always.resFalse(ajaxResponse, this.request, this);
        this.#callback.resFalse(ajaxResponse, this.request);
    }
    #notFoundRunCallback(ajaxResponse){
        ajaxto.always.notFound(ajaxResponse, this.request, this);
        this.#callback.notFound(ajaxResponse, this.request);
    }
    #uploadProgressRunCallback(percent, e){
        ajaxto.always.uploadProgress(percent, e, this);
        this.#callback.uploadProgress(percent, e)
    }
    // RUN CALLBACK >>


    /** SET CONNECTION METHOD, URL AND DATA
     * @param url; The address, can be contain the query string.
     * @param data; It can be FormData or Object(it can be nested) */
    get   (url, data = {}){ return this.#requestBuilder('GET',    url, data); }
    post  (url, data = {}){ return this.#requestBuilder('POST',   url, data); }
    put   (url, data = {}){ return this.#requestBuilder('PUT',    url, data); }
    delete(url, data = {}){ return this.#requestBuilder('DELETE', url, data); }


    #requestBuilder(method, url, data){
        this.request.method = method;

        if(ajaxto.dataTypeRelationshipOfMethod.queryString.includes(method)){
            //Like GET, DELETE..
            this.request.url = url.split('?')[0];
            const formData = this.#alwaysFormData(data);
            this.request.queryString = this.#urlQueryStringMergeData(url, formData);
            this.request.data = Object.fromEntries(formData);
        } else{ //Like POST, PUT..
            this.request.url = url;
            this.request.formData = this.#alwaysFormData(data);
            this.request.data = Object.fromEntries(this.request.formData);
        }

        this.#xhr();
        return this;
    }
    // SET CONNECTION METHOD, URL AND DATA //


    // BUILD TO XHR AND SEND >>
    #xhr(){

        const xhr = new XMLHttpRequest();

        this.#beginRunCallback(xhr);

        xhr.addEventListener('load', xhrRes => {
            let ajaxResponse = null;

            this.response.header = this.#getResponseHeaders(xhr.getAllResponseHeaders());

            // TRY CATCH >>
            try{

                this.response.body = JSON.parse(xhr.responseText);
                if(this.response.body.status === undefined){
                    throw {message : "undefined status"}
                }

            } catch(e){

                ajaxResponse = {
                    ...this.#defaultAjaxResponse,
                    ...{
                        xhr,
                        httpCode : xhr.status,
                        status   : false,
                        code     : 'badData',
                        msg      : e.message,
                        header   : this.response.header,
                        text     : xhr.responseText
                    }
                };

                //RUN CALLBACKS
                if(ajaxResponse.status === 404){ this.#notFoundRunCallback(ajaxResponse); }
                this.#failRunCallback(ajaxResponse);
                this.#doneRunCallback(ajaxResponse);

                return false;
            }
            // TRY CATCH //


            ajaxResponse = {
                ...this.#defaultAjaxResponse,
                ...this.response.body,
                ...{
                    xhr,
                    httpCode : xhr.status,
                    header   : this.response.header,
                    text     : xhr.responseText
                }
            };
            ajaxResponse.clientProcess = {
                ...this.#defaultAjaxResponse.clientProcess,
                ...this.response.body.clientProcess
            }

            // CLIENT PROCESS >>
            this.#clientProcess.innerHTml(ajaxResponse.clientProcess.innerHtml);
            this.#clientProcess.class(ajaxResponse.clientProcess.class);
            this.#clientProcess.direct(ajaxResponse.clientProcess.direct);
            // CLIENT PROCESS //

            // RUN CALLBACKS
            this.#successRunCallback(ajaxResponse);
            if(ajaxResponse.status){ this.#resTrueRunCallback(ajaxResponse);  }
            else                   { this.#resFalseRunCallback(ajaxResponse); }
            this.#doneRunCallback(ajaxResponse);

        });

        xhr.upload.addEventListener('progress', e => {
            let percent = (e.loaded / e.total * 100);
            this.#uploadProgressRunCallback(percent, e);
        });

        let queryString = this.request.queryString ? new URLSearchParams(this.request.queryString) : '';
        const url = Array.from(queryString).length ? `${this.request.url}?${queryString}` : this.request.url;
        xhr.open(this.request.method, url);

        // SET HEADER OF XHR REQUEST >>
        for(let key in this.request.header){
            let value = this.request.header[key];
            xhr.setRequestHeader(key, value);
        }
        // SET HEADER OF XHR REQUEST //

        xhr.send(this.request.formData);
        return this;
    }
    // BUILD TO XHR AND SEND >>


    // CLIENT PROCESS >>
    #clientProcess = {
        innerHTml : function(items){
            for(let i in items){
                let item              = items[i];
                let selectedDom       = document.querySelector(item.selector);
                selectedDom.innerHTML = item.html;
            }
        },
        class : function(items){
            for(let i in items){
                let item        = items[i];
                let selectedDom = document.querySelector(item.selector);
                if(item.process === 'add'){
                    selectedDom.classList.add(item.class);
                }
                else if(item.process === 'remove'){
                    selectedDom.classList.remove(item.class);
                }
            }
        },
        direct : function(direct){
            if(direct === null){ return false; }
            let url     = direct.url || null;
            let timeout = direct.timeout || null;
            let target  = direct.target || null;

            if(!url){ return false; }

            let link  = document.createElement('a');
            link.href = direct.url;

            if(target){ link.target = direct.target; }
            if(timeout){ setTimeout(() => { link.click() }, timeout);}
            else{ link.click(); }
        }
    };
    // CLIENT PROCESS //


    // PRIVATE HELPER METHODS >>
    #urlQueryStringMergeData(url, data){
        let dataUrlParams         = new URLSearchParams(data);
        let mergedUrlSearchParams = Array.from(dataUrlParams).length ? new URLSearchParams() : null;

        const currentUrlQueryString = url.split('?')[1];
        if(currentUrlQueryString){
            mergedUrlSearchParams = new URLSearchParams(currentUrlQueryString);
        }

        dataUrlParams.forEach((value, key) => {
            mergedUrlSearchParams.set(key, value);
        });

        if(!mergedUrlSearchParams){ return null; }
        return Object.fromEntries(mergedUrlSearchParams);
    }


    #nestedObjToFormData(obj, formData = new FormData()){
        let delegateFormData = formData;

        const createFormData = function(obj, subKeyStr = ''){
            for(let i in obj){
                let value = obj[i];
                let subKeyStrTrans = subKeyStr ? `${subKeyStr}[${i}]` : i;
                if(typeof(value) === 'string' || typeof(value) === 'number'){
                    delegateFormData.append(subKeyStrTrans, value);
                }
                else if(typeof(value) === 'object'){
                    createFormData(value, subKeyStrTrans);
                }
            }
        }

        createFormData(obj);
        return delegateFormData;
    }


    #alwaysFormData(data){
        return (data instanceof FormData) ? data : this.#nestedObjToFormData(data);
    }


    #getResponseHeaders(allResponseHeaders){
        const headers = {};
        allResponseHeaders.trim().split(/[\r\n]+/).map(value => value.split(/: /))
            .forEach(keyValue => {
                headers[keyValue[0].trim()] = keyValue[1].trim();
            });
        return headers;
    }
    // PRIVATE HELPER METHODS //


}