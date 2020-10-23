<?php

require '../../dist/ajaxto.php';
require '../../lib/RD.php'; //Request Data Plugin

$_PUT = RD::PUT();

$id      = $_PUT['id'] ?? null;               //Same RD::PUT('id')
$title   = $_PUT['title'] ?? null;            //Same RD::PUT('title')
$content = $_PUT['content'] ?? null;          //Same RD::PUT('content')
$admin   = $_PUT['member']['admin'] ?? null;  //Same RD::PUT('member.admin')
$editor  = $_PUT['member']['editor'] ?? null; //Same RD::PUT('member.editor')

$ajaxto = ajaxto::new(); //You don't have to instance to variable.
$validationStatus = true;

// TITLE VALIDATION:
if($title){
    $ajaxto //If you want use it without $ajaxto variable: ajaxto::goOn()
        //Server-side DOM controls by javascript
        ->innerHtml('div.title small', '')
        ->addRemoveClass('[name="title"]', 'success', 'error');
} else{
    $ajaxto
        //Server-side DOM controls by javascript
        ->innerHtml('div.title small', 'Title cannot be empty')
        ->addRemoveClass('[name="title"]', 'error', 'success');

    $validationStatus = false;
}


// CONTENT VALIDATION:
if($content){
    $ajaxto
        //Server-side DOM controls by javascript
        ->innerHtml('div.content small', '')
        ->addRemoveClass('[name="content"]', 'success', 'error');
} else{
    $ajaxto
        //Server-side DOM controls by javascript
        ->innerHtml('div.content small', 'Content cannot be empty')
        ->addRemoveClass('[name="content"]', 'error', 'success');

    $validationStatus = false;
}


// IF THERE IS THE VALIDATION ERROR
if(!$validationStatus){
    return $ajaxto
        //The browser has been informed about the validation.
        ->innerHtml('#status-div', 'Please check the form')
        //False Response
        ->resFalse('Please check the form', 'validationError');
}








// UPDATE PROCESS >>


// UPDATE PROCESS //








// SUCCESS
return $ajaxto
    //The browser has been informed about the validation.
    ->innerHtml('#status-div', 'Transaction Successful')
    //True Response
    ->resTrue('Transaction Successful', 'success');