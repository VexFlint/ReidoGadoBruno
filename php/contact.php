<?php
   session_start();

   include "decrypted.php";
   include "connection.php";
   include "send_email.php";

   $dados = descriptografar_dados($_POST['dataEncrypt'], $_POST['secretKeyEncrypt'], $_POST['ivEncrypt']);
   $email = $_SESSION["email"];

   enviar_mensagem($email, $dados->nome, $dados->assunto, $dados->mensagem);

   echo json_encode(1);
?>