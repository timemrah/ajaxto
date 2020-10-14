<?php
require 'ajaxto.php';


if(empty($_FILES["file"]["name"][0])){

    ajaxto::resFalse(422, 'No files were sent', 'empty');

} else{

    ajaxto::resTrue(200, 'Files have been received', 'success', $_FILES);

}