<?php


class ajaxto
{

    static function res($status = true, $msg = null, $code = null, $data = null){
        echo json_encode(compact('status', 'msg', 'code', 'data'));
        return $status;
    }

}