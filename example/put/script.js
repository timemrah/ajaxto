
const form = document.getElementById('news-form');


form.addEventListener('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);


    new ajaxto().put('response.php', formData).resTrue((res, req) => {

        console.log({res, req});

    }).resFalse((res, req) => {

        //Since the validation is managed by the server-side, we have not done validation coding here.
        console.log({res, req});

    }).fail((res, req) => {

        //Communication did not yield a healthy result.
        console.log({res, req});

    });


});