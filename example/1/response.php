<?php require '../../ajaxto.php';


$title   = $_POST['title'] ?? null;
$content = $_POST['content'] ?? null;

$ajaxto = ajaxto::new();

// VALIDATION >>
if($title){
    $ajaxto->valid('title')
        ->innerHtml('div.title small.helper', '')
        ->addClass('div.title input', 'success')
        ->removeClass('div.title input', 'error');
} else{
    $ajaxto
        ->invalid('title', 'Konu alanı boş kalamaz', 'required')
        ->innerHtml('div.title small.helper', 'Konu alanı boş kalamaz')
        ->addClass('div.title input', 'error')
        ->removeClass('div.title input', 'success');
}

if($content){
    $ajaxto->valid('content');
} else{
    $ajaxto->invalid('content', 'İçerik alanı boş kalamaz', 'required');
}
// VALIDATION //


if($ajaxto->isInvalid()){
    return $ajaxto
        ->innerHtml('#status-div', 'Lütfen formu kontrol ediniz')
        ->resFalse('Lütfen formu kontrol ediniz', 'invalid');
}


return $ajaxto->resTrue('İşlem Başarılı', 'success', $_POST);