<?php

class BaseController{

    private $db;

    function __construct($conf) {
        // соединяемся с БД
        $this->db = new DB($conf);
    }

    /**
     * проверка на AJAX
     * @return boolean
     */
    public function is_ajax(){
        return (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest');
    }


    /**
     * проверка данных авторизации
     * @return array [
     *        content текст сообщения
     *        succsess статус ответа boolean
     * ]
     */
    public function login(){
        return array(
            'content' => '',
            'success' => false,
            );
    }


    private function mailSend($mail){

        $MAIL = new PHPMailer();
        $MAIL->CharSet = 'utf-8';
        $MAIL->From = 'an-tatys@mail.ru';      // от кого
        $MAIL->FromName = 'Mail from LoftBlog DZ';   // от кого
        $MAIL->AddAddress('an-tatys@mail.ru'); // кому - адрес, Имя
        $MAIL->IsHTML(false);        // выставляем формат письма HTML
        $MAIL->Subject = 'новое письмо';  // тема письма

        $MAIL->Body = $mail;

        // отправляем наше письмо
        if (!$MAIL->Send()) die ('Mailer Error: '.$MAIL->ErrorInfo);
    }
}