class ajaxto
{

    request = {
        method: null,
        url: null,
        formData: {},
        queryString: {},
        urlSearchParams: {},
        header: {}
    };
    response = {
        body: null,
        header: null
    }


    constructor(){

    }


    // SET CONNECTION METHOD, URL AND DATA >>
    /**
     * @param url = String
     * @param data = It can be FormData or Object(it can be nested)
     */
    get(url, data = {}){ //data can be FormData or object(it can be nested)
        this.request.method = 'GET';
        this.request.formData = data instanceof FormData ? data : this.#nestedObjToFormData(data);

        this.request.url = url.split('?')[0];
        this.request.urlSearchParams = this.#urlQueryStringMergeDataToURLSearchParams(url, this.request.formData);
        this.request.queryString = this.request.urlSearchParams.toString();

        this.req();
    }


    post(url, data = {}){ //data can be FormData or object(it can be nested)
        this.request.method = 'GET';
        this.request.url = url;
        this.request.formData = data;
        this.req();
    }


    put(url, data = {}){
        this.request.method = 'GET';
        this.request.url = url;
        this.request.data = data;
        this.req();
    }


    delete(url, data = {}){
        this.request.method = 'GET';
        this.request.url = url;
        this.request.data = data;
        this.req();
    }
    // SET CONNECTION METHOD, URL AND DATA //


    // XHR SEND >>
    req(){
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', xhrRes => {

        });
        xhr.upload.addEventListener('progress', e => {
            let percent = (e.loaded / e.total * 100);
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
    // XHR SEND //




    // PRIVATE >>
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
    // PRIVATE //




}