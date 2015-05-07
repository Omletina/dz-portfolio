<?php

class BaseController{

    /**
     * проверка на AJAX
     * @return boolean
     */
    public function is_ajax(){
        return (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest');
    }

}