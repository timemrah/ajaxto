<?php


require '../../dist/ajaxto.php';
require '../../lib/RD.php'; //Request Data Plugin

$productsJson = file_get_contents('../../data/products.json');
if(!$productsJson){
    return ajaxto::new()->resFalse('Cannot read products.json file', 'cannotReadDbFile');
}

$products = json_decode($productsJson);
ajaxto::new()->data($products)->resTrue();