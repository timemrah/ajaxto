const form = document.getElementById('news-form');


form.addEventListener('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);


    new ajaxto().post('response.php', formData).resTrue((res, req) => {
        console.log({res, req});

        // VALID ACTION >>
        let helpers = form.querySelectorAll('.helper');
        helpers.forEach(helper => {
            helper.innerHTML = '';
        })

        let inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.className = 'success';
        })

        let allTextarea = form.querySelectorAll('textarea');
        allTextarea.forEach(textarea => {
            textarea.className = 'success';
        })
        // VALID ACTION //


    }).resFalse((res, req) => {

        console.log({res, req});

        // INVALID ACTION >>
        if(res.validation){

            for(let key in res.validation){
                let validationItem = res.validation[key];

                let helper   = form.querySelector(`div.${validationItem.field} .helper`);
                let input    = form.querySelector(`div.${validationItem.field} input`);
                let textarea = form.querySelector(`div.${validationItem.field} textarea`);

                if(validationItem.status){
                    //valid field
                    helper.innerHTML = '';
                    if(input)   { input.className    = 'success'; }
                    if(textarea){ textarea.className = 'success'; }
                } else{
                    //invalid field
                    helper.innerHTML = validationItem.msg;
                    if(input)   { input.className    = 'error'; }
                    if(textarea){ textarea.className = 'error'; }
                }
            }

        }
        // INVALID ACTION //

    }).fail((res, req) => {

        //Communication did not yield a healthy result.
        console.log({res, req});

    });


});