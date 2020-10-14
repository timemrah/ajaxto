<?php


class ajaxto
{

    static function resTrue($httpStatus = 200, $msg = null, $code = null, $data = null){
        return self::res($httpStatus, true, $msg, $code, $data);
    }


    static function resFalse($httpStatus = 200, $msg = null, $code = null, $data = null){
        return self::res($httpStatus, false, $msg, $code, $data);
    }


    static function res($httpStatus = 200, $status = true, $msg = null, $code = null, $data = null){
        http_response_code($httpStatus);
        echo json_encode(compact('status', 'msg', 'code', 'data'));
        return $status;
    }

}