<?php

   include "decrypted.php";
   include "connection.php";

   $dados = descriptografar_dados($_POST['dataEncrypt'], $_POST['secretKeyEncrypt'], $_POST['ivEncrypt']);

   $query = "SELECT token FROM vakinha.usuario WHERE email = '$dados->email'";
   $resposta = mysqli_query($conexao, $query);
   $resultado = mysqli_fetch_assoc($resposta);
   
   if ($dados->token_hash == $resultado["token"]){
      echo json_encode(0);
   
      $query = "UPDATE vakinha.usuario SET token = '' WHERE email = '$dados->email'";
      $resposta = mysqli_query($conexao, $query);
   }
   else{
      echo json_encode(1);
   }
?>