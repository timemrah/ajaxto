// AJAXTO ALWAYS SETUP :
(()=>{

    let ajaxLoadAlert = null;

    // AJAXTO ALWAYS BEGIN:
    ajaxto.always.begin = xhr => {
        ajaxLoadAlert = awAlert.load('Sunucuya Erişiliyor');
    };

    // AJAXTO ALWAYS DONE:
    ajaxto.always.done = (res, req, self) => {

        ajaxLoadAlert.close();

        // ALERT MSG RESPONSE PROCESS:
        if(res.msgBehavior === 'alert'){
            if(res.status === true){ awAlert.success(res.msg); }
            else                   { awAlert.error(res.msg); }
        }

        // VALIDATION RESPONSE PROCESS:
        if(res.validation !== undefined){
            for(let i in res.validation){
                let field = i;
                let validation = res.validation[i];

                let $fieldInput = document.getElementById(`${validation.field}-validation-input`);
                let $fieldMsg   = document.getElementById(`${validation.field}-validation-msg`);

                if($fieldInput){
                    if(validation.status){ //OLUMLU INPUT ALANI
                        $fieldInput.classList.add('is-valid');
                        $fieldInput.classList.remove('is-invalid');
                    } else if(validation.status === false){ //OLUMSUZ INPUT ALANI
                        $fieldInput.classList.add('is-invalid');
                        $fieldInput.classList.remove('is-valid');
                    } else{ //NÖTR INPUT ALANI
                        $fieldInput.classList.remove('is-valid');
                        $fieldInput.classList.remove('is-invalid');
                    }
                }
                if($fieldMsg){
                    if(validation.status){ //OLUMLU MSG ALANI
                        $fieldMsg.classList.add('valid-feedback');
                        $fieldMsg.classList.remove('invalid-feedback');
                    } else if(validation.status === false){ //OLUMSUZ MSG ALANI
                        $fieldMsg.classList.add('invalid-feedback');
                        $fieldMsg.classList.remove('valid-feedback');
                    } else{ //NÖTR MSG ALANI
                        $fieldMsg.classList.remove('valid-feedback');
                        $fieldMsg.classList.remove('invalid-feedback');
                    }

                    $fieldMsg.innerHTML = validation.msg;
                }
            }
        }
        // VALIDATION RESPONSE PROCESS //
    };
    // AJAXTO ALWAYS DONE //

})();
// AJAXTO ALWAYS SETUP //