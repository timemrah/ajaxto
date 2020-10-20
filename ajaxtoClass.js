class ajaxto
{

    #self = this;


    request = {
        method      : null,
        url         : null,
        formData    : {},
        queryString : {},
        header      : {}
    };


    response = {
        body   : null,
        header : null
    }


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


    #defaultAjaxResponse = {
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


    static dataTypeRelationshipOfMethod = {
        queryString : ['GET' , 'DELETE'],
        formData    : ['POST', 'PUT']
    }


    static always = {
        begin          : () => {},
        done           : () => {},
        success        : () => {},
        fail           : () => {},
        resTrue        : () => {},
        resFalse       : () => {},
        notFound       : () => {},
        uploadProgress : () => {}
    }


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
            this.request.queryString = this.#urlQueryStringMergeDataToURLSearchParams(url, formData);
        } else{ //Like POST, PUT..
            this.request.url = url;
            this.request.formData = this.#alwaysFormData(data);
        }

        return this.xhr();
    }
    // SET CONNECTION METHOD, URL AND DATA //


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


    // BUILD TO XHR AND SEND >>
    xhr(){
        const xhr = new XMLHttpRequest();

        ajaxto.always.begin(xhr, this);
        this.#callback.begin(xhr, this);

        xhr.addEventListener('load', xhrRes => {
            let ajaxResponse = null;

            try{
                this.response.body = JSON.parse(xhr.responseText);
                if(this.response.body.status === undefined){
                    throw {message : "undefined status"}
                }

                ajaxResponse = {
                    ...this.#defaultAjaxResponse,
                    ...this.response.body,
                    ...{
                        xhr,
                        httpCode : xhr.status
                    }
                };

                ajaxto.always.success(ajaxResponse, this);
                this.#callback.success(ajaxResponse);

                if(ajaxResponse.status){
                    ajaxto.always.resTrue(ajaxResponse, this);
                    this.#callback.resTrue(ajaxResponse);
                } else{
                    ajaxto.always.resFalse(ajaxResponse, this);
                    this.#callback.resFalse(ajaxResponse);
                }

            } catch(e){
                ajaxResponse = {
                    ...this.#defaultAjaxResponse,
                    ...{
                        xhr,
                        httpCode : xhr.status,
                        status   : false,
                        code     : 'badData',
                        msg      : e.message
                    }
                };

                ajaxto.always.fail(ajaxResponse, this);
                this.#callback.fail(ajaxResponse);

                if(ajaxResponse.status === 404){
                    ajaxto.always.notFound(ajaxResponse, this);
                    this.#callback.notFound(ajaxResponse);
                }
            }

            ajaxto.always.done(ajaxResponse, this);
            this.#callback.done(ajaxResponse);

        });

        xhr.upload.addEventListener('progress', e => {
            let percent = (e.loaded / e.total * 100);
            ajaxto.always.uploadProgress(percent, e, this);
            this.#callback.uploadProgress(percent, e)
        });

        const url = this.request.queryString ? `${this.request.url}?${this.request.queryString}` : this.request.url;
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




    // PRIVATE HELPER METHODS >>
    #urlQueryStringMergeDataToURLSearchParams(url, data){
        let mergedUrlSearchParams = new URLSearchParams();
        let dataUrlParams = new URLSearchParams(data);

        const currentUrlQueryString = url.split('?')[1];
        if(currentUrlQueryString){
            mergedUrlSearchParams = new URLSearchParams(currentUrlQueryString);
        }

        dataUrlParams.forEach((value, key) => {
            mergedUrlSearchParams.set(key, value);
        });

        return mergedUrlSearchParams;
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
    // PRIVATE HELPER METHODS //


}