const ajaxto = new function(){

    const Controller = {};
    const request    = {};
    const response   = {};

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

    //SET DATA >>
    Controller.data = function(data){ //FormData
        request.data = data;
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

    //AJAX SEND
    Controller.send = function(callback, progress = ()=>{}, loadend = ()=>{}){

        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function(res){

            try{
                response.data = JSON.parse(this.responseText);
                if(response.data.status === undefined){
                    throw {msg:"undefined status"}
                } else if(response.data.code === undefined){
                    throw {msg:"undefined code"}
                } else if(response.data.msg === undefined){
                    throw {msg:"undefined msg"}
                } else if(response.data.data === undefined){
                    throw {msg:"undefined data"}
                }
                callback(response.data);
            }
            catch(e){
                let responseData = {
                    status : false,
                    code   : 'badData',
                    msg    : e.message,
                    data   : null
                }
                callback(responseData);
            }

        });
        xhr.addEventListener('progress', progress);
        xhr.addEventListener('loadend', loadend);

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

    }

    return Controller;
};