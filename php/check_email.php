<?php

   include "decrypted.php";
   include "connection.php";
   include "send_email.php";

   $dados = descriptografar_dados($_POST['dataEncrypt'], $_POST['secretKeyEncrypt'], $_POST['ivEncrypt']);
  
   $query = "SELECT * FROM vakinha.usuario WHERE email = '$dados->email'";
   $resposta = mysqli_query($conexao, $query);
   $resultado = mysqli_num_rows($resposta);

   if ($resultado == 1){ // Se e-mail existe envia o código
      enviar_email($dados->email, 2);
   }

   echo json_encode($resultado);
?>