<?php
require 'ajaxto.php';


if(empty($_FILES["file"]["name"][0])){

    ajaxto::ins()
        ->httpResCode(422)
        ->statusCode('empty')
        ->resFalse('No files were sent');

} else{

    ajaxto::ins()->statusCode('success')->resTrue('Files have been received', $_FILES);

}