<?php
require 'ajaxto.php';



if(empty($_FILES["file"]["name"][0])){
    ajaxto::res(false, 'Hiç dosya gönderilmemiş', 'empty');
} else{
    ajaxto::res(true, 'Dosyalar başarıyla alındı', 'success', $_FILES);
}