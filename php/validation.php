<?php

   include "decrypted.php";
   include "connection.php";

   $dados = descriptografar_dados($_POST['dataEncrypt'], $_POST['secretKeyEncrypt'], $_POST['ivEncrypt']);

   $query = "SELECT email FROM vakinha.usuario WHERE token = '$dados->key'";
   $resposta = mysqli_query($conexao, $query);
   $resultado = mysqli_fetch_assoc($resposta);

   $email = $resultado["email"];

   $query = "UPDATE vakinha.usuario SET confirmacao = true WHERE email = '$email'";
   $resposta = mysqli_query($conexao, $query);

   $query = "UPDATE vakinha.usuario SET token = '' WHERE email = '$email'";
   $resposta = mysqli_query($conexao, $query);

   echo json_encode(1);
?>