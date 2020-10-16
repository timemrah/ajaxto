<?php require '../../ajaxto.php';


$title   = $_POST['title'] ?? null;
$content = $_POST['content'] ?? null;
$ajaxto  = ajaxto::new();


// VALIDATION >>
if($title){
    $ajaxto->valid('title');
} else{
    $ajaxto
        ->invalid('title', 'Konu alanı boş kalamaz', 'required')
        ->innerHtml('div.title small.helper', 'Konu alanı boş kalamaz')
        ->addClass('div.title input', 'error');
}

if($content){
    $ajaxto->valid('content');
} else{
    $ajaxto->invalid('content', 'İçerik alanı boş kalamaz', 'required');
}
// VALIDATION //


if($ajaxto->isInvalidFields()){
    return $ajaxto->resFalse(null, 'invalid');
}

return $ajaxto->resTrue('İşlem Başarılı', 'success', $_POST);