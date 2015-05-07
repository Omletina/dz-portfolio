<?php

// debug
function dd($var) {
    echo '<pre>';
    var_dump($var);
    exit();
}

require_once 'classes/class.phpmailer.php';
require_once 'classes/class.mysqli.php';
require_once 'classes/BaseController.php';

// mysql config
$conf = array();
$conf['host'] = 'localhost';
$conf['user'] = 'root';
$conf['pass'] = '';
$conf['db'] = 'db_name';
$conf['port'] = 3306;

$app = new BaseController($conf);

// проверяем AJAX
if(!$app->is_ajax()){
    exit();
}

// ищем экшен
$action = empty($_GET['a']) ? '' :  $_GET['a'];

// есть ли метод в классе
if(!empty($action) && !method_exists($app, $action)){
    exit("actinon не найден");
}

header("Content-Type: application/json");
$res = $app->$action();
echo json_encode($res);