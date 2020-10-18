<?php require '../../ajaxto.php';

$title   = ajaxto::PUT('title');
$content = ajaxto::PUT('content');
$admin   = ajaxto::PUT('member.admin');
$editor  = ajaxto::PUT('member.editor');

$ajaxto = ajaxto::new();

// VALIDATION >>
if($title){
    $ajaxto
        //Bu kısım kontrolü tarayıcı tarafı dilediği gibi yapması için bilgi veriyoruz.
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
    $ajaxto->valid('content');
} else{
    //Sadece tarayıcıyı validasyon hakkında bilgilendirdik.
    //Hatayı ekrana yansıtmak için tarayıcı tarafında kodlama gerekir.
    $ajaxto->invalid('content', 'İçerik alanı boş kalamaz', 'required');
}
// VALIDATION //


//HERHANGİ BİR VALİDAYSON HATASI VARSA
if($ajaxto->isInvalid()){
    $msg = 'Lütfen formu kontrol ediniz';
    return $ajaxto
        ->innerHtml('#status-div', $msg)
        ->resFalse($msg, 'invalid', ajaxto::PUT());
}


return $ajaxto->resTrue('İşlem Başarılı', 'success', ajaxto::PUT());