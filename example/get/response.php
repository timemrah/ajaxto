<?php

require '../../ajaxto.php';
require '../../vendor/RD.php'; //Request Data Plugin

$_PUT = RD::PUT();

$title   = $_PUT['title']; //Same RD::PUT('title')
$content = $_PUT['content']; //Same RD::PUT('content')
$admin   = $_PUT['member']['admin']; //Same RD::PUT('member.admin')
$editor  = $_PUT['member']['editor']; //Same RD::PUT('member.editor')

$ajaxto = ajaxto::new();

// VALIDATION >>
if($title){
    $ajaxto
        //The browser has been informed about the validation.
        ->valid('title')
        //Bu kısımda sunucu tarafında tarayıcıya hükmediyoruz.
        ->innerHtml('div.title small.helper', '')
        ->addClass('div.title input', 'success')
        ->removeClass('div.title input', 'error');
} else{
    $ajaxto
        //Bu kısım kontrolü tarayıcı tarafı dilediği gibi yapması için bilgi veriyoruz.
        ->invalid('title', 'Konu alanı boş kalamaz', 'required')
        //Bu kısımda sunucu tarafında tarayıcıya hükmediyoruz.
        ->innerHtml('div.title small.helper', 'Konu alanı boş kalamaz')
        ->addClass('div.title input', 'error')
        ->removeClass('div.title input', 'success');
}

if($content){
    //Sadece tarayıcıyı validasyon hakkında bilgilendirdik.
    //Hatayı ekrana yansıtmak için tarayıcı tarafında kodlama gerekir.
    $ajaxto
        ->valid('content')
        ->innerHtml('div.content small.helper', '')
        ->addClass('div.content textarea', 'success')
        ->removeClass('div.content textarea', 'error');
} else{
    //Sadece tarayıcıyı validasyon hakkında bilgilendirdik.
    //Hatayı ekrana yansıtmak için tarayıcı tarafında kodlama gerekir.
    $ajaxto
        ->invalid('content', 'İçerik alanı boş kalamaz', 'required')
        ->innerHtml('div.content small.helper', 'İçerik alanı boş kalamaz')
        ->addClass('div.content textarea', 'error')
        ->removeClass('div.content textarea', 'success');
}
// VALIDATION //


//HERHANGİ BİR VALİDAYSON HATASI VARSA
if($ajaxto->isInvalid()){
    $msg = 'Lütfen formu kontrol ediniz';
    return $ajaxto
        ->innerHtml('#status-div', $msg)
        ->resFalse($msg, 'invalid', $_PUT);
}

$msg = 'İşlem Başarılı';
return $ajaxto
    ->innerHtml('#status-div', $msg)
    ->resTrue('İşlem Başarılı', 'success', $_PUT);