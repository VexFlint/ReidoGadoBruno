<?php

   include "decrypted.php";
   include "connection.php";

   $dados = descriptografar_dados($_POST['dataEncrypt'], $_POST['secretKeyEncrypt'], $_POST['ivEncrypt']);

   $query = "UPDATE vakinha.usuario SET senha = '$dados->senha_hash' WHERE email = '$dados->email'";
   $resposta = mysqli_query($conexao, $query);

   echo json_encode(1);
?>