<?php

class BaseController{

    private $db;
    private $auth;

    function __construct($conf) {
        // соединяемся с БД
        $this->db = new DB($conf);

        $auth = new Auth($this->db);
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
        $res = array(
                'success' => false,
                );

        $login = empty($_POST['login']) ? '' : $_POST['login'];
        $pass = empty($_POST['password']) ? '' : $_POST['password'];

        if(empty($login) || empty($pass)){
            $res['content'] = 'Ни логин, ни пароль, не могут быть пустыми';
            return $res;
        }

        $user = $this->auth->attempt($login, $pass);

        if($user === false){
            $res['content'] = 'Не верные логин или пароль';
            return $res;
        }

        $res = array(
            'content' => 'Вы успешно авторизованы',
            'success' => true
        );

        return $res;
    }


    /**
     * отправка сообщения
     */
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