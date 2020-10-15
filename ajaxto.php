<?php


class ajaxto
{

    private static $instance = null;
    private
        $statusCode_ = null,
        $httpStatus_ = null,
        $clientProcess = null,
        $validation = null;


    function __construct(){
        $this->statusCode_ = '';
        $this->httpStatus_ = 200;
    }


    public static function ins(){
        return self::$instance = new ajaxto();
    }


    public function resTrue($msg = null, $data = null){
        return $this->res(true, $msg, $data);
    }


    public function resFalse($msg = null, $data = null){
        return $this->res(false, $msg, $data);
    }


    private function res($status, $msg, $data){

        if($this->httpStatus_){
            http_response_code($this->httpStatus_);
        }

        $statusCode = $this->statusCode_;
        $validation = $this->validation;
        $clientProcess = $this->clientProcess;

        $resArr = compact('status', 'statusCode', 'msg', 'data', 'validation', 'clientProcess');
        echo json_encode($resArr);

        return $status;
    }


    public function httpResCode($code){
        $this->httpStatus_ = $code;
        return $this;
    }


    public function statusCode($code){
        $this->statusCode_ = $code;
        return $this;
    }


    //CLIENT PROCESS >>
    public function direct($url, $timeout = 0){
        $this->clientProcess['direct'] = compact('url', 'timeout');
        return $this;
    }


    public function innerHtml($selector, $html){
        $this->clientProcess['innerHtml'][] = compact('selector', 'html');
        return $this;
    }


    public function addClass($selector, $class){
        $this->clientProcess['class'][] = [
            'selector' => $selector,
            'class' => $class,
            'process' => 'add'
        ];
        return $this;
    }


    public function removeClass($selector, $class){
        $this->clientProcess['class'][] = [
            'selector' => $selector,
            'class' => $class,
            'process' => 'remove'
        ];
        return $this;
    }


}