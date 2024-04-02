<?php
    session_start();

    function gerar_codigo_sms() {

        $cod = rand(100000, 999999);
        $hash_cod = hash("sha512", "$cod");

        $_SESSION["cod_sms"] = $hash_cod;

        return $cod;
    }
?>