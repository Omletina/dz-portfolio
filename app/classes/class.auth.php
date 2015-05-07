<?php

class Auth {

    private $db;

    function __construct($db)
    {
        $this->db = $db;
    }


    /**
     * статическая переменная для хранения объекта авторизованного пользователя
     * Синглтон
     * @var boolean | object
     */
    static private $auth_user = false;


    /**
     * метод создания хеша из данных пользователя
     * @return string
     */
    public function sid($login, $password)
    {
        return md5($login . '_#_$_' . $password);
    }


    /**
     * проверка авторизован ли пользователь
     */
    public function check()
    {
        $login = empty($_GET['Login']) ? '' : $_GET['Login'];
        $sid = empty($_GET['sid']) ? '' : $_GET['sid'];

        // singtone
        if(!empty(self::$auth_user)){
            return self::$auth_user;
        }

        if(!empty($login) && !empty($sid))
        {
            $sql = "SELECT * FROM `users` WHERE `login`='$login' AND `sid`='$sid'";

            $this->db->query($sql)->fetch();

            if(empty($user)) return false;

            return $user;
        }

        return false;
    }


    /**
     * авторизация пользователя
     * @return boolean
     */
    public function attempt($login, $pass)
    {
        $this->db->clean($login);
        $this->db->clean($pass);

        if(!empty($login) && !empty($pass))
        {
            $sql = "SELECT * FROM `users` WHERE `login`='$login' AND `password`='$pass'";

            $user = $this->db->query($sql)->fetch();

            if(empty($user)){
                return false;
            }

            $sid = $this->sid($user['login'], $user['password']);

            $this->db->update('users', array('sid'=>$sid), array('id'=>$user['id']));

            setcookie('Login', $user['login'], 0, '/');
            setcookie('sid', $sid, 0, '/');

            self::$auth_user = $user;
            return $user;
        }

        return false;
    }


    /**
     * отмена авторизации
     */
    public function logout()
    {
        setcookie('Login', '', 111, '/');
        setcookie('sid', '', 111, '/');
    }
}