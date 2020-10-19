class ajaxto
{

    request = {
        method: null,
        url: null,
        data: {},
        header: {}
    };
    response = {
        body: null,
        header: null
    }


    constructor(){

    }


    get(url, data = null){
        this.request.method = 'GET';
        this.request.url = url;
    }


    send(data = null){

    }


}