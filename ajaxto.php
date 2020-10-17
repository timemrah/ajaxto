<?php


class ajaxto
{

    private
        $httpCode_     = null,
        $clientProcess = null,
        $validation    = null;

    private static $instance = null;


    // CREATE INSTANCE OR GET INSTANCED >>
    public static function new(){
        self::$instance = new self();
        return self::$instance;
    }


    public static function goOn(){
        //OLD INSTANCED CLASS GO ON
        return self::$instance;
    }


    public static function singleton(){
        if(self::$instance){
            return self::$instance;
        }
        return new self();
    }
    // CREATE INSTANCE OR GET INSTANCED //


    public function httpCode($code){
        $this->httpCode_ = $code;
        return $this;
    }


    // CLIENT PROCESS >>
    public function direct($url, $timeout = 0, $target = '_self'){
        $this->clientProcess['direct'] = compact('url', 'timeout', 'target');
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
    // CLIENT PROCESS //


    // VALIDATION SETTER >>
    public function valid(string $field, string $msg = null, $code = null){
        $this->validation[$field] = [
            'field' => $field,
            'msg' => $msg,
            'status' => true,
            'code' => $code
        ];
        return $this;
    }


    public function invalid(string $field, string $msg = null, $code = null){
        $this->validation[$field] = [
            'field' => $field,
            'msg' => $msg,
            'status' => false,
            'code' => $code
        ];
        return $this;
    }


    public function isInvalid(){
        foreach($this->validation as $field){
            if(!$field['status']){ return true; }
        }
        return false;
    }
    // VALIDATION SETTER //


    // RESPONSE >>
    public function resTrue(string $msg = null, string $code = null, $data = null){
        return $this->res(true, $msg, $code, $data);
    }


    public function resFalse(string $msg = null, string $code = null, $data = null){
        return $this->res(false, $msg, $code, $data);
    }


    protected function res(bool $status, string $msg = null, string $code = null, $data = null){
        if($this->httpCode_){
            http_response_code($this->httpCode_);
        }

        $resArr['status'] = $status;

        if($msg){ $resArr['msg'] = $msg; }
        if($code){ $resArr['code'] = $code; }
        if($data){ $resArr['data'] = $data; }
        if($this->validation){ $resArr['validation'] = $this->validation; }
        if($this->clientProcess){ $resArr['clientProcess'] = $this->clientProcess; }

        echo json_encode($resArr);
        return $status;
    }
    // RESPONSE //


}