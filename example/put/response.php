<?php

require '../../dist/ajaxto.php';
require '../../lib/RD.php'; //Request Data Plugin

$_PUT = RD::PUT();

$title   = $_PUT['title']; //Same RD::PUT('title')
$content = $_PUT['content']; //Same RD::PUT('content')
$admin   = $_PUT['member']['admin']; //Same RD::PUT('member.admin')
$editor  = $_PUT['member']['editor']; //Same RD::PUT('member.editor')

$ajaxto = ajaxto::new(); //You don't have to instance to variable.


// TITLE VALIDATION:
if($title){
    $ajaxto //If you want use it without $ajaxto variable: ajaxto::goOn()
        //The browser has been informed about the validation.
        ->valid('title')
        //Server-side DOM controls by javascript
        ->innerHtml('div.title small.helper', '')
        ->addRemoveClass('div.title input', 'success', 'error');
} else{
    $ajaxto
        //The browser has been informed about the validation.
        ->invalid('title', 'Title cannot be empty', 'required')
        //Server-side DOM controls by javascript
        ->innerHtml('div.title small.helper', 'Title cannot be empty')
        ->addRemoveClass('div.title input', 'error', 'success');
}


// CONTENT VALIDATION:
if($content){
    $ajaxto
        //The browser has been informed about the validation.
        ->valid('content')
        //Server-side DOM controls by javascript
        ->innerHtml('div.content small.helper', '')
        ->addRemoveClass('div.content textarea', 'success', 'error');
} else{
    $ajaxto
        //The browser has been informed about the validation.
        ->invalid('content', 'Content cannot be empty', 'required')
        //Server-side DOM controls by javascript
        ->innerHtml('div.content small.helper', 'Content cannot be empty')
        ->addRemoveClass('div.content textarea', 'error', 'success');
}


// IF THERE IS THE VALIDATION ERROR
if($ajaxto->isInvalid()){
    return $ajaxto
        //The browser has been informed about the validation.
        ->innerHtml('#status-div', 'Please check the form')
        //False Response
        ->resFalse('Please check the form', 'invalid');
}








// UPDATE PROCESS >>


// UPDATE PROCESS //








// SUCCESS
return $ajaxto
    //The browser has been informed about the validation.
    ->innerHtml('#status-div', 'Transaction Successful')
    //True Response
    ->resTrue('Transaction Successful', 'success');