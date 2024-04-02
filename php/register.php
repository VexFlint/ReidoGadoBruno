<?php

   include "decrypted.php";
   include "connection.php";
   include "send_email.php";

   $dados = descriptografar_dados($_POST['dataEncrypt'], $_POST['secretKeyEncrypt'], $_POST['ivEncrypt']);
   
   $id_perfil = 1;
   $confirmacao = false;
   $dois_fatores = false;
   $data_dois_fatores = "0000-00-00";
   

   $query = "SELECT * FROM vakinha.usuario WHERE email = '$dados->email'";
   $resposta = mysqli_query($conexao, $query);
   $resultado = mysqli_num_rows($resposta);

   if ($resultado == 0){

      $query = "INSERT INTO vakinha.usuario (id_perfil, nome, email, senha, telefone, confirmacao, dois_fatores, data_dois_fatores)
      VALUES ('$id_perfil', '$dados->nome', '$dados->email', '$dados->senha_hash', '$dados->phone', '$confirmacao', '$dois_fatores', '$data_dois_fatores')";

      $resposta = mysqli_query($conexao, $query);

      enviar_email($dados->email, 1);
   }

   echo json_encode($resultado);
?>