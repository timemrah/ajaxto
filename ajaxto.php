<?php


class ajaxto
{

    private
        $httpCode_     = null,
        $clientProcess = null,
        $validation    = null;

    private static
        $instance = null,
        $putData  = null;


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


    // GET DATA ON BODY >>
    public static function GET(string $key = null){
        if($key === null){ return $_GET; }
        return self::dotNestedKeySearchFromArray($key, $_GET);
    }
    public static function positiveGET(string $key = null, $default = null){
        $value = self::dotNestedKeySearchFromArray($key, $_GET);
        if(!is_numeric($value) || $value < 1){ return $default; }
        return $value;
    }


    public static function POST(string $key = null){
        if($key === null){ return $_POST; }
        return self::dotNestedKeySearchFromArray($key, $_POST);
    }
    public static function positivePOST(string $key = null, $default = null){
        $value = self::dotNestedKeySearchFromArray($key, $_POST);
        if(!is_numeric($value) || $value < 1){ return $default; }
        return $value;
    }


    public static function PUT(string $key = null){
        if(self::$putData === null){ self::$putData = self::readPutData(); }
        if($key === null){ return self::$putData; }
        return self::dotNestedKeySearchFromArray($key, self::$putData);
    }
    public static function positivePUT(string $key = null, $default = null){
        if(self::$putData === null){ self::$putData = self::readPutData(); }
        $value = self::dotNestedKeySearchFromArray($key, self::$putData);
        if(!is_numeric($value) || $value < 1){
            return $default;
        }
        return $value;
    }


    private static function readPutData(){
        $rawKeysValues = self::inputFileDataToRawKeysValues();
        return self::rawKeysValueToNestedArray($rawKeysValues);
    }


    private static function formValueTypeCorrection($value){
        if(is_numeric($value)){
            if(strpos($value, '.') !== false || strpos($value, ',') !== false){
                //is double
                $value = (float) $value;
            } else{
                //is integer
                $value = (int) $value;
            }
        }
        return $value;
    }


    private static function dotNestedKeySearchFromArray($dotNestedKey, $array){
        $parts    = strpos($dotNestedKey, '.') ? explode('.', $dotNestedKey) : [$dotNestedKey];
        $delegate = $array;

        foreach($parts as $part){
            if(isset($delegate[$part])){
                $delegate = $delegate[$part];
                continue;
            }
            return null;
        }

        return self::formValueTypeCorrection($delegate);;
    }


    private static function inputFileDataToRawKeysValues(){
        $inputFileSrc = 'php://input';
        $lines = file($inputFileSrc);

        $rawKeysValues = [];

        foreach($lines as $i =>  $line){
            $searchKeyLine = 'Content-Disposition: form-data; name="'; //38 characters
            if(strpos($line, $searchKeyLine) !== false){
                $key = substr($line, 38, -3);
                $value = trim($lines[$i + 2]);
                $rawKeysValues[$key] = $value;
            }
        }

        return $rawKeysValues;
    }


    private static function rawKeysValueToNestedArray($rawKeysValues){

        $returnArray = [];
        foreach($rawKeysValues as $keys => $value){
            $array = self::getRawKeyValueToNestedArray($keys, $value);
            $returnArray = array_merge_recursive($returnArray, $array);
        }

        return $returnArray;
    }


    private static function getRawKeyValueToNestedArray($keys, $value){

        $keyParts      = [];
        $dirtyKeyParts = explode('[', $keys);

        // CLEAR $keyParts >>
        foreach($dirtyKeyParts as $i => $dirtyKey){
            $key = $dirtyKey;
            if(substr($dirtyKey, -1) === ']'){
                $key = substr($dirtyKey, 0, -1);
            }
            $keyParts[$i] = $key;
        }
        // CLEAR $keyParts //

        $subData = [];
        $delegate = &$subData;
        foreach($keyParts as $key){ $delegate = &$delegate[$key]; }
        $delegate = $value;

        return $subData;
    }
    // GET DATA ON BODY //


}