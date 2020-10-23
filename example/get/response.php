<?php

require '../../dist/ajaxto.php';
require '../../lib/RD.php'; //Request Data Plugin

$newsJson = file_get_contents('../../data/news.json');
if(!$newsJson){
    return ajaxto::new()->resFalse('Cannot read products.json file', 'cannotReadDbFile');
}

$news = json_decode($newsJson);
ajaxto::new()->data($news)->resTrue();