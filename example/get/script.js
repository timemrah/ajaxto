const responseText = new function(){
    this.dataWrapper = document.getElementById('response-text-wrapper');
    this.showArea    = this.dataWrapper.querySelector('textarea');
    this.btn         = this.dataWrapper.querySelector('button');
};


const responseObject = new function(){
    this.dataWrapper = document.getElementById('response-wrapper');
    this.showArea    = this.dataWrapper.querySelector('textarea');
};




responseText.btn.addEventListener('click', _ => {


    new ajaxto().get('response.php')
        .done(res => {

            //res.status = ?
            console.log(res);

            responseText.showArea.value   = JSON.stringify(res.body, null, 4);;
            responseObject.showArea.value = JSON.stringify(res, null, 4);

        }).resTrue(res => {

            //res.status = true

        }).resFalse(res => {

            //res.status = false

        });


});