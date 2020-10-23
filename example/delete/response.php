<?php

require '../../dist/ajaxto.php';
require '../../lib/RD.php'; //Request Data Plugin


$id = $_GET['id'] ?? null;

if(!$id || !is_numeric($id)){
    return ajaxto::new()->resFalse('The id value is not suitable!');
}




// DELETE PROCESS >>

// DELETE PROCESS //




return ajaxto::new()->resTrue();