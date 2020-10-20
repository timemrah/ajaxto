ajaxto.always.begin = function(xhr, self){

    console.log('Always begin callback');

};
ajaxto.always.done = (res, self) => {

    console.log('Always done callback');

};
ajaxto.always.success = (res, self) => {

    console.log('Always success callback');

};
ajaxto.always.fail = (res, self) => {

    console.log('Always fail callback');

};
ajaxto.always.resTrue = (res, self) => {

    console.log('Always resTrue callback');

};
ajaxto.always.resFalse = (res, self) => {

    console.log('Always resFalse callback');

};
ajaxto.always.notFound = (res, self) => {

    console.log('Always notFound callback');

};
ajaxto.always.uploadProgress = (percent, e, self) => {

    console.log('Always uploadProgress callback');

};