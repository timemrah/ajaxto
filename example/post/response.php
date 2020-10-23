<?php

require '../../dist/ajaxto.php';

$title   = $_POST['title'];
$content = $_POST['content'];
$admin   = $_POST['member']['admin'];
$editor  = $_POST['member']['editor'];

$ajaxto = ajaxto::new(); //You don't have to instance to variable.


// TITLE VALIDATION:
if($title){
    //If you want use it without $ajaxto variable: ajaxto::goOn()
    //The browser has been informed about the validation.
    $ajaxto->valid('title');
} else{
    //The browser has been informed about the validation.
    $ajaxto->invalid('title', 'Title cannot be empty', 'required');
}


// CONTENT VALIDATION:
if($content){
    //The browser has been informed about the validation.
    $ajaxto->valid('content');
} else{
    //The browser has been informed about the validation.
    $ajaxto->invalid('content', 'Content cannot be empty', 'required');
}


// IF THERE IS THE VALIDATION ERROR
if($ajaxto->isInvalid()){
    //False Response
    return $ajaxto->resFalse('Please check the form', 'validationError');
}








// INSERT PROCESS >>
$insertedId = 1254;
// INSERT PROCESS >>








// SUCCESS - True Response
return $ajaxto->resTrue('Transaction Successful', 'success', $insertedId);