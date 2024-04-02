<?php
   session_start();

   include "decrypted.php";
   include "connection.php";

   $dados = descriptografar_dados($_POST['dataEncrypt'], $_POST['secretKeyEncrypt'], $_POST['ivEncrypt']);
   $id_usuario = $_SESSION["id"];
   $nome_usuario = $_SESSION["nome"];
   $aprovacao = false;   
   $valor_arrecadado = 0;

   $query = "SELECT * FROM vakinha.campanha WHERE nome_campanha = '$dados->nome'";
   $resposta = mysqli_query($conexao, $query);
   $resultado = mysqli_num_rows($resposta);

   if ($resultado == 0){

      $query = "INSERT INTO vakinha.campanha (id_usuario, nome_usuario, nome_campanha, valor_objetivo, valor_arrecadado, descricao, aprovacao)
      VALUES ('$id_usuario', '$nome_usuario', '$dados->nome', '$dados->valor', '$valor_arrecadado', '$dados->descricao', '$aprovacao')";

      $resposta = mysqli_query($conexao, $query);
   }

   echo json_encode($resultado);
?>